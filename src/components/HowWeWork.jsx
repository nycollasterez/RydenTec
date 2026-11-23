import React, { useEffect, useRef, useState } from 'react';
import { 
  MessageSquare, 
  FileText, 
  Code2, 
  Rocket, 
  LifeBuoy, 
  ArrowRight
} from 'lucide-react';

export default function HowWeWork({ onStartProject }) {
  const sectionRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0.2);

  const steps = [
    {
      step: '01',
      title: 'Conversa Inicial',
      tagline: 'Diagnóstico & Alinhamento',
      description: 'Entendemos seu modelo de negócio, seus objetivos e os desafios que sua presença digital precisa resolver.',
      icon: MessageSquare
    },
    {
      step: '02',
      title: 'Estratégia & Escopo',
      tagline: 'Arquitetura da Solução',
      description: 'Definimos o escopo detalhado, cronograma de entregas, estrutura recomendada e investimento.',
      icon: FileText
    },
    {
      step: '03',
      title: 'Design & Desenvolvimento',
      tagline: 'Construção Sob Medida',
      description: 'Transformamos a direção aprovada em uma experiência digital funcional, bonita e ultra-rápida.',
      icon: Code2
    },
    {
      step: '04',
      title: 'Revisão & Lançamento',
      tagline: 'Polimento & Publicação',
      description: 'Revisamos cada detalhe com você, realizamos os testes finais de performance e colocamos seu projeto no ar.',
      icon: Rocket
    },
    {
      step: '05',
      title: 'Evolução & Suporte',
      tagline: 'Segurança & Estabilidade',
      description: 'Mantemos seu ecossistema digital sempre atualizado, estável e pronto para novas fases de crescimento.',
      icon: LifeBuoy
    }
  ];

  useEffect(() => {
    const handleScroll = () => {
      const el = sectionRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const windowH = window.innerHeight;
      
      // Quando a seção entra na tela até quando sai
      const totalDist = rect.height + windowH;
      const currentDist = windowH - rect.top;
      const p = Math.min(1, Math.max(0, currentDist / totalDist));
      setScrollProgress(p);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Índice da etapa ativa baseado na rolagem (0 a 4)
  const activeIndex = Math.min(4, Math.floor(scrollProgress * 5.2));
  const lineWidthPercent = Math.min(100, Math.max(10, scrollProgress * 115));

  return (
    <section ref={sectionRef} id="how-we-work" className="py-24 lg:py-32 relative bg-[#07111F] overflow-hidden border-t border-white/5">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[350px] bg-[#087CFF]/10 blur-[150px] pointer-events-none rounded-full"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Cabeçalho */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16 lg:mb-24">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Da Sua Ideia à <span className="gradient-text">Realidade Digital.</span>
          </h2>
          <p className="text-base sm:text-lg text-[#A8B5C7]">
            Um processo claro, transparente e eficiente da primeira conversa até a entrega final.
          </p>
        </div>

        {/* Linha Fina Dinâmica Horizontal (Desktop lg+) */}
        <div className="hidden lg:block relative mb-16">
          {/* Linha base cinza */}
          <div className="absolute top-14 left-10 right-10 h-0.5 bg-white/10"></div>
          
          {/* Linha ciano animada que avança conforme a pessoa rola */}
          <div
            style={{ width: `${lineWidthPercent}%` }}
            className="absolute top-14 left-10 h-0.5 bg-gradient-to-r from-[#087CFF] via-[#00D5FF] to-[#00D5FF] shadow-[0_0_10px_#00D5FF] transition-all duration-300"
          ></div>

          <div className="grid grid-cols-5 gap-4 relative z-10">
            {steps.map((item, index) => {
              const Icon = item.icon;
              const isPassedOrCurrent = index <= activeIndex;
              return (
                <div key={item.step} className="flex flex-col items-center text-center group">
                  {/* Ponto / Nó da Etapa */}
                  <div className={`w-16 h-16 rounded-2xl transition-all duration-300 flex items-center justify-center shadow-lg mb-6 relative cursor-default ${
                    isPassedOrCurrent
                      ? 'bg-[#101F35] border-2 border-[#00D5FF] text-[#00D5FF] shadow-[#00D5FF]/20 scale-105'
                      : 'bg-[#0B1730] border border-white/10 text-[#A8B5C7]'
                  }`}>
                    <Icon className={`w-7 h-7 transition-colors ${isPassedOrCurrent ? 'text-[#00D5FF]' : 'text-[#A8B5C7]'}`} />
                    <span className={`absolute -top-2.5 -right-2 px-1.5 py-0.5 rounded text-[10px] font-mono font-bold ${
                      isPassedOrCurrent ? 'bg-[#00D5FF] text-[#07111F]' : 'bg-[#101F35] text-[#A8B5C7]'
                    }`}>
                      {item.step}
                    </span>
                  </div>

                  {/* Detalhes */}
                  <h3 className={`text-lg font-bold transition-colors ${
                    isPassedOrCurrent ? 'text-white' : 'text-[#A8B5C7]'
                  }`}>
                    {item.title}
                  </h3>
                  <div className="text-[11px] font-semibold text-[#00D5FF] mb-2">{item.tagline}</div>
                  <p className="text-xs text-[#A8B5C7] leading-relaxed max-w-[200px]">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Linha Vertical Conectada (Mobile e Tablet < lg) */}
        <div className="lg:hidden relative pl-6 border-l-2 border-[#00D5FF]/40 space-y-10 ml-4 mb-12">
          {steps.map((item, index) => {
            const Icon = item.icon;
            const isPassedOrCurrent = index <= activeIndex;
            return (
              <div key={item.step} className="relative group">
                {/* Ponto vertical com destaque ciano */}
                <div className={`absolute -left-[35px] top-0 w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs shadow-md transition-all ${
                  isPassedOrCurrent
                    ? 'bg-[#0B1730] border-2 border-[#00D5FF] text-[#00D5FF] shadow-[#00D5FF]/30'
                    : 'bg-[#07111F] border border-white/20 text-[#A8B5C7]'
                }`}>
                  {item.step}
                </div>

                <div className={`p-5 rounded-2xl bg-[#101F35]/70 border transition-all ${
                  isPassedOrCurrent ? 'border-[#00D5FF]/40' : 'border-white/5'
                }`}>
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

        {/* CTA final do processo */}
        <div className="text-center pt-8">
          <button
            onClick={onStartProject}
            className="inline-flex items-center space-x-2 text-sm font-semibold text-[#00D5FF] hover:text-white transition-colors group cursor-pointer"
          >
            <span>Pronto para iniciar o Passo 01? Fale com a gente sobre seu projeto</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>

      </div>
    </section>
  );
}
