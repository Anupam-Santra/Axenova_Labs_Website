import React from "react";
import { ArrowRight, Rocket, Store, Smartphone, Coins, Globe } from "lucide-react";

interface HomeTabProps {
  onApplyNow: () => void;
  onExploreWork: () => void;
}

export const HomeTab: React.FC<HomeTabProps> = ({ onApplyNow, onExploreWork }) => {
  return (
    <div className="relative overflow-hidden pt-24 pb-16 bg-[#050505] noise-bg">
      {/* Background Decorative Text Watermark */}
      <div className="absolute top-40 -right-20 text-[18rem] md:text-[25rem] font-black text-white/[0.01] leading-none select-none pointer-events-none transform rotate-90 font-display">
        AXEN
      </div>

      {/* Background Glows */}
      <div className="glow-green absolute w-[600px] h-[600px] top-[10%] right-[-100px] opacity-40 blur-[120px] pointer-events-none rounded-full" />
      <div className="glow-purple absolute w-[600px] h-[600px] top-[40%] left-[-200px] opacity-35 blur-[120px] pointer-events-none rounded-full" />

      {/* Hero Section */}
      <section className="min-h-[75vh] flex flex-col items-center justify-center text-center px-6 md:px-16 py-16 max-w-5xl mx-auto relative z-10 animate-fade-in">
        <span className="text-[10px] uppercase tracking-[0.4em] text-[#60de8c] font-bold mb-4 block font-mono">
          Product Studio / Axenova Labs
        </span>
        <h1 className="font-display text-5xl sm:text-6xl md:text-7xl text-white tracking-tighter leading-none mb-8" id="hero-heading">
          Where Imagination Meets <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#60de8c] to-[#30b568] font-black uppercase font-display">
            Divine Innovation
          </span>
        </h1>
        <p className="font-sans text-[#b0b4bd] text-sm md:text-base max-w-2xl leading-relaxed mb-12 font-light" id="hero-paragraph">
          Investment is yours. Work is ours. We are an AI-powered product studio building the future, engineering secure, elegant applications for high-impact teams.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <button
            onClick={onApplyNow}
            id="hero-apply-btn"
            className="px-10 py-4 border border-transparent bg-white text-black font-sans text-xs tracking-widest font-bold uppercase hover:bg-neutral-200 transition-all duration-300 hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
          >
            Apply Now <ArrowRight className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={onExploreWork}
            id="hero-explore-btn"
            className="px-10 py-4 border border-white/20 text-white font-sans text-xs tracking-widest font-bold uppercase bg-white/5 hover:bg-white/10 transition-all duration-300 hover:scale-105 active:scale-95"
          >
            Explore Work
          </button>
        </div>
      </section>

      {/* Bento Grid: Core Capabilities */}
      <section className="py-20 px-6 md:px-16 max-w-7xl mx-auto border-t border-white/10 relative z-10">
        <div className="mb-16">
          <span className="text-[10px] uppercase tracking-[0.3em] text-[#60de8c] font-mono font-bold mb-2 block">capabilities</span>
          <h2 className="font-display uppercase text-3xl md:text-4xl text-white tracking-tight font-extrabold" id="capabilities-title">Selected Mediums &amp; Systems</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Bento Large Item */}
          <div className="bg-[#0a0a0a] border border-white/10 p-8 lg:col-span-2 lg:row-span-2 flex flex-col justify-between transition-all duration-300 group hover:border-[#60de8c]/30">
            <div>
              <div className="w-12 h-12 border border-white/10 flex items-center justify-center mb-8 group-hover:border-[#60de8c]/55 transition-colors">
                <Rocket className="text-[#60de8c] w-5 h-5 transition-transform duration-500 group-hover:scale-110" />
              </div>
              <span className="text-[10px] font-mono text-[#60de8c] uppercase tracking-widest block mb-2">01 / validation</span>
              <h3 className="font-display text-2xl text-white mb-6 font-semibold" id="cap-large-title">Idea Validation &amp; MVP</h3>
              <p className="font-sans text-xs text-[#b0b4bd] leading-relaxed font-light">
                We rapidly test and validate concepts using advanced AI analytical engines, ensuring robust viability before heavy engineering starts. We craft stateful, bulletproof MVPs with clean developer handoffs and production-grade architectures.
              </p>
            </div>
            <div className="mt-8 border-t border-white/10 pt-4 text-[10px] font-mono text-white/30 uppercase tracking-widest">
              Standard Procedure 2.0
            </div>
          </div>

          {/* Bento Grid Small Card 1 */}
          <div className="bg-[#0a0a0a] border border-white/10 p-6 flex flex-col justify-between transition-all duration-300 group hover:border-[#60de8c]/30">
            <Store className="text-[#b0b4bd] group-hover:text-[#60de8c] w-6 h-6 mb-4 transition-colors" />
            <div>
              <span className="text-[10px] font-mono text-white/30 block mb-1">02 / marketing</span>
              <h4 className="font-display text-sm font-bold uppercase tracking-wider text-white mb-2" id="cap-card-1-title">App Store Listing</h4>
              <p className="font-sans text-xs text-[#b0b4bd]/80 leading-relaxed font-light">
                Premium visual assets and copy structured for iOS store index ranking and high conversion copy.
              </p>
            </div>
          </div>

          {/* Bento Grid Small Card 2 */}
          <div className="bg-[#0a0a0a] border border-white/10 p-6 flex flex-col justify-between transition-all duration-300 group hover:border-[#60de8c]/30">
            <Smartphone className="text-[#b0b4bd] group-hover:text-[#60de8c] w-6 h-6 mb-4 transition-colors" />
            <div>
              <span className="text-[10px] font-mono text-white/30 block mb-1">03 / play store</span>
              <h4 className="font-display text-sm font-bold uppercase tracking-wider text-white mb-2" id="cap-card-2-title">Google Play Entry</h4>
              <p className="font-sans text-xs text-[#b0b4bd]/80 leading-relaxed font-light">
                Highly optimized keywords and analytical schema for rapid Android market deployment.
              </p>
            </div>
          </div>

          {/* Bento Grid Small Card 3 */}
          <div className="bg-[#0a0a0a] border border-white/10 p-6 flex flex-col justify-between transition-all duration-300 group hover:border-[#60de8c]/30">
            <Coins className="text-[#b0b4bd] group-hover:text-[#60de8c] w-6 h-6 mb-4 transition-colors" />
            <div>
              <span className="text-[10px] font-mono text-white/30 block mb-1">04 / venture</span>
              <h4 className="font-display text-sm font-bold uppercase tracking-wider text-white mb-2" id="cap-card-3-title">Funding Support</h4>
              <p className="font-sans text-xs text-[#b0b4bd]/80 leading-relaxed font-light">
                Premium Pitch Deck creation, investor demo pipelines, and validated tech vetting.
              </p>
            </div>
          </div>

          {/* Bento Grid Small Card 4 */}
          <div className="bg-[#0a0a0a] border border-white/10 p-6 flex flex-col justify-between transition-all duration-300 group hover:border-[#60de8c]/30">
            <Globe className="text-[#b0b4bd] group-hover:text-[#60de8c] w-6 h-6 mb-4 transition-colors" />
            <div>
              <span className="text-[10px] font-mono text-white/30 block mb-1">05 / localization</span>
              <h4 className="font-display text-sm font-bold uppercase tracking-wider text-white mb-2" id="cap-card-4-title">Global Experience</h4>
              <p className="font-sans text-xs text-[#b0b4bd]/80 leading-relaxed font-light">
                High fidelity localization setups with strict geographical adaptation modules.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Work Gallery */}
      <section className="py-20 px-6 md:px-16 max-w-7xl mx-auto border-t border-white/10 relative z-10">
        <div className="flex justify-between items-end mb-16">
          <div>
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#60de8c] font-mono font-bold mb-2 block font-medium">our works</span>
            <h2 className="font-display uppercase text-3xl md:text-4xl text-white tracking-tight font-extrabold" id="work-title">Featured Creations</h2>
          </div>
          <button
            onClick={onExploreWork}
            id="work-explore-link-btn"
            className="text-xs font-semibold tracking-[0.2em] text-[#60de8c] hover:text-white uppercase flex items-center gap-1.5 transition-colors border-b border-[#60de8c]/30 pb-0.5"
          >
            Explore Portfolio <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Featured Cards */}
          {[
            {
              name: "CareerNest",
              tags: ["EDTECH", "AI COUNSELLING"],
              desc: "A unified AI opportunity discovery platform designed for India's students and early-career population.",
              imgUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCHxsjuqE7m0vpvVCKOLa_H4ephPgPn8ayfZkC3TYYahjRV9q-m7qJk3aDU2GXFvIYkMyJNZQ3q_XhwVw1bN4eAkB2rmfqE1vXhges1t1EksM9qMODv2xyNPWFxVCaHjjFxVUNt2UbrQyeB1wuOJNe2wMF0oLby1SyihaePd8cti72YNSy68MBLWeQPDd-sa38XpTGqfczUb7UnGVUqqx8sFWO8RQR66HTn1YJWRD1VKjaJPRwEqc5-8Yq4wGAJkWjlJ8AnDBLrUazp"
            },
            {
              name: "Taraa",
              tags: ["SAFETY TECH", "OFFLINE MAPS"],
              desc: "Fully offline street-level mapping and active tracking framework integrated with security SOS protocols.",
              imgUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuDz9mFrM9euOFne8i317L_jas1K3k_h1V5H8kNYGL8evV8iipptTU665B2UVUmMW-j3VgsvES6gSuAVD7-_2QBhwAgwEZTCXSOBN1q9ecN4GBCwHd3kACiRlln_yR-qgsn-WLoPJfqet03SsSJUMW_fARQqqMBPniTKkRCet-bGuCEahSNkMxY0Lpl-mxqwfyAr4GdPRnMC3qkbljPQNuA730mgI_TcIShsm3YMco388o09yJjnUJ_ASwLU-On9XEVLtH_iDPiiZ_cg"
            },
            {
              name: "LumenDx",
              tags: ["MEDTECH", "AI DIAGNOSTICS"],
              desc: "Deep visual recognition system analyzing medical imagery studies to deliver precise clinic reviews.",
              imgUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBqZH3JNIK0i-NTkMBrx0nNVpYdCZ__NWgirANdR0LRekiYk7aY9YnSX7sx9YWpge0hUDvAjNnJt_PXVmZvVs9v1beRuSY7vMkqM86RWBk9aZMTRHRC9UonBuY3Q-7LG50G4nobC-ammxovkb1jjP-xQEFptjus_23zU8kC4lg3gZbbNT5rKKZAkIvXHwMAe8j6YdHfAH6c66sFDliVGdl9gtOlnkNJjdS0xH-BNeFKmJS6hpS-gYTzhFKycTkrV4ePrDmbzEtx0pVw"
            }
          ].map((project, idx) => (
            <div
              key={idx}
              className="bg-[#0a0a0a] border border-white/10 overflow-hidden group cursor-pointer transition-all duration-500 hover:border-[#60de8c]/40"
            >
              <div className="h-56 bg-zinc-950 relative overflow-hidden border-b border-white/10">
                <img
                  src={project.imgUrl}
                  alt={project.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover opacity-50 group-hover:opacity-80 group-hover:scale-105 transition-all duration-700 search-img"
                />
              </div>
              <div className="p-6">
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {project.tags.map((tg, k) => (
                    <span key={k} className="px-2 py-0.5 rounded-none bg-[#60de8c]/10 border border-[#60de8c]/20 font-mono tracking-wider text-[9px] text-[#60de8c] font-medium uppercase">
                      {tg}
                    </span>
                  ))}
                </div>
                <h3 className="font-display text-lg font-bold text-white mb-2">{project.name}</h3>
                <p className="font-sans text-xs text-[#b0b4bd] leading-relaxed font-light">{project.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
