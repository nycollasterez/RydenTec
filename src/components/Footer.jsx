import React from 'react';
import { 
  ArrowUp, 
  Mail, 
  MessageSquare, 
  ShieldCheck, 
  Lock,
  Globe
} from 'lucide-react';

export default function Footer({ onLegalOpen, onAdminOpen, whatsappNumber, contactEmail }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const email = contactEmail || 'hello@rydentec.com';

  return (
    <footer className="bg-[#050C16] border-t border-white/10 pt-16 pb-12 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main Footer Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-12 border-b border-white/10">
          
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <a href="#home" className="inline-block">
              <img
                src="/brand/rydentec-logo.png"
                alt="RydenTec — Technology That Moves Your Business Forward"
                className="h-10 w-auto object-contain filter drop-shadow-[0_2px_8px_rgba(8,124,255,0.25)]"
              />
            </a>
            
            <p className="text-sm font-semibold text-white/90">
              Technology That Moves Your Business Forward.
            </p>

            <p className="text-xs text-[#A8B5C7] leading-relaxed max-w-sm">
              We design and develop high-performance websites, custom business software, mobile-first web applications, and intelligent automation solutions for ambitious companies.
            </p>

            <div className="flex items-center space-x-3 pt-2">
              <a
                href={`mailto:${email}`}
                className="px-3 py-1.5 rounded-lg bg-[#101F35] border border-white/10 hover:border-[#087CFF] text-xs text-white/90 flex items-center space-x-2 transition-colors"
              >
                <Mail className="w-3.5 h-3.5 text-[#00D5FF]" />
                <span>{email}</span>
              </a>
            </div>
          </div>

          {/* Quick Navigation Col */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs text-[#A8B5C7]">
              <li><a href="#home" className="hover:text-white transition-colors">Home</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">Services</a></li>
              <li><a href="#portfolio" className="hover:text-white transition-colors">Our Work</a></li>
              <li><a href="#showcase" className="hover:text-white transition-colors">Showcase</a></li>
              <li><a href="#how-we-work" className="hover:text-white transition-colors">How We Work</a></li>
              <li><a href="#pricing" className="hover:text-white transition-colors">Pricing</a></li>
              <li><a href="#contact" className="hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Services Col */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Solutions
            </h4>
            <ul className="space-y-2 text-xs text-[#A8B5C7]">
              <li><a href="#services" className="hover:text-white transition-colors">Website Development</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">Custom Software &amp; ERP</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">App Development &amp; PWAs</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">AI &amp; Business Automation</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">Conversion Funnels</a></li>
            </ul>
          </div>

          {/* Trust & Legal Col */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Legal &amp; Admin
            </h4>
            <ul className="space-y-2 text-xs text-[#A8B5C7]">
              <li>
                <button
                  onClick={() => onLegalOpen('privacy')}
                  className="hover:text-white transition-colors text-left"
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button
                  onClick={() => onLegalOpen('terms')}
                  className="hover:text-white transition-colors text-left"
                >
                  Terms of Service
                </button>
              </li>
              <li>
                <button
                  onClick={onAdminOpen}
                  className="hover:text-[#00D5FF] transition-colors text-left flex items-center space-x-1 pt-2 text-[#087CFF]"
                >
                  <Lock className="w-3 h-3" />
                  <span>Admin Portal</span>
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#A8B5C7]">
          <div>
            &copy; 2026 RydenTec. All rights reserved.
          </div>

          <div className="flex items-center space-x-4">
            <span className="text-[11px] text-[#A8B5C7]/70">
              Domains: rydentec.com &bull; rydentec.online
            </span>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-lg bg-[#101F35] border border-white/5 hover:border-[#087CFF] text-[#A8B5C7] hover:text-white transition-colors"
              aria-label="Back to Top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
