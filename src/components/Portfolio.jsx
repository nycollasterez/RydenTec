import React, { useState } from 'react';
import { 
  ExternalLink, 
  Sparkles, 
  X, 
  CheckCircle2, 
  ArrowRight, 
  Monitor, 
  Smartphone,
  Globe,
  Layers
} from 'lucide-react';
import { trackEvent } from '../services/api';

export default function Portfolio({ projects = [], onQuoteClick }) {
  const [activeCategory, setActiveCategory] = useState('Todos');
  const [selectedProject, setSelectedProject] = useState(null);
  const [viewMode, setViewMode] = useState('desktop'); // 'desktop' ou 'mobile'

  const categories = ['Todos', 'Sites Institucionais', 'Lojas Virtuais', 'Software Sob Medida', 'Apps & Portais', 'Automação & IA'];

  // Honorato Barber Shop (Cliente Real verificado)
  const realProjects = [
    {
      id: 'proj-honorato',
      title: 'Honorato Barber Shop & Grooming Lounge',
      industry: 'Barbearia de Luxo & Estética Masculina',
      category: 'Sites Institucionais',
      isConcept: false,
      liveUrl: 'https://www.honoratobarbershop.com.br/',
      badge: 'Cliente Real em Produção',
      shortDescription: 'Plataforma web de alta performance desenvolvida para barbearia premium com agendamento online e integração VIP.',
      fullDescription: 'Experiência web sob medida desenvolvida para a Honorato Barber Shop (no ar em honoratobarbershop.com.br). Conta com arquitetura ultra-rápida, vitrine de pacotes de serviços, apresentação da equipe de barbeiros e integração direta para agendamentos via WhatsApp.',
      developedScope: 'Design visual exclusivo, front-end ultra-rápido, integração de agendamento online via WhatsApp, mapa de localização e SEO local.',
      metrics: ['Score 99 Lighthouse', 'Carregamento < 0.6s', '100% Responsivo'],
      techStack: ['React', 'Tailwind CSS', 'Vite', 'Node.js', 'WhatsApp API'],
      desktopImg: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=1200&q=80&auto=format&fit=crop',
      mobileImg: 'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=600&q=80&auto=format&fit=crop'
    },
    {
      id: 'proj-artisan',
      title: 'Artisan Store & Decoração',
      industry: 'E-commerce & Casa Contemporânea',
      category: 'Lojas Virtuais',
      isConcept: true,
      liveUrl: null,
      badge: 'Projeto Conceitual Vitrine',
      shortDescription: 'Loja virtual com checkout transparente Pix e frete automático criada para marcas de decoração e artesanato fino.',
      fullDescription: 'Estrutura completa de loja virtual projetada pela RydenTec com foco em conversão rápida: catálogo fluido, filtros intuitivos, integração com gateways de pagamento brasileiros (Pix e cartão de crédito) e cálculo de frete.',
      developedScope: 'Arquitetura de e-commerce, checkout em 1 página com Pix, cálculo de frete e painel de pedidos.',
      metrics: ['Checkout Rápido', 'Mobile First', 'Painel de Vendas'],
      techStack: ['Next.js', 'Stripe/Pix', 'Tailwind CSS', 'PostgreSQL'],
      desktopImg: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1200&q=80&auto=format&fit=crop',
      mobileImg: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=600&q=80&auto=format&fit=crop'
    },
    {
      id: 'proj-nexusafe',
      title: 'NexuSafe ERP & Gestão Logística',
      industry: 'Transportes & Gestão Corporativa',
      category: 'Software Sob Medida',
      isConcept: true,
      liveUrl: null,
      badge: 'Projeto Conceitual Vitrine',
      shortDescription: 'Sistema web personalizado para controle de frotas, orçamentos e acompanhamento de entregas em tempo real.',
      fullDescription: 'Dashboard corporativo sob medida desenhado para substituir planilhas desorganizadas por um painel web intuitivo com controle de motoristas, ordens de serviço e indicadores financeiros.',
      developedScope: 'Modelagem de banco de dados, painel com gráficos em tempo real, exportação de relatórios em PDF e controle de acessos.',
      metrics: ['Dashboards Ao Vivo', 'Múltiplos Níveis de Acesso', 'Cloud Synced'],
      techStack: ['Node.js', 'React', 'PostgreSQL', 'Docker', 'WebSockets'],
      desktopImg: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80&auto=format&fit=crop',
      mobileImg: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80&auto=format&fit=crop'
    }
  ];

  const filteredProjects = activeCategory === 'Todos'
    ? realProjects
    : realProjects.filter(p => p.category === activeCategory);

  const handleOpenModal = (project) => {
    setSelectedProject(project);
    setViewMode('desktop');
    trackEvent(`portfolio_view_${project.id}`);
  };

  return (
    <section id="portfolio" className="py-24 lg:py-32 relative bg-[#07111F] overflow-hidden border-t border-white/5">
      {/* Luz ambiente de fundo */}
      <div className="absolute top-1/4 right-0 w-[600px] h-[500px] bg-[#087CFF]/10 blur-[150px] pointer-events-none rounded-full"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Cabeçalho */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Projetos Criados com <span className="gradient-text">Propósito e Precisão.</span>
          </h2>
          <p className="text-base sm:text-lg text-[#A8B5C7] leading-relaxed">
            Explore aplicações reais e conceitos de engenharia desenvolvidos com foco em performance comercial e experiência do usuário.
          </p>
        </div>

        {/* Filtros por Categoria */}
        <div className="flex items-center justify-start sm:justify-center overflow-x-auto pb-4 gap-2 scrollbar-none mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => {
                setActiveCategory(category);
                trackEvent(`portfolio_filter_${category}`);
              }}
              className={`flex-shrink-0 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 border cursor-pointer ${
                activeCategory === category
                  ? 'bg-gradient-to-r from-[#087CFF] to-[#00D5FF] text-white border-transparent shadow-lg shadow-[#087CFF]/25'
                  : 'bg-[#101F35]/70 text-[#A8B5C7] border-white/5 hover:border-white/20 hover:text-white'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Grid de Projetos Exploráveis */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              onClick={() => handleOpenModal(project)}
              className="group rounded-2xl bg-[#0B1730]/90 border border-white/10 hover:border-[#00D5FF]/60 transition-all duration-300 hover:shadow-2xl hover:shadow-[#00D5FF]/15 overflow-hidden flex flex-col justify-between cursor-pointer relative"
            >
              {/* Contorno ciano que percorre a borda da imagem no hover */}
              <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-[#00D5FF]/60 pointer-events-none transition-colors duration-300 z-20"></div>

              <div>
                {/* Imagem do Projeto */}
                <div className="relative h-56 overflow-hidden bg-[#101F35]">
                  <img
                    src={project.desktopImg}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B1730] via-transparent to-black/30"></div>

                  {/* Badge de Cliente Real ou Vitrine */}
                  <div className="absolute top-3 right-3 z-10">
                    <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold shadow-md border ${
                      !project.isConcept
                        ? 'bg-emerald-950/90 text-emerald-300 border-emerald-500/50'
                        : 'bg-[#07111F]/90 text-cyan-300 border-cyan-400/30'
                    }`}>
                      {project.badge}
                    </span>
                  </div>
                </div>

                {/* Dados Rápidos do Card */}
                <div className="p-6 space-y-3">
                  <div className="flex items-center justify-between text-xs text-[#00D5FF] font-semibold">
                    <span>{project.industry}</span>
                    <span className="text-[#A8B5C7] font-mono text-[11px]">{project.category}</span>
                  </div>

                  <h3 className="text-xl font-bold text-white tracking-tight group-hover:text-[#00D5FF] transition-colors">
                    {project.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#A8B5C7] line-clamp-2 leading-relaxed">
                    {project.shortDescription}
                  </p>

                  {/* Tags Técnicas */}
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {project.techStack.slice(0, 3).map((tech, i) => (
                      <span key={i} className="px-2 py-0.5 rounded text-[10px] bg-[#101F35] text-[#A8B5C7] border border-white/5 font-mono">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Botão Ver Ficha do Projeto */}
              <div className="p-6 pt-0">
                <button
                  className="w-full py-2.5 px-4 rounded-xl bg-[#101F35] border border-white/10 group-hover:border-[#00D5FF] group-hover:bg-[#00D5FF]/15 text-white font-semibold text-xs transition-all flex items-center justify-center space-x-2"
                >
                  <span>Explorar Projeto</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#00D5FF] group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>

      {/* 
        MODAL DE EXPLORAÇÃO COM FICHA COMPLETA E ALTERNÂNCIA COMPUTADOR | CELULAR
      */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-3xl rounded-3xl bg-[#0B1730] border-2 border-[#00D5FF]/40 shadow-2xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto">
            
            {/* Botão Fechar */}
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-5 right-5 p-2 rounded-lg text-[#A8B5C7] hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Topo do Modal */}
            <div className="space-y-2 mb-6">
              <div className="flex items-center gap-2">
                <span className={`px-2.5 py-1 rounded text-xs font-bold border ${
                  !selectedProject.isConcept
                    ? 'bg-emerald-950/90 text-emerald-300 border-emerald-500/50'
                    : 'bg-[#07111F]/90 text-cyan-300 border-cyan-400/30'
                }`}>
                  {selectedProject.badge}
                </span>
                <span className="text-xs text-[#00D5FF] font-semibold">{selectedProject.industry}</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                {selectedProject.title}
              </h3>
            </div>

            {/* Seletor Computador | Celular para alternar a visualização real */}
            <div className="mb-4 flex items-center justify-between border-b border-white/10 pb-3">
              <span className="text-xs text-[#A8B5C7] font-semibold">Visualização do Projeto:</span>
              <div className="flex items-center gap-1.5 p-1 rounded-xl bg-[#07111F] border border-white/10">
                <button
                  onClick={() => setViewMode('desktop')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                    viewMode === 'desktop'
                      ? 'bg-[#087CFF] text-white shadow-md'
                      : 'text-[#A8B5C7] hover:text-white'
                  }`}
                >
                  <Monitor className="w-3.5 h-3.5" />
                  <span>Computador</span>
                </button>
                <button
                  onClick={() => setViewMode('mobile')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                    viewMode === 'mobile'
                      ? 'bg-[#00D5FF] text-[#07111F] font-bold shadow-md'
                      : 'text-[#A8B5C7] hover:text-white'
                  }`}
                >
                  <Smartphone className="w-3.5 h-3.5" />
                  <span>Celular</span>
                </button>
              </div>
            </div>

            {/* Imagem com Contorno Ciano Tecnológico */}
            <div className="rounded-2xl bg-[#07111F] border border-[#00D5FF]/30 p-2 sm:p-3 mb-6 relative overflow-hidden flex items-center justify-center">
              {viewMode === 'desktop' ? (
                <div className="w-full h-64 sm:h-80 rounded-xl overflow-hidden shadow-inner">
                  <img
                    src={selectedProject.desktopImg}
                    alt={selectedProject.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <div className="w-52 h-80 rounded-2xl overflow-hidden shadow-2xl border-4 border-[#1E2E48]">
                  <img
                    src={selectedProject.mobileImg}
                    alt={`${selectedProject.title} Mobile`}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
            </div>

            {/* Ficha Técnica: O que a RydenTec desenvolveu */}
            <div className="space-y-4 mb-6">
              <div className="p-4 rounded-xl bg-[#101F35]/70 border border-white/5 space-y-2">
                <span className="text-xs font-mono font-bold text-[#00D5FF] uppercase">
                  O que a RydenTec Desenvolveu
                </span>
                <p className="text-sm text-white/90 leading-relaxed">
                  {selectedProject.developedScope}
                </p>
                <p className="text-xs text-[#A8B5C7] leading-relaxed pt-1">
                  {selectedProject.fullDescription}
                </p>
              </div>

              {/* Indicadores de Performance */}
              <div className="grid grid-cols-3 gap-2 sm:gap-3 text-center">
                {selectedProject.metrics.map((m, idx) => (
                  <div key={idx} className="p-2.5 rounded-xl bg-[#07111F] border border-white/5">
                    <span className="text-xs font-bold text-white block">{m}</span>
                    <span className="text-[10px] text-[#00D5FF]">Especificação Verificada</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Ações da Ficha: Visitar Site Oficial ou Pedir Orçamento */}
            <div className="flex flex-col sm:flex-row items-center gap-3 pt-4 border-t border-white/10">
              {selectedProject.liveUrl && (
                <a
                  href={selectedProject.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-5 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs shadow-lg flex items-center justify-center space-x-2 transition-colors cursor-pointer"
                >
                  <Globe className="w-4 h-4" />
                  <span>Visitar Site Oficial ↗</span>
                </a>
              )}

              <button
                onClick={() => {
                  setSelectedProject(null);
                  onQuoteClick(selectedProject.category);
                }}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-[#087CFF] to-[#00D5FF] text-white font-bold text-xs shadow-lg flex items-center justify-center space-x-2 cursor-pointer"
              >
                <span>Pedir Orçamento Deste Tipo</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => setSelectedProject(null)}
                className="w-full sm:w-auto px-5 py-3 rounded-xl bg-[#101F35] text-[#A8B5C7] hover:text-white text-xs font-semibold cursor-pointer"
              >
                Fechar
              </button>
            </div>

          </div>
        </div>
      )}

    </section>
  );
}
