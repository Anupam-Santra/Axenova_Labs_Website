import React from "react";
import { ArrowUpRight } from "lucide-react";

export const BlogTab: React.FC = () => {
  return (
    <div className="relative pt-24 pb-16 bg-[#050505]">
      {/* Background Glow */}
      <div className="glow-green absolute w-[600px] h-[600px] top-[10%] right-[-200px] opacity-20 blur-[110px] pointer-events-none rounded-full" />

      {/* Header section */}
      <header className="mb-20">
        <span className="text-[10px] uppercase tracking-[0.4em] text-[#60de8c] font-mono font-bold block mb-3">
          Lab Publications
        </span>
        <h1 className="font-display text-5xl text-white mb-6 uppercase tracking-tight font-extrabold">
          Insights from the <span className="text-[#60de8c] uppercase">lab</span>
        </h1>
        <p className="font-sans text-sm text-[#b0b4bd] max-w-2xl mt-4 font-light">
          Deep dives into our system architecture, product strategy, and the future of technologies we are building at Axenova.
        </p>
      </header>

      {/* Grid articles */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {[
          {
            tag: "EdTech",
            title: "Why We're Building CareerNest",
            desc: "A look into the fragmented education market and how CareerNest aims to unify learning paths with actionable career outcomes."
          },
          {
            tag: "Safety Tech",
            title: "Offline Maps in 2026 — Why Taraa Exists",
            desc: "Connectivity isn't guaranteed everywhere. Exploring the critical infrastructure needs that drive Taraa's offline-first mapping architecture."
          },
          {
            tag: "MedTech",
            title: "AI in Medical Imaging — The LumenDx Vision",
            desc: "How computer vision and machine learning are transforming diagnostics, and LumenDx's approach to accurate, high-speed anomaly detection."
          }
        ].map((article, index) => (
          <article
            key={index}
            className="bg-[#0a0a0a] p-8 rounded-none border border-white/10 hover:border-[#60de8c]/30 transition-all duration-300 group flex flex-col justify-between h-full cursor-pointer"
          >
            <div>
              <div className="mb-6 flex justify-between items-start">
                <span className="inline-block px-3 py-1 rounded-none bg-white/5 border border-white/10 font-mono text-[9px] text-white uppercase tracking-widest font-bold">
                  {article.tag}
                </span>
                <ArrowUpRight className="text-[#60de8c] opacity-0 group-hover:opacity-100 transition-opacity duration-300 w-5 h-5" />
              </div>
              <h2 className="font-display uppercase tracking-tight font-extrabold text-lg text-white mb-4 group-hover:text-[#60de8c] transition-colors">
                {article.title}
              </h2>
              <p className="font-sans text-xs sm:text-sm text-[#b0b4bd] leading-relaxed max-w-md font-light">
                {article.desc}
              </p>
            </div>
            <div className="mt-8 pt-6 border-t border-white/10">
              <span className="inline-flex items-center gap-2 font-mono text-[10px] tracking-widest text-[#60de8c] uppercase font-bold">
                Read Publication
              </span>
            </div>
          </article>
        ))}

        {/* Large Highlighted Wide Article: BYOK + Credits (spans 2 cols) */}
        <article className="bg-[#0a0a0a] p-8 rounded-none border border-white/10 hover:border-[#60de8c]/30 transition-all duration-300 group lg:col-span-2 flex flex-col justify-between cursor-pointer">
          <div>
            <div className="mb-6 flex justify-between items-start">
              <span className="inline-block px-3 py-1 rounded-none bg-white/5 border border-white/10 font-mono text-[9px] text-white uppercase tracking-widest font-bold">
                AI Platform
              </span>
              <ArrowUpRight className="text-[#60de8c] opacity-0 group-hover:opacity-100 transition-opacity duration-300 w-5 h-5" />
            </div>

            <div className="flex flex-col md:flex-row gap-8">
              <div className="flex-1">
                <h2 className="font-display uppercase tracking-tight font-extrabold text-2xl text-white mb-4 group-hover:text-[#60de8c] transition-colors leading-tight">
                  BYOK &amp; Caching Frameworks: The Engineering Behind Xplore AI
                </h2>
                <p className="font-sans text-xs sm:text-sm text-[#b0b4bd] leading-relaxed mb-6 font-light">
                  A deep technical dive into the dual-model system powering Xplore AI. We break down the challenges of implementing Bring Your Own Key systems alongside robust quantitative model caching for lightning-fast container scaling.
                </p>
                <span className="inline-flex items-center gap-2 font-mono text-[10px] tracking-widest text-[#60de8c] uppercase font-bold">
                  Read Publication
                </span>
              </div>
              <div className="hidden md:block w-1/3 bg-[#050505] rounded-none relative overflow-hidden min-h-[140px] border border-white/10">
                <div className="absolute inset-0 bg-gradient-to-br from-[#60de8c]/20 to-transparent mix-blend-overlay"></div>
                {/* Abstract graphic */}
                <div 
                  className="w-full h-full grayscale opacity-60 group-hover:opacity-80 transition-opacity duration-500 bg-cover bg-center"
                  style={{
                    backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuD-3a3g2og_XVB1Jwm1qcv3hisCa8r9Mzn1tRqGM8GIk1lb7PjBY7ELRkKuH9wAdbmTj0cY8x9V-rNAFmP_nX6VFrTyb-OKpYoXyzDEKMWF21P-ttYfecSsWKbReFZQ98DMfhmoc3cLamH7SsNdqB1DmSa8Zk53GyHXu633M0sPDYl1zB_kcaSt3eJrpx6pRM9dG7PHmMzNmVKYPQ3GQCMOc5Tf_qbJx5uqjYjCb3Xe6iebODUrf6lGaWZBTTDhrbocBoJQ_EnLk653')"
                  }}
                />
              </div>
            </div>
          </div>
        </article>

        {/* Article 5 */}
        <article className="bg-[#0a0a0a] p-8 rounded-none border border-white/10 hover:border-[#60de8c]/30 transition-all duration-300 group flex flex-col justify-between h-full cursor-pointer">
          <div>
            <div className="mb-6 flex justify-between items-start">
              <span className="inline-block px-3 py-1 rounded-none bg-white/5 border border-white/10 font-mono text-[9px] text-white uppercase tracking-widest font-bold">
                Company
              </span>
              <ArrowUpRight className="text-[#60de8c] opacity-0 group-hover:opacity-100 transition-opacity duration-300 w-5 h-5" />
            </div>
            <h2 className="font-display uppercase tracking-tight font-extrabold text-lg text-white mb-4 group-hover:text-[#60de8c] transition-colors">
              MVP-First: Ships Products Instantly
            </h2>
            <p className="font-sans text-xs sm:text-sm text-[#b0b4bd] leading-relaxed max-w-md font-light">
              Our internal methodology for rapid prototyping, quick validation, and moving from zero to launch speed without getting bogged down in unneeded scope.
            </p>
          </div>
          <div className="mt-8 pt-6 border-t border-white/10">
            <span className="inline-flex items-center gap-2 font-mono text-[10px] tracking-widest text-[#60de8c] uppercase font-bold">
              Read Publication
            </span>
          </div>
        </article>

        {/* Article 6 */}
        <article className="bg-[#0a0a0a] p-8 rounded-none border border-white/10 hover:border-[#60de8c]/30 transition-all duration-300 group flex flex-col justify-between h-full cursor-pointer">
          <div>
            <div className="mb-6 flex justify-between items-start">
              <span className="inline-block px-3 py-1 rounded-none bg-white/5 border border-white/10 font-mono text-[9px] text-white uppercase tracking-widest font-bold">
                Strategy
              </span>
              <ArrowUpRight className="text-[#60de8c] opacity-0 group-hover:opacity-100 transition-opacity duration-300 w-5 h-5" />
            </div>
            <h2 className="font-display uppercase tracking-tight font-extrabold text-lg text-white mb-4 group-hover:text-[#60de8c] transition-colors">
              Crucible Strategy: Why We Scale Fast
            </h2>
            <p className="font-sans text-xs sm:text-sm text-[#b0b4bd] leading-relaxed max-w-md font-light">
              Building for extreme conditions requires unique constraints. Why India serves as the ultimate crucible for our enterprise digital solutions.
            </p>
          </div>
          <div className="mt-8 pt-6 border-t border-white/10">
            <span className="inline-flex items-center gap-2 font-mono text-[10px] tracking-widest text-[#60de8c] uppercase font-bold">
              Read Publication
            </span>
          </div>
        </article>
      </div>
    </div>
  );
};
