import React, { useState } from 'react';
import {
  ArrowUpRight,
  Layers,
  Briefcase,
  Monitor,
  Compass,
  ShieldCheck,
  Tag,
  MessageSquare,
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
    desc: 'Sites, lojas virtuais, sistemas sob medida e automações integradas ao WhatsApp.',
    icon: Layers,
    featured: true,
  },
  {
    path: '/vitrine',
    title: 'Vitrine Ao Vivo',
    desc: 'Teste layouts reais em funcionamento no computador e no celular.',
    icon: Monitor,
    featured: true,
  },
  {
    path: '/portfolio',
    title: 'Nosso Trabalho',
    desc: 'Projetos reais em produção e entregas sob medida.',
    icon: Briefcase,
  },
  {
    path: '/como-trabalhamos',
    title: 'Como Trabalhamos',
    desc: '5 etapas claras do diagnóstico até o lançamento.',
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
    desc: 'Envie os detalhes do seu projeto e receba uma proposta sob medida.',
    icon: MessageSquare,
    featured: true,
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
      className={`group relative overflow-hidden rounded-xl bg-white/[0.02] hover:bg-white/[0.05] border border-white/[0.07] hover:border-[#00D5FF]/45 p-6 transition-all duration-200 flex flex-col justify-between min-h-[144px] ${
        item.featured ? 'sm:col-span-2 lg:col-span-2' : ''
      }`}
    >
      {/* Spotlight radial sutil seguindo o cursor */}
      {spot.active && (
        <div
          style={{
            background: `radial-gradient(280px circle at ${spot.x}px ${spot.y}px, rgba(0, 213, 255, 0.11), transparent 70%)`,
          }}
          className="absolute inset-0 pointer-events-none transition-opacity duration-200"
        ></div>
      )}

      <div className="relative z-10 flex items-center justify-between mb-6">
        <Icon className="w-4 h-4 text-[#00D5FF]/85 group-hover:text-[#00D5FF] transition-colors" />
        <ArrowUpRight className="w-4 h-4 text-white/25 group-hover:text-[#00D5FF] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
      </div>

      <div className="relative z-10 space-y-1">
        <h3 className="text-base sm:text-lg font-semibold text-white group-hover:text-[#00D5FF] transition-colors tracking-tight">
          {item.title}
        </h3>
        <p className="text-xs sm:text-[13px] text-[#A8B5C7]/90 leading-relaxed">
          {item.desc}
        </p>
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

      {/* Navegação Clean em Grade */}
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Explore a <span className="gradient-text">RydenTec</span>
            </h2>
            <p className="text-xs sm:text-sm text-[#A8B5C7] max-w-md">
              Cada área da agência em uma página dedicada — leve, direta e sem ruído.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
            {BENTO_PAGES.map((item) => (
              <SpotlightCard key={item.path} item={item} onNavigate={onNavigate} />
            ))}

            {/* Card Direto WhatsApp + Instagram @rydentec */}
            <div className="sm:col-span-2 lg:col-span-2 rounded-xl bg-white/[0.025] border border-white/[0.09] p-6 flex flex-col justify-between min-h-[144px]">
              <div className="space-y-1">
                <div className="text-[11px] font-medium uppercase tracking-[0.2em] text-[#00D5FF]">
                  Atendimento Direto
                </div>
                <h3 className="text-base sm:text-lg font-semibold text-white tracking-tight">
                  Fale agora com nossa equipe
                </h3>
                <p className="text-xs sm:text-[13px] text-[#A8B5C7]/90">
                  Resposta rápida no WhatsApp ou acompanhe nossos projetos no Instagram.
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-4">
                <a
                  href={`https://wa.me/${waClean}?text=${encodeURIComponent('Olá! Vi o site da RydenTec e quero iniciar meu projeto.')}`}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-2.5 px-3.5 rounded-lg bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/35 text-emerald-300 font-medium text-xs flex items-center justify-center space-x-2 transition-colors"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>{waDisplay}</span>
                </a>
                <a
                  href={instaLink}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-2.5 px-3.5 rounded-lg bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 text-white/90 font-medium text-xs flex items-center justify-center space-x-2 transition-colors"
                >
                  <Instagram className="w-3.5 h-3.5 text-[#00D5FF]" />
                  <span>{insta}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
