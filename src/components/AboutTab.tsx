import React from "react";
import { Cpu, Layers, Link2, HeartPulse } from "lucide-react";

export const AboutTab: React.FC = () => {
  return (
    <div className="relative pt-24 pb-16 bg-[#050505]">
      {/* Background Glows */}
      <div className="glow-purple absolute w-[800px] h-[800px] top-[-20%] left-[-10%] opacity-20 blur-[120px] pointer-events-none rounded-full" />
      <div className="glow-green absolute w-[600px] h-[600px] top-[40%] right-[-10%] opacity-25 blur-[100px] pointer-events-none rounded-full" />

      {/* Hero Header */}
      <section className="flex flex-col items-center justify-center text-center py-16 gap-4 max-w-5xl mx-auto">
        <div className="inline-flex items-center justify-center px-4 py-1.5 rounded-none border border-white/10 bg-white/5 text-[#b0b4bd] font-sans text-[10px] uppercase tracking-widest leading-none mb-4">
          Product Studio &amp; Publishing Platform
        </div>
        <h1 className="font-display text-5xl sm:text-6xl md:text-7xl text-white tracking-tighter leading-none max-w-4xl uppercase font-extrabold">
          We are <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#60de8c] to-[#30b568] font-black uppercase">
            Axenova Labs
          </span>
        </h1>
        <p className="font-sans text-[#b0b4bd] text-sm md:text-base max-w-[650px] mt-6 leading-relaxed font-light">
          We build, scale, and publish high-fidelity digital platforms. Operating at the intersection of bleeding-edge technical intelligence and fine micro-interactions.
        </p>
      </section>

      {/* Mission & Vision */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-12 py-20 border-y border-white/10 max-w-7xl mx-auto my-12">
        <div className="flex flex-col gap-6 pr-0 md:pr-12">
          <span className="font-sans text-[11px] font-semibold text-[#60de8c] uppercase tracking-widest leading-none">
            Our Mission
          </span>
          <h2 className="font-display uppercase tracking-tight font-extrabold text-2xl text-white leading-snug">
            To accelerate the adoption of transformative intelligence.
          </h2>
          <p className="text-[#b0b4bd] font-sans text-xs sm:text-sm leading-relaxed font-light">
            We believe the next paradigm shift isn't just about faster compute—it's about how elegantly complex systems can integrate into daily workflows. We engineer platforms that make advanced AI invisible, intuitive, and immensely powerful.
          </p>
        </div>
        <div className="flex flex-col gap-6 pl-0 md:pl-12 md:border-l border-white/10 mt-12 md:mt-0">
          <span className="font-sans text-[11px] font-semibold text-[#60de8c] uppercase tracking-widest leading-none">
            Our Vision
          </span>
          <h2 className="font-display uppercase tracking-tight font-extrabold text-2xl text-white leading-snug">
            A frictionless future engineered today.
          </h2>
          <p className="text-[#b0b4bd] font-sans text-xs sm:text-sm leading-relaxed font-light">
            Our lab is designed to be a crucible for innovation, turning speculative research into tangible products that redefine industries, specifically targeting sectors where precision and empathy matter most.
          </p>
        </div>
      </section>

      {/* Core Competencies Bento Grid */}
      <section className="flex flex-col gap-12 pt-8 max-w-7xl mx-auto">
        <div className="flex flex-col gap-4">
          <span className="text-[10px] uppercase tracking-[0.3em] text-[#60de8c] font-mono font-bold block">EXPERTISe</span>
          <h3 className="font-display uppercase text-3xl text-white font-extrabold">Core Competencies</h3>
          <p className="text-[#b0b4bd] font-sans text-xs sm:text-sm max-w-lg leading-relaxed font-light">
            Our technical foundations allow us to move from ideation to production-grade deployment with surgical precision.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1: AI/ML */}
          <div className="bg-[#0a0a0a] rounded-none p-8 flex flex-col gap-6 h-full col-span-1 md:col-span-2 relative overflow-hidden group border border-white/10 hover:border-[#60de8c]/40 transition-all duration-300">
            <div className="w-12 h-12 rounded-none bg-white/5 border border-white/10 flex items-center justify-center text-[#60de8c] group-hover:bg-[#050505] transition-colors">
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-display text-lg font-bold text-white mb-2">AI / ML Integration</h4>
              <p className="text-[#b0b4bd] font-sans text-xs sm:text-sm leading-relaxed font-light">
                Deep expertise in Large Language Models, generative networks, and predictive systems. We construct pipelines that are secure, scalable, and tailored to proprietary datasets.
              </p>
            </div>
          </div>

          {/* Card 2: Full Stack */}
          <div className="bg-[#0a0a0a] rounded-none p-8 flex flex-col gap-6 h-full border border-white/10 hover:border-[#60de8c]/40 transition-all duration-300 group">
            <div className="w-12 h-12 rounded-none bg-white/5 border border-white/10 flex items-center justify-center text-[#60de8c] group-hover:bg-[#050505] transition-colors">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-display text-lg font-bold text-white mb-2">Full-Stack Architecture</h4>
              <p className="text-[#b0b4bd] font-sans text-xs sm:text-sm leading-relaxed font-light">
                From bare-metal server optimization to fluid, reactive front-end interfaces, we oversee the entire vertical slice of product development.
              </p>
            </div>
          </div>

          {/* Card 3: API Ecosystem */}
          <div className="bg-[#0a0a0a] rounded-none p-8 flex flex-col gap-6 h-full border border-white/10 hover:border-[#60de8c]/40 transition-all duration-300 group">
            <div className="w-12 h-12 rounded-none bg-white/5 border border-white/10 flex items-center justify-center text-[#60de8c] group-hover:bg-[#050505] transition-colors">
              <Link2 className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-display text-lg font-bold text-white mb-2">API Ecosystems</h4>
              <p className="text-[#b0b4bd] font-sans text-xs sm:text-sm leading-relaxed font-light">
                Designing robust, versioned, and hyper-performant APIs that serve as the backbone for distributed services and third-party integrations.
              </p>
            </div>
          </div>

          {/* Card 4: Domain Expertise */}
          <div className="bg-[#0a0a0a] rounded-none p-8 flex flex-col gap-6 h-full col-span-1 md:col-span-2 border border-white/10 hover:border-[#60de8c]/40 transition-all duration-300 group">
            <div className="w-12 h-12 rounded-none bg-white/5 border border-white/10 flex items-center justify-center text-[#60de8c] group-hover:bg-[#050505] transition-colors">
              <HeartPulse className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-display text-lg font-bold text-white mb-2">EdTech &amp; MedTech Expertise</h4>
              <p className="text-[#b0b4bd] font-sans text-xs sm:text-sm leading-relaxed font-light">
                Navigating complex regulatory environments and building systems that handle sensitive user data with uncompromising security, specifically within education and healthcare sectors.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Operating Principles */}
      <section className="flex flex-col items-center text-center gap-8 py-20 mt-8 max-w-7xl mx-auto">
        <h3 className="font-display uppercase tracking-tight font-extrabold text-2xl text-white">Operating Principles</h3>
        <div className="flex flex-wrap justify-center gap-3 max-w-2xl">
          {[
            "MVP-First",
            "Security by Design",
            "Radical Transparency",
            "User-Centric Architecture",
            "Continuous Deployment",
            "Zero-Trust Frameworks"
          ].map((principle) => (
            <span
              key={principle}
              className="px-5 py-2.5 rounded-none bg-white/5 border border-white/10 font-sans text-[10px] tracking-widest text-[#eeeeee] uppercase font-semibold hover:border-[#60de8c]/30 hover:text-[#60de8c] transition-colors duration-300"
            >
              {principle}
            </span>
          ))}
        </div>
      </section>

      {/* Team / Leadership */}
      <section className="flex flex-col gap-12 mt-8 max-w-7xl mx-auto">
        <div className="flex flex-col gap-4">
          <span className="text-[10px] uppercase tracking-[0.3em] text-[#60de8c] font-mono font-bold block">LAB ENGINEERS</span>
          <h3 className="font-display uppercase tracking-tight font-extrabold text-3xl text-white">Leadership</h3>
          <p className="text-[#b0b4bd] font-sans text-xs sm:text-sm leading-relaxed font-light">
            The architects behind the lab.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              name: "Sampurna Chattopadhyay",
              role: "CEO & Founder",
              color: "text-[#60de8c]",
              bio: "Sampurna oversees all creative projects, bringing his keen eye for innovation and exceptional storytelling abilities to the table.",
              imgUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBBi_sLOlhgedp8e0Ua4sUIUIZuphq6RFZIkZ22v7mHsYzSA05RoKYyzL5qSbDB4nJhwR6Nhl9_qk9ovXcLejP3_cppEj9sotKrkhe4ebNOauTC12_GJAAVKUPfXo1QTPBgTULXQuOAPMQCjXuasqWoA62zwnPvnFt3DQipL2E_SeODKMg7HlAMLLgMjdOp5k5DiswGtd4aZeRIyruSQXMOeGC75WXaaeM9X2QJYxuHl7cHVdb1x1YayRhhJB8-uhGz2OUh7lyzYAOLjFw"
            },
            {
              name: "Surojit Giri",
              role: "Co-founder & COO",
              color: "text-[#60de8c]",
              bio: "Surojit ensures that all our projects are delivered on time and within budget, making sure every project runs smoothly from start to finish.",
              imgUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuAdTEyNMRIzzK-rD-f5_xIgIFlO0ae2HQaphKNK_jvDmFI_PHoPh1XQg-lLRIhN8-zt-fU3wfT3_QMgLPsjTonhc1qtOrQITkFXbG4EzS64cTQ6VpeKXflT-eszvTAh7HsugLPjjEuXBs9vWK0xzvyMRlzicp34gdVcI5J2qPRZjC2lyUy2U3HFJLuUfjx6OO7q57O5rvEoFAyYxNfriptIwFiGj3ukwr_EYQm7xEl7cj1H_jvb65INYlRpPUMcdPhKOW99Xw-V137gDp0"
            },
            {
              name: "Anupam Santra",
              role: "CTO & CDO",
              color: "text-[#60de8c]",
              bio: "Anupam is our tech guru, responsible for turning our creative visions into robust, highly functional digital solutions.",
              imgUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuDKzkOfUDxsKV_9P9baGKiLTs-Bht7Q6pGTuxE408xQMooVe2w2EVAW-ZcfjNz3N_0OYvts11QyyU7HP8ndJL3E30nVsBatHIMGoHOEJcBOzxWFV7I5GVPpiNbK3SBOmNE6kxWrbtC2EiBIiwSBs9yHCOPE1g05MPalclpu7XJ3CJtZW-3TAzGIhGbUs7oe0g5mz1jRTQ3kmqYR3Mv7QD9jP-LmgFKpqS4pWlLusPSottBB1GsNhBJA54e7fI_0BzWvFhThQ9hoTVwFt8w"
            }
          ].map((member, idx) => (
            <div
              key={idx}
              className="bg-[#0a0a0a] overflow-hidden border border-white/10 group hover:border-[#60de8c]/20 transition-all duration-300"
            >
              <div 
                className="w-full h-80 bg-zinc-950 bg-cover bg-center relative opacity-60 group-hover:opacity-80 transition-opacity duration-500 border-b border-white/10"
                style={{ backgroundImage: `url(${member.imgUrl})` }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent"></div>
              </div>
              <div className="p-8">
                <h4 className="font-display text-lg font-bold text-white mb-1">{member.name}</h4>
                <span className={`font-mono text-[9px] uppercase tracking-widest block mb-4 font-semibold ${member.color}`}>
                  {member.role}
                </span>
                <p className="text-[#b0b4bd] font-sans text-xs leading-relaxed font-light">
                  {member.bio}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
