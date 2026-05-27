import React, { useState } from "react";
import { Radar, Mail, Globe, MapPin, Send, CheckCircle2 } from "lucide-react";

export const ContactTab: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    setStatus("submitting");

    // Mock sequence transmission
    setTimeout(() => {
      setStatus("success");
      setName("");
      setEmail("");
      setMessage("");
      setTimeout(() => setStatus("idle"), 4000);
    }, 1500);
  };

  return (
    <div className="relative pt-24 pb-16 bg-[#050505]">
      {/* Background Glows */}
      <div className="glow-green absolute w-[400px] h-[400px] top-0 left-[-150px] opacity-25 blur-[100px] pointer-events-none rounded-full" />
      <div className="glow-purple absolute w-[450px] h-[450px] bottom-0 right-[-150px] opacity-15 blur-[120px] pointer-events-none rounded-full" />

      {/* Page Header */}
      <div className="mb-16 max-w-3xl">
        <div className="inline-block px-3 py-1 mb-6 rounded-none bg-white/5 border border-white/10 font-mono text-[9px] text-[#b0b4bd] tracking-widest uppercase font-bold">
          Channels
        </div>
        <h1 className="font-display text-5xl text-white mb-6 uppercase tracking-tight font-extrabold leading-none">
          Have an idea? <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#60de8c] to-[#30b568] font-black uppercase">let's talk</span>
        </h1>
        <p className="font-sans text-sm text-[#b0b4bd] leading-relaxed font-light">
          We collaborate with visionary stakeholders to engineer high-performance solutions. Initiate a secure channel to discuss your technical parameters.
        </p>
      </div>

      {/* Bento Grid Form & Info Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-7xl mx-auto">
        
        {/* Contact Form */}
        <div className="lg:col-span-7 bg-[#0a0a0a] rounded-none p-8 md:p-12 border border-white/10 hover:border-[#60de8c]/20 duration-500 relative overflow-hidden group">
          <h2 className="font-display text-xl font-bold uppercase tracking-wide text-white mb-8 relative z-10">Transmit Message</h2>
          
          {status === "success" ? (
            <div className="flex flex-col items-center justify-center py-12 text-center relative z-10">
              <CheckCircle2 className="w-16 h-16 text-[#60de8c] mb-4 animate-pulse" />
              <h3 className="font-display uppercase tracking-tight font-extrabold text-2xl text-white mb-2">Sequence Confirmed</h3>
              <p className="font-sans text-xs sm:text-sm text-[#b0b4bd] max-w-sm leading-relaxed font-light">
                Your message transmission sequence has been established. Our team will review and respond to your secure line shortly.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-mono">
                <div className="space-y-2">
                  <label htmlFor="designator" className="block text-[9px] text-[#b0b4bd] uppercase tracking-widest font-bold">
                    Name Designator
                  </label>
                  <input
                    type="text"
                    id="designator"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="E.g., Dr. Aris Thorne"
                    className="w-full bg-[#050505] border border-white/10 rounded-none px-4 py-3 text-white font-sans text-sm focus:outline-none focus:border-[#60de8c] focus:ring-1 focus:ring-[#60de8c]/35 transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="secure-comms" className="block text-[9px] text-[#b0b4bd] uppercase tracking-widest font-bold">
                    Secure Comms (Email)
                  </label>
                  <input
                    type="email"
                    id="secure-comms"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="aris@nexus.net"
                    className="w-full bg-[#050505] border border-white/10 rounded-none px-4 py-3 text-white font-sans text-sm focus:outline-none focus:border-[#60de8c] focus:ring-1 focus:ring-[#60de8c]/35 transition-all"
                  />
                </div>
              </div>

              <div className="space-y-2 font-mono">
                <label htmlFor="params" className="block text-[9px] text-[#b0b4bd] uppercase tracking-widest font-bold">
                  Project Parameters
                </label>
                <textarea
                  id="params"
                  required
                  rows={5}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Detail your operational requirements..."
                  className="w-full bg-[#050505] border border-white/10 rounded-none px-4 py-3 text-white font-sans text-sm focus:outline-none focus:border-[#60de8c] focus:ring-1 focus:ring-[#60de8c]/35 resize-none transition-all"
                />
              </div>

              <button
                type="submit"
                disabled={status === "submitting"}
                id="submit-contact-btn"
                className={`mt-4 w-full md:w-auto bg-[#60de8c] hover:bg-[#30b568] text-black font-sans text-xs tracking-widest font-bold uppercase px-8 py-4 rounded-none flex items-center justify-center gap-2 duration-300 transform active:scale-95 transition-all ${
                  status === "submitting" ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {status === "submitting" ? (
                  <>
                    <Radar className="w-4 h-4 animate-spin text-black" />
                    <span>Transmitting...</span>
                  </>
                ) : (
                  <>
                    <span>Initialize Sequence</span>
                    <Send className="w-4 h-4 text-black" />
                  </>
                )}
              </button>
            </form>
          )}
        </div>

        {/* Info Column */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          
          {/* Direct Channels */}
          <div className="bg-[#0a0a0a] rounded-none p-8 border border-white/10 hover:border-[#60de8c]/10 flex-grow transition-all">
            <h3 className="font-display uppercase tracking-wider text-sm text-white mb-6 flex items-center gap-3 font-semibold">
              <Radar className="text-[#60de8c] w-5 h-5 animate-pulse" />
              <span>Direct Channels</span>
            </h3>
            <ul className="space-y-6">
              <li className="flex items-start gap-4">
                <Mail className="text-[#b0b4bd] w-5 h-5 mt-1" />
                <div>
                  <p className="font-mono text-[9px] text-[#b0b4bd] uppercase tracking-widest mb-1 font-bold">Primary Inbox</p>
                  <a href="mailto:axenovalabs@gmail.com" className="font-sans text-sm text-[#eeeeee] hover:text-[#60de8c] transition-colors">
                    axenovalabs@gmail.com
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <Globe className="text-[#b0b4bd] w-5 h-5 mt-1" />
                <div>
                  <p className="font-mono text-[9px] text-[#b0b4bd] uppercase tracking-widest mb-1 font-bold">Digital Nexus</p>
                  <span className="font-sans text-sm text-[#eeeeee]">
                    axenovagroup.com
                  </span>
                </div>
              </li>
            </ul>
          </div>

          {/* Location Representing India */}
          <div className="bg-[#0a0a0a] rounded-none p-8 border border-white/10 hover:border-[#60de8c]/10 h-48 relative overflow-hidden flex items-end transition-all">
            <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: "radial-gradient(#60de8c 1px, transparent 1px)", backgroundSize: "20px 20px" }}></div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] to-transparent"></div>
            <div className="relative z-10 w-full flex justify-between items-end">
              <div>
                <p className="font-mono text-[9px] text-[#b0b4bd] uppercase tracking-widest mb-1 font-bold">Sector Code</p>
                <h4 className="font-display uppercase tracking-tight font-extrabold text-2xl text-white">India</h4>
              </div>
              <MapPin className="text-[#60de8c] w-8 h-8 animate-bounce" />
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
