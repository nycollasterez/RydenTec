import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight, CheckCircle2, ChevronDown } from 'lucide-react';
import { trackEvent } from '../services/api';

const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v));
const lerp = (a, b, t) => a + (b - a) * t;
const easeInOut = (t) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t);
const mapRange = (v, inMin, inMax, outMin, outMax) => {
  const t = clamp((v - inMin) / (inMax - inMin), 0, 1);
  return lerp(outMin, outMax, easeInOut(t));
};

export default function ScrollDrivenHero({ onStartProject, onExploreServices }) {
  const containerRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const media = window.matchMedia('(prefers-reduced-motion: reduce)');
      setIsReducedMotion(media.matches);
    }

    const handleScroll = () => {
      const el = containerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const totalScroll = el.offsetHeight - window.innerHeight;
      if (totalScroll <= 0) return;
      const scrolled = -rect.top;
      const p = clamp(scrolled / totalScroll, 0, 1);
      setProgress(p);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const p = isReducedMotion ? 1 : progress;

  // 1. Linha guia lateral
  const guideLineHeight = mapRange(p, 0.02, 0.25, 0, 100);
  const guideLineOpacity = mapRange(p, 0, 0.05, 0, 1) * (1 - mapRange(p, 0.85, 0.95, 0, 1));

  // 2. Revelação horizontal da 2ª linha do título: "ao seu negócio online." (8% a 38%)
  const titleMaskPercent = mapRange(p, 0.08, 0.38, 100, 0);

  // 3. Traçado do botão "Iniciar Projeto" (35% a 65%)
  const buttonBorderDash = mapRange(p, 0.35, 0.65, 480, 0);
  const buttonFillOpacity = mapRange(p, 0.48, 0.70, 0, 1);
  const buttonTextOpacity = mapRange(p, 0.46, 0.68, 0, 1);

  // 4. Texto de apoio e botão secundário (55% a 80%)
  const supportingOpacity = mapRange(p, 0.52, 0.75, 0, 1);
  const supportingY = mapRange(p, 0.52, 0.75, 12, 0);
  const secondaryBtnOpacity = mapRange(p, 0.58, 0.80, 0, 1);

  // 5. Pilares de valor da RydenTec (70% a 92%)
  const trustOpacity = mapRange(p, 0.70, 0.90, 0, 1);
  const trustY = mapRange(p, 0.70, 0.90, 12, 0);

  // 6. Cursor de design
  const cursorOpacity = mapRange(p, 0.02, 0.75, 0, 1) * (1 - mapRange(p, 0.78, 0.88, 0, 1));
  const cursorX = p < 0.40
    ? mapRange(p, 0.05, 0.38, 8, 70)
    : mapRange(p, 0.38, 0.68, 70, 22);
  const cursorY = p < 0.40
    ? mapRange(p, 0.05, 0.38, 28, 38)
    : mapRange(p, 0.38, 0.68, 38, 62);

  const scrollHintOpacity = 1 - mapRange(p, 0, 0.08, 0, 1);

  return (
    <div ref={containerRef} className="relative w-full" style={{ height: isReducedMotion ? 'auto' : '250vh' }}>
      {/* 
        Container da dobra com padding-top generoso para garantir que no mobile
        o título nunca sobreponha o header fixo da RydenTec (pt-28 sm:pt-36 lg:pt-40)
      */}
      <div className={`${isReducedMotion ? 'relative min-h-screen py-32' : 'sticky top-0 left-0 w-full h-screen'} overflow-hidden flex items-start sm:items-center bg-[#07111F] text-white select-none`}>
        
        {/* Iluminação de fundo */}
        <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none"></div>
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] sm:w-[1000px] h-[500px] bg-gradient-to-tr from-[#087CFF]/20 via-[#00D5FF]/10 to-transparent blur-[140px] pointer-events-none rounded-full"></div>
        <div className="absolute top-2/3 right-[-5%] w-[350px] h-[350px] bg-[#087CFF]/15 blur-[120px] pointer-events-none rounded-full"></div>

        {/* Linha guia de medição (oculta no mobile para manter visual limpo) */}
        <div
          style={{
            height: `${guideLineHeight}%`,
            opacity: guideLineOpacity,
          }}
          className="hidden md:block absolute left-8 lg:left-16 top-0 w-px bg-gradient-to-b from-[#00D5FF] via-[#087CFF] to-transparent pointer-events-none z-30 transition-all duration-75"
        >
          <div className="absolute bottom-0 -left-1 w-2.5 h-2.5 rounded-full bg-[#00D5FF] shadow-[0_0_8px_#00D5FF]"></div>
          <span className="absolute bottom-3 left-3 text-[10px] font-mono tracking-wider text-[#00D5FF] whitespace-nowrap bg-[#07111F]/80 px-1 rounded">
            GUIDE: {(p * 100).toFixed(0)}%
          </span>
        </div>

        {/* Cursor de design da RydenTec (oculto no mobile para ergonomia do toque) */}
        {cursorOpacity > 0.05 && !isReducedMotion && (
          <div
            style={{
              left: `${cursorX}%`,
              top: `${cursorY}%`,
              opacity: cursorOpacity,
            }}
            className="hidden sm:flex absolute z-50 pointer-events-none transition-all duration-75 items-center gap-2 transform -translate-x-2 -translate-y-2"
          >
            <svg width="22" height="26" viewBox="0 0 22 28" fill="none">
              <path
                d="M2 2L2 22L8 16L12 26L15 24.5L11 14.5L18 14.5L2 2Z"
                fill="#00D5FF"
                stroke="#07111F"
                strokeWidth="2"
                strokeLinejoin="round"
              />
            </svg>
            <span className="px-2 py-0.5 rounded-md bg-[#00D5FF] text-[#07111F] text-[10px] font-mono font-bold shadow-lg shadow-[#00D5FF]/30 tracking-wider">
              {p < 0.40 ? 'DRAWING: TITLE' : 'CREATING: CTA'}
            </span>
          </div>
        )}

        {/* Conteúdo Principal com espaçamento seguro abaixo do cabeçalho */}
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 relative z-20 w-full pt-24 sm:pt-28 lg:pt-32 pb-16">
          <div className="max-w-4xl space-y-6 sm:space-y-8">
            
            {/* Título Principal */}
            <div className="relative">
              <h1 className="text-3xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.18] sm:leading-[1.12]">
                <span className="block text-white/95">
                  De uma página em branco
                </span>
                
                <span
                  style={{
                    clipPath: `inset(0 ${titleMaskPercent}% 0 0)`,
                    transition: 'clip-path 0.05s linear',
                  }}
                  className="block mt-1 sm:mt-2 text-transparent bg-clip-text bg-gradient-to-r from-[#087CFF] via-[#00D5FF] to-white font-black relative"
                >
                  ao seu negócio online.
                  {titleMaskPercent > 1 && titleMaskPercent < 98 && (
                    <span
                      style={{ right: `${titleMaskPercent}%` }}
                      className="absolute top-0 bottom-0 w-0.5 bg-[#00D5FF] shadow-[0_0_12px_#00D5FF]"
                    ></span>
                  )}
                </span>
              </h1>
            </div>

            {/* Texto de Apoio */}
            <p
              style={{
                opacity: supportingOpacity,
                transform: `translateY(${supportingY}px)`,
              }}
              className="text-sm sm:text-lg lg:text-xl text-[#A8B5C7] leading-relaxed max-w-2xl font-normal transition-all duration-100"
            >
              Criamos sites modernos, plataformas e software sob medida projetados especificamente para transformar visitantes casuais em clientes qualificados.
            </p>

            {/* Botões de Ação */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 sm:gap-4 pt-1 sm:pt-2">
              
              {/* Botão Primário: SVG ajustado exatamente às proporções responsivas */}
              <div className="relative w-full sm:w-auto">
                <svg
                  className="absolute inset-0 w-full h-full pointer-events-none z-10 rounded-xl"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    x="1.5"
                    y="1.5"
                    width="calc(100% - 3px)"
                    height="calc(100% - 3px)"
                    rx="11"
                    stroke="#00D5FF"
                    strokeWidth="2.5"
                    strokeDasharray="480"
                    strokeDashoffset={buttonBorderDash}
                  />
                </svg>

                <button
                  onClick={() => {
                    trackEvent('hero_scroll_primary_cta_click');
                    onStartProject();
                  }}
                  style={{
                    backgroundColor: buttonFillOpacity > 0.05 ? undefined : 'transparent',
                    boxShadow: buttonFillOpacity > 0.5 ? '0 10px 30px rgba(8, 124, 255, 0.35)' : 'none',
                  }}
                  className={`w-full sm:w-auto px-7 py-3.5 sm:px-8 sm:py-4 rounded-xl font-semibold text-sm sm:text-base transition-all duration-200 flex items-center justify-center space-x-2 group relative z-20 overflow-hidden ${
                    buttonFillOpacity > 0.1
                      ? 'bg-gradient-to-r from-[#087CFF] to-[#00D5FF] text-white hover:scale-[1.02] active:scale-98 cursor-pointer'
                      : 'text-transparent'
                  }`}
                >
                  <span
                    style={{ opacity: buttonTextOpacity }}
                    className="flex items-center space-x-2"
                  >
                    <span>Iniciar Projeto</span>
                    <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-200 group-hover:translate-x-1" />
                  </span>
                </button>
              </div>

              {/* Botão Secundário */}
              <button
                onClick={() => {
                  trackEvent('hero_scroll_secondary_cta_click');
                  onExploreServices();
                }}
                style={{
                  opacity: secondaryBtnOpacity,
                  pointerEvents: secondaryBtnOpacity > 0.4 ? 'auto' : 'none',
                }}
                className="w-full sm:w-auto px-6 py-3.5 sm:px-7 sm:py-4 rounded-xl bg-[#101F35]/80 border border-white/10 text-white font-semibold text-sm sm:text-base hover:bg-white/10 hover:border-[#087CFF]/50 transition-all duration-200 flex items-center justify-center space-x-2 backdrop-blur-md cursor-pointer"
              >
                <span>Conhecer Serviços</span>
              </button>
            </div>

            {/* Pilares de Valor (Grid limpo com margens proporcionais para mobile) */}
            <div
              style={{
                opacity: trustOpacity,
                transform: `translateY(${trustY}px)`,
              }}
              className="pt-5 sm:pt-6 border-t border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 text-left transition-all duration-100"
            >
              <div className="flex items-start space-x-2.5">
                <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-[#00D5FF] flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs sm:text-sm font-semibold text-white">Feito para o Seu Negócio</h4>
                  <p className="text-[11px] sm:text-xs text-[#A8B5C7] mt-0.5">Arquitetura sob medida para seus objetivos comerciais</p>
                </div>
              </div>

              <div className="flex items-start space-x-2.5">
                <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-[#087CFF] flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs sm:text-sm font-semibold text-white">Design &amp; Alta Conversão</h4>
                  <p className="text-[11px] sm:text-xs text-[#A8B5C7] mt-0.5">Experiências ultra-rápidas para mobile e desktop</p>
                </div>
              </div>

              <div className="flex items-start space-x-2.5">
                <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-[#00D5FF] flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs sm:text-sm font-semibold text-white">Tecnologia Escalável</h4>
                  <p className="text-[11px] sm:text-xs text-[#A8B5C7] mt-0.5">Sistemas prontos para a expansão da empresa</p>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Indicação Discreta de Rolagem */}
        <div
          style={{
            opacity: scrollHintOpacity,
            pointerEvents: 'none',
          }}
          className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-[#A8B5C7] transition-opacity duration-300"
        >
          <span className="tracking-widest uppercase text-[9px] sm:text-[10px] text-[#00D5FF] font-semibold">Role para montar</span>
          <ChevronDown className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#00D5FF] animate-bounce" />
        </div>

      </div>
    </div>
  );
}
