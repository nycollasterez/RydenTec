import React, { useEffect, useRef, useState, useCallback } from 'react';
import {
  ArrowRight,
  CheckCircle2,
  Smartphone,
  Monitor,
  Instagram,
  Phone,
  Code2,
  Compass,
  RotateCcw
} from 'lucide-react';
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
  const [stageMode, setStageMode] = useState('desktop'); // 'desktop' | 'mobile' | 'code' | 'blueprint'
  const [pointer, setPointer] = useState({ px: 0, py: 0, active: false });
  const [cardTilt, setCardTilt] = useState({ rx: 0, ry: 0 });
  const [runKey, setRunKey] = useState(0);

  const sectionRef = useRef(null);
  const animFrameRef = useRef(null);
  const startTimeRef = useRef(null);

  const DURATION = 4200; // 4.2 segundos

  const runAnimation = useCallback(() => {
    if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    startTimeRef.current = null;
    setIsCompleted(false);
    setElapsed(0);
    if (onProgressChange) onProgressChange(0);

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
  }, [onProgressChange]);

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

    runAnimation();

    const handleScroll = () => {
      if (window.scrollY > 180) {
        if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
        setIsCompleted(true);
        setElapsed(DURATION);
        if (onProgressChange) onProgressChange(1);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [runKey, runAnimation, onProgressChange]);

  const handleReplay = () => {
    trackEvent('hero_replay_motion');
    setStageMode('desktop');
    setRunKey((k) => k + 1);
  };

  const handleSectionMouseMove = (e) => {
    if (!sectionRef.current || isReducedMotion) return;
    const rect = sectionRef.current.getBoundingClientRect();
    setPointer({
      px: e.clientX - rect.left,
      py: e.clientY - rect.top,
      active: true,
    });
  };

  const handleStageMouseMove = (e) => {
    if (isReducedMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const nx = (e.clientX - rect.left) / rect.width - 0.5;
    const ny = (e.clientY - rect.top) / rect.height - 0.5;
    setCardTilt({ rx: -ny * 4.5, ry: nx * 5.5 });
  };

  const handleStageMouseLeave = () => {
    setCardTilt({ rx: 0, ry: 0 });
  };

  const t = isCompleted || isReducedMotion ? 4.2 : elapsed / 1000;

  // 1. Conexão contínua do cabeçalho RydenTec para o Hero (0.4s a 1.3s)
  const headerConnectorHeight = mapRange(t, 0.4, 1.0, 0, 100);
  const headerConnectorTurn = mapRange(t, 0.9, 1.3, 0, 100);
  const guidesOpacity = mapRange(t, 0.3, 0.65, 0, 1) * (1 - mapRange(t, 3.2, 4.0, 0, 1));

  // 2. O título RydenTec ganha forma (0.8s a 2.2s)
  const baselineOpacity = mapRange(t, 0.75, 1.2, 0, 0.45) * (1 - mapRange(t, 1.9, 2.5, 0, 1));
  const titleLine1Fill = mapRange(t, 0.8, 1.55, 0, 1);
  const titleLine2Mask = mapRange(t, 1.25, 2.25, 100, 0);

  // 3. O botão principal RydenTec é traçado e preenchido (2.0s a 3.4s)
  const buttonBorderDash = mapRange(t, 2.0, 3.05, 480, 0);
  const buttonFillOpacity = mapRange(t, 2.75, 3.45, 0, 1);
  const buttonContentOpacity = mapRange(t, 2.75, 3.45, 0, 1);

  // 4. Subtítulo e botão secundário RydenTec (2.3s a 3.4s)
  const supportingOpacity = mapRange(t, 2.25, 3.1, 0, 1);
  const supportingY = mapRange(t, 2.25, 3.1, 12, 0);
  const secondaryBtnOpacity = mapRange(t, 2.65, 3.45, 0, 1);

  // 5. Pilares de confiança (3.15s a 4.0s)
  const trustOpacity = mapRange(t, 3.15, 4.0, 0, 1);
  const trustY = mapRange(t, 3.15, 4.0, 10, 0);

  // 6. Coreografia do Site de Arquitetura ("Espaços para viver") sendo montado inteiro no palco (0.15s a 3.8s)
  const archFrameOpacity = mapRange(t, 0.1, 0.5, 0, 1);
  const archWireframeGridOpacity = 1 - mapRange(t, 1.6, 2.6, 0, 1);
  const archNavOpacity = mapRange(t, 0.45, 1.15, 0, 1);
  const archNavY = mapRange(t, 0.45, 1.15, -8, 0);
  const archPhotoMask = mapRange(t, 0.85, 2.2, 100, 0); // revelação da imagem inteira da casa
  const archTitleOpacity = mapRange(t, 1.4, 2.3, 0, 1);
  const archTitleY = mapRange(t, 1.4, 2.3, 14, 0);
  const archDescOpacity = mapRange(t, 2.0, 2.9, 0, 1);
  const archDescY = mapRange(t, 2.0, 2.9, 10, 0);
  const archBtnDash = mapRange(t, 2.6, 3.4, 340, 0);
  const archBtnOpacity = mapRange(t, 2.8, 3.6, 0, 1);

  const mobileBadgeOpacity = mapRange(t, 3.0, 3.9, 0, 1);
  const mobileBadgeY = mapRange(t, 3.0, 3.9, 12, 0);

  return (
    <section
      id="home"
      ref={sectionRef}
      onMouseMove={handleSectionMouseMove}
      onMouseLeave={() => setPointer((p) => ({ ...p, active: false }))}
      className="relative min-h-screen pt-24 sm:pt-28 lg:pt-28 pb-16 sm:pb-20 overflow-hidden flex items-start lg:items-center bg-[#07111F] text-white"
    >
      {/* Grade arquitetural de fundo contínua com o cabeçalho */}
      <div className="absolute inset-0 bg-grid-pattern opacity-35 pointer-events-none"></div>

      {/* Spotlight dinâmico seguindo o cursor sobre a grade */}
      {pointer.active && !isReducedMotion && (
        <div
          style={{
            background: `radial-gradient(520px circle at ${pointer.px}px ${pointer.py}px, rgba(0, 213, 255, 0.11), rgba(8, 124, 255, 0.04) 45%, transparent 75%)`,
          }}
          className="absolute inset-0 pointer-events-none transition-opacity duration-300 z-0"
        ></div>
      )}

      {/* Feixes luminosos sutis percorrendo a malha horizontal */}
      <div className="absolute top-[28%] left-0 right-0 h-[1px] overflow-hidden pointer-events-none opacity-45">
        <div className="w-1/3 h-full bg-gradient-to-r from-transparent via-[#00D5FF] to-transparent animate-beam-h"></div>
      </div>
      <div className="absolute top-[74%] left-0 right-0 h-[1px] overflow-hidden pointer-events-none opacity-30">
        <div
          style={{ animationDelay: '2.4s' }}
          className="w-1/4 h-full bg-gradient-to-r from-transparent via-[#087CFF] to-transparent animate-beam-h"
        ></div>
      </div>

      {/* Iluminação ambiente */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[750px] sm:w-[1100px] h-[520px] bg-gradient-to-b from-[#087CFF]/18 via-[#00D5FF]/8 to-transparent blur-[140px] pointer-events-none rounded-full"></div>
      <div className="absolute bottom-0 right-[-5%] w-[420px] h-[420px] bg-[#087CFF]/15 blur-[130px] pointer-events-none rounded-full"></div>

      {/* Traço contínuo descendo do cabeçalho até a margem do título no desktop */}
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

      {/* CONTEÚDO PRINCIPAL — NO MOBILE: PALCO EM CIMA (order-1) E TÍTULO ABAIXO (order-2) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          
          {/* COLUNA DO TÍTULO E AÇÕES (Embaixo no mobile: order-2 | Esquerda no desktop: lg:order-1) */}
          <div className="order-2 lg:order-1 lg:col-span-6 space-y-5 sm:space-y-7">
            
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

              <h1 className="text-3xl sm:text-5xl lg:text-[3.3rem] xl:text-[3.9rem] font-extrabold tracking-tight text-white leading-[1.15] sm:leading-[1.09]">
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
                      className="absolute top-0 bottom-0 w-[2px] bg-[#00D5FF] shadow-[0_0_14px_#00D5FF]"
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
              className="text-sm sm:text-lg text-[#A8B5C7] leading-relaxed max-w-xl font-normal transition-all duration-100"
            >
              Criamos sites modernos, lojas virtuais e sistemas sob medida projetados para transformar visitantes casuais em clientes reais no WhatsApp.
            </p>

            {/* Botões Reais */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 sm:gap-4 pt-1">
              
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
              className="flex flex-wrap items-center gap-4 text-xs text-[#A8B5C7] pt-0.5"
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
                  <p className="text-[11px] sm:text-xs text-[#A8B5C7] mt-0.5">Sob medida para suas metas reais</p>
                </div>
              </div>

              <div className="flex items-start space-x-2.5">
                <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-[#087CFF] flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs sm:text-sm font-semibold text-white">Design &amp; Conversão</h4>
                  <p className="text-[11px] sm:text-xs text-[#A8B5C7] mt-0.5">Velocidade máxima no celular e PC</p>
                </div>
              </div>

              <div className="flex items-start space-x-2.5">
                <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-[#00D5FF] flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs sm:text-sm font-semibold text-white">Tecnologia Escalável</h4>
                  <p className="text-[11px] sm:text-xs text-[#A8B5C7] mt-0.5">Pronto para crescer com sua empresa</p>
                </div>
              </div>
            </div>
          </div>

          {/* PALCO DO SITE DE ARQUITETURA (Em cima no mobile: order-1 | Direita no desktop: lg:order-2) */}
          <div
            className="order-1 lg:order-2 lg:col-span-6 relative"
            style={{ perspective: '1200px' }}
          >
            <div
              onMouseMove={handleStageMouseMove}
              onMouseLeave={handleStageMouseLeave}
              style={{
                opacity: isReducedMotion ? 1 : Math.max(0.45, archFrameOpacity),
                transform: `rotateX(${cardTilt.rx}deg) rotateY(${cardTilt.ry}deg)`,
                transition: 'transform 0.18s ease-out',
              }}
              className="relative rounded-2xl border border-[#00D5FF]/35 bg-[#0B1730]/90 backdrop-blur-xl shadow-[0_25px_70px_rgba(0,0,0,0.65)] overflow-hidden"
            >
              {/* Barra Superior de Controle */}
              <div className="px-3.5 sm:px-4 py-2.5 sm:py-3 bg-[#07111F]/95 border-b border-white/10 flex flex-wrap items-center justify-between gap-2 relative z-30">
                <div className="flex items-center space-x-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80"></span>
                  <span className="ml-2 text-[10px] font-mono text-[#A8B5C7] hidden sm:inline">
                    arquitetura.rydentec.com
                  </span>
                </div>

                {/* Alternador ao vivo */}
                <div className="flex items-center bg-[#101F35] p-0.5 rounded-lg border border-white/10 text-[10px] sm:text-[11px]">
                  {[
                    { id: 'desktop', label: 'Site', icon: Monitor },
                    { id: 'mobile', label: 'Celular', icon: Smartphone },
                    { id: 'code', label: 'Código', icon: Code2 },
                    { id: 'blueprint', label: 'Blueprint', icon: Compass },
                  ].map((tab) => {
                    const Icon = tab.icon;
                    const active = stageMode === tab.id;
                    return (
                      <button
                        key={tab.id}
                        type="button"
                        onClick={() => {
                          setStageMode(tab.id);
                          trackEvent(`hero_stage_mode_${tab.id}`);
                        }}
                        className={`flex items-center space-x-1 px-2 sm:px-2.5 py-1 rounded-md font-semibold transition-all cursor-pointer ${
                          active
                            ? 'bg-gradient-to-r from-[#087CFF] to-[#00D5FF] text-white shadow-sm'
                            : 'text-[#A8B5C7] hover:text-white'
                        }`}
                      >
                        <Icon className="w-3 h-3" />
                        <span>{tab.label}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Botão Replay */}
                <button
                  type="button"
                  onClick={handleReplay}
                  title="Assistir montagem novamente"
                  className="p-1.5 rounded-lg bg-[#101F35] border border-white/10 text-[#00D5FF] hover:text-white hover:border-[#00D5FF]/60 transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* ÁREA DO SITE INTEIRO SENDO MONTADO NO HERO */}
              <div className="relative bg-[#07111F]">
                
                {/* MODO SITE — EXATAMENTE O MODELO "ESPAÇOS PARA VIVER" INTEIRO MONTANDO AO VIVO */}
                {stageMode === 'desktop' && (
                  <div className="relative w-full aspect-[16/10.5] min-h-[270px] sm:min-h-[345px] overflow-hidden bg-[#081322] select-none">
                    
                    {/* Esqueleto Blueprint inicial antes da foto cobrir tudo */}
                    {!isReducedMotion && archWireframeGridOpacity > 0.02 && (
                      <div
                        style={{ opacity: archWireframeGridOpacity }}
                        className="absolute inset-0 z-0 pointer-events-none p-5 sm:p-7 flex flex-col justify-between"
                      >
                        <div className="absolute inset-0 bg-grid-pattern opacity-60"></div>
                        <div className="flex items-center justify-between border-b border-dashed border-[#00D5FF]/30 pb-3">
                          <div className="w-7 h-0.5 bg-[#00D5FF]/50"></div>
                          <div className="flex space-x-4">
                            <div className="w-10 h-2 rounded bg-[#00D5FF]/25"></div>
                            <div className="w-10 h-2 rounded bg-[#00D5FF]/25"></div>
                            <div className="w-10 h-2 rounded bg-[#00D5FF]/25"></div>
                          </div>
                        </div>
                        <div className="space-y-3 max-w-[55%] my-auto">
                          <div className="h-7 w-40 border border-dashed border-[#00D5FF]/40 rounded"></div>
                          <div className="h-7 w-52 border border-dashed border-[#00D5FF]/40 rounded"></div>
                          <div className="h-10 w-44 border border-dashed border-white/20 rounded"></div>
                          <div className="h-8 w-36 border border-dashed border-[#00D5FF]/50"></div>
                        </div>
                      </div>
                    )}

                    {/* 1. Foto full-bleed da casa moderna sendo revelada por máscara ciano */}
                    <div
                      style={{
                        clipPath: `inset(0 ${isReducedMotion ? 0 : archPhotoMask}% 0 0)`,
                      }}
                      className="absolute inset-0 z-10"
                    >
                      <img
                        src="/brand/arquitetura-hero.jpg"
                        alt="Arquitetura contemporânea brasileira — Espaços para viver"
                        className="w-full h-full object-cover object-center"
                      />
                      {/* Gradiente sutil no canto superior esquerdo para leitura impecável igual ao modelo */}
                      <div className="absolute inset-0 bg-gradient-to-r from-[#0E2B4C]/75 via-[#0E2B4C]/25 to-transparent"></div>
                      <div className="absolute inset-0 bg-gradient-to-b from-[#0C2440]/50 via-transparent to-black/25"></div>
                    </div>

                    {/* Linha laser ciano na borda da revelação da imagem */}
                    {!isReducedMotion && archPhotoMask > 1 && archPhotoMask < 99 && (
                      <div
                        style={{ right: `${archPhotoMask}%` }}
                        className="absolute top-0 bottom-0 w-[2px] bg-[#00D5FF] shadow-[0_0_16px_#00D5FF] z-20 pointer-events-none"
                      ></div>
                    )}

                    {/* 2. Conteúdo do Site de Arquitetura montando em cima da imagem */}
                    <div className="relative z-20 h-full p-5 sm:p-8 flex flex-col justify-between">
                      
                      {/* Topbar minimalista do site modelo (traço branco + ESTÚDIO PROJETOS SOBRE CONTATO) */}
                      <div
                        style={{
                          opacity: isReducedMotion ? 1 : archNavOpacity,
                          transform: `translateY(${isReducedMotion ? 0 : archNavY}px)`,
                        }}
                        className="flex items-center justify-between pt-0.5"
                      >
                        <div className="w-6 sm:w-8 h-[1.5px] bg-white/95"></div>
                        <nav className="flex items-center space-x-3.5 sm:space-x-6 text-[8px] sm:text-[10px] font-medium tracking-[0.22em] text-white/90 uppercase">
                          <span>Estúdio</span>
                          <span>Projetos</span>
                          <span>Sobre</span>
                          <span>Contato</span>
                        </nav>
                        <div className="hidden sm:block w-8"></div>
                      </div>

                      {/* Bloco editorial central à esquerda: "Espaços para viver" + descrição + botão */}
                      <div className="max-w-[260px] sm:max-w-[300px] my-auto space-y-2.5 sm:space-y-3.5">
                        <h2
                          style={{
                            opacity: isReducedMotion ? 1 : archTitleOpacity,
                            transform: `translateY(${isReducedMotion ? 0 : archTitleY}px)`,
                          }}
                          className="text-3xl sm:text-[2.65rem] font-light tracking-tight text-white leading-[1.05] drop-shadow-sm"
                        >
                          <span className="block">Espaços</span>
                          <span className="block">para viver</span>
                        </h2>

                        <p
                          style={{
                            opacity: isReducedMotion ? 1 : archDescOpacity,
                            transform: `translateY(${isReducedMotion ? 0 : archDescY}px)`,
                          }}
                          className="text-[10px] sm:text-xs text-white/90 font-light leading-relaxed drop-shadow-sm"
                        >
                          Arquitetura contemporânea brasileira,
                          <br />
                          com foco em bem-estar, território e
                          <br />
                          vida real.
                        </p>

                        {/* Botão retangular outline traçado ao vivo */}
                        <div className="pt-1 relative inline-block">
                          <svg
                            className="absolute inset-0 w-full h-full pointer-events-none"
                            fill="none"
                          >
                            <rect
                              x="0.5"
                              y="0.5"
                              width="calc(100% - 1px)"
                              height="calc(100% - 1px)"
                              stroke="rgba(255,255,255,0.8)"
                              strokeWidth="1"
                              strokeDasharray="340"
                              strokeDashoffset={isReducedMotion ? 0 : archBtnDash}
                            />
                          </svg>
                          <button
                            type="button"
                            onClick={() => {
                              if (onExploreShowcase) onExploreShowcase();
                            }}
                            style={{ opacity: isReducedMotion ? 1 : archBtnOpacity }}
                            className="px-3.5 sm:px-4 py-2 bg-white/5 hover:bg-white/15 backdrop-blur-[2px] text-white text-[8.5px] sm:text-[9.5px] font-medium tracking-[0.2em] uppercase inline-flex items-center space-x-2.5 transition-colors cursor-pointer"
                          >
                            <span>Conheça os projetos</span>
                            <ArrowRight className="w-3 h-3" />
                          </button>
                        </div>
                      </div>

                      <div className="h-2"></div>
                    </div>
                  </div>
                )}

                {/* MODO CELULAR — Mesma landing page "Espaços para viver" adaptada para Mobile */}
                {stageMode === 'mobile' && (
                  <div className="relative z-10 py-5 px-4 flex justify-center animate-fadeIn bg-[#07111F]">
                    <div className="w-[225px] rounded-[28px] bg-[#0B1730] border-[5px] border-[#1A2538] overflow-hidden shadow-2xl">
                      <div className="relative h-[320px] flex flex-col justify-between p-4 overflow-hidden">
                        <img
                          src="/brand/arquitetura-hero.jpg"
                          alt="Arquitetura Mobile"
                          className="absolute inset-0 w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-b from-[#0C2440]/80 via-[#0C2440]/45 to-black/45"></div>

                        <div className="relative z-10 flex items-center justify-between pt-1">
                          <div className="w-5 h-[1.5px] bg-white"></div>
                          <span className="text-[8px] tracking-[0.2em] text-white/90 uppercase">MENU ☰</span>
                        </div>

                        <div className="relative z-10 space-y-2 my-auto pb-8">
                          <h3 className="text-2xl font-light text-white leading-[1.08]">
                            Espaços
                            <br />
                            para viver
                          </h3>
                          <p className="text-[9.5px] text-white/85 font-light leading-relaxed">
                            Arquitetura contemporânea brasileira, com foco em bem-estar e vida real.
                          </p>
                          <div className="pt-1">
                            <span className="inline-flex items-center space-x-1.5 px-3 py-1.5 border border-white/75 bg-white/10 text-white text-[8px] tracking-[0.16em] uppercase">
                              <span>Conheça os projetos</span>
                              <ArrowRight className="w-2.5 h-2.5" />
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* MODO CÓDIGO */}
                {stageMode === 'code' && (
                  <div className="relative z-10 p-5 sm:p-6 min-h-[300px] sm:min-h-[345px] bg-[#050C16] font-mono text-[11px] leading-relaxed text-[#A8B5C7] space-y-1.5 animate-fadeIn">
                    <div className="text-[#00D5FF] font-semibold mb-2">
                      // EspacosParaViver.jsx — Site de Arquitetura
                    </div>
                    <div>
                      <span className="text-purple-400">export default function</span>{' '}
                      <span className="text-white">ArquiteturaHero</span>() {'{'}
                    </div>
                    <div className="pl-4">
                      <span className="text-purple-400">return</span> (
                    </div>
                    <div className="pl-8 text-emerald-400">&lt;MinimalNav links=&#123;[&apos;Estúdio&apos;, &apos;Projetos&apos;, &apos;Sobre&apos;, &apos;Contato&apos;]&#125; /&gt;</div>
                    <div className="pl-8 text-[#00D5FF]">&lt;FullBleedPhoto src=&quot;/brand/arquitetura-hero.jpg&quot; /&gt;</div>
                    <div className="pl-8 text-white">&lt;Headline&gt;Espaços para viver&lt;/Headline&gt;</div>
                    <div className="pl-8 text-amber-300">&lt;OutlineCTA&gt;CONHEÇA OS PROJETOS →&lt;/OutlineCTA&gt;</div>
                    <div className="pl-4">);</div>
                    <div>{'}'}</div>
                    <div className="pt-4 text-[10px] text-emerald-400 flex items-center space-x-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                      <span>Construído ao vivo com React + Tailwind CSS</span>
                    </div>
                  </div>
                )}

                {/* MODO BLUEPRINT */}
                {stageMode === 'blueprint' && (
                  <div className="relative z-10 p-4 bg-[#07111F] animate-fadeIn">
                    <svg className="w-full h-[270px] sm:h-[310px]" viewBox="0 0 480 290" fill="none">
                      <defs>
                        <pattern id="arch-bp-grid" width="24" height="24" patternUnits="userSpaceOnUse">
                          <path d="M 24 0 L 0 0 0 24" fill="none" stroke="#00D5FF" strokeWidth="0.4" strokeOpacity="0.25" />
                        </pattern>
                      </defs>
                      <rect width="480" height="290" fill="url(#arch-bp-grid)" />
                      <rect x="10" y="10" width="460" height="270" rx="8" stroke="#00D5FF" strokeWidth="1.2" strokeDasharray="6 4" strokeOpacity="0.6" />
                      <line x1="28" y1="30" x2="54" y2="30" stroke="#FFFFFF" strokeWidth="1.5" />
                      <rect x="130" y="25" width="210" height="10" rx="2" stroke="#00D5FF" strokeWidth="1" strokeOpacity="0.5" />
                      <rect x="28" y="65" width="160" height="58" rx="4" stroke="#00D5FF" strokeWidth="1.2" strokeOpacity="0.8" />
                      <rect x="28" y="135" width="175" height="36" rx="3" stroke="#087CFF" strokeWidth="1" strokeOpacity="0.55" />
                      <rect x="28" y="184" width="145" height="28" stroke="#FFFFFF" strokeWidth="1" strokeOpacity="0.7" />
                      <rect x="200" y="110" width="250" height="150" rx="4" stroke="#00D5FF" strokeWidth="1.2" strokeDasharray="5 3" strokeOpacity="0.65" />
                      <text x="28" y="266" fill="#00D5FF" fontSize="9" fontFamily="monospace" opacity="0.8">
                        LAYOUT_ARCHITECTURAL_HERO // FULL_BLEED_16_10
                      </text>
                    </svg>
                  </div>
                )}

                {/* Rodapé fixo do palco */}
                <div className="px-4 py-3 bg-[#07111F]/95 border-t border-white/10 flex items-center justify-between gap-3 relative z-20">
                  <button
                    onClick={() => {
                      if (onExploreShowcase) onExploreShowcase();
                    }}
                    className="inline-flex items-center space-x-1.5 text-xs font-semibold text-[#00D5FF] hover:text-white transition-colors cursor-pointer"
                  >
                    <span>Abrir vitrine completa</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <div
                    style={{
                      opacity: isReducedMotion ? 1 : mobileBadgeOpacity,
                      transform: `translateY(${isReducedMotion ? 0 : mobileBadgeY}px)`,
                    }}
                    className="flex items-center space-x-2 px-3 py-1 rounded-xl bg-[#0B1730] border border-[#00D5FF]/35 shadow-lg transition-all duration-200"
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
