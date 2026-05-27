import React from "react";
import { Compass, Map, Activity, Bot, Radio, ArrowRight } from "lucide-react";

export const PortfolioTab: React.FC = () => {
  return (
    <div className="relative pt-24 pb-16 bg-[#050505]">
      {/* Background Glows */}
      <div className="glow-green absolute w-[400px] h-[400px] top-[10%] left-[-150px] opacity-25 blur-[100px] pointer-events-none rounded-full" />
      <div className="glow-purple absolute w-[500px] h-[500px] bottom-[10%] right-[-150px] opacity-25 blur-[120px] pointer-events-none rounded-full" />

      {/* Header section with Dynamic Status Tag */}
      <header className="mb-16 max-w-4xl">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-none border border-[#60de8c]/20 bg-[#60de8c]/5 mb-6">
          <span className="w-2 h-2 rounded-full bg-[#60de8c] animate-pulse"></span>
          <span className="font-mono text-[9px] tracking-widest font-bold text-[#60de8c] uppercase">
            Lab Status: Active Build Phase
          </span>
        </div>
        <h1 className="font-display text-5xl text-white tracking-tight uppercase font-extrabold leading-none mb-6">
          Products We Are <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#60de8c] to-[#30b568] font-black uppercase">curating</span>
        </h1>
        <p className="font-sans text-sm text-[#b0b4bd] max-w-2xl leading-relaxed font-light">
          From proof-of-concept to standard scale — India-first platforms. We engineer high-performance platforms designed to solve complex operational challenges.
        </p>
      </header>

      {/* Bento Grid layout */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 max-w-7xl mx-auto" id="portfolio-bento-grid">
        {/* CareerNest (Spans 8 cols on MD) */}
        <article className="md:col-span-8 bg-[#0a0a0a] border border-white/10 hover:border-[#60de8c]/35 rounded-none p-8 relative overflow-hidden group transition-all duration-300">
          <div className="flex flex-col gap-8 h-full justify-between relative z-10">
            <div className="flex justify-between items-start flex-wrap gap-4">
              <div className="flex items-center gap-3">
                <Compass className="text-[#60de8c] w-7 h-7" />
                <h2 className="font-display uppercase tracking-tight font-extrabold text-2xl text-white">CareerNest</h2>
              </div>
              <span className="px-3 py-1 rounded-none border border-[#60de8c]/20 bg-[#60de8c]/5 text-[#60de8c] text-[10px] uppercase tracking-widest font-mono font-medium">
                MVP Build
              </span>
            </div>

            <div>
              <p className="font-sans text-[#b0b4bd] text-xs sm:text-sm max-w-md leading-relaxed mb-6 font-light">
                Every Opportunity. One Place. We are unifying students and organizations with automated matchmaking engines.
              </p>
              
              <div className="flex flex-wrap gap-2 mb-8">
                {["EdTech", "Counsel Counselling", "Product Framework"].map(tag => (
                  <span key={tag} className="px-3 py-1 rounded-none bg-white/5 border border-white/10 text-[10px] font-mono text-[#b0b4bd]">
                    {tag}
                  </span>
                ))}
              </div>

              {/* Progress representation */}
              <div className="w-full">
                <div className="w-full h-[3px] bg-white/5 rounded-none overflow-hidden">
                  <div className="h-full bg-[#60de8c] w-[65%] rounded-none relative">
                    <div className="absolute right-0 top-0 bottom-0 w-3 bg-white/40 blur-[1px]"></div>
                  </div>
                </div>
                <div className="flex justify-between mt-2 font-mono text-[9px] tracking-widest text-[#b0b4bd]/60 uppercase">
                  <span>Concept Validation / Engine Setup</span>
                  <span>Q3 release</span>
                </div>
              </div>
            </div>
          </div>
        </article>

        {/* Taraa (Spans 4 cols on MD) */}
        <article className="md:col-span-4 bg-[#0a0a0a] border border-white/10 hover:border-[#60de8c]/35 rounded-none p-8 flex flex-col justify-between group transition-all duration-300">
          <div className="flex flex-col gap-4 relative z-10">
            <div className="flex items-center gap-3">
              <Map className="text-[#60de8c] w-7 h-7" />
              <h2 className="font-display uppercase tracking-tight font-extrabold text-2xl text-white">Taraa</h2>
            </div>
            <p className="font-sans text-xs sm:text-sm text-[#b0b4bd] leading-relaxed font-light">
              Navigate Offline. Stay Safe Always. Building tactical safety models with fast localized emergency networks.
            </p>
          </div>

          <div className="relative z-10 mt-8">
            <div className="flex flex-wrap gap-2 mb-6">
              {["Maps / Safety Tech", "Mobile"].map(tag => (
                <span key={tag} className="px-2.5 py-1 rounded-none bg-white/5 border border-white/10 text-[10px] font-mono text-[#b0b4bd]">
                  {tag}
                </span>
              ))}
            </div>

            <div className="border-t border-white/10 pt-4 flex items-center justify-between text-[#60de8c] font-mono text-[10px] tracking-widest uppercase font-medium">
              <span>In Flight</span>
              <ArrowRight className="w-4 h-4 text-[#b0b4bd]/50 group-hover:text-[#60de8c] transition-colors" />
            </div>
          </div>
        </article>

        {/* LumenDx (Spans 6 cols on MD) */}
        <article className="md:col-span-6 bg-[#0a0a0a] border border-white/10 hover:border-[#60de8c]/35 rounded-none p-8 relative overflow-hidden group transition-all duration-300">
          <div className="flex flex-col gap-6 justify-between h-full relative z-10">
            <div className="flex justify-between items-start gap-4 flex-wrap">
              <div className="flex items-center gap-3">
                <Activity className="text-[#60de8c] w-7 h-7" />
                <h2 className="font-display uppercase tracking-tight font-extrabold text-2xl text-white">LumenDx</h2>
              </div>
              <span className="px-3 py-1 rounded-none border border-[#60de8c]/20 bg-[#60de8c]/5 text-[#60de8c] text-[10px] uppercase font-mono tracking-widest">
                Prototype verification
              </span>
            </div>

            <p className="font-sans text-xs sm:text-sm text-[#b0b4bd] leading-relaxed font-light">
              Deep Medical Imaging Intelligence. Leveraging neural transformers for precision radiology review models.
            </p>

            <div>
              <div className="flex flex-wrap gap-2 mb-6">
                {["MedTech", "AI Health", "API Core"].map(tag => (
                  <span key={tag} className="px-2.5 py-1 rounded-none bg-white/5 border border-white/10 text-[10px] font-mono text-[#b0b4bd]">
                    {tag}
                  </span>
                ))}
              </div>

              {/* Progress bar */}
              <div className="w-full">
                <div className="w-full h-[3px] bg-white/5 rounded-none overflow-hidden">
                  <div className="h-full bg-[#60de8c] w-[40%] rounded-none"></div>
                </div>
                <div className="flex justify-between mt-2 font-mono text-[9px] text-[#b0b4bd]/55 tracking-[0.2em] uppercase">
                  <span>Prototype phase</span>
                  <span>40% Completeness</span>
                </div>
              </div>
            </div>
          </div>
        </article>

        {/* Xplore AI (Spans 6 cols on MD) */}
        <article className="md:col-span-6 bg-[#0a0a0a] border border-white/10 hover:border-[#60de8c]/35 rounded-none p-8 flex flex-col justify-between group transition-all duration-300">
          <div className="flex flex-col gap-4 relative z-10">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Bot className="text-[#60de8c] w-7 h-7" />
                <h2 className="font-display uppercase tracking-tight font-extrabold text-2xl text-white">Xplore AI</h2>
              </div>
              <span className="font-mono text-[9px] text-[#60de8c] border border-[#60de8c]/20 px-2.5 py-1 rounded-none uppercase bg-[#60de8c]/5 font-bold">
                Alpha
              </span>
            </div>
            <p className="font-sans text-xs sm:text-sm text-[#b0b4bd] leading-relaxed font-light">
              Every LLM Model. Unified Playground. Bring Your Own Key credentials along with modular quantitative schema configurations.
            </p>
          </div>

          <div className="mt-8 relative z-10">
            <div className="flex flex-wrap gap-2 mb-6">
              {["AI Registry", "Workspace", "API Middleware"].map(tag => (
                <span key={tag} className="px-2.5 py-1 rounded-none bg-white/5 border border-white/10 text-[10px] font-mono text-[#b0b4bd]">
                  {tag}
                </span>
              ))}
            </div>

            <div className="border-t border-white/10 pt-4 flex items-center justify-between text-xs font-sans text-[#b0b4bd]/60">
              <span className="font-mono text-[10px] tracking-widest uppercase">Target Focus: <span className="text-[#60de8c] font-bold">Q4 Validation</span></span>
            </div>
          </div>
        </article>

        {/* NEXCOM (Spans 12 cols on MD - conceptual highlight) */}
        <article className="md:col-span-12 bg-[#0a0a0a] border border-white/10 hover:border-[#60de8c]/35 rounded-none p-8 flex flex-col md:flex-row gap-8 justify-between relative overflow-hidden group transition-all duration-300">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-4">
              <Radio className="text-[#b0b4bd]/60 w-7 h-7" />
              <h2 className="font-display uppercase tracking-tight font-extrabold text-2xl text-[#b0b4bd]">NEXCOM</h2>
            </div>
            <p className="font-sans text-[#b0b4bd]/80 text-xs sm:text-sm leading-relaxed mb-6 font-light">
              Communication Beyond Connectivity. Encrypted push-to-talk custom hardware setups and secondary emergency offline network routers.
            </p>
            <div className="flex flex-wrap gap-2">
              {["CommTech", "Push-to-Talk", "Hardware Node"].map(tag => (
                <span key={tag} className="px-3 py-1 rounded-none bg-white/5 border border-white/10 text-[10px] font-mono text-[#b0b4bd]">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="shrink-0 flex flex-col items-center md:items-end justify-center min-w-[200px] border-t md:border-t-0 md:border-l border-white/10 pt-6 md:pt-0 md:pl-8">
            <div className="w-14 h-14 rounded-none border border-dashed border-[#b0b4bd]/30 flex items-center justify-center mb-4 group-hover:rotate-180 transition-transform duration-1000">
              <Radio className="text-[#b0b4bd]/40 w-5 h-5" />
            </div>
            <span className="font-mono text-[10px] font-semibold text-[#b0b4bd]/50 tracking-widest uppercase">
              Concept Phase
            </span>
          </div>
        </article>
      </div>
    </div>
  );
};
