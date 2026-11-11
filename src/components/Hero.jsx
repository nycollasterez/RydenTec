import React from 'react';
import { 
  ArrowRight, 
  Sparkles, 
  Zap, 
  Layers, 
  ShieldCheck, 
  Calendar, 
  TrendingUp, 
  Activity, 
  Bot, 
  CheckCircle2,
  Globe,
  Sliders
} from 'lucide-react';
import { trackEvent } from '../services/api';

export default function Hero({ onStartProject, onExploreWork }) {
  return (
    <section id="home" className="relative min-h-screen pt-32 pb-20 lg:pt-36 lg:pb-32 overflow-hidden flex items-center">
      {/* Background Lighting Elements - Deep Navy with controlled electric blue and cyan glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] sm:w-[900px] h-[500px] bg-gradient-to-tr from-[#087CFF]/20 via-[#00D5FF]/10 to-transparent blur-[140px] pointer-events-none rounded-full animate-pulse-slow"></div>
      <div className="absolute top-2/3 right-[-10%] w-[450px] h-[450px] bg-[#087CFF]/15 blur-[120px] pointer-events-none rounded-full"></div>
      <div className="absolute bottom-10 left-[-5%] w-[400px] h-[400px] bg-[#00D5FF]/10 blur-[130px] pointer-events-none rounded-full"></div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Confident Typography & Positioning */}
          <div className="lg:col-span-6 text-center lg:text-left space-y-8">
            
            {/* Subtle Brand Pill */}
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#101F35]/80 border border-[#087CFF]/30 text-xs font-medium text-[#00D5FF] backdrop-blur-md shadow-sm">
              <span className="flex h-2 w-2 rounded-full bg-[#00D5FF] animate-ping"></span>
              <span>International Technology &amp; Digital Solutions</span>
            </div>

            {/* Hero Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.12]">
              We Build{' '}
              <span className="gradient-text font-black">
                Digital Experiences That Move Businesses Forward.
              </span>
            </h1>

            {/* Supporting Text */}
            <p className="text-lg sm:text-xl text-[#A8B5C7] leading-relaxed max-w-2xl mx-auto lg:mx-0 font-normal">
              From high-performance websites to custom software and intelligent automation, we turn ambitious ideas into powerful digital solutions.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                onClick={() => {
                  trackEvent('hero_primary_cta_click');
                  onStartProject();
                }}
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-[#087CFF] to-[#00D5FF] text-white font-semibold text-base shadow-lg shadow-[#087CFF]/35 hover:shadow-[#087CFF]/50 hover:scale-[1.02] active:scale-98 transition-all duration-200 flex items-center justify-center space-x-2 group"
              >
                <span>Start Your Project</span>
                <ArrowRight className="w-5 h-5 transition-transform duration-200 group-hover:translate-x-1" />
              </button>

              <button
                onClick={() => {
                  trackEvent('hero_secondary_cta_click');
                  onExploreWork();
                }}
                className="w-full sm:w-auto px-7 py-4 rounded-xl bg-[#101F35]/80 border border-white/10 text-white font-semibold text-base hover:bg-white/10 hover:border-[#087CFF]/50 transition-all duration-200 flex items-center justify-center space-x-2 backdrop-blur-md"
              >
                <span>Explore Our Work</span>
              </button>
            </div>

            {/* Three Value Propositions / Trust Indicators */}
            <div className="pt-6 border-t border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-4 text-left">
              <div className="flex items-start space-x-2.5">
                <CheckCircle2 className="w-5 h-5 text-[#00D5FF] flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-semibold text-white">Built Around Your Business</h4>
                  <p className="text-xs text-[#A8B5C7] mt-0.5">Custom architecture tailored to your goals</p>
                </div>
              </div>

              <div className="flex items-start space-x-2.5">
                <CheckCircle2 className="w-5 h-5 text-[#087CFF] flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-semibold text-white">Modern, Responsive Experiences</h4>
                  <p className="text-xs text-[#A8B5C7] mt-0.5">Engineered for mobile, tablet &amp; desktop</p>
                </div>
              </div>

              <div className="flex items-start space-x-2.5">
                <CheckCircle2 className="w-5 h-5 text-[#00D5FF] flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-semibold text-white">Scalable Digital Solutions</h4>
                  <p className="text-xs text-[#A8B5C7] mt-0.5">Clean systems ready for future growth</p>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Premium Animated 3D Floating Composition */}
          <div className="lg:col-span-6 relative mt-6 lg:mt-0 flex items-center justify-center">
            
            {/* Ambient Back Glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#087CFF]/20 to-[#00D5FF]/20 rounded-3xl blur-2xl transform scale-95 pointer-events-none"></div>

            {/* Master Floating Mockup Container */}
            <div className="relative w-full max-w-xl mx-auto">

              {/* Main Floating Browser Window */}
              <div className="rounded-2xl bg-[#0B1730]/95 border border-[#087CFF]/30 shadow-2xl backdrop-blur-xl overflow-hidden transition-all duration-300 hover:border-[#00D5FF]/40">
                
                {/* Browser Top Bar */}
                <div className="px-4 py-3 bg-[#101F35]/90 border-b border-white/10 flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="w-3 h-3 rounded-full bg-[#FF5F56]/80"></span>
                    <span className="w-3 h-3 rounded-full bg-[#FFBD2E]/80"></span>
                    <span className="w-3 h-3 rounded-full bg-[#27C93F]/80"></span>
                  </div>
                  <div className="px-4 py-1 rounded-full bg-[#07111F]/80 border border-white/5 text-[11px] font-mono text-[#A8B5C7] flex items-center space-x-1.5 max-w-[220px] truncate">
                    <Globe className="w-3 h-3 text-[#00D5FF]" />
                    <span>https://client-platform.rydentec.com</span>
                  </div>
                  <div className="flex items-center space-x-1 text-[#A8B5C7]">
                    <Sliders className="w-3.5 h-3.5" />
                  </div>
                </div>

                {/* Simulated Modern SaaS / Business Interface Inside */}
                <div className="p-5 space-y-4 bg-gradient-to-b from-[#0B1730] to-[#07111F]">
                  
                  {/* Top Bar inside app */}
                  <div className="flex items-center justify-between border-b border-white/5 pb-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#087CFF] to-[#00D5FF] flex items-center justify-center text-white font-bold text-xs">
                        RT
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-white">Operations &amp; Growth Hub</div>
                        <div className="text-[10px] text-[#00D5FF]">System Online • Cloud Synced</div>
                      </div>
                    </div>
                    <span className="px-2.5 py-1 rounded-md bg-[#087CFF]/15 text-[#00D5FF] text-[10px] font-semibold">
                      Enterprise Tier
                    </span>
                  </div>

                  {/* Realtime KPI cards */}
                  <div className="grid grid-cols-3 gap-3">
                    <div className="p-3 rounded-xl bg-[#101F35]/70 border border-white/5">
                      <div className="text-[10px] text-[#A8B5C7] flex items-center justify-between">
                        <span>Speed Index</span>
                        <Zap className="w-3 h-3 text-[#00D5FF]" />
                      </div>
                      <div className="text-base font-bold text-white mt-1">0.42s</div>
                      <div className="text-[9px] text-emerald-400 font-medium">99/100 Core Vitals</div>
                    </div>

                    <div className="p-3 rounded-xl bg-[#101F35]/70 border border-white/5">
                      <div className="text-[10px] text-[#A8B5C7] flex items-center justify-between">
                        <span>Monthly Leads</span>
                        <TrendingUp className="w-3 h-3 text-[#087CFF]" />
                      </div>
                      <div className="text-base font-bold text-white mt-1">+48.2%</div>
                      <div className="text-[9px] text-[#00D5FF] font-medium">Verified Funnel</div>
                    </div>

                    <div className="p-3 rounded-xl bg-[#101F35]/70 border border-white/5">
                      <div className="text-[10px] text-[#A8B5C7] flex items-center justify-between">
                        <span>Automation</span>
                        <Activity className="w-3 h-3 text-emerald-400" />
                      </div>
                      <div className="text-base font-bold text-white mt-1">100%</div>
                      <div className="text-[9px] text-emerald-400 font-medium">Sync Active</div>
                    </div>
                  </div>

                  {/* Micro Visual Chart & Activity */}
                  <div className="p-3.5 rounded-xl bg-[#101F35]/50 border border-white/5 space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-medium text-white/90">Qualified Acquisition Pipeline</span>
                      <span className="text-[10px] text-[#00D5FF] font-mono">Live Sync</span>
                    </div>
                    {/* Simulated chart bars */}
                    <div className="h-14 flex items-end justify-between space-x-1.5 pt-2">
                      {[35, 48, 55, 62, 78, 70, 85, 92, 100].map((h, i) => (
                        <div key={i} className="flex-1 flex flex-col items-center gap-1">
                          <div 
                            style={{ height: `${h}%` }}
                            className={`w-full rounded-t-sm transition-all duration-500 ${
                              i === 8 
                                ? 'bg-gradient-to-t from-[#087CFF] to-[#00D5FF] shadow-[0_0_10px_rgba(0,213,255,0.6)]' 
                                : 'bg-[#087CFF]/30 hover:bg-[#087CFF]/60'
                            }`}
                          ></div>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>

              </div>

              {/* FLOATING SATELLITE CARD 1: Lighthouse 99 Performance Card (Top-Right) */}
              <div className="absolute -top-6 -right-4 sm:-right-8 bg-[#101F35]/95 border border-[#087CFF]/40 rounded-xl p-3 shadow-2xl backdrop-blur-xl animate-float-slow flex items-center space-x-3 z-20">
                <div className="w-10 h-10 rounded-lg bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 font-black text-sm">
                  99
                </div>
                <div>
                  <div className="text-xs font-bold text-white">Performance Score</div>
                  <div className="text-[10px] text-[#A8B5C7]">Lighthouse &amp; Core Web Vitals</div>
                </div>
              </div>

              {/* FLOATING SATELLITE CARD 2: Intelligent Automation Trigger (Bottom-Left) */}
              <div className="absolute -bottom-8 -left-4 sm:-left-8 bg-[#101F35]/95 border border-[#00D5FF]/40 rounded-xl p-3.5 shadow-2xl backdrop-blur-xl animate-float-delayed flex items-center space-x-3 z-20 max-w-[260px]">
                <div className="w-9 h-9 rounded-lg bg-gradient-to-tr from-[#087CFF] to-[#00D5FF] flex items-center justify-center text-white flex-shrink-0 shadow-md shadow-[#087CFF]/40">
                  <Bot className="w-5 h-5" />
                </div>
                <div className="truncate">
                  <div className="text-xs font-semibold text-white flex items-center gap-1">
                    <span>AI Lead Dispatcher</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                  </div>
                  <div className="text-[10px] text-[#A8B5C7] truncate">Syncing inquiry to CRM &amp; Calendar</div>
                </div>
              </div>

              {/* FLOATING SATELLITE CARD 3: Scheduled Appointment (Bottom-Right) */}
              <div className="hidden sm:flex absolute bottom-6 -right-6 bg-[#0B1730]/95 border border-white/10 rounded-xl p-3 shadow-xl backdrop-blur-xl animate-float-reverse items-center space-x-2.5 z-20">
                <div className="w-8 h-8 rounded-lg bg-[#087CFF]/20 border border-[#087CFF]/30 flex items-center justify-center text-[#00D5FF]">
                  <Calendar className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[11px] font-semibold text-white">Consultation Booked</div>
                  <div className="text-[9px] text-[#A8B5C7]">Tomorrow • 10:30 AM EST</div>
                </div>
              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
