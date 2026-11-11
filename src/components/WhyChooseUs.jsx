import React from 'react';
import { Sliders, Compass, Zap, TrendingUp, ShieldCheck } from 'lucide-react';

export default function WhyChooseUs() {
  const pillars = [
    {
      number: '01',
      title: 'Tailored Solutions',
      statement: 'Every business is different. Your digital solution should reflect that.',
      detail: 'We build systems designed around your workflow, your customers, and your specific commercial requirements—never cookie-cutter templates.',
      icon: Sliders
    },
    {
      number: '02',
      title: 'Design With Purpose',
      statement: 'We combine visual quality with intuitive experiences and practical business goals.',
      detail: 'Aesthetics should elevate your brand credibility and guide visitors toward clear, decisive actions that convert.',
      icon: Compass
    },
    {
      number: '03',
      title: 'Built for Performance',
      statement: 'Responsive experiences, clean architecture, and attention to the details that matter.',
      detail: 'Lightning-fast load speeds, accessible typography, strict mobile ergonomics, and lean engineering without bloated dependencies.',
      icon: Zap
    },
    {
      number: '04',
      title: 'Room to Grow',
      statement: 'Digital solutions designed with your future needs in mind.',
      detail: 'Modular architecture allowing your digital footprint to expand seamlessly into custom software, client portals, and automated workflows as your business scales.',
      icon: TrendingUp
    }
  ];

  return (
    <section id="why-us" className="py-24 lg:py-32 relative bg-[#0B1730]/40 border-t border-white/5 overflow-hidden">
      {/* Background Accent Glow */}
      <div className="absolute top-1/2 right-1/4 w-[600px] h-[400px] bg-[#00D5FF]/8 blur-[160px] pointer-events-none rounded-full"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16 lg:mb-20">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#101F35] border border-[#087CFF]/30 text-xs font-semibold text-[#00D5FF]">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>The RydenTec Standard</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Technology Is Powerful. <br className="hidden sm:inline" />
            <span className="gradient-text">The Right Partner Makes It Valuable.</span>
          </h2>
        </div>

        {/* 4 Visual Blocks Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {pillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.number}
                className="group relative rounded-2xl bg-[#101F35]/70 border border-white/10 p-8 sm:p-10 hover:border-[#087CFF]/50 hover:bg-[#101F35]/95 transition-all duration-300 backdrop-blur-xl flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-xl bg-[#07111F] border border-[#087CFF]/20 flex items-center justify-center text-[#00D5FF] group-hover:border-[#00D5FF]/50 transition-colors">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-2xl font-black font-mono text-[#A8B5C7]/30 group-hover:text-[#00D5FF]/40 transition-colors">
                      {pillar.number}
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold text-white tracking-tight mb-2 group-hover:text-[#00D5FF] transition-colors">
                    {pillar.title}
                  </h3>

                  <p className="text-base font-semibold text-white/90 leading-snug mb-3">
                    &ldquo;{pillar.statement}&rdquo;
                  </p>

                  <p className="text-sm text-[#A8B5C7] leading-relaxed">
                    {pillar.detail}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-white/5 flex items-center space-x-2 text-xs font-semibold text-[#087CFF] group-hover:text-[#00D5FF] transition-colors">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00D5FF]"></span>
                  <span>Uncompromised Commercial Integrity</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
