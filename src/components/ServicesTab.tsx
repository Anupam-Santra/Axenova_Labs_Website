import React from "react";
import { Store, Smartphone, Coins, Globe, Landmark, Eye, HeartHandshake, TrendingUp, Sparkles, Code } from "lucide-react";

export const ServicesTab: React.FC = () => {
  return (
    <div className="relative pt-24 pb-16 bg-[#050505]">
      {/* Background Glows */}
      <div className="glow-green absolute w-[500px] h-[500px] top-[-100px] left-[-200px] opacity-25 blur-[100px] pointer-events-none rounded-full" />
      <div className="glow-purple absolute w-[600px] h-[600px] bottom-[-200px] right-[-200px] opacity-20 blur-[130px] pointer-events-none rounded-full" />

      {/* Hero Header */}
      <header className="mb-20 text-center max-w-3xl mx-auto">
        <span className="text-[10px] uppercase tracking-[0.4em] text-[#60de8c] font-bold mb-3 block font-mono">
          Services &amp; Capabilities
        </span>
        <h1 className="font-display text-5xl text-white mb-6 uppercase tracking-tight font-extrabold animate-fade-in" id="services-tab-title">
          Selected <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#60de8c] to-[#30b568] font-black uppercase">Capabilities</span>
        </h1>
        <p className="font-sans text-sm text-[#b0b4bd] font-light max-w-xl mx-auto" id="services-tab-subtitle">
          Investment is yours. Work is ours. Our focus is rapid validation and zero-compromise secure engineering.
        </p>
      </header>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {[
          {
            icon: <Smartphone className="text-[#60de8c] w-5 h-5" />,
            title: "Play Store Listing",
            desc: "Dominate the Android ecosystem. We engineer highly optimized, algorithm-friendly listings that convert casual browsers into loyal active users."
          },
          {
            icon: <Store className="text-[#60de8c] w-5 h-5" />,
            title: "App Store Listing",
            desc: "Master iOS algorithms and captivate Apple users with premium visual assets, compelling copy, and strategic keyword placement."
          },
          {
            icon: <Coins className="text-[#60de8c] w-5 h-5" />,
            title: "Funding Support",
            desc: "Connect with top-tier VCs and secure your runway. We leverage our network to position your product in front of the right investors."
          },
          {
            icon: <Globe className="text-[#60de8c] w-5 h-5" />,
            title: "World Experience",
            desc: "Global scaling strategies and localization. We adapt your product for international markets, ensuring cultural resonance and compliance."
          },
          {
            icon: <Landmark className="text-[#60de8c] w-5 h-5" />,
            title: "Reviews Management",
            desc: "Cultivate brand reputation. We actively manage user feedback, turning critical reviews into product iterations and positive PR."
          },
          {
            icon: <Eye className="text-[#60de8c] w-5 h-5" />,
            title: "Idea Validation",
            desc: "Rigorous market testing before writing a single line of code. We deploy quantitative frameworks to prove your concept's viability."
          },
          {
            icon: <HeartHandshake className="text-[#60de8c] w-5 h-5" />,
            title: "Investor Pitch Prep",
            desc: "Crafting compelling narratives and flawless pitch decks. We distill complex technical visions into persuasive, high-stakes presentations."
          },
          {
            icon: <TrendingUp className="text-[#60de8c] w-5 h-5" />,
            title: "Financial Guidance",
            desc: "Strategic modeling and runway optimization. Our quantitative analysts provide robust frameworks for sustainable, aggressive growth."
          },
          {
            icon: <Sparkles className="text-[#60de8c] w-5 h-5" />,
            title: "Marketing Strategy",
            desc: "High-impact growth campaigns and user acquisition. We engineer viral loops and targeted distribution channels to scale your user base."
          }
        ].map((srv, index) => (
          <div
            key={index}
            className="bg-[#0a0a0a] rounded-none p-8 border border-white/10 hover:border-[#60de8c]/30 transition-all duration-300 group flex flex-col h-full relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-[2px] bg-[#60de8c] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
            <div className="mb-6 w-11 h-11 rounded-none bg-white/5 flex items-center justify-center border border-white/10 group-hover:bg-[#050505] group-hover:border-[#60de8c]/30 transition-colors">
              {srv.icon}
            </div>
            <h3 className="font-display text-lg font-bold uppercase tracking-wide text-white mb-4">{srv.title}</h3>
            <p className="font-sans text-xs sm:text-sm text-[#b0b4bd] leading-relaxed font-light">
              {srv.desc}
            </p>
          </div>
        ))}

        {/* Highlighted Full Width Development Card */}
        <div className="bg-[#0a0a0a] rounded-none p-8 border border-white/10 hover:border-[#60de8c]/30 transition-all duration-300 group flex flex-col md:flex-row items-start md:items-center gap-8 h-full relative overflow-hidden md:col-span-2 lg:col-span-3">
          <div className="absolute top-0 left-0 w-full h-[2px] bg-[#60de8c] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
          <div className="w-16 h-16 shrink-0 rounded-none bg-white/5 border border-white/10 flex items-center justify-center text-[#60de8c] group-hover:bg-[#050505] group-hover:border-[#60de8c]/30 transition-colors">
            <Code className="text-[#60de8c] w-8 h-8" />
          </div>
          <div>
            <h3 className="font-display text-xl font-bold uppercase text-[#60de8c] mb-2">Technical Delivery</h3>
            <p className="font-sans text-xs sm:text-sm text-[#b0b4bd] leading-relaxed max-w-4xl font-light">
              Bleeding-edge technical execution. Our engineering core builds secure, containerized architectures ready for intense scale and rapid iteration. We don't just build apps; we forge structural digital infrastructure.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
