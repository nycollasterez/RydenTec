import React from 'react';
import { Check, ArrowRight } from 'lucide-react';
import { trackEvent } from '../services/api';

const DEFAULT_WA_NUMBER = '5534998721299';

export default function Pricing({ pricingData, onSelectPlan, whatsappNumber }) {
  const activeNumber = (whatsappNumber || DEFAULT_WA_NUMBER).replace(/[^0-9]/g, '');

  const starter = pricingData?.starter || {
    title: 'SITE STARTER',
    price: 'Sob consulta',
    startingNote: '',
    description: 'Ideal para pequenas empresas que desejam presença online profissional e de alto impacto.',
    features: [
      'Site Responsivo e Moderno',
      'Até 3 Páginas Principais',
      'Formulário & Integração WhatsApp',
      'Otimização Total para Mobile',
      'Configuração de SEO Google',
      'Integração com Redes Sociais'
    ],
    cta: 'Pedir Orçamento',
    popular: false
  };

  const business = pricingData?.business || {
    title: 'SITE BUSINESS',
    price: 'Sob consulta',
    startingNote: '',
    description: 'Para empresas que necessitam de presença digital robusta, completa e orientada a vendas.',
    features: [
      'Até 7 Páginas Personalizadas',
      'Design Exclusivo de Alta Conversão',
      'Captura de Leads e Formulários',
      'Integração com Google Analytics',
      'Fundamentos Avançados de SEO',
      'Estrutura Otimizada para Tráfego Pago'
    ],
    cta: 'Pedir Orçamento',
    popular: true
  };

  const custom = pricingData?.custom || {
    title: 'SOLUÇÕES SOB MEDIDA',
    price: 'Sob consulta',
    startingNote: '',
    description: 'Para plataformas, lojas virtuais, sistemas web, portais e automações comerciais com IA.',
    features: [
      'Escopo 100% Personalizado',
      'Painéis e Dashboards Exclusivos',
      'Integrações de Sistemas e APIs',
      'Arquitetura Escalável em Nuvem',
      'Experiência do Usuário Dedicada',
      'Desenvolvimento e Suporte Especializado'
    ],
    cta: 'Fale com a Gente',
    popular: false
  };

  const disclaimer = pricingData?.disclaimer || 
    'O valor final depende dos requisitos específicos, funcionalidades e escopo de cada projeto. Hospedagem e serviços de terceiros são orçados com total transparência.';

  const handlePlanClick = (planName) => {
    trackEvent(`pricing_plan_click_${planName.toLowerCase().replace(/\s+/g, '_')}`);
    const message = `Olá! Vi o site da RydenTec e gostaria de um orçamento para o plano ${planName}.`;
    const url = `https://wa.me/${activeNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="pricing" className="py-24 lg:py-32 relative bg-[#0B1730]/50 border-t border-white/5 overflow-hidden">
      {/* Background Lighting */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[750px] h-[400px] bg-[#087CFF]/10 blur-[170px] pointer-events-none rounded-full"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Cabeçalho */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16 lg:mb-20">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Planos Sob Medida para <span className="gradient-text">Crescimento Real.</span>
          </h2>
          <p className="text-base sm:text-lg text-[#A8B5C7]">
            Invista em um ativo digital que representa sua empresa com excelência e gera contatos qualificados todos os dias.
          </p>
        </div>

        {/* 3 Cards de Planos */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          
          {/* Card 1: STARTER */}
          <div className="rounded-2xl bg-[#101F35]/70 border border-white/10 p-8 flex flex-col justify-between hover:border-white/20 transition-all duration-300 backdrop-blur-xl">
            <div>
              <div className="text-xs font-extrabold tracking-wider text-[#A8B5C7] uppercase mb-2">
                {starter.title}
              </div>
              <div className="flex items-baseline space-x-2 mb-4">
                <span className="text-3xl sm:text-4xl font-black text-white">{starter.price}</span>
              </div>
              <p className="text-xs sm:text-sm text-[#A8B5C7] mb-8 leading-relaxed">
                {starter.description}
              </p>

              <div className="space-y-3 pt-6 border-t border-white/5 mb-8">
                <div className="text-xs font-semibold text-white/90 mb-2">O que está incluído:</div>
                {starter.features.map((feat, idx) => (
                  <div key={idx} className="flex items-center space-x-2.5 text-xs sm:text-sm text-white/80">
                    <Check className="w-4 h-4 text-[#00D5FF] flex-shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => handlePlanClick('Site Starter')}
              className="w-full py-3.5 px-4 rounded-xl bg-[#0B1730] hover:bg-[#087CFF] border border-white/10 hover:border-transparent text-white font-semibold text-sm transition-all duration-200 flex items-center justify-center space-x-2 shadow-sm cursor-pointer"
            >
              <span>{starter.cta}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Card 2: BUSINESS (Mais Escolhido) */}
          <div className="relative rounded-2xl bg-[#101F35] border-2 border-[#00D5FF] p-8 sm:p-9 flex flex-col justify-between shadow-2xl shadow-[#00D5FF]/20 lg:-translate-y-2 backdrop-blur-xl">
            {business.popular && (
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-[#087CFF] to-[#00D5FF] text-white text-[11px] font-extrabold tracking-wide uppercase shadow-md">
                Mais Escolhido
              </div>
            )}

            <div>
              <div className="text-xs font-extrabold tracking-wider text-[#00D5FF] uppercase mb-2">
                {business.title}
              </div>
              <div className="flex items-baseline space-x-2 mb-4">
                <span className="text-3xl sm:text-4xl font-black text-white">{business.price}</span>
              </div>
              <p className="text-xs sm:text-sm text-[#A8B5C7] mb-8 leading-relaxed">
                {business.description}
              </p>

              <div className="space-y-3 pt-6 border-t border-white/10 mb-8">
                <div className="text-xs font-semibold text-white mb-2">Tudo do Starter mais:</div>
                {business.features.map((feat, idx) => (
                  <div key={idx} className="flex items-center space-x-2.5 text-xs sm:text-sm text-white">
                    <Check className="w-4 h-4 text-[#00D5FF] flex-shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => handlePlanClick('Site Business')}
              className="w-full py-4 px-4 rounded-xl bg-gradient-to-r from-[#087CFF] to-[#00D5FF] text-white font-bold text-sm shadow-lg shadow-[#087CFF]/30 hover:shadow-[#087CFF]/50 transition-all duration-200 flex items-center justify-center space-x-2 cursor-pointer"
            >
              <span>{business.cta}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Card 3: SOLUÇÕES SOB MEDIDA */}
          <div className="rounded-2xl bg-[#101F35]/70 border border-white/10 p-8 flex flex-col justify-between hover:border-white/20 transition-all duration-300 backdrop-blur-xl">
            <div>
              <div className="text-xs font-extrabold tracking-wider text-[#A8B5C7] uppercase mb-2">
                {custom.title}
              </div>
              <div className="flex items-baseline space-x-2 mb-4">
                <span className="text-3xl sm:text-4xl font-black text-white">{custom.price}</span>
              </div>
              <p className="text-xs sm:text-sm text-[#A8B5C7] mb-8 leading-relaxed">
                {custom.description}
              </p>

              <div className="space-y-3 pt-6 border-t border-white/5 mb-8">
                <div className="text-xs font-semibold text-white/90 mb-2">Recursos corporativos:</div>
                {custom.features.map((feat, idx) => (
                  <div key={idx} className="flex items-center space-x-2.5 text-xs sm:text-sm text-white/80">
                    <Check className="w-4 h-4 text-[#087CFF] flex-shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => handlePlanClick('Soluções Sob Medida')}
              className="w-full py-3.5 px-4 rounded-xl bg-[#0B1730] hover:bg-[#087CFF] border border-white/10 hover:border-transparent text-white font-semibold text-sm transition-all duration-200 flex items-center justify-center space-x-2 shadow-sm cursor-pointer"
            >
              <span>{custom.cta}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>

        {/* Aviso de Transparência Comercial */}
        <div className="mt-12 p-4 rounded-xl bg-[#101F35]/40 border border-white/5 text-center max-w-3xl mx-auto">
          <p className="text-xs text-[#A8B5C7] leading-relaxed">
            {disclaimer}
          </p>
        </div>

      </div>
    </section>
  );
}
