import React from 'react';
import { 
  Globe, 
  Cpu, 
  Smartphone, 
  Sparkles, 
  ArrowRight, 
  Check, 
  Layers, 
  Database, 
  Bot, 
  Zap, 
  Code2, 
  Workflow 
} from 'lucide-react';
import { trackEvent } from '../services/api';

export default function Services({ onSelectService }) {
  const services = [
    {
      id: 'website-development',
      serviceKey: 'New Website',
      number: '01',
      title: 'Website Development',
      tagline: 'Websites That Make a Lasting Impression.',
      description: 'Fast, responsive, professionally designed websites built to showcase your business and turn visitors into potential customers.',
      icon: Globe,
      features: [
        'Business Websites',
        'High-Converting Landing Pages',
        'Responsive Web Design',
        'Website Redesign',
        'SEO Foundations',
        'Appointment & Contact Integrations'
      ],
      cta: 'Build My Website',
      accentColor: 'from-[#087CFF] to-[#00D5FF]'
    },
    {
      id: 'custom-software',
      serviceKey: 'Custom Software',
      number: '02',
      title: 'Custom Software',
      tagline: 'Software Built Around the Way You Work.',
      description: 'Custom digital systems designed to streamline workflows, organize information, and simplify everyday business operations.',
      icon: Cpu,
      features: [
        'Management Systems',
        'CRM Solutions',
        'Scheduling Platforms',
        'Inventory Management',
        'Business Dashboards',
        'Custom Integrations'
      ],
      cta: 'Discuss Your Software',
      accentColor: 'from-[#00D5FF] to-[#087CFF]'
    },
    {
      id: 'app-development',
      serviceKey: 'Web or Mobile App',
      number: '03',
      title: 'App Development',
      tagline: 'Your Ideas, Built for the Digital World.',
      description: 'Thoughtfully designed applications and digital platforms created around real user needs.',
      icon: Smartphone,
      features: [
        'Web Applications',
        'Customer Portals',
        'Progressive Web Apps',
        'Internal Business Applications',
        'Mobile App Projects',
        'Platform Development'
      ],
      cta: 'Start an App Project',
      accentColor: 'from-[#087CFF] to-[#00D5FF]'
    },
    {
      id: 'ai-automation',
      serviceKey: 'AI & Automation',
      number: '04',
      title: 'AI & Automation',
      tagline: 'Work Smarter With Intelligent Technology.',
      description: 'Automate repetitive tasks, connect business tools, and explore practical ways to use AI in your daily operations.',
      icon: Sparkles,
      features: [
        'Workflow Automation',
        'AI-Powered Assistants',
        'Customer Service Automation',
        'Data Integrations',
        'Process Optimization',
        'Custom AI Solutions'
      ],
      cta: 'Explore Automation',
      accentColor: 'from-[#00D5FF] to-[#087CFF]'
    }
  ];

  const handleCtaClick = (service) => {
    trackEvent(`service_click_${service.id}`);
    onSelectService(service.serviceKey);
  };

  return (
    <section id="services" className="py-24 lg:py-32 relative bg-[#07111F] overflow-hidden">
      {/* Background Decorative Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-[#087CFF]/8 blur-[160px] pointer-events-none rounded-full"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16 lg:mb-20">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#101F35] border border-[#087CFF]/30 text-xs font-semibold text-[#00D5FF]">
            <Layers className="w-3.5 h-3.5" />
            <span>Core Capabilities</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Everything Your Business Needs to <span className="gradient-text">Go Digital.</span>
          </h2>
          
          <p className="text-base sm:text-lg text-[#A8B5C7] leading-relaxed">
            Powerful digital solutions designed to simplify operations, strengthen your online presence, and support your next stage of growth.
          </p>
        </div>

        {/* 4 Interactive Service Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-8">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <div
                key={service.id}
                className="group relative rounded-2xl bg-[#101F35]/70 border border-white/10 p-8 sm:p-10 transition-all duration-300 hover:border-[#087CFF]/50 hover:bg-[#101F35]/95 hover:shadow-2xl hover:shadow-[#087CFF]/15 backdrop-blur-xl flex flex-col justify-between"
              >
                {/* Top Subtle Number & Icon */}
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-14 h-14 rounded-xl bg-[#0B1730] border border-[#087CFF]/20 flex items-center justify-center text-[#00D5FF] group-hover:scale-105 group-hover:border-[#00D5FF]/50 transition-all duration-300 shadow-inner">
                      <Icon className="w-7 h-7 text-[#00D5FF]" />
                    </div>
                    <span className="text-2xl font-black font-mono text-[#A8B5C7]/30 group-hover:text-[#00D5FF]/40 transition-colors">
                      {service.number}
                    </span>
                  </div>

                  {/* Title & Tagline */}
                  <h3 className="text-2xl font-bold text-white tracking-tight group-hover:text-[#00D5FF] transition-colors">
                    {service.title}
                  </h3>
                  
                  <p className="text-sm font-semibold text-[#087CFF] mt-1.5 mb-3">
                    {service.tagline}
                  </p>

                  {/* Main Description */}
                  <p className="text-sm text-[#A8B5C7] leading-relaxed mb-6">
                    {service.description}
                  </p>

                  {/* Feature Checklist */}
                  <div className="space-y-2.5 pt-4 border-t border-white/5 mb-8">
                    {service.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center space-x-2.5 text-xs sm:text-sm text-white/90">
                        <div className="w-4 h-4 rounded-full bg-[#087CFF]/15 flex items-center justify-center text-[#00D5FF] flex-shrink-0">
                          <Check className="w-3 h-3" />
                        </div>
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card CTA Action */}
                <div>
                  <button
                    onClick={() => handleCtaClick(service)}
                    className="w-full py-3.5 px-5 rounded-xl bg-[#0B1730] border border-white/10 group-hover:border-[#087CFF] group-hover:bg-gradient-to-r group-hover:from-[#087CFF] group-hover:to-[#00D5FF] text-white font-semibold text-sm transition-all duration-200 flex items-center justify-center space-x-2 shadow-sm"
                  >
                    <span>{service.cta}</span>
                    <ArrowRight className="w-4 h-4 text-[#00D5FF] group-hover:text-white transition-transform duration-200 group-hover:translate-x-1" />
                  </button>
                </div>

                {/* Top Corner Subtle Glow on Hover */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#087CFF]/10 to-transparent rounded-tr-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
