import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight, CheckCircle2, Smartphone, Monitor, Zap, Sparkles, Instagram, Phone } from 'lucide-react';
import { trackEvent } from '../services/api';

const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v));
const lerp = (a, b, t) => a + (b - a) * t;
const easeInOut = (t) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t);
const mapRange = (v, inMin, inMax, outMin, outMax) => {
  const t = clamp((v - inMin) / (inMax - inMin), 0, 1);
  return lerp(outMin, outMax, easeInOut(t));
};

export default function Hero({ onStartProject, onExploreServices, onExploreShowcase, onProgressChange }) {
  const [elapsed, setElapsed] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const animFrameRef = useRef(null);
  const startTimeRef = useRef(null);

  const DURATION = 4400; // 4.4 segundos

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const media = window.matchMedia('(prefers-reduced-motion: reduce)');
      if (media.matches) {
        setIsReducedMotion(true);
        setIsCompleted(true);
        setElapsed(DURATION);
        if (onProgressChange) onProgressChange(1);
        return;
      }
    }

    const handleScroll = () => {
      if (window.scrollY > 100 && !isCompleted) {
        setIsCompleted(true);
        setElapsed(DURATION);
        if (onProgressChange) onProgressChange(1);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    const step = (timestamp) => {
      if (!startTimeRef.current) startTimeRef.current = timestamp;
      const progressMs = timestamp - startTimeRef.current;
      const clampedMs = Math.min(DURATION, progressMs);
      setElapsed(clampedMs);
      if (onProgressChange) onProgressChange(clampedMs / DURATION);

      if (progressMs < DURATION) {
        animFrameRef.current = requestAnimationFrame(step);
      } else {
        setIsCompleted(true);
        if (onProgressChange) onProgressChange(1);
      }
    };

    animFrameRef.current = requestAnimationFrame(step);

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isCompleted, onProgressChange]);

  const t = isCompleted || isReducedMotion ? 4.4 : elapsed / 1000;

  // 1. Conexão contínua do cabeçalho para o Hero (0.4s a 1.3s)
  const headerConnectorHeight = mapRange(t, 0.45, 1.05, 0, 100);
  const headerConnectorTurn = mapRange(t, 0.95, 1.35, 0, 100);
  const guidesOpacity = mapRange(t, 0.35, 0.7, 0, 1) * (1 - mapRange(t, 3.6, 4.3, 0, 0.7));

  // 2. O título ganha forma (0.85s a 2.3s)
  const baselineOpacity = mapRange(t, 0.8, 1.3, 0, 0.4) * (1 - mapRange(t, 2.0, 2.6, 0, 1));
  const titleLine1Fill = mapRange(t, 0.85, 1.65, 0, 1);
  const titleLine2Mask = mapRange(t, 1.35, 2.35, 100, 0);

  // 3. O botão principal é traçado e preenchido (2.1s a 3.6s)
  const buttonBorderDash = mapRange(t, 2.1, 3.2, 480, 0);
  const buttonFillOpacity = mapRange(t, 2.9, 3.6, 0, 1);
  const buttonContentOpacity = mapRange(t, 2.9, 3.6, 0, 1);

  // 4. Subtítulo, botão secundário e canais diretos (2.5s a 3.6s)
  const supportingOpacity = mapRange(t, 2.4, 3.3, 0, 1);
  const supportingY = mapRange(t, 2.4, 3.3, 12, 0);
  const secondaryBtnOpacity = mapRange(t, 2.8, 3.6, 0, 1);

  // 5. Pilares de confiança (3.3s a 4.2s)
  const trustOpacity = mapRange(t, 3.3, 4.2, 0, 1);
  const trustY = mapRange(t, 3.3, 4.2, 10, 0);

  // 6. Estágio visual à direita: Blueprint Wireframe -> Site Final Desktop + Mobile (0.2s a 4.1s)
  const wireframeOpacity = mapRange(t, 0.15, 0.85, 0, 1) * (1 - mapRange(t, 2.0, 3.2, 0, 0.85));
  const blueprintScanY = mapRange(t, 0.25, 2.6, 0, 100);
  const finalBuildOpacity = mapRange(t, 1.9, 3.3, 0, 1);
  const finalBuildScale = mapRange(t, 1.9, 3.3, 0.96, 1);
  const mobileCardOpacity = mapRange(t, 2.8, 3.9, 0, 1);
  const mobileCardY = mapRange(t, 2.8, 3.9, 24, 0);

  return (
    <section
      id="home"
      className="relative min-h-screen pt-28 sm:pt-32 lg:pt-28 pb-16 sm:pb-20 overflow-hidden flex items-start lg:items-center bg-[#07111F] text-white"
    >
      {/* Grade arquitetural de fundo contínua com o cabeçalho */}
      <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none"></div>

      {/* Iluminação de fundo */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[750px] sm:w-[1100px] h-[520px] bg-gradient-to-b from-[#087CFF]/18 via-[#00D5FF]/8 to-transparent blur-[140px] pointer-events-none rounded-full"></div>
      <div className="absolute bottom-0 right-[-5%] w-[420px] h-[420px] bg-[#087CFF]/15 blur-[130px] pointer-events-none rounded-full"></div>

      {/* Traço contínuo descendo do cabeçalho até a margem do título */}
      {guidesOpacity > 0.02 && (
        <div
          style={{ opacity: guidesOpacity }}
          className="hidden xl:block absolute left-8 top-16 h-44 w-28 pointer-events-none z-20"
        >
          <div
            style={{ height: `${headerConnectorHeight}%` }}
            className="absolute left-0 top-0 w-[1.5px] bg-gradient-to-b from-[#00D5FF] via-[#087CFF] to-[#00D5FF]"
          ></div>
          <div
            style={{ width: `${headerConnectorTurn}%` }}
            className="absolute left-0 bottom-0 h-[1.5px] bg-gradient-to-r from-[#00D5FF] to-transparent"
          ></div>
        </div>
      )}

      {/* CONTEÚDO PRINCIPAL EM 2 COLUNAS */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          
          {/* COLUNA ESQUERDA: Tipografia, Ações e Pilares */}
          <div className="lg:col-span-7 space-y-7">
            
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

              <h1 className="text-3xl sm:text-5xl lg:text-[3.5rem] xl:text-[4rem] font-extrabold tracking-tight text-white leading-[1.15] sm:leading-[1.1]">
                <span
                  style={{
                    opacity: isReducedMotion ? 1 : Math.max(0.3, titleLine1Fill),
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
                opacity: isReducedMotion ? 1 : supportingOpacity,
                transform: `translateY(${isReducedMotion ? 0 : supportingY}px)`,
              }}
              className="text-sm sm:text-lg text-[#A8B5C7] leading-relaxed max-w-2xl font-normal transition-all duration-100"
            >
              Criamos sites modernos, plataformas e software sob medida projetados especificamente para transformar visitantes casuais em clientes qualificados.
            </p>

            {/* Botões Reais */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-1">
              
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
                    buttonFillOpacity > 0.1 || isReducedMotion
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

            {/* Links rápidos WhatsApp e Instagram @rydentec */}
            <div
              style={{ opacity: isReducedMotion ? 1 : secondaryBtnOpacity }}
              className="flex flex-wrap items-center gap-4 text-xs text-[#A8B5C7] pt-1"
            >
              <a
                href="https://wa.me/5534998721299"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center space-x-1.5 hover:text-emerald-400 transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-emerald-400" />
                <span>WhatsApp: (34) 99872-1299</span>
              </a>
              <span className="text-white/20">•</span>
              <a
                href="https://www.instagram.com/rydentec/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center space-x-1.5 hover:text-[#00D5FF] transition-colors"
              >
                <Instagram className="w-3.5 h-3.5 text-[#00D5FF]" />
                <span>@rydentec</span>
              </a>
            </div>

            {/* Três Pilares de Confiança */}
            <div
              style={{
                opacity: isReducedMotion ? 1 : trustOpacity,
                transform: `translateY(${isReducedMotion ? 0 : trustY}px)`,
              }}
              className="pt-5 border-t border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 text-left transition-all duration-100"
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

          {/* COLUNA DIREITA: Estágio Visual de Construção (Blueprint -> Desktop + Mobile) */}
          <div className="lg:col-span-5 relative mt-4 lg:mt-0">
            <div className="relative rounded-2xl border border-[#00D5FF]/25 bg-[#0B1730]/80 backdrop-blur-xl p-4 sm:p-5 shadow-[0_20px_60px_rgba(0,0,0,0.55)] overflow-hidden">
              
              {/* Camada 1: Blueprint Wireframe + Laser Scan */}
              {wireframeOpacity > 0.02 && (
                <div
                  style={{ opacity: isReducedMotion ? 0 : wireframeOpacity }}
                  className="absolute inset-0 z-20 pointer-events-none bg-[#07111F]/90 p-4"
                >
                  <svg className="w-full h-full" viewBox="0 0 480 340" fill="none">
                    <rect x="8" y="8" width="464" height="324" rx="12" stroke="#00D5FF" strokeWidth="1.2" strokeDasharray="6 4" strokeOpacity="0.55" />
                    <line x1="8" y1="46" x2="472" y2="46" stroke="#087CFF" strokeWidth="1" strokeOpacity="0.6" />
                    <circle cx="28" cy="27" r="4" stroke="#00D5FF" strokeWidth="1.2" />
                    <circle cx="44" cy="27" r="4" stroke="#00D5FF" strokeWidth="1.2" />
                    <circle cx="60" cy="27" r="4" stroke="#00D5FF" strokeWidth="1.2" />
                    <rect x="28" y="72" width="240" height="24" rx="5" stroke="#00D5FF" strokeWidth="1.2" strokeOpacity="0.7" />
                    <rect x="28" y="108" width="190" height="14" rx="3" stroke="#087CFF" strokeWidth="1" strokeOpacity="0.45" />
                    <rect x="28" y="140" width="120" height="34" rx="8" stroke="#00D5FF" strokeWidth="1.2" strokeOpacity="0.8" />
                    <rect x="28" y="200" width="130" height="100" rx="8" stroke="#00D5FF" strokeWidth="1" strokeOpacity="0.45" />
                    <rect x="174" y="200" width="130" height="100" rx="8" stroke="#00D5FF" strokeWidth="1" strokeOpacity="0.45" />
                    <rect x="320" y="90" width="132" height="210" rx="16" stroke="#00D5FF" strokeWidth="1.4" strokeDasharray="5 3" strokeOpacity="0.7" />
                  </svg>
                  <div
                    style={{ top: `${blueprintScanY}%` }}
                    className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#00D5FF] to-transparent shadow-[0_0_16px_#00D5FF]"
                  ></div>
                </div>
              )}

              {/* Camada 2: Site Construído (Desktop Preview) */}
              <div
                style={{
                  opacity: isReducedMotion ? 1 : Math.max(0.15, finalBuildOpacity),
                  transform: `scale(${isReducedMotion ? 1 : finalBuildScale})`,
                }}
                className="relative z-10 space-y-4 transition-all duration-200"
              >
                {/* Barra superior do navegador */}
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <div className="flex items-center space-x-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80"></span>
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80"></span>
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80"></span>
                  </div>
                  <div className="px-3 py-1 rounded-full bg-[#07111F] border border-white/10 text-[10px] font-mono text-[#A8B5C7] flex items-center space-x-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                    <span>rydentec.com</span>
                  </div>
                  <Monitor className="w-4 h-4 text-[#00D5FF]" />
                </div>

                {/* Conteúdo do preview */}
                <div className="p-4 rounded-xl bg-gradient-to-br from-[#101F35] to-[#07111F] border border-white/10 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#00D5FF] flex items-center space-x-1">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Arquitetura de Conversão</span>
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                      99 Lighthouse
                    </span>
                  </div>

                  <div className="space-y-1.5">
                    <div className="text-base sm:text-lg font-extrabold text-white leading-snug">
                      Presença digital desenhada para vender todos os dias.
                    </div>
                    <p className="text-xs text-[#A8B5C7]">
                      Integração nativa com WhatsApp, SEO técnico e velocidade extrema.
                    </p>
                  </div>

                  {/* Mini métricas */}
                  <div className="grid grid-cols-3 gap-2 pt-1">
                    <div className="p-2.5 rounded-lg bg-[#07111F]/90 border border-white/5">
                      <div className="text-[10px] text-[#A8B5C7]">Velocidade</div>
                      <div className="text-xs sm:text-sm font-bold text-[#00D5FF] mt-0.5 flex items-center space-x-1">
                        <Zap className="w-3 h-3" />
                        <span>&lt; 0.6s</span>
                      </div>
                    </div>
                    <div className="p-2.5 rounded-lg bg-[#07111F]/90 border border-white/5">
                      <div className="text-[10px] text-[#A8B5C7]">Responsivo</div>
                      <div className="text-xs sm:text-sm font-bold text-white mt-0.5">Desktop &amp; App</div>
                    </div>
                    <div className="p-2.5 rounded-lg bg-[#07111F]/90 border border-white/5">
                      <div className="text-[10px] text-[#A8B5C7]">Conversão</div>
                      <div className="text-xs sm:text-sm font-bold text-emerald-400 mt-0.5">WhatsApp VIP</div>
                    </div>
                  </div>
                </div>

                {/* Rodapé do card + Mini preview mobile acoplado */}
                <div className="flex items-center justify-between gap-3 pt-1">
                  <button
                    onClick={() => {
                      if (onExploreShowcase) onExploreShowcase();
                    }}
                    className="inline-flex items-center space-x-1.5 text-xs font-semibold text-[#00D5FF] hover:text-white transition-colors cursor-pointer"
                  >
                    <span>Explorar vitrine interativa</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <div
                    style={{
                      opacity: isReducedMotion ? 1 : mobileCardOpacity,
                      transform: `translateY(${isReducedMotion ? 0 : mobileCardY}px)`,
                    }}
                    className="flex items-center space-x-2 px-3 py-1.5 rounded-xl bg-[#07111F] border border-[#00D5FF]/35 shadow-lg transition-all duration-200"
                  >
                    <Smartphone className="w-3.5 h-3.5 text-[#00D5FF]" />
                    <span className="text-[11px] font-semibold text-white">100% Mobile Ready</span>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
