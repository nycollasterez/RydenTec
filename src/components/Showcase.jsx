import React, { useState } from 'react';
import { 
  Monitor, 
  Smartphone, 
  Sparkles, 
  ArrowRight, 
  Scissors, 
  Car, 
  Home, 
  Heart, 
  Briefcase, 
  UtensilsCrossed,
  CheckCircle2,
  Calendar,
  Star,
  Clock,
  MapPin,
  ChevronRight,
  ShieldCheck,
  Percent,
  Sliders
} from 'lucide-react';
import { trackEvent } from '../services/api';

export default function Showcase({ onBuildYours }) {
  const [activeDevice, setActiveDevice] = useState('desktop'); // 'desktop' or 'mobile'
  const [activeConcept, setActiveConcept] = useState('barbershop');
  
  // Interactive mini-states for concepts
  const [selectedServiceIndex, setSelectedServiceIndex] = useState(0);
  const [autoTier, setAutoTier] = useState('ceramic');
  const [homeSqFt, setHomeSqFt] = useState(1800);
  const [restaurantGuests, setRestaurantGuests] = useState(2);

  const concepts = [
    {
      id: 'barbershop',
      label: 'Barbershop & Grooming',
      icon: Scissors,
      brandName: 'Honorato Barber Club',
      tagline: 'Precision Cuts & Luxury Grooming Lounge',
      accentColor: '#00D5FF',
      services: [
        { name: 'Executive Master Cut & Hot Towel', price: '$45', time: '40 min' },
        { name: 'Beard Sculpting & Ozone Steam', price: '$35', time: '30 min' },
        { name: 'The Complete Ryden Protocol', price: '$75', time: '60 min' }
      ]
    },
    {
      id: 'detailing',
      label: 'Auto Detailing & Care',
      icon: Car,
      brandName: 'Apex Ceramic & Paint Defense',
      tagline: 'Paint Correction & Certified Ceramic Studio',
      accentColor: '#087CFF',
      tiers: {
        stage1: { name: 'Gloss Enhancement', price: '$399', dur: '1 Day', warranty: '1 Year' },
        ceramic: { name: 'Level 2 Ceramic Shield', price: '$899', dur: '2 Days', warranty: '5 Years' },
        ppf: { name: 'Full Front PPF Armor', price: '$1,799', dur: '3 Days', warranty: '10 Years' }
      }
    },
    {
      id: 'home-services',
      label: 'Home Remodeling',
      icon: Home,
      brandName: 'Vanguard Contracting & Design',
      tagline: 'Architectural Remodeling & Fine Construction',
      accentColor: '#00D5FF'
    },
    {
      id: 'beauty-wellness',
      label: 'Beauty & Wellness',
      icon: Heart,
      brandName: 'Aura Aesthetics & Medical Spa',
      tagline: 'Advanced Dermatology & Rejuvenation Therapies',
      accentColor: '#087CFF'
    },
    {
      id: 'professional',
      label: 'Professional Advisory',
      icon: Briefcase,
      brandName: 'Sterling Financial & M&A Group',
      tagline: 'Strategic Corporate Wealth & Transaction Advisory',
      accentColor: '#00D5FF'
    },
    {
      id: 'restaurant',
      label: 'Artisan Restaurant',
      icon: UtensilsCrossed,
      brandName: 'L\'Atelier Modern Hearth',
      tagline: 'Contemporary Seasonal Wood-Fired Cuisine',
      accentColor: '#087CFF'
    }
  ];

  const currentConcept = concepts.find(c => c.id === activeConcept) || concepts[0];

  const handleDeviceChange = (device) => {
    setActiveDevice(device);
    trackEvent(`showcase_device_toggle_${device}`);
  };

  const handleConceptChange = (conceptId) => {
    setActiveConcept(conceptId);
    trackEvent(`showcase_concept_switch_${conceptId}`);
  };

  return (
    <section id="showcase" className="py-24 lg:py-32 relative bg-[#0B1730]/60 border-y border-white/5 overflow-hidden">
      {/* Background Lighting */}
      <div className="absolute top-1/3 left-1/4 w-[700px] h-[400px] bg-[#087CFF]/10 blur-[150px] pointer-events-none rounded-full"></div>
      <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[350px] bg-[#00D5FF]/10 blur-[140px] pointer-events-none rounded-full"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#101F35] border border-[#00D5FF]/30 text-xs font-semibold text-[#00D5FF]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive Experience Lab</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Your Website Should <span className="gradient-text">Work as Hard as You Do.</span>
          </h2>

          <p className="text-base sm:text-lg text-[#A8B5C7] leading-relaxed">
            Your website is more than an online presence. It&apos;s where first impressions become opportunities.
          </p>
        </div>

        {/* Concept Selector Tabs */}
        <div className="flex items-center justify-start sm:justify-center overflow-x-auto pb-4 gap-2 scrollbar-none mb-8">
          {concepts.map((concept) => {
            const Icon = concept.icon;
            const isActive = concept.id === activeConcept;
            return (
              <button
                key={concept.id}
                onClick={() => handleConceptChange(concept.id)}
                className={`flex-shrink-0 flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 border ${
                  isActive
                    ? 'bg-gradient-to-r from-[#087CFF] to-[#00D5FF] text-white border-transparent shadow-lg shadow-[#087CFF]/30 scale-[1.02]'
                    : 'bg-[#101F35]/70 text-[#A8B5C7] border-white/5 hover:border-white/20 hover:text-white'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{concept.label}</span>
              </button>
            );
          })}
        </div>

        {/* Device Switcher (Desktop vs Mobile) & Concept Project Label */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6 px-2">
          
          {/* Conceptual Demonstration Disclaimer Badge */}
          <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-[#101F35] border border-amber-500/20 text-xs text-amber-300">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
            <span className="font-medium">Concept Demonstration</span>
            <span className="text-white/40">•</span>
            <span className="text-[#A8B5C7] text-[11px]">Crafted to show RydenTec responsive architecture &amp; conversion logic</span>
          </div>

          {/* Desktop / Mobile Device Toggle */}
          <div className="inline-flex items-center p-1 rounded-xl bg-[#101F35] border border-white/10">
            <button
              onClick={() => handleDeviceChange('desktop')}
              className={`flex items-center space-x-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeDevice === 'desktop'
                  ? 'bg-[#087CFF] text-white shadow-md'
                  : 'text-[#A8B5C7] hover:text-white'
              }`}
            >
              <Monitor className="w-3.5 h-3.5" />
              <span>Desktop View</span>
            </button>

            <button
              onClick={() => handleDeviceChange('mobile')}
              className={`flex items-center space-x-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeDevice === 'mobile'
                  ? 'bg-[#087CFF] text-white shadow-md'
                  : 'text-[#A8B5C7] hover:text-white'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>Mobile View</span>
            </button>
          </div>

        </div>

        {/* Device Frame Display */}
        <div className="flex justify-center transition-all duration-500">
          
          {/* DESKTOP VIEWPORT FRAME */}
          {activeDevice === 'desktop' && (
            <div className="w-full max-w-5xl rounded-2xl bg-[#07111F] border border-white/15 shadow-2xl overflow-hidden transition-all duration-300">
              
              {/* Desktop Browser Window Header */}
              <div className="px-4 py-3 bg-[#101F35] border-b border-white/10 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="w-3 h-3 rounded-full bg-rose-500/80"></span>
                  <span className="w-3 h-3 rounded-full bg-amber-500/80"></span>
                  <span className="w-3 h-3 rounded-full bg-emerald-500/80"></span>
                </div>
                <div className="px-5 py-1 rounded-full bg-[#07111F] border border-white/10 text-xs font-mono text-[#A8B5C7] flex items-center space-x-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                  <span>https://preview.{activeConcept}.rydentec.online</span>
                </div>
                <div className="text-xs text-[#00D5FF] font-semibold flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">SSL Secure</span>
                </div>
              </div>

              {/* Dynamic Interactive Website Preview Content */}
              <div className="p-6 sm:p-10 min-h-[480px] bg-gradient-to-b from-[#0B1730] to-[#07111F]">
                
                {/* 1. BARBERSHOP CONCEPT */}
                {activeConcept === 'barbershop' && (
                  <div className="space-y-8 animate-fadeIn">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
                      <div>
                        <div className="text-xs uppercase tracking-widest text-[#00D5FF] font-semibold">Premium Grooming &amp; Lounge</div>
                        <h3 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">Honorato Barber Club</h3>
                        <p className="text-sm text-[#A8B5C7] mt-1">Handcrafted cuts, hot towels &amp; bespoke beard treatments.</p>
                      </div>
                      <div className="flex items-center space-x-2 text-xs font-semibold text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-lg border border-emerald-500/20 w-fit">
                        <Clock className="w-3.5 h-3.5" />
                        <span>Today&apos;s Open Slots: 4 Available</span>
                      </div>
                    </div>

                    {/* Interactive Service Card Selector */}
                    <div>
                      <div className="text-xs font-semibold text-[#A8B5C7] uppercase tracking-wider mb-3">Select Desired Service:</div>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        {currentConcept.services.map((srv, idx) => (
                          <div
                            key={idx}
                            onClick={() => setSelectedServiceIndex(idx)}
                            className={`p-4 rounded-xl border cursor-pointer transition-all ${
                              selectedServiceIndex === idx
                                ? 'bg-[#101F35] border-[#00D5FF] shadow-lg shadow-[#00D5FF]/20'
                                : 'bg-[#101F35]/50 border-white/5 hover:border-white/20'
                            }`}
                          >
                            <div className="flex justify-between items-start">
                              <span className="text-sm font-bold text-white">{srv.name}</span>
                              <span className="text-sm font-extrabold text-[#00D5FF]">{srv.price}</span>
                            </div>
                            <div className="text-xs text-[#A8B5C7] mt-2 flex items-center space-x-1">
                              <Clock className="w-3 h-3" />
                              <span>{srv.time}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Booking Flow Simulation */}
                    <div className="p-4 rounded-xl bg-[#101F35]/80 border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                      <div className="text-left w-full sm:w-auto">
                        <div className="text-xs text-[#A8B5C7]">Selected Service:</div>
                        <div className="text-sm font-bold text-white">
                          {currentConcept.services[selectedServiceIndex]?.name} ({currentConcept.services[selectedServiceIndex]?.price})
                        </div>
                      </div>
                      <button 
                        onClick={() => alert(`Simulated booking for ${currentConcept.services[selectedServiceIndex]?.name}! In live client implementations, this connects directly to WhatsApp or Google Calendar booking.`)}
                        className="w-full sm:w-auto px-6 py-2.5 rounded-lg bg-gradient-to-r from-[#087CFF] to-[#00D5FF] text-white font-semibold text-xs shadow-md hover:opacity-95"
                      >
                        Reserve Appointment Slot
                      </button>
                    </div>
                  </div>
                )}

                {/* 2. AUTO DETAILING CONCEPT */}
                {activeConcept === 'detailing' && (
                  <div className="space-y-8 animate-fadeIn">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
                      <div>
                        <div className="text-xs uppercase tracking-widest text-[#087CFF] font-semibold">Exotic &amp; Luxury Vehicle Protection</div>
                        <h3 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">Apex Ceramic &amp; Paint Defense</h3>
                        <p className="text-sm text-[#A8B5C7] mt-1">Ceramic coatings, self-healing PPF &amp; multi-stage paint correction.</p>
                      </div>
                      <div className="flex items-center space-x-1 text-amber-400 text-xs font-semibold">
                        <Star className="w-4 h-4 fill-amber-400" />
                        <span>5.0 Star Rated (140+ Verified Reviews)</span>
                      </div>
                    </div>

                    {/* Interactive Package Switcher */}
                    <div>
                      <div className="text-xs font-semibold text-[#A8B5C7] uppercase tracking-wider mb-3">Choose Protection Package:</div>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        {Object.entries(currentConcept.tiers).map(([key, item]) => (
                          <div
                            key={key}
                            onClick={() => setAutoTier(key)}
                            className={`p-4 rounded-xl border cursor-pointer transition-all ${
                              autoTier === key
                                ? 'bg-[#101F35] border-[#087CFF] shadow-lg shadow-[#087CFF]/20'
                                : 'bg-[#101F35]/50 border-white/5 hover:border-white/20'
                            }`}
                          >
                            <div className="flex justify-between items-start">
                              <span className="text-sm font-bold text-white">{item.name}</span>
                              <span className="text-sm font-extrabold text-[#00D5FF]">{item.price}</span>
                            </div>
                            <div className="text-xs text-[#A8B5C7] mt-2 space-y-1">
                              <div>Duration: {item.dur}</div>
                              <div className="text-emerald-400 font-semibold">{item.warranty} Warranty</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="p-4 rounded-xl bg-[#101F35]/80 border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                      <div>
                        <div className="text-xs text-[#A8B5C7]">Vehicle Estimate:</div>
                        <div className="text-sm font-bold text-white">
                          {currentConcept.tiers[autoTier]?.name} • Starting at {currentConcept.tiers[autoTier]?.price}
                        </div>
                      </div>
                      <button 
                        onClick={() => alert(`Simulated quote for ${currentConcept.tiers[autoTier]?.name}! With RydenTec, clients receive real-time vehicle make/model calculation forms.`)}
                        className="w-full sm:w-auto px-6 py-2.5 rounded-lg bg-gradient-to-r from-[#087CFF] to-[#00D5FF] text-white font-semibold text-xs shadow-md"
                      >
                        Request Vehicle Quote
                      </button>
                    </div>
                  </div>
                )}

                {/* 3. HOME REMODELING CONCEPT */}
                {activeConcept === 'home-services' && (
                  <div className="space-y-6 animate-fadeIn">
                    <div className="border-b border-white/10 pb-4">
                      <div className="text-xs uppercase tracking-widest text-[#00D5FF] font-semibold">General Contractor &amp; Architectural Builder</div>
                      <h3 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">Vanguard Contracting &amp; Design</h3>
                      <p className="text-sm text-[#A8B5C7] mt-1">Luxury residential additions, custom kitchens &amp; structural engineering.</p>
                    </div>

                    {/* Interactive Estimator Slider */}
                    <div className="p-6 rounded-xl bg-[#101F35]/70 border border-white/10 space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-semibold text-white">Project Square Footage</span>
                        <span className="text-base font-bold text-[#00D5FF] font-mono">{homeSqFt} sq. ft.</span>
                      </div>
                      <input 
                        type="range" 
                        min="500" 
                        max="5000" 
                        step="100" 
                        value={homeSqFt}
                        onChange={(e) => setHomeSqFt(Number(e.target.value))}
                        className="w-full accent-[#087CFF] cursor-pointer"
                      />
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                        <div className="p-3 rounded-lg bg-[#07111F] border border-white/5">
                          <div className="text-xs text-[#A8B5C7]">Estimated Project Timeline</div>
                          <div className="text-base font-bold text-white mt-1">
                            {homeSqFt < 1500 ? '4–6 Weeks' : homeSqFt < 3000 ? '8–12 Weeks' : '14–18 Weeks'}
                          </div>
                        </div>
                        <div className="p-3 rounded-lg bg-[#07111F] border border-white/5">
                          <div className="text-xs text-[#A8B5C7]">Rough Investment Range</div>
                          <div className="text-base font-bold text-emerald-400 mt-1">
                            ${(homeSqFt * 75).toLocaleString()} – ${(homeSqFt * 120).toLocaleString()}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* 4. BEAUTY & WELLNESS CONCEPT */}
                {activeConcept === 'beauty-wellness' && (
                  <div className="space-y-6 animate-fadeIn">
                    <div className="border-b border-white/10 pb-4">
                      <div className="text-xs uppercase tracking-widest text-[#087CFF] font-semibold">Medical Aesthetics &amp; Skin Science</div>
                      <h3 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">Aura Aesthetics Clinic</h3>
                      <p className="text-sm text-[#A8B5C7] mt-1">Doctor-led treatments, laser facial resurfacing &amp; non-surgical contouring.</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      {[
                        { title: 'HydraFacial Elite MD', time: '50 Min', benefit: 'Deep pore detox & instant luminosity' },
                        { title: 'Laser Skin Tightening', time: '60 Min', benefit: 'Collagen restoration & firming' },
                        { title: 'Bespoke Chemical Peel', time: '45 Min', benefit: 'Hyperpigmentation correction' }
                      ].map((card, i) => (
                        <div key={i} className="p-4 rounded-xl bg-[#101F35] border border-white/5 space-y-2">
                          <h4 className="text-sm font-bold text-white">{card.title}</h4>
                          <p className="text-xs text-[#A8B5C7]">{card.benefit}</p>
                          <span className="inline-block text-[10px] text-[#00D5FF] font-semibold bg-[#087CFF]/15 px-2 py-0.5 rounded">
                            {card.time}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 5. PROFESSIONAL ADVISORY CONCEPT */}
                {activeConcept === 'professional' && (
                  <div className="space-y-6 animate-fadeIn">
                    <div className="border-b border-white/10 pb-4">
                      <div className="text-xs uppercase tracking-widest text-[#00D5FF] font-semibold">M&amp;A &amp; Strategic Wealth Advisory</div>
                      <h3 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">Sterling Financial Partners</h3>
                      <p className="text-sm text-[#A8B5C7] mt-1">Transaction advisory, capital growth structures, and institutional diligence.</p>
                    </div>

                    <div className="p-5 rounded-xl bg-[#101F35]/70 border border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <div className="text-xs text-[#A8B5C7]">Corporate Deal Experience</div>
                        <div className="text-xl font-bold text-white mt-1">45+ Cross-Border</div>
                      </div>
                      <div>
                        <div className="text-xs text-[#A8B5C7]">Average Due Diligence</div>
                        <div className="text-xl font-bold text-[#00D5FF] mt-1">14 Business Days</div>
                      </div>
                      <div>
                        <div className="text-xs text-[#A8B5C7]">Confidentiality Rating</div>
                        <div className="text-xl font-bold text-emerald-400 mt-1">SOC 2 Type II</div>
                      </div>
                    </div>
                  </div>
                )}

                {/* 6. RESTAURANT CONCEPT */}
                {activeConcept === 'restaurant' && (
                  <div className="space-y-6 animate-fadeIn">
                    <div className="border-b border-white/10 pb-4">
                      <div className="text-xs uppercase tracking-widest text-[#087CFF] font-semibold">Wood-Fired Gastronomy</div>
                      <h3 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">L&apos;Atelier Modern Hearth</h3>
                      <p className="text-sm text-[#A8B5C7] mt-1">Locally farmed culinary creations paired with biodynamic reserve wines.</p>
                    </div>

                    <div className="p-5 rounded-xl bg-[#101F35]/80 border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                      <div className="flex items-center space-x-3">
                        <UtensilsCrossed className="w-5 h-5 text-[#00D5FF]" />
                        <div>
                          <div className="text-xs text-[#A8B5C7]">Chef&apos;s 7-Course Evening Tasting</div>
                          <div className="text-sm font-bold text-white">Daily Seating: 6:00 PM &amp; 8:30 PM</div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-xs text-[#A8B5C7]">Guests:</span>
                        {[2, 4, 6].map((num) => (
                          <button
                            key={num}
                            onClick={() => setRestaurantGuests(num)}
                            className={`px-3 py-1 rounded text-xs font-bold ${
                              restaurantGuests === num ? 'bg-[#00D5FF] text-[#07111F]' : 'bg-[#07111F] text-white'
                            }`}
                          >
                            {num}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

              </div>
            </div>
          )}

          {/* MOBILE VIEWPORT FRAME */}
          {activeDevice === 'mobile' && (
            <div className="w-[340px] sm:w-[380px] rounded-[42px] bg-[#07111F] border-[8px] border-[#101F35] shadow-2xl overflow-hidden transition-all duration-300">
              
              {/* Phone Dynamic Island / Speaker */}
              <div className="bg-[#101F35] pt-3 pb-2 flex justify-center items-center">
                <div className="w-24 h-4 bg-black rounded-full flex items-center justify-end pr-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-400"></div>
                </div>
              </div>

              {/* Mobile Content Display */}
              <div className="p-5 bg-gradient-to-b from-[#0B1730] to-[#07111F] min-h-[500px] flex flex-col justify-between">
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white">{currentConcept.brandName}</span>
                    <span className="text-[10px] text-[#00D5FF] font-semibold bg-[#087CFF]/15 px-2 py-0.5 rounded">
                      Mobile Optimized
                    </span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-[#101F35]/80 border border-white/5 space-y-1.5">
                    <div className="text-xs font-bold text-white">{currentConcept.tagline}</div>
                    <div className="text-[11px] text-[#A8B5C7]">Fast 1-tap booking &amp; quote intake layout.</div>
                  </div>

                  <div className="space-y-2 pt-2">
                    <div className="text-[11px] font-semibold text-[#A8B5C7]">Popular Inquiries:</div>
                    <div className="p-2.5 rounded-lg bg-[#101F35] text-xs text-white/90 flex justify-between items-center border border-white/5">
                      <span>Online Booking</span>
                      <ChevronRight className="w-3.5 h-3.5 text-[#00D5FF]" />
                    </div>
                    <div className="p-2.5 rounded-lg bg-[#101F35] text-xs text-white/90 flex justify-between items-center border border-white/5">
                      <span>Service Pricing Menu</span>
                      <ChevronRight className="w-3.5 h-3.5 text-[#00D5FF]" />
                    </div>
                    <div className="p-2.5 rounded-lg bg-[#101F35] text-xs text-white/90 flex justify-between items-center border border-white/5">
                      <span>Direct WhatsApp Support</span>
                      <ChevronRight className="w-3.5 h-3.5 text-[#00D5FF]" />
                    </div>
                  </div>
                </div>

                <div className="pt-6">
                  <button 
                    onClick={onBuildYours}
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-[#087CFF] to-[#00D5FF] text-white font-bold text-xs shadow-lg"
                  >
                    Build A Website Like This
                  </button>
                </div>

              </div>

              {/* Bottom Phone Bar */}
              <div className="bg-[#101F35] py-2 flex justify-center">
                <div className="w-28 h-1 bg-white/30 rounded-full"></div>
              </div>

            </div>
          )}

        </div>

        {/* Section Bottom CTA */}
        <div className="mt-14 text-center">
          <button
            onClick={() => {
              trackEvent('showcase_cta_click');
              onBuildYours();
            }}
            className="inline-flex items-center space-x-2 px-8 py-4 rounded-xl bg-gradient-to-r from-[#087CFF] to-[#00D5FF] text-white font-bold text-base shadow-lg shadow-[#087CFF]/30 hover:shadow-[#087CFF]/50 hover:scale-[1.02] active:scale-98 transition-all group"
          >
            <span>Let&apos;s Build Yours</span>
            <ArrowRight className="w-5 h-5 transition-transform duration-200 group-hover:translate-x-1" />
          </button>
        </div>

      </div>
    </section>
  );
}
