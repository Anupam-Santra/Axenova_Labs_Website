import express from "express";
import path from "path";
import cors from "cors";
import multer from "multer";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";

// Load environment variables
dotenv.config();

const app = express();
const PORT = 3000;

// Setup in-memory stores for session and submissions
interface SessionUser {
  email: string;
  name: string;
  picture: string;
  accessToken?: string;
  isDemo?: boolean;
}

const sessions = new Map<string, SessionUser>();
const submissions: Array<{
  id: string;
  fullName: string;
  applicantEmail: string;
  organization: string;
  website: string;
  idea: string;
  servicesRequired: string[];
  pitchDeckName?: string;
  submittedAt: string;
  isRealEmailSent: boolean;
}> = [];

// Configure Multer for pitch deck files in-memory
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: {
    fileSize: 20 * 1024 * 1024 // max 20MB
  }
});

// Configure CORS to accept requests from Stitch frontend domain.
// Fallback dynamically supporting local testing environment.
const getAllowedOrigins = () => {
  const list: string[] = [];
  if (process.env.STITCH_FRONTEND_URL) {
    list.push(process.env.STITCH_FRONTEND_URL);
  }
  if (process.env.APP_URL) {
    list.push(process.env.APP_URL);
  }
  return list;
};

app.use(cors({
  origin: (origin, callback) => {
    const list = getAllowedOrigins();
    // Allow if origin is in verified list, or in dev/local environments (where origin may be undefined for direct fetch inside same origin or same iframe proxy)
    if (!origin || list.includes(origin) || origin.includes("localhost") || origin.endsWith(".run.app")) {
      callback(null, true);
    } else {
      callback(new Error(`Not allowed by CORS policy. Expected origins: ${list.join(", ")}`));
    }
  },
  credentials: true
}));

app.use(express.json());

// Helper function to detect if Google OAuth is configured
function isGoogleOAuthConfigured(): boolean {
  const clientId = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
  return !!(clientId && clientId.trim() !== "" && clientSecret && clientSecret.trim() !== "");
}

// 🔐 1. GOOGLE OAUTH 2.0 AUTHENTICATION ENDPOINTS

// Route: Get authorization URL
app.get("/api/auth/google/url", (req, res) => {
  if (!isGoogleOAuthConfigured()) {
    // Return a special flag to initiate mock demo auth flow
    return res.json({ isDemoMode: true });
  }

  const appUrl = process.env.APP_URL || "https://localhost:3000";
  const redirectUri = `${appUrl}/api/auth/google/callback`;
  
  const scopes = [
    "openid",
    "https://www.googleapis.com/auth/userinfo.email",
    "https://www.googleapis.com/auth/userinfo.profile",
    "https://www.googleapis.com/auth/gmail.send" // Needed to email on their behalf
  ];

  const params = new URLSearchParams({
    client_id: process.env.GOOGLE_CLIENT_ID!,
    redirect_uri: redirectUri,
    response_type: "code",
    scope: scopes.join(" "),
    access_type: "offline",
    prompt: "consent"
  });

  const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;
  res.json({ url: authUrl, isDemoMode: false });
});

