import React from 'react';
import { Sliders, Compass, Zap, TrendingUp, ShieldCheck } from 'lucide-react';

export default function WhyChooseUs() {
  const pillars = [
    {
      number: '01',
      title: 'Soluções Sob Medida',
      statement: 'Cada empresa é única. Sua presença digital precisa refletir essa realidade.',
      detail: 'Criamos arquiteturas desenhadas em torno do seu fluxo de trabalho, dos seus clientes e dos seus objetivos comerciais reais — nunca usamos templates genéricos.',
      icon: Sliders
    },
    {
      number: '02',
      title: 'Design com Propósito',
      statement: 'Combinamos alto padrão visual com experiência intuitiva e metas claras de negócio.',
      detail: 'A estética sofisticada eleva a credibilidade da sua marca e conduz o visitante com clareza para ações decisivas que geram contato e vendas.',
      icon: Compass
    },
    {
      number: '03',
      title: 'Foco Total em Desempenho',
      statement: 'Experiências ultra-responsivas, arquitetura limpa e cuidado com cada milissegundo.',
      detail: 'Carregamento instantâneo, tipografia impecável, ergonomia pensada para mobile e engenharia moderna sem dependências desnecessárias.',
      icon: Zap
    },
    {
      number: '04',
      title: 'Pronto para Escalar',
      statement: 'Soluções digitais pensadas desde o início para o crescimento futuro.',
      detail: 'Estrutura modular que permite expandir seu site para softwares sob medida, áreas de membros e automações conforme seu faturamento aumenta.',
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
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Tecnologia É Poderosa. <br className="hidden sm:inline" />
            <span className="gradient-text">O Parceiro Certo Faz Dela Um Grande Investimento.</span>
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
                  <span>Padrão RydenTec de Engenharia Digital</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
