import React, { useState } from 'react';
import {
  ArrowRight,
  Layers,
  Briefcase,
  Monitor,
  Compass,
  ShieldCheck,
  Tag,
  MessageSquare,
  Sparkles,
  Instagram,
  Phone
} from 'lucide-react';

const MARQUEE_ITEMS = [
  'Arquitetura Digital Sob Medida',
  'Sites de Alta Conversão',
  'E-commerce & Checkout Pix',
  'Software & Sistemas Web',
  'Automação WhatsApp & IA',
  'Design Editorial & Performance',
];

const BENTO_PAGES = [
  {
    path: '/servicos',
    title: 'Serviços & Soluções',
    desc: 'Escolha exatamente o que sua empresa precisa — sites, lojas virtuais, sistemas ou IA — e fale direto no WhatsApp.',
    icon: Layers,
    featured: true,
    tag: 'Interativo',
  },
  {
    path: '/vitrine',
    title: 'Vitrine Ao Vivo',
    desc: 'Teste layouts reais funcionando no computador e no celular antes de fechar seu projeto.',
    icon: Monitor,
    featured: true,
    tag: 'PC & Celular',
  },
  {
    path: '/portfolio',
    title: 'Nosso Trabalho',
    desc: 'Projetos reais no ar e arquiteturas sob medida.',
    icon: Briefcase,
  },
  {
    path: '/como-trabalhamos',
    title: 'Como Trabalhamos',
    desc: '5 etapas claras do diagnóstico até a publicação.',
    icon: Compass,
  },
  {
    path: '/por-que-ryden',
    title: 'Por que a Ryden',
    desc: 'Engenharia limpa, foco comercial e escala.',
    icon: ShieldCheck,
  },
  {
    path: '/precos',
    title: 'Preços & Planos',
    desc: 'Orçamento sob consulta transparente pelo WhatsApp.',
    icon: Tag,
  },
  {
    path: '/contato',
    title: 'Contato & Orçamento',
    desc: 'Envie os detalhes do seu projeto em menos de 1 minuto e receba uma proposta sob medida.',
    icon: MessageSquare,
    featured: true,
    tag: 'Resposta Rápida',
  },
];

function SpotlightCard({ item, onNavigate }) {
  const [spot, setSpot] = useState({ x: 0, y: 0, active: false });
  const Icon = item.icon;

  const handleMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setSpot({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      active: true,
    });
  };

  return (
    <a
      href={item.path}
      onClick={(e) => {
        e.preventDefault();
        onNavigate(item.path);
      }}
      onMouseMove={handleMove}
      onMouseLeave={() => setSpot((s) => ({ ...s, active: false }))}
      className={`group relative overflow-hidden rounded-2xl bg-[#0B1730]/80 border border-white/10 hover:border-[#00D5FF]/60 p-6 transition-all duration-200 flex flex-col justify-between ${
        item.featured ? 'sm:col-span-2 lg:col-span-2' : ''
      }`}
    >
      {/* Spotlight radial ciano seguindo o cursor */}
      {spot.active && (
        <div
          style={{
            background: `radial-gradient(320px circle at ${spot.x}px ${spot.y}px, rgba(0, 213, 255, 0.14), transparent 70%)`,
          }}
          className="absolute inset-0 pointer-events-none transition-opacity duration-200"
        ></div>
      )}

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <div className="w-11 h-11 rounded-xl bg-[#07111F] border border-[#087CFF]/35 flex items-center justify-center text-[#00D5FF] group-hover:scale-105 group-hover:border-[#00D5FF] transition-all">
            <Icon className="w-5 h-5" />
          </div>
          {item.tag && (
            <span className="text-[10px] font-mono uppercase tracking-wider px-2.5 py-1 rounded-full bg-[#087CFF]/15 text-[#00D5FF] border border-[#00D5FF]/30">
              {item.tag}
            </span>
          )}
        </div>

        <h3 className="text-lg font-bold text-white group-hover:text-[#00D5FF] transition-colors">
          {item.title}
        </h3>
        <p className="text-xs sm:text-sm text-[#A8B5C7] mt-1.5 leading-relaxed">
          {item.desc}
        </p>
      </div>

      <div className="relative z-10 mt-5 pt-3.5 border-t border-white/5 flex items-center justify-between text-xs font-semibold text-[#00D5FF]">
        <span>Acessar página</span>
        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
      </div>
    </a>
  );
}

export default function HomeExploreBento({ onNavigate, whatsappNumber, instagramHandle, instagramUrl }) {
  const waDisplay = whatsappNumber || '+55 (34) 99872-1299';
  const waClean = waDisplay.replace(/[^0-9]/g, '');
  const insta = instagramHandle || '@rydentec';
  const instaLink = instagramUrl || 'https://www.instagram.com/rydentec/';

  return (
    <div className="bg-[#07111F]">
      {/* Faixa Cinética Editorial Minimalista (Alto Padrão) */}
      <div className="border-y border-white/[0.07] bg-[#07111F]/95 py-4 sm:py-5 overflow-hidden select-none">
        <div className="marquee-mask overflow-hidden">
          <div className="animate-marquee items-center">
            {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((text, idx) => (
              <div
                key={idx}
                className="flex items-center whitespace-nowrap"
              >
                <span className="px-6 sm:px-9 text-[10px] sm:text-[11px] font-medium uppercase tracking-[0.26em] text-[#A8B5C7] hover:text-white transition-colors">
                  {text}
                </span>
                <span className="w-8 h-[1px] bg-gradient-to-r from-transparent via-[#00D5FF]/40 to-transparent flex-shrink-0"></span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bento Grid Interativo para as Páginas Separadas */}
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <div className="inline-flex items-center space-x-2 text-xs font-semibold text-[#00D5FF] uppercase tracking-wider mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Navegação Rápida</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
                Explore a <span className="gradient-text">RydenTec</span>
              </h2>
            </div>
            <p className="text-sm text-[#A8B5C7] max-w-md">
              Cada área da agência organizada em sua própria página para uma experiência leve, rápida e direta.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {BENTO_PAGES.map((item) => (
              <SpotlightCard key={item.path} item={item} onNavigate={onNavigate} />
            ))}

            {/* Card Direto WhatsApp + Instagram @rydentec */}
            <div className="sm:col-span-2 lg:col-span-2 rounded-2xl bg-gradient-to-br from-[#087CFF]/20 via-[#0B1730] to-[#00D5FF]/15 border border-[#00D5FF]/35 p-6 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="text-xs font-bold uppercase tracking-wider text-[#00D5FF]">
                  Atendimento Direto
                </div>
                <h3 className="text-lg font-extrabold text-white leading-snug">
                  Fale agora com nossa equipe
                </h3>
                <p className="text-xs sm:text-sm text-[#A8B5C7]">
                  Atendimento ágil via WhatsApp ou acompanhe nossos bastidores e entregas no Instagram.
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4">
                <a
                  href={`https://wa.me/${waClean}?text=${encodeURIComponent('Olá! Vi o site da RydenTec e quero iniciar meu projeto.')}`}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-2.5 px-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-white font-bold text-xs flex items-center justify-center space-x-2 transition-colors"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>WhatsApp: {waDisplay}</span>
                </a>
                <a
                  href={instaLink}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-2.5 px-3 rounded-xl bg-[#07111F]/90 hover:bg-white/10 border border-white/15 text-white font-semibold text-xs flex items-center justify-center space-x-2 transition-colors"
                >
                  <Instagram className="w-3.5 h-3.5 text-[#00D5FF]" />
                  <span>Instagram: {insta}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
