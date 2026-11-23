import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { trackEvent } from '../services/api';

const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v));
const lerp = (a, b, t) => a + (b - a) * t;
const easeInOut = (t) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t);
const mapRange = (v, inMin, inMax, outMin, outMax) => {
  const t = clamp((v - inMin) / (inMax - inMin), 0, 1);
  return lerp(outMin, outMax, easeInOut(t));
};

export default function Hero({ onStartProject, onExploreServices }) {
  const [elapsed, setElapsed] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const animFrameRef = useRef(null);
  const startTimeRef = useRef(null);

  const DURATION = 4600; // 4.6 segundos

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const media = window.matchMedia('(prefers-reduced-motion: reduce)');
      if (media.matches) {
        setIsReducedMotion(true);
        setIsCompleted(true);
        setElapsed(DURATION);
        return;
      }
    }

    const handleScroll = () => {
      if (window.scrollY > 80 && !isCompleted) {
        setIsCompleted(true);
        setElapsed(DURATION);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    const step = (timestamp) => {
      if (!startTimeRef.current) startTimeRef.current = timestamp;
      const progressMs = timestamp - startTimeRef.current;
      setElapsed(progressMs);

      if (progressMs < DURATION) {
        animFrameRef.current = requestAnimationFrame(step);
      } else {
        setIsCompleted(true);
      }
    };

    animFrameRef.current = requestAnimationFrame(step);

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isCompleted]);

  const t = isCompleted || isReducedMotion ? 4.6 : elapsed / 1000;

  // 1. Imagem de Construção Digital de Fundo (Wireframe / Blueprint arquitetural do site)
  // Surge forte no início (0.0s a 1.2s) e dissolve suavemente para o fundo enquanto o site é construído por cima
  const blueprintOpacity = mapRange(t, 0.05, 0.8, 0, 0.42) * (1 - mapRange(t, 3.2, 4.4, 0, 0.75));
  const blueprintScanY = mapRange(t, 0.1, 2.5, 0, 100); // linha de scan laser percorrendo o blueprint

  // 2. Traçado Guia lateral que sobe e vira (0.2s a 1.2s)
  const vertLineHeight = mapRange(t, 0.2, 0.8, 0, 100);
  const horizLineWidth = mapRange(t, 0.7, 1.2, 0, 100);
  const guidesOpacity = mapRange(t, 0.1, 0.5, 0, 1) * (1 - mapRange(t, 4.0, 4.5, 0, 1));

  // 3. Ponto ciano de construção percorrendo o layout
  let dotX = 4;
  let dotY = 75;
  let dotVisible = t > 0.15 && t < 4.2 && !isReducedMotion;

  if (t <= 0.8) {
    dotX = 4;
    dotY = mapRange(t, 0.2, 0.8, 75, 28);
  } else if (t <= 1.2) {
    dotX = mapRange(t, 0.8, 1.2, 4, 18);
    dotY = 28;
  } else if (t <= 2.5) {
    dotX = mapRange(t, 1.2, 2.5, 18, 70);
    dotY = mapRange(t, 1.2, 2.5, 28, 38);
  } else if (t <= 4.0) {
    dotX = mapRange(t, 2.5, 4.0, 70, 22);
    dotY = mapRange(t, 2.5, 4.0, 38, 65);
  }

  // 4. O título ganha forma (1.0s a 2.5s)
  const baselineOpacity = mapRange(t, 0.9, 1.4, 0, 0.4) * (1 - mapRange(t, 2.0, 2.6, 0, 1));
  const titleLine1Fill = mapRange(t, 1.0, 1.8, 0, 1);
  const titleLine2Mask = mapRange(t, 1.5, 2.6, 100, 0); // máscara horizontal de 100% a 0%

  // 5. O botão principal é traçado e preenchido (2.4s a 4.0s)
  const buttonBorderDash = mapRange(t, 2.4, 3.6, 480, 0);
  const buttonFillOpacity = mapRange(t, 3.2, 4.0, 0, 1);
  const buttonContentOpacity = mapRange(t, 3.2, 4.0, 0, 1);

  // Subtítulo e botão secundário entram entre 2.8s e 3.8s
  const supportingOpacity = mapRange(t, 2.8, 3.8, 0, 1);
  const supportingY = mapRange(t, 2.8, 3.8, 12, 0);
  const secondaryBtnOpacity = mapRange(t, 3.1, 4.0, 0, 1);

  // Pilares de confiança completam a cena (3.6s a 4.5s)
  const trustOpacity = mapRange(t, 3.6, 4.5, 0, 1);
  const trustY = mapRange(t, 3.6, 4.5, 10, 0);

  return (
    <section id="home" className="relative min-h-screen pt-32 sm:pt-36 lg:pt-40 pb-20 overflow-hidden flex items-start sm:items-center bg-[#07111F] text-white">
      {/* Grade padrão de fundo */}
      <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none"></div>

      {/* 
        IMAGEM DE CONSTRUÇÃO DIGITAL / BLUEPRINT ARQUITETURAL
        Representa a malha estrutural digital do site que nasce primeiro e sobre a qual a RydenTec constrói o layout real
      */}
      <div
        style={{ opacity: blueprintOpacity }}
        className="absolute inset-0 pointer-events-none z-10 overflow-hidden transition-opacity duration-300"
      >
        {/* Mockup arquitetural wireframe / blueprints do site no fundo */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-full lg:w-[65%] h-[80%] max-w-5xl opacity-80 px-4">
          <svg
            className="w-full h-full"
            viewBox="0 0 900 600"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Linhas de grade técnica */}
            <defs>
              <pattern id="blueprint-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#00D5FF" strokeWidth="0.5" strokeOpacity="0.25" />
              </pattern>
            </defs>
            <rect width="900" height="600" fill="url(#blueprint-grid)" opacity="0.6" />

            {/* Janela de wireframe técnico sendo construída */}
            <rect x="50" y="40" width="800" height="520" rx="16" stroke="#00D5FF" strokeWidth="1.5" strokeDasharray="6 4" strokeOpacity="0.5" />
            <line x1="50" y1="100" x2="850" y2="100" stroke="#087CFF" strokeWidth="1.5" strokeOpacity="0.6" />
            
            {/* Detalhes de blueprints arquiteturais digitais */}
            <circle cx="85" cy="70" r="6" stroke="#00D5FF" strokeWidth="1.5" strokeOpacity="0.7" />
            <circle cx="105" cy="70" r="6" stroke="#00D5FF" strokeWidth="1.5" strokeOpacity="0.7" />
            <circle cx="125" cy="70" r="6" stroke="#00D5FF" strokeWidth="1.5" strokeOpacity="0.7" />
            
            <rect x="220" y="58" width="460" height="24" rx="12" stroke="#087CFF" strokeWidth="1" strokeDasharray="4 2" strokeOpacity="0.5" />
            
            {/* Blocos de wireframe em construção */}
            <rect x="90" y="140" width="340" height="36" rx="6" stroke="#00D5FF" strokeWidth="1.5" strokeOpacity="0.6" />
            <rect x="90" y="190" width="280" height="20" rx="4" stroke="#087CFF" strokeWidth="1" strokeOpacity="0.4" />
            <rect x="90" y="220" width="220" height="14" rx="3" stroke="#087CFF" strokeWidth="1" strokeOpacity="0.3" />
            
            {/* Bloco de mídia / imagem técnica com diagonais arquiteturais */}
            <rect x="470" y="140" width="340" height="240" rx="12" stroke="#00D5FF" strokeWidth="1.5" strokeDasharray="8 6" strokeOpacity="0.7" />
            <line x1="470" y1="140" x2="810" y2="380" stroke="#087CFF" strokeWidth="1" strokeOpacity="0.25" />
            <line x1="810" y1="140" x2="470" y2="380" stroke="#087CFF" strokeWidth="1" strokeOpacity="0.25" />
            
            {/* Coordenadas e marcadores técnicos */}
            <text x="480" y="165" fill="#00D5FF" fontSize="11" fontFamily="monospace" opacity="0.8">📐 CAD_FRAME: 1920x1080</text>
            <text x="480" y="365" fill="#087CFF" fontSize="10" fontFamily="monospace" opacity="0.6">RENDER_PASS: DIGITAL_BUILD // ACTIVE</text>
            
            {/* Botões do wireframe */}
            <rect x="90" y="270" width="160" height="44" rx="10" stroke="#00D5FF" strokeWidth="1.5" strokeOpacity="0.7" />
            <rect x="270" y="270" width="140" height="44" rx="10" stroke="#087CFF" strokeWidth="1" strokeOpacity="0.5" />
            
            {/* Cards inferiores */}
            <rect x="90" y="420" width="210" height="90" rx="8" stroke="#00D5FF" strokeWidth="1" strokeOpacity="0.4" />
            <rect x="330" y="420" width="210" height="90" rx="8" stroke="#00D5FF" strokeWidth="1" strokeOpacity="0.4" />
            <rect x="570" y="420" width="240" height="90" rx="8" stroke="#00D5FF" strokeWidth="1" strokeOpacity="0.4" />
          </svg>
        </div>

        {/* Linha laser de escaneamento que varre a construção digital */}
        <div
          style={{ top: `${blueprintScanY}%` }}
          className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#00D5FF] to-transparent shadow-[0_0_15px_#00D5FF] pointer-events-none opacity-60"
        ></div>
      </div>

      {/* Iluminação de fundo */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] sm:w-[1000px] h-[550px] bg-gradient-to-tr from-[#087CFF]/20 via-[#00D5FF]/10 to-transparent blur-[150px] pointer-events-none rounded-full"></div>
      <div className="absolute top-2/3 right-[-5%] w-[400px] h-[400px] bg-[#087CFF]/15 blur-[130px] pointer-events-none rounded-full"></div>

      {/* Linhas guias de traçado */}
      {guidesOpacity > 0.02 && (
        <div
          style={{ opacity: guidesOpacity }}
          className="hidden md:block absolute left-8 lg:left-14 top-28 bottom-28 w-40 pointer-events-none z-30 transition-opacity"
        >
          <div
            style={{ height: `${vertLineHeight}%` }}
            className="absolute left-0 bottom-0 w-[1.5px] bg-gradient-to-t from-transparent via-[#00D5FF] to-[#00D5FF]"
          ></div>
          <div
            style={{ width: `${horizLineWidth}%`, top: '2%' }}
            className="absolute left-0 h-[1.5px] bg-gradient-to-r from-[#00D5FF] to-[#087CFF]"
          ></div>
        </div>
      )}

      {/* Ponto ciano de construção */}
      {dotVisible && (
        <div
          style={{ left: `${dotX}%`, top: `${dotY}%` }}
          className="hidden sm:block absolute z-50 pointer-events-none transform -translate-x-1/2 -translate-y-1/2"
        >
          <div className="w-3 h-3 rounded-full bg-[#00D5FF] shadow-[0_0_12px_#00D5FF] animate-pulse"></div>
          <div className="absolute inset-0 rounded-full bg-[#00D5FF]/40 animate-ping"></div>
        </div>
      )}

      {/* CONTEÚDO PRINCIPAL REAL CONSTRUÍDO POR CIMA */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 w-full">
        <div className="max-w-4xl space-y-8">
          
          {/* Título Principal */}
          <div className="relative">
            {baselineOpacity > 0.02 && (
              <div
                style={{ opacity: baselineOpacity }}
                className="absolute inset-0 pointer-events-none flex flex-col justify-between py-1"
              >
                <div className="w-full border-b border-dashed border-[#00D5FF]/40"></div>
                <div className="w-full border-b border-dashed border-[#087CFF]/40"></div>
              </div>
            )}

            <h1 className="text-3xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.18] sm:leading-[1.12]">
              <span
                style={{
                  opacity: isReducedMotion ? 1 : Math.max(0.35, titleLine1Fill),
                  transition: 'opacity 0.1s linear',
                }}
                className="block text-white/95"
              >
                De uma página em branco
              </span>
              
              <span
                style={{
                  clipPath: `inset(0 ${isReducedMotion ? 0 : titleLine2Mask}% 0 0)`,
                  transition: 'clip-path 0.05s linear',
                }}
                className="block mt-1 sm:mt-2 text-transparent bg-clip-text bg-gradient-to-r from-[#087CFF] via-[#00D5FF] to-white font-black relative"
              >
                ao seu negócio online.
                {!isReducedMotion && titleLine2Mask > 1 && titleLine2Mask < 99 && (
                  <span
                    style={{ right: `${titleLine2Mask}%` }}
                    className="absolute top-0 bottom-0 w-[2px] bg-[#00D5FF] shadow-[0_0_12px_#00D5FF]"
                  ></span>
                )}
              </span>
            </h1>
          </div>

          {/* Subtítulo */}
          <p
            style={{
              opacity: supportingOpacity,
              transform: `translateY(${supportingY}px)`,
            }}
            className="text-sm sm:text-lg lg:text-xl text-[#A8B5C7] leading-relaxed max-w-2xl font-normal transition-all duration-100"
          >
            Criamos sites modernos, plataformas e software sob medida projetados especificamente para transformar visitantes casuais em clientes qualificados.
          </p>

          {/* Botões Reais */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
            
            {/* Botão Primário */}
            <div className="relative inline-block w-full sm:w-auto">
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
                  strokeDashoffset={isReducedMotion ? 0 : buttonBorderDash}
                />
              </svg>

              <button
                onClick={() => {
                  trackEvent('hero_primary_cta_click');
                  onStartProject();
                }}
                style={{
                  backgroundColor: buttonFillOpacity > 0.05 ? undefined : 'transparent',
                  boxShadow: buttonFillOpacity > 0.5 ? '0 10px 30px rgba(8, 124, 255, 0.35)' : 'none',
                }}
                className={`w-full sm:w-auto px-7 py-3.5 sm:px-8 sm:py-4 rounded-xl font-semibold text-sm sm:text-base transition-all duration-200 flex items-center justify-center space-x-2 group relative z-20 overflow-hidden cursor-pointer ${
                  buttonFillOpacity > 0.1
                    ? 'bg-gradient-to-r from-[#087CFF] to-[#00D5FF] text-white hover:scale-[1.02] active:scale-98'
                    : 'text-transparent'
                }`}
              >
                <span
                  style={{ opacity: isReducedMotion ? 1 : buttonContentOpacity }}
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
                trackEvent('hero_secondary_cta_click');
                onExploreServices();
              }}
              style={{
                opacity: isReducedMotion ? 1 : secondaryBtnOpacity,
                pointerEvents: (secondaryBtnOpacity > 0.3 || isReducedMotion) ? 'auto' : 'none',
              }}
              className="w-full sm:w-auto px-6 py-3.5 sm:px-7 sm:py-4 rounded-xl bg-[#101F35]/80 border border-white/10 text-white font-semibold text-sm sm:text-base hover:bg-white/10 hover:border-[#087CFF]/50 transition-all duration-200 flex items-center justify-center space-x-2 backdrop-blur-md cursor-pointer"
            >
              <span>Conhecer Serviços</span>
            </button>
          </div>

          {/* Três Pilares de Confiança */}
          <div
            style={{
              opacity: isReducedMotion ? 1 : trustOpacity,
              transform: `translateY(${trustY}px)`,
            }}
            className="pt-6 border-t border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 text-left transition-all duration-100"
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
    </section>
  );
}
