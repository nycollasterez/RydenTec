import React from 'react';
import { 
  MessageSquare, 
  FileText, 
  Code2, 
  Rocket, 
  LifeBuoy, 
  ArrowRight,
  Sparkles
} from 'lucide-react';

export default function HowWeWork({ onStartProject }) {
  const steps = [
    {
      step: '01',
      title: 'Let\'s Talk',
      tagline: 'Discovery & Consultation',
      description: 'We learn about your business, your goals, and the challenges you want to solve.',
      icon: MessageSquare
    },
    {
      step: '02',
      title: 'Strategy & Proposal',
      tagline: 'Scope & Architecture',
      description: 'We define the project scope, recommended solution, timeline, and investment.',
      icon: FileText
    },
    {
      step: '03',
      title: 'Design & Development',
      tagline: 'Custom Execution',
      description: 'We transform the approved direction into a functional digital experience.',
      icon: Code2
    },
    {
      step: '04',
      title: 'Review & Launch',
      tagline: 'Polish & Deployment',
      description: 'We review the final details, make agreed adjustments, and prepare your project for launch.',
      icon: Rocket
    },
    {
      step: '05',
      title: 'Ongoing Support',
      tagline: 'Stability & Growth',
      description: 'Keep your digital solution running smoothly with optional support and maintenance.',
      icon: LifeBuoy
    }
  ];

  return (
    <section id="how-we-work" className="py-24 lg:py-32 relative bg-[#07111F] overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[350px] bg-[#087CFF]/10 blur-[150px] pointer-events-none rounded-full"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16 lg:mb-24">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            From Your Idea to a <span className="gradient-text">Digital Reality.</span>
          </h2>
          <p className="text-base sm:text-lg text-[#A8B5C7]">
            A clear, transparent path from initial discussion to deployed technology.
          </p>
        </div>

        {/* Desktop Horizontal Timeline (Visible on lg+) */}
        <div className="hidden lg:block relative mb-16">
          {/* Connecting gradient line */}
          <div className="absolute top-14 left-10 right-10 h-0.5 bg-gradient-to-r from-[#087CFF] via-[#00D5FF] to-[#087CFF] opacity-40"></div>

          <div className="grid grid-cols-5 gap-4 relative z-10">
            {steps.map((item, index) => {
              const Icon = item.icon;
              return (
                <div key={item.step} className="flex flex-col items-center text-center group">
                  {/* Step Node */}
                  <div className="w-16 h-16 rounded-2xl bg-[#0B1730] border border-[#087CFF]/30 group-hover:border-[#00D5FF] group-hover:scale-110 transition-all duration-300 flex items-center justify-center text-[#00D5FF] shadow-lg mb-6 relative">
                    <Icon className="w-7 h-7 text-[#00D5FF] group-hover:text-white transition-colors" />
                    <span className="absolute -top-2.5 -right-2 px-1.5 py-0.5 rounded text-[10px] font-mono font-bold bg-[#087CFF] text-white">
                      {item.step}
                    </span>
                  </div>

                  {/* Text Details */}
                  <h3 className="text-lg font-bold text-white group-hover:text-[#00D5FF] transition-colors">
                    {item.title}
                  </h3>
                  <div className="text-[11px] font-semibold text-[#087CFF] mb-2">{item.tagline}</div>
                  <p className="text-xs text-[#A8B5C7] leading-relaxed max-w-[200px]">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Mobile & Tablet Vertical Timeline (Visible on < lg) */}
        <div className="lg:hidden relative pl-6 border-l-2 border-[#087CFF]/30 space-y-10 ml-4 mb-12">
          {steps.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.step} className="relative group">
                {/* Node on vertical line */}
                <div className="absolute -left-[35px] top-0 w-8 h-8 rounded-full bg-[#0B1730] border-2 border-[#00D5FF] flex items-center justify-center text-[#00D5FF] font-bold text-xs shadow-md">
                  {item.step}
                </div>

                <div className="p-5 rounded-2xl bg-[#101F35]/70 border border-white/10 group-hover:border-[#087CFF]/50 transition-all">
                  <div className="flex items-center space-x-2.5 mb-2">
                    <Icon className="w-5 h-5 text-[#00D5FF]" />
                    <h3 className="text-lg font-bold text-white">{item.title}</h3>
                  </div>
                  <div className="text-xs font-semibold text-[#087CFF] mb-1.5">{item.tagline}</div>
                  <p className="text-xs sm:text-sm text-[#A8B5C7] leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Section Bottom Banner CTA */}
        <div className="text-center pt-8">
          <button
            onClick={onStartProject}
            className="inline-flex items-center space-x-2 text-sm font-semibold text-[#00D5FF] hover:text-white transition-colors group"
          >
            <span>Ready to begin Step 01? Let&apos;s talk about your project</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>

      </div>
    </section>
  );
}
