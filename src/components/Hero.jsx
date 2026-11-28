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

const ARCH_IMAGES = {
  hero: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=900&q=80&auto=format&fit=crop',
  card1: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&q=80&auto=format&fit=crop',
  card2: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=600&q=80&auto=format&fit=crop',
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
      if (window.scrollY > 120) {
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
    setCardTilt({ rx: -ny * 5, ry: nx * 6 });
  };

  const handleStageMouseLeave = () => {
    setCardTilt({ rx: 0, ry: 0 });
  };

  const t = isCompleted || isReducedMotion ? 4.2 : elapsed / 1000;

  // 1. Conexão contínua do cabeçalho para o Hero (0.4s a 1.3s)
  const headerConnectorHeight = mapRange(t, 0.4, 1.0, 0, 100);
  const headerConnectorTurn = mapRange(t, 0.9, 1.3, 0, 100);
  const guidesOpacity = mapRange(t, 0.3, 0.65, 0, 1) * (1 - mapRange(t, 3.4, 4.1, 0, 0.65));

  // 2. O título ganha forma (0.8s a 2.2s)
  const baselineOpacity = mapRange(t, 0.75, 1.2, 0, 0.45) * (1 - mapRange(t, 1.9, 2.5, 0, 1));
  const titleLine1Fill = mapRange(t, 0.8, 1.55, 0, 1);
  const titleLine2Mask = mapRange(t, 1.25, 2.25, 100, 0);

  // 3. O botão principal é traçado e preenchido (2.0s a 3.4s)
  const buttonBorderDash = mapRange(t, 2.0, 3.05, 480, 0);
  const buttonFillOpacity = mapRange(t, 2.75, 3.45, 0, 1);
  const buttonContentOpacity = mapRange(t, 2.75, 3.45, 0, 1);

  // 4. Subtítulo e botão secundário (2.3s a 3.4s)
  const supportingOpacity = mapRange(t, 2.25, 3.1, 0, 1);
  const supportingY = mapRange(t, 2.25, 3.1, 12, 0);
  const secondaryBtnOpacity = mapRange(t, 2.65, 3.45, 0, 1);

  // 5. Pilares de confiança (3.15s a 4.0s)
  const trustOpacity = mapRange(t, 3.15, 4.0, 0, 1);
  const trustY = mapRange(t, 3.15, 4.0, 10, 0);

  // 6. Coreografia da Landing Page de Arquitetura sendo montada peça por peça (0.3s a 3.9s)
  const archFrameOpacity = mapRange(t, 0.15, 0.6, 0, 1);
  const archNavOpacity = mapRange(t, 0.45, 1.1, 0, 1);
  const archNavY = mapRange(t, 0.45, 1.1, -10, 0);
  const archNavLine = mapRange(t, 0.55, 1.25, 0, 100);

  const archTextOpacity = mapRange(t, 1.1, 1.95, 0, 1);
  const archTextY = mapRange(t, 1.1, 1.95, 14, 0);
  const archCtaOpacity = mapRange(t, 1.65, 2.3, 0, 1);

  const archHeroPhotoMask = mapRange(t, 1.15, 2.35, 100, 0); // wipe horizontal revelando foto da casa
  const archCard1Opacity = mapRange(t, 2.3, 3.1, 0, 1);
  const archCard1Y = mapRange(t, 2.3, 3.1, 18, 0);
  const archCard2Opacity = mapRange(t, 2.65, 3.55, 0, 1);
  const archCard2Y = mapRange(t, 2.65, 3.55, 18, 0);

  const mobileBadgeOpacity = mapRange(t, 3.0, 3.9, 0, 1);
  const mobileBadgeY = mapRange(t, 3.0, 3.9, 14, 0);

  return (
    <section
      id="home"
      ref={sectionRef}
      onMouseMove={handleSectionMouseMove}
      onMouseLeave={() => setPointer((p) => ({ ...p, active: false }))}
      className="relative min-h-screen pt-28 sm:pt-32 lg:pt-28 pb-16 sm:pb-20 overflow-hidden flex items-start lg:items-center bg-[#07111F] text-white"
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
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-10 items-center">
          
          {/* COLUNA ESQUERDA: Tipografia, Ações e Pilares */}
          <div className="lg:col-span-6 space-y-6 sm:space-y-7">
            
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

          {/* COLUNA DIREITA: Landing Page de Arquitetura sendo montada ao vivo */}
          <div
            className="lg:col-span-6 relative mt-2 lg:mt-0"
            style={{ perspective: '1200px' }}
          >
            <div
              onMouseMove={handleStageMouseMove}
              onMouseLeave={handleStageMouseLeave}
              style={{
                opacity: isReducedMotion ? 1 : Math.max(0.4, archFrameOpacity),
                transform: `rotateX(${cardTilt.rx}deg) rotateY(${cardTilt.ry}deg)`,
                transition: 'transform 0.18s ease-out',
              }}
              className="relative rounded-2xl border border-[#00D5FF]/30 bg-[#0B1730]/90 backdrop-blur-xl shadow-[0_25px_70px_rgba(0,0,0,0.65)] overflow-hidden"
            >
              {/* Barra de Controle Superior do Estúdio */}
              <div className="px-4 py-3 bg-[#07111F]/95 border-b border-white/10 flex flex-wrap items-center justify-between gap-2 relative z-30">
                <div className="flex items-center space-x-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80"></span>
                  <span className="ml-2 text-[10px] font-mono text-[#A8B5C7] hidden sm:inline">
                    verticearquitetura.com.br
                  </span>
                </div>

                {/* Alternador ao vivo */}
                <div className="flex items-center bg-[#101F35] p-0.5 rounded-lg border border-white/10 text-[11px]">
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
                        className={`flex items-center space-x-1 px-2.5 py-1 rounded-md font-semibold transition-all cursor-pointer ${
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

                {/* Botão Replay da Construção */}
                <button
                  type="button"
                  onClick={handleReplay}
                  title="Montar novamente"
                  className="p-1.5 rounded-lg bg-[#101F35] border border-white/10 text-[#00D5FF] hover:text-white hover:border-[#00D5FF]/60 transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Área da Landing Page de Arquitetura */}
              <div className="relative p-4 sm:p-5 min-h-[365px] flex flex-col justify-between bg-[#090D16]">
                
                {/* MODO SITE (Desktop — Landing Page de Arquitetura montando peça a peça) */}
                {stageMode === 'desktop' && (
                  <div className="relative z-10 rounded-xl border border-white/10 bg-[#0D111A] overflow-hidden shadow-inner">
                    
                    {/* 1. Cabeçalho da Landing Page de Arquitetura */}
                    <div
                      style={{
                        opacity: isReducedMotion ? 1 : archNavOpacity,
                        transform: `translateY(${isReducedMotion ? 0 : archNavY}px)`,
                      }}
                      className="relative px-4 py-3 flex items-center justify-between bg-[#111622]/95"
                    >
                      <div className="flex items-center space-x-2">
                        <span className="w-2.5 h-2.5 border border-[#D4AF37] rotate-45 inline-block"></span>
                        <span className="text-[11px] font-bold tracking-[0.2em] text-white uppercase">
                          VÉRTICE <span className="text-[#D4AF37] font-light">ARQ</span>
                        </span>
                      </div>
                      <div className="hidden sm:flex items-center space-x-4 text-[10px] tracking-wide text-white/70">
                        <span>Projetos</span>
                        <span>Estúdio</span>
                        <span className="text-[#D4AF37] font-semibold">Orçamento</span>
                      </div>
                      {/* Linha guia ciano se desenhando na base do mini cabeçalho */}
                      <div
                        style={{ width: `${isReducedMotion ? 100 : archNavLine}%` }}
                        className="absolute bottom-0 left-0 h-[1px] bg-gradient-to-r from-[#00D5FF]/70 via-[#D4AF37]/50 to-transparent"
                      ></div>
                    </div>

                    {/* 2. Dobra Principal da Landing Page (Texto + Foto Arquitetônica sendo revelada) */}
                    <div className="p-4 grid grid-cols-12 gap-4 items-center">
                      {/* Texto editorial à esquerda */}
                      <div
                        style={{
                          opacity: isReducedMotion ? 1 : archTextOpacity,
                          transform: `translateY(${isReducedMotion ? 0 : archTextY}px)`,
                        }}
                        className="col-span-6 space-y-2.5"
                      >
                        <div className="text-[9px] font-mono uppercase tracking-[0.22em] text-[#D4AF37]">
                          Arquitetura Contemporânea
                        </div>
                        <h3 className="text-sm sm:text-base font-bold text-white leading-snug tracking-tight">
                          Espaços que unem luz, forma e propósito.
                        </h3>
                        <p className="text-[10px] text-white/60 leading-relaxed hidden sm:block">
                          Residências autorais e pavilhões corporativos de alto padrão em todo o Brasil.
                        </p>
                        <div
                          style={{ opacity: isReducedMotion ? 1 : archCtaOpacity }}
                          className="pt-1"
                        >
                          <span className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded bg-[#D4AF37] text-[#090D16] text-[10px] font-bold tracking-wide">
                            <span>Ver Portfólio</span>
                            <ArrowRight className="w-3 h-3" />
                          </span>
                        </div>
                      </div>

                      {/* Foto da Casa Moderna revelando com máscara de construção */}
                      <div className="col-span-6 relative">
                        <div className="relative h-32 sm:h-36 rounded-lg overflow-hidden border border-white/10 bg-[#151C2C]">
                          {/* Moldura wireframe antes da foto aparecer */}
                          <div className="absolute inset-0 border border-dashed border-[#00D5FF]/30 rounded-lg pointer-events-none"></div>
                          <img
                            src={ARCH_IMAGES.hero}
                            alt="Residência contemporânea Vértice Arquitetura"
                            style={{
                              clipPath: `inset(0 ${isReducedMotion ? 0 : archHeroPhotoMask}% 0 0)`,
                            }}
                            className="w-full h-full object-cover transition-all duration-75"
                          />
                          {!isReducedMotion && archHeroPhotoMask > 2 && archHeroPhotoMask < 98 && (
                            <div
                              style={{ right: `${archHeroPhotoMask}%` }}
                              className="absolute top-0 bottom-0 w-[2px] bg-[#00D5FF] shadow-[0_0_12px_#00D5FF]"
                            ></div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* 3. Grid de Obras / Projetos encaixando abaixo */}
                    <div className="px-4 pb-4 pt-1 grid grid-cols-2 gap-3">
                      <div
                        style={{
                          opacity: isReducedMotion ? 1 : archCard1Opacity,
                          transform: `translateY(${isReducedMotion ? 0 : archCard1Y}px)`,
                        }}
                        className="rounded-lg bg-[#121826] border border-white/10 overflow-hidden flex items-center space-x-2.5 p-2"
                      >
                        <img
                          src={ARCH_IMAGES.card1}
                          alt="Casa Mirante"
                          className="w-12 h-11 rounded object-cover flex-shrink-0"
                        />
                        <div className="min-w-0">
                          <div className="text-[11px] font-bold text-white truncate">Casa Mirante</div>
                          <div className="text-[9px] text-[#D4AF37] truncate">Residencial • 420 m²</div>
                        </div>
                      </div>

                      <div
                        style={{
                          opacity: isReducedMotion ? 1 : archCard2Opacity,
                          transform: `translateY(${isReducedMotion ? 0 : archCard2Y}px)`,
                        }}
                        className="rounded-lg bg-[#121826] border border-white/10 overflow-hidden flex items-center space-x-2.5 p-2"
                      >
                        <img
                          src={ARCH_IMAGES.card2}
                          alt="Pavilhão Vidro"
                          className="w-12 h-11 rounded object-cover flex-shrink-0"
                        />
                        <div className="min-w-0">
                          <div className="text-[11px] font-bold text-white truncate">Pavilhão Vidro</div>
                          <div className="text-[9px] text-[#D4AF37] truncate">Comercial • 890 m²</div>
                        </div>
                      </div>
                    </div>

                  </div>
                )}

                {/* MODO CELULAR (Versão Mobile da Landing Page de Arquitetura) */}
                {stageMode === 'mobile' && (
                  <div className="relative z-10 flex justify-center animate-fadeIn">
                    <div className="w-[238px] rounded-[28px] bg-[#0D111A] border-[5px] border-[#1A2234] p-3 shadow-2xl space-y-2.5">
                      <div className="w-16 h-2 bg-black rounded-full mx-auto"></div>
                      <div className="flex items-center justify-between pt-1 pb-1.5 border-b border-white/10">
                        <span className="text-[9px] font-bold tracking-[0.18em] text-white">
                          VÉRTICE <span className="text-[#D4AF37]">ARQ</span>
                        </span>
                        <span className="text-[8px] text-white/50 font-mono">MENU ☰</span>
                      </div>
                      <div className="h-24 rounded-lg overflow-hidden relative">
                        <img
                          src={ARCH_IMAGES.hero}
                          alt="Projeto Arquitetônico Mobile"
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent flex items-end p-2">
                          <span className="text-[10px] font-bold text-white leading-tight">
                            Espaços com luz e propósito.
                          </span>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-1.5">
                        <div className="p-1.5 rounded bg-[#141B2B] border border-white/5">
                          <div className="text-[9px] font-bold text-white">Casa Mirante</div>
                          <div className="text-[8px] text-[#D4AF37]">420 m²</div>
                        </div>
                        <div className="p-1.5 rounded bg-[#141B2B] border border-white/5">
                          <div className="text-[9px] font-bold text-white">Pavilhão Vidro</div>
                          <div className="text-[8px] text-[#D4AF37]">890 m²</div>
                        </div>
                      </div>
                      <span className="block text-center w-full py-1.5 rounded bg-[#D4AF37] text-[#090D16] text-[10px] font-bold">
                        Agendar Reunião
                      </span>
                    </div>
                  </div>
                )}

                {/* MODO CÓDIGO */}
                {stageMode === 'code' && (
                  <div className="relative z-10 rounded-xl bg-[#050C16] border border-white/10 p-4 font-mono text-[11px] leading-relaxed text-[#A8B5C7] space-y-1.5 animate-fadeIn">
                    <div className="text-[#00D5FF] font-semibold mb-2">
                      // VerticeArquitetura.jsx — Montagem em Tempo Real
                    </div>
                    <div>
                      <span className="text-purple-400">export default function</span>{' '}
                      <span className="text-white">VerticeLanding</span>() {'{'}
                    </div>
                    <div className="pl-4">
                      <span className="text-purple-400">return</span> (
                    </div>
                    <div className="pl-8 text-emerald-400">&lt;Header brand=&quot;Vértice Arq&quot; /&gt;</div>
                    <div className="pl-8 text-[#00D5FF]">&lt;HeroEditorial layout=&quot;split-grid&quot; /&gt;</div>
                    <div className="pl-8 text-amber-300">&lt;ObrasDestaque items=&#123;[&apos;Casa Mirante&apos;, &apos;Pavilhão Vidro&apos;]&#125; /&gt;</div>
                    <div className="pl-8 text-emerald-400">&lt;WhatsAppCTA phone=&quot;+5534998721299&quot; /&gt;</div>
                    <div className="pl-4">);</div>
                    <div>{'}'}</div>
                    <div className="pt-3 text-[10px] text-emerald-400 flex items-center space-x-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                      <span>Landing page compilada com carregamento &lt; 0.6s</span>
                    </div>
                  </div>
                )}

                {/* MODO BLUEPRINT */}
                {stageMode === 'blueprint' && (
                  <div className="relative z-10 rounded-xl border border-[#00D5FF]/30 bg-[#07111F] p-3 animate-fadeIn">
                    <svg className="w-full h-[270px]" viewBox="0 0 480 280" fill="none">
                      <defs>
                        <pattern id="arch-bp-grid" width="24" height="24" patternUnits="userSpaceOnUse">
                          <path d="M 24 0 L 0 0 0 24" fill="none" stroke="#00D5FF" strokeWidth="0.4" strokeOpacity="0.25" />
                        </pattern>
                      </defs>
                      <rect width="480" height="280" fill="url(#arch-bp-grid)" />
                      <rect x="10" y="10" width="460" height="260" rx="10" stroke="#00D5FF" strokeWidth="1.2" strokeDasharray="6 4" strokeOpacity="0.6" />
                      <rect x="24" y="22" width="432" height="26" rx="4" stroke="#087CFF" strokeWidth="1" strokeOpacity="0.7" />
                      <rect x="24" y="64" width="200" height="20" rx="4" stroke="#00D5FF" strokeWidth="1.2" strokeOpacity="0.8" />
                      <rect x="24" y="94" width="170" height="12" rx="3" stroke="#087CFF" strokeWidth="1" strokeOpacity="0.5" />
                      <rect x="24" y="120" width="110" height="28" rx="6" stroke="#D4AF37" strokeWidth="1.2" strokeOpacity="0.85" />
                      <rect x="240" y="64" width="216" height="110" rx="8" stroke="#00D5FF" strokeWidth="1.2" strokeDasharray="5 3" strokeOpacity="0.75" />
                      <line x1="240" y1="64" x2="456" y2="174" stroke="#00D5FF" strokeWidth="0.8" strokeOpacity="0.3" />
                      <line x1="456" y1="64" x2="240" y2="174" stroke="#00D5FF" strokeWidth="0.8" strokeOpacity="0.3" />
                      <rect x="24" y="192" width="210" height="60" rx="6" stroke="#00D5FF" strokeWidth="1" strokeOpacity="0.6" />
                      <rect x="246" y="192" width="210" height="60" rx="6" stroke="#00D5FF" strokeWidth="1" strokeOpacity="0.6" />
                      <text x="24" y="266" fill="#00D5FF" fontSize="9" fontFamily="monospace" opacity="0.8">
                        VERTICE_ARQ // WIREFRAME_GRID_12COL
                      </text>
                    </svg>
                  </div>
                )}

                {/* Rodapé fixo do palco */}
                <div className="flex items-center justify-between gap-3 pt-3.5 mt-2 border-t border-white/10 relative z-10">
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