// Route: OAuth callback
app.get("/api/auth/google/callback", async (req, res) => {
  const code = req.query.code as string;
  if (!code) {
    return res.send(`
      <html>
        <body>
          <script>
            if (window.opener) {
              window.opener.postMessage({ type: "OAUTH_AUTH_ERROR", message: "Code parameter missing" }, "*");
              window.close();
            } else {
              window.location.href = "/";
            }
          </script>
        </body>
      </html>
    `);
  }

  try {
    const appUrl = process.env.APP_URL || "https://localhost:3000";
    const redirectUri = `${appUrl}/api/auth/google/callback`;
    
    // Exchange the authorization code for an access token
    const tokenResponse = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        client_id: process.env.GOOGLE_CLIENT_ID!,
        client_secret: process.env.GOOGLE_CLIENT_SECRET!,
        code,
        grant_type: "authorization_code",
        redirect_uri: redirectUri
      })
    });

    if (!tokenResponse.ok) {
      const errorText = await tokenResponse.text();
      throw new Error(`Google token exchange failed: ${errorText}`);
    }

    const tokens = await tokenResponse.json() as { access_token: string };
    
    // Retrieve users info using access token
    const userinfoResponse = await fetch("https://www.googleapis.com/oauth2/v2/userinfo", {
      headers: { Authorization: `Bearer ${tokens.access_token}` }
    });

    if (!userinfoResponse.ok) {
      throw new Error("Failed to retrieve Google profile details");
    }

    const googleUser = await userinfoResponse.json() as {
      email: string;
      name: string;
      picture: string;
    };

    // Create session token
    const sessionToken = "session_" + Math.random().toString(36).substring(2) + Date.now().toString(36);
    sessions.set(sessionToken, {
      email: googleUser.email,
      name: googleUser.name,
      picture: googleUser.picture,
      accessToken: tokens.access_token,
      isDemo: false
    });

    // Return popup closing and token emitting HTML page back to opener
    res.send(`
      <html>
        <body>
          <script>
            if (window.opener) {
              window.opener.postMessage({
                type: "OAUTH_AUTH_SUCCESS",
                sessionToken: "${sessionToken}",
                name: "${encodeURIComponent(googleUser.name)}",
                email: "${encodeURIComponent(googleUser.email)}",
                picture: "${encodeURIComponent(googleUser.picture)}"
              }, "*");
              window.close();
            } else {
              // Fallback if not opened via popup
              window.location.href = "/#session_token=${sessionToken}";
            }
          </script>
          <p style="font-family: sans-serif; text-align: center; margin-top: 50px;">
            Authentication successful! This tab should close automatically. Just a moment...
          </p>
        </body>
      </html>
    `);

  } catch (error: any) {
    console.error("Callback OAuth exchange error:", error);
    res.send(`
      <html>
        <body>
          <script>
            if (window.opener) {
              window.opener.postMessage({ type: "OAUTH_AUTH_ERROR", message: "${encodeURIComponent(error.message || "OAuth processing error")}" }, "*");
              window.close();
            } else {
              window.location.href = "/?error=oauth_failed";
            }
          </script>
        </body>
      </html>
    `);
  }
});

// Demo fallback mock OAuth sign-in
app.post("/api/auth/demo-signin", (req, res) => {
  const { name, email } = req.body || {};
  const userEmail = email || "anupamsantrakgp@gmail.com";
  const userName = name || "Anupam Santra";
  const userPicture = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80";

  const sessionToken = "demo_" + Math.random().toString(36).substring(2) + Date.now().toString(36);
  sessions.set(sessionToken, {
    email: userEmail,
    name: userName,
    picture: userPicture,
    isDemo: true
  });

  res.json({
    status: "success",
    sessionToken,
    user: {
      name: userName,
      email: userEmail,
      picture: userPicture
    }
  });
});

// Route: Sign Out endpoint
app.post("/api/auth/signout", (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(400).json({ status: "error", message: "Missing authorization token header." });
  }

  const token = authHeader.replace("Bearer ", "");
  if (sessions.has(token)) {
    sessions.delete(token);
    return res.json({ status: "success", message: "Session signed out and invalidated successfully." });
  }

  return res.status(404).json({ status: "error", message: "Session token not found." });
});


// Helper to construct multipart MIME email and convert to web-safe base64 URL format
function buildMimeMessage({
  from,
  to,
  subject,
  body,
  attachmentName,
  attachmentBuffer,
  attachmentMimeType
}: {
  from: string;
  to: string;
  subject: string;
  body: string;
  attachmentName?: string;
  attachmentBuffer?: Buffer;
  attachmentMimeType?: string;
}) {
  const boundary = "AxenovaBoundary" + Date.now().toString(16);
  const multipart = [
    `From: <${from}>`,
    `To: <${to}>`,
    `Subject: =?utf-8?B?${Buffer.from(subject).toString("base64")}?=`,
    `MIME-Version: 1.0`,
    `Content-Type: multipart/mixed; boundary="${boundary}"`,
    "",
    `--${boundary}`,
    `Content-Type: text/plain; charset="utf-8"`,
    `Content-Transfer-Encoding: base64`,
    "",
    Buffer.from(body).toString("base64"),
    ""
  ];

  if (attachmentName && attachmentBuffer && attachmentMimeType) {
    const base64Attachment = attachmentBuffer.toString("base64");
    multipart.push(
      `--${boundary}`,
      `Content-Type: ${attachmentMimeType}; name="${attachmentName}"`,
      `Content-Description: ${attachmentName}`,
      `Content-Disposition: attachment; filename="${attachmentName}"`,
      `Content-Transfer-Encoding: base64`,
      "",
      base64Attachment,
      ""
    );
  }

  multipart.push(`--${boundary}--`);

  return Buffer.from(multipart.join("\r\n"))
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}


