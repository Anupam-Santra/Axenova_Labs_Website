import React from "react";
import { UserSession } from "../types";

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  session: UserSession | null;
  onSignOut: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  session,
  onSignOut
}) => {
  return (
    <header className="fixed top-0 w-full z-50 bg-[#050505]/90 backdrop-blur-md border-b border-white/10">
      <div className="flex justify-between items-center px-6 md:px-16 py-4 max-w-7xl mx-auto">
        {/* Brand Logo */}
        <div 
          className="font-display text-lg text-white tracking-widest cursor-pointer flex items-center font-bold uppercase"
          onClick={() => setActiveTab("home")}
          id="brand-logo"
        >
          <span>Axenova Labs</span>
        </div>

        {/* Navigation Links */}
        <nav className="hidden md:flex gap-8 items-center text-xs font-sans tracking-widest uppercase">
          {[
            { id: "home", label: "Home" },
            { id: "about", label: "About" },
            { id: "services", label: "Services" },
            { id: "portfolio", label: "Portfolio" },
            { id: "blog", label: "Blog" },
            { id: "contact", label: "Contact" }
          ].map((item) => (
            <button
               key={item.id}
               onClick={() => setActiveTab(item.id)}
               className={`transition-colors duration-300 font-medium tracking-widest ${
                 activeTab === item.id 
                   ? "text-[#60de8c] font-semibold" 
                   : "text-[#b0b4bd] hover:text-[#60de8c]"
               }`}
               id={`nav-link-${item.id}`}
             >
               {item.label}
             </button>
          ))}
        </nav>

        {/* Call to Actions / User Avatar */}
        <div className="flex items-center gap-4">
          {session ? (
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-full py-1.5 pl-2 pr-4">
                <img 
                  src={session.picture} 
                  alt={session.name} 
                  referrerPolicy="no-referrer"
                  className="w-6 h-6 rounded-full object-cover border-[#60de8c]/30 border"
                  id="user-avatar"
                />
                <span className="text-xs font-sans text-[#eeeeee] font-medium hidden sm:inline" id="user-display-name">
                  {session.name}
                </span>
              </div>
              <button
                onClick={onSignOut}
                id="header-signout-btn"
                className="text-xs font-sans tracking-widest uppercase font-semibold text-[#b0b4bd] border border-white/10 hover:border-[#60de8c] hover:text-white px-4 py-2 rounded-full transition-all duration-300 active:scale-95"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <button
              onClick={() => setActiveTab("apply")}
              id="header-apply-btn"
              className="bg-white hover:bg-neutral-200 text-black font-sans font-bold text-xs tracking-widest uppercase px-6 py-2.5 rounded-none transition-all duration-300 hover:scale-105 active:opacity-80"
            >
              Apply Now
            </button>
          )}

          {/* Special Admin/Developer Debug Tab indicator */}
          <button
            onClick={() => setActiveTab("debug")}
            id="header-debug-btn"
            className={`border border-[#60de8c]/20 px-2.5 py-1 rounded text-[10px] font-mono leading-none tracking-tight transition-colors ${
              activeTab === "debug" 
                ? "bg-[#60de8c]/20 text-[#60de8c] border-[#60de8c]" 
                : "text-[#60de8c]/60 hover:text-[#60de8c] hover:bg-[#60de8c]/5"
            }`}
          >
            DEBUG HUB
          </button>
        </div>
      </div>
    </header>
  );
};
