import React from "react";

interface FooterProps {
  setActiveTab: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ setActiveTab }) => {
  return (
    <footer className="bg-[#020202] w-full py-16 border-t border-white/10 relative z-10">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12 px-6 md:px-16 max-w-7xl mx-auto">
        
        {/* Brand Section */}
        <div className="md:col-span-2 flex flex-col gap-4">
          <div 
            onClick={() => setActiveTab("home")} 
            className="font-display text-lg text-white font-bold uppercase tracking-widest cursor-pointer flex items-center gap-2"
            id="footer-logo"
          >
            <div className="w-5 h-5 bg-white flex items-center justify-center">
              <div className="w-2.5 h-2.5 bg-black rotate-45"></div>
            </div>
            Axenova Labs
          </div>
          <p className="font-sans text-xs text-[#b0b4bd]/80 max-w-sm leading-relaxed" id="footer-bio">
            © {new Date().getFullYear()} Axenova Labs. Investment is yours. Work is ours. India-first, security-first, MVP-first.
          </p>
          <div className="flex gap-4 mt-2">
            <a 
              className="text-xs text-[#b0b4bd] hover:text-[#60de8c] transition-colors font-medium tracking-wide" 
              href="mailto:axenovalabs@gmail.com"
              id="footer-email-link"
            >
              axenovalabs@gmail.com
            </a>
            <span className="text-white/10">•</span>
            <a 
              className="text-xs text-[#b0b4bd] hover:text-[#60de8c] transition-colors font-medium tracking-wide" 
              href="https://axenovalabs.com" 
              target="_blank" 
              rel="noopener noreferrer"
              id="footer-website-link"
            >
              axenovalabs.com
            </a>
          </div>
        </div>

        {/* Navigation Lists */}
        <div>
          <h4 className="font-sans text-xs font-semibold text-white mb-6 uppercase tracking-widest text-[#eeeeee]">
            Navigation
          </h4>
          <ul className="flex flex-col gap-4 text-xs">
            {[
              { id: "home", label: "Home" },
              { id: "about", label: "About" },
              { id: "services", label: "Services" },
              { id: "portfolio", label: "Portfolio" }
            ].map((link) => (
              <li key={link.id}>
                <button 
                  onClick={() => setActiveTab(link.id)} 
                  className="text-[#b0b4bd] hover:text-[#60de8c] hover:underline transition-colors cursor-pointer text-left uppercase tracking-wider text-[11px]"
                  id={`footer-nav-${link.id}`}
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Resources / Contact Column */}
        <div>
          <h4 className="font-sans text-xs font-semibold text-white mb-6 uppercase tracking-widest text-[#eeeeee]">
            Resources
          </h4>
          <ul className="flex flex-col gap-4 text-xs">
            <li>
              <button 
                onClick={() => setActiveTab("blog")} 
                className="text-[#b0b4bd] hover:text-[#60de8c] hover:underline transition-colors uppercase tracking-wider text-[11px]"
                id="footer-nav-blog"
              >
                Blog
              </button>
            </li>
            <li>
              <button 
                onClick={() => setActiveTab("contact")} 
                className="text-[#b0b4bd] hover:text-[#60de8c] hover:underline transition-colors uppercase tracking-wider text-[11px]"
                id="footer-nav-contact"
              >
                Contact
              </button>
            </li>
          </ul>
        </div>

      </div>
    </footer>
  );
};