// 📧 2. FORM SUBMISSION -> EMAIL TO axenovalabs@gmail.com
app.post("/api/submit-application", upload.single("pitchDeck"), async (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ status: "error", message: "Unauthenticated. Invalid or missing session token." });
  }

  const token = authHeader.replace("Bearer ", "");
  const session = sessions.get(token);
  if (!session) {
    return res.status(401).json({ status: "error", message: "Unauthenticated. Session has expired or is invalid." });
  }

  const { fullName, organization, idea, servicesRequired, website, applicantEmail: bodyEmail } = req.body;

  // Validation
  if (!fullName || !organization || !idea) {
    return res.status(400).json({ status: "error", message: "Required fields missing (fullName, organization, idea received empty values)." });
  }

  const applicantEmail = bodyEmail || session.email;

  // Process services required: accommodate string array or serialized JSON array
  let parsedServices: string[] = [];
  if (servicesRequired) {
    if (typeof servicesRequired === "string") {
      try {
        parsedServices = JSON.parse(servicesRequired);
      } catch (e) {
        // Fallback split comma separated values
        parsedServices = servicesRequired.split(",").map((s: string) => s.trim()).filter(Boolean);
      }
    } else if (Array.isArray(servicesRequired)) {
      parsedServices = servicesRequired;
    }
  }

  const websiteDisplay = website && website.trim() !== "" ? website : "Not provided";
  const servicesListStr = parsedServices.length > 0 
    ? parsedServices.map(s => `• ${s}`).join("\n")
    : "• None selected";

  const pitchDeckName = req.file ? req.file.originalname : "No deck uploaded";

  // Build the formatted email body text
  const emailBodyText = `NEW APPLICATION RECEIVED — AXENOVA LABS
─────────────────────────────────────────
Applicant Name     : ${fullName}
Google Account     : ${applicantEmail}
Organization       : ${organization}
Website            : ${websiteDisplay}

IDEA / VISION
─────────────
${idea}

SERVICES REQUESTED
──────────────────
${servicesListStr}

PITCH DECK         : Attached (${pitchDeckName})
─────────────────────────────────────────
Submitted via Axenova Labs Website`;

  const emailSubject = `New Application — ${fullName} from ${organization}`;
  let isRealEmailSent = false;

  try {
    if (!session.isDemo && session.accessToken) {
      // 🚀 REAL DEPLOYMENT - SEND VIA GMAIL API 🚀
      const rawMime = buildMimeMessage({
        from: applicantEmail,
        to: "axenovalabs@gmail.com",
        subject: emailSubject,
        body: emailBodyText,
        attachmentName: req.file ? req.file.originalname : undefined,
        attachmentBuffer: req.file ? req.file.buffer : undefined,
        attachmentMimeType: req.file ? req.file.mimetype : undefined
      });

      const gmailResponse = await fetch("https://gmail.googleapis.com/gmail/v1/users/me/messages/send", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${session.accessToken}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ raw: rawMime })
      });

      if (!gmailResponse.ok) {
        const errDetails = await gmailResponse.text();
        throw new Error(`Gmail API transmission failed: ${errDetails}`);
      }
      isRealEmailSent = true;
    } else {
      // 🔧 CONSOLE & LOGGER FALLBACK (Demo / Dev Setup mode) 🔧
      console.log(`[Demo API Mock Email Delivery] axenovalabs@gmail.com:`);
      console.log(`Subject: ${emailSubject}`);
      console.log(`Body:\n${emailBodyText}`);
      if (req.file) {
        console.log(`Attachment: ${req.file.originalname} (${req.file.size} bytes)`);
      }
    }

    // Save submission to live state list for dashboard inspection
    const newSubmission = {
      id: "app_" + Math.random().toString(36).substring(2) + Date.now().toString(36).slice(-4),
      fullName,
      applicantEmail,
      organization,
      website: websiteDisplay,
      idea,
      servicesRequired: parsedServices,
      pitchDeckName: req.file ? req.file.originalname : undefined,
      submittedAt: new Date().toISOString(),
      isRealEmailSent
    };
    submissions.unshift(newSubmission);

    return res.status(200).json({
      status: "success",
      message: "Application received and email sent.",
      submission: newSubmission
    });

  } catch (error: any) {
    console.error("Submission email sending error:", error);
    return res.status(500).json({
      status: "error",
      message: error.message || "Failed to process application delivery via Gmail API."
    });
  }
});

// Extra supportive developer diagnostic endpoint (for listing submissions if desired in dev)
app.get("/api/dashboard/submissions", (req, res) => {
  res.json({ status: "success", submissions });
});

// Configure full-stack integration with Vite dynamically
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa"
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Axenova Labs Node Dev Container running at http://localhost:${PORT}`);
  });
}

startServer();

// Load environment variables 
// (I am adding this comment to force a redeploy)
dotenv.config();