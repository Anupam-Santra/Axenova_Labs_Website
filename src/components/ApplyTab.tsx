import React, { useState, useRef } from "react";
import { UserSession } from "../types";
import { ArrowRight, CheckCircle2, AlertCircle, FileText, Sparkles } from "lucide-react";

interface ApplyTabProps {
  session: UserSession | null;
  onSignIn: () => void;
  onSignOut: () => void;
  onSubmitSuccess: () => void;
}

export const ApplyTab: React.FC<ApplyTabProps> = ({
  session,
  onSignIn,
  onSignOut,
  onSubmitSuccess
}) => {
  const [organization, setOrganization] = useState("");
  const [idea, setIdea] = useState("");
  const [servicesRequired, setServicesRequired] = useState<string[]>([]);
  const [website, setWebsite] = useState("");
  
  // File upload state
  const [pitchDeck, setPitchDeck] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Form execution states
  const [formStatus, setFormStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const servicesOptions = [
    "AI Strategy",
    "Backend Systems",
    "Cloud Infrastructure",
    "Data Pipeline",
    "MVP Delivery",
    "Play Store",
    "App Store",
    "Pitch Prep"
  ];

  const handleServiceChange = (service: string) => {
    if (servicesRequired.includes(service)) {
      setServicesRequired(servicesRequired.filter(s => s !== service));
    } else {
      setServicesRequired([...servicesRequired, service]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      validateAndSetFile(e.target.files[0]);
    }
  };

  const validateAndSetFile = (file: File) => {
    const validExtensions = [".pdf", ".ppt", ".pptx"];
    const extension = file.name.substring(file.name.lastIndexOf(".")).toLowerCase();
    
    if (!validExtensions.includes(extension)) {
      alert("Invalid file format. Please attach a PDF or PPT/PPTX file.");
      return;
    }

    if (file.size > 20 * 1024 * 1024) {
      alert("File is too large. Maximum size allowed is 20MB.");
      return;
    }

    setPitchDeck(file);
  };

  const triggerFileBrowser = () => {
    fileInputRef.current?.click();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!session) return;

    if (!organization.trim()) {
      setErrorMessage("Please fill out the Organization Name.");
      return;
    }

    if (!idea.trim()) {
      setErrorMessage("Please capture your idea parameters.");
      return;
    }

    // Optional confirmation before sending Workspace resources (required by rules for emails sent on behalf of users)
    const confirmed = window.confirm(
      "Confirm Action: This will send your submitted project application as an authorized email to Axenova Labs from your Google account. Continue?"
    );
    if (!confirmed) return;

    setFormStatus("submitting");
    setErrorMessage("");

    try {
      const formData = new FormData();
      formData.append("fullName", session.name);
      formData.append("applicantEmail", session.email);
      formData.append("organization", organization);
      formData.append("idea", idea);
      formData.append("servicesRequired", JSON.stringify(servicesRequired));
      formData.append("website", website);
      if (pitchDeck) {
        formData.append("pitchDeck", pitchDeck);
      }

      const response = await fetch("/api/submit-application", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${session.token}`
        },
        body: formData
      });

      const result = await response.json();
      if (response.ok && result.status === "success") {
        setFormStatus("success");
        onSubmitSuccess();
      } else {
        setFormStatus("error");
        setErrorMessage(result.message || "Failed to submit application. Please retry.");
      }
    } catch (err: any) {
      setFormStatus("error");
      setErrorMessage(err.message || "Network transmission failure while establishing submission sequence.");
    }
  };

  const resetForm = () => {
    setOrganization("");
    setIdea("");
    setServicesRequired([]);
    setWebsite("");
    setPitchDeck(null);
    setFormStatus("idle");
    setErrorMessage("");
  };

  // SUCCESS STATE SCREEN
  if (formStatus === "success") {
    return (
      <div className="max-w-2xl mx-auto py-24 px-6 md:px-12 animate-fade-in" id="success-screen">
        <div className="bg-[#0a0a0a] border border-white/10 p-12 text-center relative overflow-hidden">
          <div className="glow-green absolute w-[300px] h-[300px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-60 blur-3xl pointer-events-none rounded-full"></div>
          <div className="relative z-10 flex flex-col items-center">
            <div className="w-16 h-16 bg-white/5 border border-white/10 flex items-center justify-center mb-8 rotate-45">
              <CheckCircle2 className="text-[#60de8c] w-8 h-8 -rotate-45" />
            </div>
            <div className="font-display font-medium text-white text-md tracking-[0.3em] uppercase mb-2">Axenova Labs</div>
            <h2 className="font-display uppercase tracking-tight font-extrabold text-3xl text-white mb-6">Submission Established</h2>
            <p className="font-sans text-xs text-[#b0b4bd] leading-relaxed max-w-sm mb-12 font-light">
              We've processed your core vision structure. A detailed summary of this validation proposal has been secure-routed to our engineers at <span className="font-mono text-white">axenovalabs@gmail.com</span> using high-grade API.
            </p>
            <button
              onClick={resetForm}
              id="return-btn"
              className="bg-white text-black px-10 py-4 font-bold uppercase tracking-[0.2em] text-[10px] hover:bg-neutral-200 transition-all active:scale-95 duration-300 rounded-none cursor-pointer"
            >
              Submit Another Brief
            </button>
          </div>
        </div>
      </div>
    );
  }

  // GATED / LOGIN FORM STEP 1 SCREEN
  if (!session) {
    return (
      <div className="max-w-xl mx-auto py-24 px-6 md:px-12 animate-fade-in" id="login-gate-screen">
        <div className="bg-[#0a0a0a] border border-white/10 p-10 md:p-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-[#60de8c]/5 rotate-45 blur-xl pointer-events-none"></div>
          
          <div className="text-center mb-10">
            <span className="text-[10px] uppercase tracking-[0.4em] text-[#60de8c] font-bold mb-3 block font-mono">
              alliance portal
            </span>
            <h1 className="font-display text-white text-3xl font-bold tracking-tight mb-4 uppercase">
              Application Portal
            </h1>
            <p className="font-sans text-xs text-[#b0b4bd] leading-relaxed font-light">
              Authorized access is requested. Sign in securely through Google to unlock our submission engine and pitch workspace.
            </p>
          </div>

          <div className="flex justify-center mb-8">
            <button
              onClick={onSignIn}
              id="oauth-signin-btn"
              className="w-full flex items-center gap-3 bg-white hover:bg-neutral-200 text-black px-6 py-4 rounded-none font-bold text-xs tracking-widest uppercase transition-all duration-300 justify-center active:scale-95 shadow-md"
            >
              <svg className="w-4 h-4 shrink-0" height="24" viewBox="0 0 48 48" width="24" xmlns="http://www.w3.org/2000/svg">
                <path d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" fill="#EA4335"></path>
                <path d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" fill="#4285F4"></path>
                <path d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" fill="#FBBC05"></path>
                <path d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" fill="#34A853"></path>
                <path d="M0 0h48v48H0z" fill="none"></path>
              </svg>
              <span>Continue with Google OAuth</span>
            </button>
          </div>

          <div className="text-center pt-8 border-t border-white/10">
            <p className="font-sans text-[10px] text-[#b0b4bd]/60 italic font-light">
              "Investment is yours. Work is ours. India-focused rapid validation pathway."
            </p>
          </div>
        </div>
      </div>
    );
  }

  // CHROME AUTHORIZED FORM SUBMISSION - STEP 2
  return (
    <div className="w-full max-w-3xl mx-auto py-16 px-6 animate-fade-in" id="apply-form-step-2">
      <div className="bg-[#0a0a0a] border border-white/10 p-10 md:p-12 relative overflow-hidden">
        
        {/* Form Container */}
        <section className="flex flex-col justify-between">
          <header className="mb-12">
            <span className="text-[10px] uppercase tracking-[0.4em] text-[#60de8c] font-bold mb-3 block font-mono">
              Internal Portal / Submission
            </span>
            <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight tracking-tighter text-white font-display uppercase font-bold">
              Application <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#60de8c] to-[#30b568] font-black uppercase">Form 2.0</span>
            </h1>
          </header>

          {errorMessage && (
            <div className="mb-8 p-4 rounded-none bg-red-500/10 border border-red-500/20 flex items-start gap-3 text-red-300 text-xs animate-fade-in" id="auth-error-banner">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-10">
            {/* Split row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-8">
              <div className="col-span-1">
                <label className="text-[10px] uppercase tracking-widest text-[#b0b4bd]/60 mb-2 block font-mono">
                  Full Name (Pre-filled)
                </label>
                <input 
                  type="text" 
                  value={session.name} 
                  className="w-full bg-white/5 border-b border-white/20 py-3 px-1 text-sm text-[#b0b4bd] focus:outline-none focus:border-[#60de8c] transition-colors bg-transparent rounded-none" 
                  readOnly
                />
              </div>

              <div className="col-span-1">
                <label htmlFor="org" className="text-[10px] uppercase tracking-widest text-[#b0b4bd]/60 mb-2 block font-mono">
                  Organization name
                </label>
                <input 
                  type="text" 
                  id="org"
                  required
                  value={organization}
                  onChange={(e) => setOrganization(e.target.value)}
                  placeholder="Your startup or entity" 
                  className="w-full bg-white/5 border-b border-white/20 py-3 px-1 text-sm text-white focus:outline-none focus:border-[#60de8c] transition-colors bg-transparent rounded-none"
                />
              </div>

              <div className="col-span-1 sm:col-span-2">
                <label htmlFor="website" className="text-[10px] uppercase tracking-widest text-[#b0b4bd]/60 mb-2 block font-mono font-medium font-bold">
                  Website URL <span className="text-white/30">(Optional)</span>
                </label>
                <input 
                  type="url" 
                  id="website"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  placeholder="https://yourwork.com" 
                  className="w-full bg-white/5 border-b border-white/20 py-3 px-1 text-sm text-white focus:outline-none focus:border-[#60de8c] transition-colors bg-transparent rounded-none"
                />
              </div>

              <div className="col-span-1 sm:col-span-2">
                <label htmlFor="idea" className="text-[10px] uppercase tracking-widest text-[#b0b4bd]/60 mb-2 block font-mono font-medium font-bold">
                  Vision / Idea Statement
                </label>
                <textarea 
                  id="idea"
                  required
                  rows={3} 
                  value={idea}
                  onChange={(e) => setIdea(e.target.value)}
                  placeholder="Describe your core model, user pain-points and why Axenova technology is vital..." 
                  className="w-full bg-white/5 border-b border-white/20 py-3 px-1 text-sm text-white focus:outline-none focus:border-[#60de8c] transition-colors resize-none bg-transparent rounded-none"
                />
              </div>

              {/* Multi-Select Buttons */}
              <div className="col-span-1 sm:col-span-2">
                <label className="text-[10px] uppercase tracking-widest text-[#b0b4bd]/60 mb-4 block font-mono font-bold">
                  Services Required
                </label>
                <div className="flex flex-wrap gap-2">
                  {servicesOptions.map((srv) => {
                    const isSelected = servicesRequired.includes(srv);
                    return (
                      <button
                        type="button"
                        key={srv}
                        onClick={() => handleServiceChange(srv)}
                        className={`px-4 py-2 border text-[10px] uppercase tracking-wider transition-all duration-300 rounded-none cursor-pointer ${
                          isSelected
                            ? "border-[#60de8c] bg-[#60de8c]/10 text-[#60de8c] font-bold"
                            : "border-white/20 text-[#b0b4bd] hover:bg-white hover:text-black hover:border-white"
                        }`}
                      >
                        {srv}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Custom File Uploader & Submit Row */}
            <div className="pt-10 flex flex-col md:flex-row items-start md:items-center justify-between border-t border-white/10 gap-6">
              
              {/* Pitch attachment styled like pitch deck mock button */}
              <div 
                onClick={triggerFileBrowser} 
                className="flex items-center gap-3 group cursor-pointer"
                id="file-dropzone-artistic"
              >
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept=".pdf,.ppt,.pptx"
                  className="hidden"
                />
                
                <div className="w-10 h-10 border border-dashed border-white/30 flex items-center justify-center group-hover:border-[#60de8c] transition-colors">
                  {pitchDeck ? (
                    <FileText className="text-[#60de8c] w-4 h-4" />
                  ) : (
                    <span className="text-lg text-white/80 select-none font-light leading-none">+</span>
                  )}
                </div>
                <div>
                  <p className="text-xs uppercase tracking-tight text-white group-hover:text-[#60de8c] transition-colors font-medium">
                    {pitchDeck ? pitchDeck.name : "Attach Pitch Deck (PDF/PPT)"}
                  </p>
                  <p className="text-[9px] font-mono text-[#b0b4bd]/50">
                    {pitchDeck ? `${(pitchDeck.size / (1024 * 1024)).toFixed(2)} MB • replaceable` : "Support max 20MB file format"}
                  </p>
                </div>
              </div>

              {/* Form trigger submit block */}
              <div className="flex items-center gap-4 w-full md:w-auto">
                <button
                  type="button"
                  onClick={onSignOut}
                  id="form-cancel-btn"
                  className="text-[10px] font-mono tracking-widest uppercase text-[#b0b4bd]/50 hover:text-white transition-colors py-2 px-1 text-left"
                >
                  Sign Out
                </button>
                <button
                  type="submit"
                  disabled={formStatus === "submitting"}
                  id="form-submit-btn"
                  className="bg-[#60de8c] text-black px-8 py-4 font-bold uppercase tracking-[0.2em] text-[10px] hover:scale-105 transition-all text-center rounded-none cursor-pointer flex items-center justify-center gap-2"
                >
                  {formStatus === "submitting" ? (
                    <>
                      <span className="w-3 h-3 border-2 border-black border-t-transparent rounded-full animate-spin"></span>
                      <span>SENDING BRIEF</span>
                    </>
                  ) : (
                    <>
                      <span>SUBMIT TO LAB</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </div>
            </div>

          </form>
        </section>

      </div>
    </div>
  );
};
