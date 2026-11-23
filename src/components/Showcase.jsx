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
  Sliders,
  ExternalLink,
  Layers,
  RotateCcw
} from 'lucide-react';
import { trackEvent } from '../services/api';

export default function Showcase({ onBuildYours }) {
  const [activeDevice, setActiveDevice] = useState('desktop'); // 'desktop' or 'mobile'
  const [activeConcept, setActiveConcept] = useState('barbershop');
  const [barbershopViewMode, setBarbershopViewMode] = useState('live'); // 'live' (real iframe) or 'funnel' (interactive booking concept)
  
  // Interactive mini-states for concepts
  const [selectedServiceIndex, setSelectedServiceIndex] = useState(0);
  const [autoTier, setAutoTier] = useState('ceramic');
  const [homeSqFt, setHomeSqFt] = useState(150);
  const [restaurantGuests, setRestaurantGuests] = useState(2);

  const concepts = [
    {
      id: 'barbershop',
      label: 'Barbearia & Grooming',
      icon: Scissors,
      brandName: 'Honorato Barber Shop',
      tagline: 'Cortes Precisos e Experiência de Barbearia Premium',
      accentColor: '#00D5FF',
      isLiveClient: true,
      liveUrl: 'https://www.honoratobarbershop.com.br/',
      services: [
        { name: 'Corte Master Ryden & Toalha Quente', price: 'R$ 80', time: '40 min' },
        { name: 'Design de Barba & Vapor de Ozônio', price: 'R$ 55', time: '30 min' },
        { name: 'Combo Completo Cabelo e Barba', price: 'R$ 130', time: '60 min' }
      ]
    },
    {
      id: 'detailing',
      label: 'Estética Automotiva',
      icon: Car,
      brandName: 'Apex Proteção Cerâmica & Detalhamento',
      tagline: 'Correção de Pintura e Vitrificação Cerâmica Certificada',
      accentColor: '#087CFF',
      isLiveClient: false,
      tiers: {
        stage1: { name: 'Polimento Técnico & Brilho', price: 'R$ 890', dur: '1 Dia', warranty: '1 Ano' },
        ceramic: { name: 'Vitrificação Cerâmica Pro', price: 'R$ 1.850', dur: '2 Dias', warranty: '3 Anos' },
        ppf: { name: 'Proteção Frontal PPF Regenerativo', price: 'R$ 3.800', dur: '3 Dias', warranty: '5 Anos' }
      }
    },
    {
      id: 'home-services',
      label: 'Reformas & Arquitetura',
      icon: Home,
      brandName: 'Vanguard Engenharia & Reformas',
      tagline: 'Reformas Residenciais de Alto Padrão e Arquitetura',
      accentColor: '#00D5FF',
      isLiveClient: false
    },
    {
      id: 'beauty-wellness',
      label: 'Estética & Saúde',
      icon: Heart,
      brandName: 'Clínica Aura Estética Avançada',
      tagline: 'Tratamentos Dermatológicos e Procedimentos Faciais',
      accentColor: '#087CFF',
      isLiveClient: false
    },
    {
      id: 'professional',
      label: 'Consultoria & Finanças',
      icon: Briefcase,
      brandName: 'Sterling Consultoria Empresarial',
      tagline: 'Planejamento Estratégico e Gestão Corporativa',
      accentColor: '#00D5FF',
      isLiveClient: false
    },
    {
      id: 'restaurant',
      label: 'Gastronomia & Restaurante',
      icon: UtensilsCrossed,
      brandName: 'L\'Atelier Cucina & Fogo',
      tagline: 'Culinária Contemporânea Autoral com Ingredientes Locais',
      accentColor: '#087CFF',
      isLiveClient: false
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
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Seu Site Deve Trabalhar <span className="gradient-text">Tão Duro Quanto Você.</span>
          </h2>

          <p className="text-base sm:text-lg text-[#A8B5C7] leading-relaxed">
            Mais do que uma simples presença online: é onde a primeira impressão se transforma em novos clientes para o seu negócio.
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
                {concept.isLiveClient && (
                  <span className="ml-1 px-1.5 py-0.2 rounded-full bg-emerald-400/20 text-emerald-300 text-[9px] font-bold">
                    NO AR
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Device Switcher (Desktop vs Mobile) & Project Distinction Badge */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6 px-2">
          
          {/* Badge */}
          {currentConcept.isLiveClient ? (
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-xs text-emerald-300">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span className="font-bold">Site Real no Ar:</span>
              <span className="text-white font-mono text-[11px]">honoratobarbershop.com.br</span>
            </div>
          ) : (
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-lg bg-[#101F35] border border-amber-500/20 text-xs text-amber-300">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
              <span className="font-medium">Demonstração de Conceito</span>
              <span className="text-white/40">•</span>
              <span className="text-[#A8B5C7] text-[11px]">Projetado para demonstrar arquitetura responsiva e conversão</span>
            </div>
          )}

          {/* Desktop / Mobile Device Toggle */}
          <div className="flex items-center space-x-2">
            {/* View Mode Toggle for Barbershop (Live iframe vs Funnel) */}
            {activeConcept === 'barbershop' && (
              <div className="hidden md:inline-flex items-center p-1 rounded-xl bg-[#101F35] border border-white/10 text-xs">
                <button
                  onClick={() => setBarbershopViewMode('live')}
                  className={`px-3 py-1 rounded-lg font-semibold transition-all ${
                    barbershopViewMode === 'live'
                      ? 'bg-emerald-500 text-white shadow-md'
                      : 'text-[#A8B5C7] hover:text-white'
                  }`}
                >
                  Site Real no Ar
                </button>
                <button
                  onClick={() => setBarbershopViewMode('funnel')}
                  className={`px-3 py-1 rounded-lg font-semibold transition-all ${
                    barbershopViewMode === 'funnel'
                      ? 'bg-[#087CFF] text-white shadow-md'
                      : 'text-[#A8B5C7] hover:text-white'
                  }`}
                >
                  Fluxo de Conversão
                </button>
              </div>
            )}

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
                <span>Computador</span>
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
                <span>Celular</span>
              </button>
            </div>
          </div>

        </div>

        {/* Device Frame Display */}
        <div className="flex justify-center transition-all duration-500">
          
          {/* ======================================================== */}
          {/* DESKTOP VIEWPORT FRAME */}
          {/* ======================================================== */}
          {activeDevice === 'desktop' && (
            <div className="w-full max-w-5xl rounded-2xl bg-[#07111F] border border-white/15 shadow-2xl overflow-hidden transition-all duration-300">
              
              {/* Desktop Browser Window Header */}
              <div className="px-4 py-3 bg-[#101F35] border-b border-white/10 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="w-3 h-3 rounded-full bg-rose-500/80"></span>
                  <span className="w-3 h-3 rounded-full bg-amber-500/80"></span>
                  <span className="w-3 h-3 rounded-full bg-emerald-500/80"></span>
                </div>

                <div className="px-5 py-1 rounded-full bg-[#07111F] border border-white/10 text-xs font-mono text-[#A8B5C7] flex items-center space-x-2 max-w-[320px] sm:max-w-md truncate">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 flex-shrink-0"></span>
                  <span className="truncate">
                    {activeConcept === 'barbershop' 
                      ? 'https://www.honoratobarbershop.com.br' 
                      : `https://preview.${activeConcept}.rydentec.online`}
                  </span>
                </div>

                <div className="flex items-center space-x-3 text-xs">
                  {activeConcept === 'barbershop' ? (
                    <a
                      href="https://www.honoratobarbershop.com.br/"
                      target="_blank"
                      rel="noreferrer"
                      className="px-2.5 py-1 rounded-md bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30 font-semibold flex items-center space-x-1 transition-colors"
                    >
                      <span>Abrir Site Real</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  ) : (
                    <div className="text-[#00D5FF] font-semibold flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">Conexão Segura SSL</span>
                    </div>
                  )}
                </div>
              </div>

              {/* 1. BARBERSHOP CONCEPT — LIVE IFRAME OR FUNNEL */}
              {activeConcept === 'barbershop' ? (
                barbershopViewMode === 'live' ? (
                  <div className="relative w-full h-[620px] bg-[#07111F] overflow-hidden">
                    <iframe
                      src="https://www.honoratobarbershop.com.br/"
                      title="Honorato Barber Shop Live Website"
                      className="w-full h-full border-0"
                      loading="lazy"
                    />
                  </div>
                ) : (
                  <div className="p-6 sm:p-10 min-h-[480px] bg-gradient-to-b from-[#0B1730] to-[#07111F] space-y-8 animate-fadeIn">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
                      <div>
                        <div className="text-xs uppercase tracking-widest text-[#00D5FF] font-semibold">Barbearia &amp; Estética Premium</div>
                        <h3 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">Honorato Barber Shop</h3>
                        <p className="text-sm text-[#A8B5C7] mt-1">Cortes precisos, toalhas aquecidas e tratamento de barba exclusivo.</p>
                      </div>
                      <div className="flex items-center space-x-2 text-xs font-semibold text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-lg border border-emerald-500/20 w-fit">
                        <Clock className="w-3.5 h-3.5" />
                        <span>Horários Hoje: 4 Disponíveis</span>
                      </div>
                    </div>

                    {/* Interactive Service Card Selector */}
                    <div>
                      <div className="text-xs font-semibold text-[#A8B5C7] uppercase tracking-wider mb-3">Selecione o Serviço:</div>
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
                        <div className="text-xs text-[#A8B5C7]">Serviço Escolhido:</div>
                        <div className="text-sm font-bold text-white">
                          {currentConcept.services[selectedServiceIndex]?.name} ({currentConcept.services[selectedServiceIndex]?.price})
                        </div>
                      </div>
                      <a 
                        href="https://www.honoratobarbershop.com.br/"
                        target="_blank"
                        rel="noreferrer"
                        className="w-full sm:w-auto px-6 py-2.5 rounded-lg bg-gradient-to-r from-[#087CFF] to-[#00D5FF] text-white font-semibold text-xs shadow-md hover:opacity-95 text-center"
                      >
                        Agendar Horário
                      </a>
                    </div>
                  </div>
                )
              ) : (
                /* Dynamic Interactive Website Preview Content for other concepts */
                <div className="p-6 sm:p-10 min-h-[480px] bg-gradient-to-b from-[#0B1730] to-[#07111F]">
                  
                  {/* 2. AUTO DETAILING CONCEPT */}
                  {activeConcept === 'detailing' && (
                    <div className="space-y-8 animate-fadeIn">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
                        <div>
                          <div className="text-xs uppercase tracking-widest text-[#087CFF] font-semibold">Proteção para Veículos Premium</div>
                          <h3 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">Apex Proteção Cerâmica &amp; Detalhamento</h3>
                          <p className="text-sm text-[#A8B5C7] mt-1">Vitrificação cerâmica, PPF auto-regenerativo e correção de pintura especializada.</p>
                        </div>
                        <div className="flex items-center space-x-1 text-amber-400 text-xs font-semibold">
                          <Star className="w-4 h-4 fill-amber-400" />
                          <span>Avaliação 5.0 (Mais de 140 avaliações)</span>
                        </div>
                      </div>

                      {/* Interactive Package Switcher */}
                      <div>
                        <div className="text-xs font-semibold text-[#A8B5C7] uppercase tracking-wider mb-3">Escolha o Pacote de Proteção:</div>
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
                                <div>Duração: {item.dur}</div>
                                <div className="text-emerald-400 font-semibold">Garantia de {item.warranty}</div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="p-4 rounded-xl bg-[#101F35]/80 border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                        <div>
                          <div className="text-xs text-[#A8B5C7]">Estimativa para o Veículo:</div>
                          <div className="text-sm font-bold text-white">
                            {currentConcept.tiers[autoTier]?.name} • A partir de {currentConcept.tiers[autoTier]?.price}
                          </div>
                        </div>
                        <button 
                          onClick={onBuildYours}
                          className="w-full sm:w-auto px-6 py-2.5 rounded-lg bg-gradient-to-r from-[#087CFF] to-[#00D5FF] text-white font-semibold text-xs shadow-md"
                        >
                          Solicitar Orçamento
                        </button>
                      </div>
                    </div>
                  )}

                  {/* 3. HOME REMODELING CONCEPT */}
                  {activeConcept === 'home-services' && (
                    <div className="space-y-6 animate-fadeIn">
                      <div className="border-b border-white/10 pb-4">
                        <div className="text-xs uppercase tracking-widest text-[#00D5FF] font-semibold">Engenharia Civil &amp; Reformas de Alto Padrão</div>
                        <h3 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">Vanguard Engenharia &amp; Reformas</h3>
                        <p className="text-sm text-[#A8B5C7] mt-1">Projetos arquitetônicos residenciais, reformas estruturais e acabamentos nobres.</p>
                      </div>

                      {/* Interactive Estimator Slider */}
                      <div className="p-6 rounded-xl bg-[#101F35]/70 border border-white/10 space-y-4">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-semibold text-white">Metragem do Projeto (Área)</span>
                          <span className="text-base font-bold text-[#00D5FF] font-mono">{homeSqFt} m²</span>
                        </div>
                        <input 
                          type="range" 
                          min="50" 
                          max="500" 
                          step="10" 
                          value={homeSqFt}
                          onChange={(e) => setHomeSqFt(Number(e.target.value))}
                          className="w-full accent-[#087CFF] cursor-pointer"
                        />
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                          <div className="p-3 rounded-lg bg-[#07111F] border border-white/5">
                            <div className="text-xs text-[#A8B5C7]">Prazo Estimado de Execução</div>
                            <div className="text-base font-bold text-white mt-1">
                              {homeSqFt < 100 ? '4 a 6 Semanas' : homeSqFt < 250 ? '8 a 12 Semanas' : '14 a 18 Semanas'}
                            </div>
                          </div>
                          <div className="p-3 rounded-lg bg-[#07111F] border border-white/5">
                            <div className="text-xs text-[#A8B5C7]">Faixa Estimada de Investimento</div>
                            <div className="text-base font-bold text-emerald-400 mt-1">
                              R$ {(homeSqFt * 1400).toLocaleString('pt-BR')} – R$ {(homeSqFt * 2400).toLocaleString('pt-BR')}
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
                        <div className="text-xs uppercase tracking-widest text-[#087CFF] font-semibold">Estética Médica Avançada &amp; Dermatologia</div>
                        <h3 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">Clínica Aura Estética</h3>
                        <p className="text-sm text-[#A8B5C7] mt-1">Protocolos dermatológicos de alta precisão, lasers e harmonização facial.</p>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        {[
                          { title: 'Limpeza de Pele Profunda Hydra', time: '50 Min', benefit: 'Desintoxicação dos poros e luminosidade imediata' },
                          { title: 'Bioestimulador de Colágeno', time: '60 Min', benefit: 'Firmeza facial e rejuvenescimento natural' },
                          { title: 'Peeling Químico Magistral', time: '45 Min', benefit: 'Uniformização do tom e renovação celular' }
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
                        <div className="text-xs uppercase tracking-widest text-[#00D5FF] font-semibold">Consultoria Estratégica &amp; Gestão Corporativa</div>
                        <h3 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">Sterling Consultoria Empresarial</h3>
                        <p className="text-sm text-[#A8B5C7] mt-1">Assessoria em expansão, reestruturação societária e fusões &amp; aquisições.</p>
                      </div>

                      <div className="p-5 rounded-xl bg-[#101F35]/70 border border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div>
                          <div className="text-xs text-[#A8B5C7]">Projetos Estruturados</div>
                          <div className="text-xl font-bold text-white mt-1">+45 Negócios</div>
                        </div>
                        <div>
                          <div className="text-xs text-[#A8B5C7]">Tempo Médio de Diagnóstico</div>
                          <div className="text-xl font-bold text-[#00D5FF] mt-1">10 Dias Úteis</div>
                        </div>
                        <div>
                          <div className="text-xs text-[#A8B5C7]">Confidencialidade</div>
                          <div className="text-xl font-bold text-emerald-400 mt-1">Padrão LGPD &amp; NDA</div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* 6. RESTAURANT CONCEPT */}
                  {activeConcept === 'restaurant' && (
                    <div className="space-y-6 animate-fadeIn">
                      <div className="border-b border-white/10 pb-4">
                        <div className="text-xs uppercase tracking-widest text-[#087CFF] font-semibold">Gastronomia Autoral &amp; Bar de Vinhos</div>
                        <h3 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">L&apos;Atelier Cucina &amp; Fogo</h3>
                        <p className="text-sm text-[#A8B5C7] mt-1">Cardápio sazonal na brasa harmonizado com carta de vinhos selecionados.</p>
                      </div>

                      <div className="p-5 rounded-xl bg-[#101F35]/80 border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                        <div className="flex items-center space-x-3">
                          <UtensilsCrossed className="w-5 h-5 text-[#00D5FF]" />
                          <div>
                            <div className="text-xs text-[#A8B5C7]">Menu Degustação do Chef em 7 Etapas</div>
                            <div className="text-sm font-bold text-white">Sessões Diárias: 19h00 &amp; 21h30</div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-xs text-[#A8B5C7]">Mesa para:</span>
                          {[2, 4, 6].map((num) => (
                            <button
                              key={num}
                              onClick={() => setRestaurantGuests(num)}
                              className={`px-3 py-1 rounded text-xs font-bold ${
                                restaurantGuests === num ? 'bg-[#00D5FF] text-[#07111F]' : 'bg-[#07111F] text-white'
                              }`}
                            >
                              {num} {num === 2 ? 'Lugares' : 'Pessoas'}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                </div>
              )}
            </div>
          )}

          {/* ======================================================== */}
          {/* MOBILE VIEWPORT FRAME */}
          {/* ======================================================== */}
          {activeDevice === 'mobile' && (
            <div className="w-[340px] sm:w-[380px] rounded-[42px] bg-[#07111F] border-[8px] border-[#101F35] shadow-2xl overflow-hidden transition-all duration-300">
              
              {/* Phone Dynamic Island / Speaker */}
              <div className="bg-[#101F35] pt-3 pb-2 flex justify-center items-center">
                <div className="w-24 h-4 bg-black rounded-full flex items-center justify-end pr-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-400"></div>
                </div>
              </div>

              {/* Mobile Content Display */}
              {activeConcept === 'barbershop' ? (
                /* LIVE WEBSITE IFRAME IN MOBILE FRAME! */
                <div className="relative w-full h-[580px] bg-[#07111F] overflow-hidden">
                  <iframe
                    src="https://www.honoratobarbershop.com.br/"
                    title="Honorato Barber Shop Mobile View"
                    className="w-full h-full border-0"
                    loading="lazy"
                  />
                </div>
              ) : (
                <div className="p-5 bg-gradient-to-b from-[#0B1730] to-[#07111F] min-h-[500px] flex flex-col justify-between">
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-white">{currentConcept.brandName}</span>
                      <span className="text-[10px] text-[#00D5FF] font-semibold bg-[#087CFF]/15 px-2 py-0.5 rounded">
                        100% Responsivo
                      </span>
                    </div>

                    <div className="p-3.5 rounded-xl bg-[#101F35]/80 border border-white/5 space-y-1.5">
                      <div className="text-xs font-bold text-white">{currentConcept.tagline}</div>
                      <div className="text-[11px] text-[#A8B5C7]">Interface ultra-rápida pensada para gerar conversão no celular.</div>
                    </div>

                    <div className="space-y-2 pt-2">
                      <div className="text-[11px] font-semibold text-[#A8B5C7]">Ações Frequentes:</div>
                      <div className="p-2.5 rounded-lg bg-[#101F35] text-xs text-white/90 flex justify-between items-center border border-white/5">
                        <span>Agendamento Online</span>
                        <ChevronRight className="w-3.5 h-3.5 text-[#00D5FF]" />
                      </div>
                      <div className="p-2.5 rounded-lg bg-[#101F35] text-xs text-white/90 flex justify-between items-center border border-white/5">
                        <span>Cardápio de Serviços &amp; Preços</span>
                        <ChevronRight className="w-3.5 h-3.5 text-[#00D5FF]" />
                      </div>
                      <div className="p-2.5 rounded-lg bg-[#101F35] text-xs text-white/90 flex justify-between items-center border border-white/5">
                        <span>Falar no WhatsApp Comercial</span>
                        <ChevronRight className="w-3.5 h-3.5 text-[#00D5FF]" />
                      </div>
                    </div>
                  </div>

                  <div className="pt-6">
                    <button 
                      onClick={onBuildYours}
                      className="w-full py-3 rounded-xl bg-gradient-to-r from-[#087CFF] to-[#00D5FF] text-white font-bold text-xs shadow-lg"
                    >
                      Quero um Site Assim
                    </button>
                  </div>

                </div>
              )}

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
            <span>Quero Meu Site de Alto Padrão</span>
            <ArrowRight className="w-5 h-5 transition-transform duration-200 group-hover:translate-x-1" />
          </button>
        </div>

      </div>
    </section>
  );
}