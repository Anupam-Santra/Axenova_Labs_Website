import React, { useState, useEffect } from "react";
import { UserSession } from "./types";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { HomeTab } from "./components/HomeTab";
import { PortfolioTab } from "./components/PortfolioTab";
import { ServicesTab } from "./components/ServicesTab";
import { BlogTab } from "./components/BlogTab";
import { AboutTab } from "./components/AboutTab";
import { ContactTab } from "./components/ContactTab";
import { ApplyTab } from "./components/ApplyTab";
import { DeveloperDashboard } from "./components/DeveloperDashboard";

export default function App() {
  const [activeTab, setActiveTab] = useState<string>("home");
  const [session, setSession] = useState<UserSession | null>(null);

  // Restore session from localStorage on startup if still valid
  useEffect(() => {
    const saved = localStorage.getItem("axenova_session");
    if (saved) {
      try {
        setSession(JSON.parse(saved));
      } catch (e) {
        localStorage.removeItem("axenova_session");
      }
    }
  }, []);

  // Handle cross-origin pop-up events for Google OAuth flow
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      // Allow localhost and *.run.app origins for development containers
      const origin = event.origin;
      if (!origin.endsWith(".run.app") && !origin.includes("localhost")) {
        return;
      }

      if (event.data?.type === "OAUTH_AUTH_SUCCESS") {
        const { sessionToken, name, email, picture } = event.data;
        const newSession: UserSession = {
          token: sessionToken,
          name: decodeURIComponent(name),
          email: decodeURIComponent(email),
          picture: decodeURIComponent(picture)
        };
        setSession(newSession);
        localStorage.setItem("axenova_session", JSON.stringify(newSession));
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  // Expose Google Authentication initiation
  const handleSignIn = async () => {
    try {
      const response = await fetch("/api/auth/google/url");
      if (!response.ok) {
        throw new Error("Failed to formulate Google Auth redirect url path");
      }
      
      const { url, isDemoMode } = await response.json();
      
      if (isDemoMode) {
        // Fallback automatically to Developer Mode Sign-In if Google secrets are unconfigured
        const devLoginResponse = await fetch("/api/auth/demo-signin", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: "Anupam Santra",
            email: "anupamsantrakgp@gmail.com"
          })
        });
        if (devLoginResponse.ok) {
          const devData = await devLoginResponse.json();
          const devSession: UserSession = {
            token: devData.sessionToken,
            name: devData.user.name,
            email: devData.user.email,
            picture: devData.user.picture
          };
          setSession(devSession);
          localStorage.setItem("axenova_session", JSON.stringify(devSession));
        }
      } else if (url) {
        // Open safe cross-origin popup direct provider url
        const authWindow = window.open(url, "oauth_popup", "width=600,height=700");
        if (!authWindow) {
          alert("Please enable pop-up permission inside your browser settings to authenticate with Google.");
        }
      }
    } catch (e: any) {
      console.error("Sign-In failed to capture authorization pathways", e);
      alert("Error initiating Auth: " + e.message);
    }
  };

  // Sign out Google session and invalidate in-memory on backend
  const handleSignOut = async () => {
    if (session) {
      try {
        await fetch("/api/auth/signout", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${session.token}`
          }
        });
      } catch (e) {
        console.error("Failed to cleanly invalidate backend credentials token", e);
      }
    }
    setSession(null);
    localStorage.removeItem("axenova_session");
  };

  return (
    <div className="min-h-screen bg-background text-on-surface flex flex-col relative noise-bg">
      {/* Navigation Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        session={session}
        onSignOut={handleSignOut}
      />

      {/* Main Container Content */}
      <main className="flex-grow pt-24 pb-16 px-6 md:px-16 max-w-7xl mx-auto w-full relative z-10">
        {activeTab === "home" && (
          <HomeTab
            onApplyNow={() => setActiveTab("apply")}
            onExploreWork={() => setActiveTab("portfolio")}
          />
        )}
        {activeTab === "about" && <AboutTab />}
        {activeTab === "services" && <ServicesTab />}
        {activeTab === "portfolio" && <PortfolioTab />}
        {activeTab === "blog" && <BlogTab />}
        {activeTab === "contact" && <ContactTab />}
        
        {activeTab === "apply" && (
          <ApplyTab
            session={session}
            onSignIn={handleSignIn}
            onSignOut={handleSignOut}
            onSubmitSuccess={() => {
              // Can fetch latest record in debug screen
            }}
          />
        )}

        {activeTab === "debug" && <DeveloperDashboard />}
      </main>

      {/* Shared Brand Footer */}
      <Footer setActiveTab={setActiveTab} />
    </div>
  );
}
