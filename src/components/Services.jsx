import React, { useState } from 'react';
import { 
  Globe, 
  Cpu, 
  Smartphone, 
  Sparkles, 
  ShoppingCart,
  ArrowRight, 
  Check, 
  Users, 
  Package, 
  PhoneCall,
  MessageCircle
} from 'lucide-react';
import { trackEvent } from '../services/api';

const WA_NUMBER = '5511989022184';

export default function Services({ onSelectService, whatsappNumber }) {
  const [selectedId, setSelectedId] = useState('loja-virtual');

  const services = [
    {
      id: 'website-development',
      serviceKey: 'Novo Site Institucional',
      tabLabel: 'Site Institucional',
      title: 'Sites Institucionais e Comerciais',
      tagline: 'Presença Digital de Alto Nível Que Transmite Confiança e Credibilidade.',
      icon: Globe,
      targetAudience: 'Empresas, prestadores de serviços, clínicas, escritórios e negócios que precisam de uma vitrine profissional no Google para fechar mais contratos.',
      deliverables: [
        'Site moderno e 100% responsivo (computador, tablet e celular)',
        'Estrutura voltada para conversão de visitantes em contatos',
        'Configuração completa de SEO para ranquear nas buscas do Google',
        'Botão e formulário integrados direto ao seu WhatsApp',
        'Carregamento instantâneo e hospedagem segura em nuvem'
      ],
      nextStep: 'Analisamos o perfil do seu público-alvo, criamos a arquitetura do conteúdo e entregamos a primeira versão para revisão.',
      ctaText: 'Quero um site institucional',
      waMsg: 'Olá! Vi o site da RydenTec e gostaria de um orçamento para um site institucional.'
    },
    {
      id: 'loja-virtual',
      serviceKey: 'Loja Virtual',
      tabLabel: 'Loja Virtual',
      title: 'Lojas Virtuais e E-commerce',
      tagline: 'Venda Seus Produtos 24 Horas por Dia com Simplicidade e Rapidez.',
      icon: ShoppingCart,
      targetAudience: 'Marcas de produtos físicos ou digitais, distribuidoras e comércios que desejam vender online com catálogo moderno, checkout ágil e integração de pagamentos.',
      deliverables: [
        'Catálogo de produtos organizado com filtros rápidos de busca',
        'Checkout simplificado com Pix, cartão de crédito e boleto',
        'Cálculo automático de frete (Correios e transportadoras)',
        'Painel simples para gerenciar pedidos, clientes e estoque',
        'Integração com WhatsApp para suporte e recuperação de vendas'
      ],
      nextStep: 'Mapeamos o volume do seu catálogo e métodos de pagamento preferidos para estruturar a loja sob medida para sua operação.',
      ctaText: 'Quero uma loja virtual',
      waMsg: 'Olá! Vi o site da RydenTec e gostaria de um orçamento para uma loja virtual.'
    },
    {
      id: 'landing-pages',
      serviceKey: 'Landing Page',
      tabLabel: 'Landing Page',
      title: 'Landing Pages de Alta Conversão',
      tagline: 'Páginas Focadas em Converter Cliques de Anúncios em Clientes Reais.',
      icon: Sparkles,
      targetAudience: 'Negócios que investem ou querem investir em anúncios no Google Ads, Instagram ou Facebook e precisam de retorno máximo por clique.',
      deliverables: [
        'Página única focada em uma oferta irresistível e clara',
        'Copywriting persuasivo e design orientado a vendas',
        'Gatilhos visuais, prova social e chamadas para ação diretas',
        'Carregamento em menos de 1 segundo para não perder tráfego pago',
        'Integração com Meta Pixel e Google Analytics para mensuração'
      ],
      nextStep: 'Apresentamos a proposta visual da página com foco na sua campanha ativa ou próximo lançamento.',
      ctaText: 'Quero uma landing page',
      waMsg: 'Olá! Vi o site da RydenTec e gostaria de um orçamento para uma landing page de alta conversão.'
    },
    {
      id: 'custom-software',
      serviceKey: 'Software Sob Medida',
      tabLabel: 'Software Sob Medida',
      title: 'Sistemas e Softwares Personalizados',
      tagline: 'Sistemas Construídos Exatamente em Torno do Seu Fluxo de Trabalho.',
      icon: Cpu,
      targetAudience: 'Empresas que gastam tempo excessivo em planilhas manuais ou necessitam de um sistema interno para agendamentos, estoque, vendas ou controle operacional.',
      deliverables: [
        'Painéis administrativos (dashboards) com relatórios em tempo real',
        'Módulos de gestão comercial, CRM de clientes e emissão de propostas',
        'Controle de permissões por usuário e equipe',
        'Integrações com APIs externas, gateways e bancos de dados',
        'Automações internas que eliminam tarefas operacionais repetitivas'
      ],
      nextStep: 'Realizamos uma sessão de diagnóstico técnico para desenhar o diagrama da arquitetura e apresentar o cronograma do sistema.',
      ctaText: 'Quero um software sob medida',
      waMsg: 'Olá! Vi o site da RydenTec e gostaria de conversar sobre um software sob medida para minha empresa.'
    },
    {
      id: 'ai-automation',
      serviceKey: 'IA & Automação',
      tabLabel: 'IA & Automação',
      title: 'Automação Comercial e Inteligência Artificial',
      tagline: 'Atenda Clientes Automaticamente e Conecte Suas Ferramentas com IA.',
      icon: MessageCircle,
      targetAudience: 'Empresas que recebem grande volume de mensagens no WhatsApp e redes sociais e desejam triagem automática inteligente com agendamento instantâneo.',
      deliverables: [
        'Atendentes virtuais com IA treinados com as dúvidas frequentes da sua empresa',
        'Triagem automática e envio de propostas 24 horas por dia no WhatsApp',
        'Sincronização imediata com agendas (Google Calendar) e CRMs',
        'Notificações automáticas para sua equipe quando um lead quente solicitar atendimento',
        'Eliminação de gargalos no tempo de primeira resposta ao cliente'
      ],
      nextStep: 'Mapeamos suas perguntas mais comuns e desenhamos o fluxo de atendimento automatizado no WhatsApp.',
      ctaText: 'Quero automação com IA',
      waMsg: 'Olá! Vi o site da RydenTec e gostaria de um orçamento para automação de atendimento com IA.'
    }
  ];

  const currentService = services.find(s => s.id === selectedId) || services[0];
  const activeWaNumber = (whatsappNumber || WA_NUMBER).replace(/[^0-9]/g, '');

  const handleOpenWhatsApp = (service) => {
    trackEvent(`service_wa_click_${service.id}`);
    const url = `https://wa.me/${activeWaNumber}?text=${encodeURIComponent(service.waMsg)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleSelectService = (s) => {
    setSelectedId(s.id);
    trackEvent(`service_tab_select_${s.id}`);
  };

  return (
    <section id="services" className="py-24 lg:py-32 relative bg-[#07111F] overflow-hidden border-t border-white/5">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[550px] bg-[#087CFF]/10 blur-[160px] pointer-events-none rounded-full"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Cabeçalho da Seção */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            O Que a RydenTec Pode <span className="gradient-text">Construir Para Você?</span>
          </h2>
          <p className="text-base sm:text-lg text-[#A8B5C7] leading-relaxed">
            Selecione uma das soluções abaixo para conferir para quem é indicado, o que entregamos e o próximo passo para o seu projeto.
          </p>
        </div>

        {/* 
          BARRA DE SELEÇÃO INTERATIVA COM TRAÇO CIANO DESLIZANTE
        */}
        <div className="relative mb-10 overflow-x-auto pb-4 scrollbar-none">
          <div className="flex sm:justify-center items-center gap-2 sm:gap-3 min-w-max px-2">
            {services.map((service) => {
              const Icon = service.icon;
              const isSelected = service.id === selectedId;
              return (
                <button
                  key={service.id}
                  onClick={() => handleSelectService(service)}
                  className={`relative px-4 sm:px-5 py-3 rounded-xl font-semibold text-xs sm:text-sm transition-all duration-300 flex items-center gap-2.5 cursor-pointer ${
                    isSelected
                      ? 'bg-[#101F35] text-white border border-[#00D5FF]/60 shadow-lg shadow-[#00D5FF]/15'
                      : 'bg-[#0B1730]/80 text-[#A8B5C7] hover:text-white border border-white/5 hover:border-white/15'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isSelected ? 'text-[#00D5FF]' : 'text-[#A8B5C7]'}`} />
                  <span>{service.tabLabel}</span>

                  {/* Traço ciano deslizante no botão ativo */}
                  {isSelected && (
                    <span className="absolute -bottom-1.5 left-4 right-4 h-0.5 bg-gradient-to-r from-[#087CFF] via-[#00D5FF] to-[#087CFF] rounded-full shadow-[0_0_8px_#00D5FF]"></span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* 
          CARD DETALHADO DO SERVIÇO SELECIONADO
          Revela exatamente as 3 informações: Para quem é, O que pode ser entregue e Próximo passo
        */}
        <div className="max-w-5xl mx-auto rounded-3xl bg-[#0B1730]/95 border border-[#087CFF]/30 p-6 sm:p-10 lg:p-12 shadow-2xl backdrop-blur-xl relative overflow-hidden transition-all duration-300">
          
          {/* Luz guia ciano no topo do card */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#00D5FF] to-transparent shadow-[0_0_12px_#00D5FF]"></div>

          <div className="space-y-8">
            
            {/* Título & Tagline do Serviço */}
            <div className="border-b border-white/10 pb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-mono font-bold text-[#00D5FF] uppercase tracking-wider">
                  Solução Especializada
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mt-1">
                  {currentService.title}
                </h3>
                <p className="text-sm font-medium text-[#087CFF] mt-1">
                  {currentService.tagline}
                </p>
              </div>

              {/* Botão Principal com abertura do WhatsApp e mensagem específica */}
              <div className="flex-shrink-0">
                <button
                  onClick={() => handleOpenWhatsApp(currentService)}
                  className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#087CFF] to-[#00D5FF] text-white font-bold text-sm shadow-lg shadow-[#087CFF]/30 hover:scale-105 active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>{currentService.ctaText}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* As 3 Informações Reais Solicitadas */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
              
              {/* 1. Para quem é o serviço */}
              <div className="rounded-2xl bg-[#101F35]/70 border border-white/5 p-6 space-y-3">
                <div className="w-10 h-10 rounded-xl bg-[#0B1730] border border-[#087CFF]/30 flex items-center justify-center text-[#00D5FF]">
                  <Users className="w-5 h-5" />
                </div>
                <h4 className="text-base font-bold text-white tracking-tight">
                  Para quem é o serviço
                </h4>
                <p className="text-xs sm:text-sm text-[#A8B5C7] leading-relaxed">
                  {currentService.targetAudience}
                </p>
              </div>

              {/* 2. O que pode ser entregue */}
              <div className="rounded-2xl bg-[#101F35]/70 border border-white/5 p-6 space-y-3">
                <div className="w-10 h-10 rounded-xl bg-[#0B1730] border border-[#087CFF]/30 flex items-center justify-center text-[#00D5FF]">
                  <Package className="w-5 h-5" />
                </div>
                <h4 className="text-base font-bold text-white tracking-tight">
                  O que está incluído
                </h4>
                <ul className="space-y-2 text-xs sm:text-sm text-[#A8B5C7]">
                  {currentService.deliverables.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-[#00D5FF] flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* 3. Qual é o próximo passo */}
              <div className="rounded-2xl bg-[#101F35]/70 border border-white/5 p-6 space-y-3 flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-[#0B1730] border border-[#087CFF]/30 flex items-center justify-center text-[#00D5FF]">
                    <PhoneCall className="w-5 h-5" />
                  </div>
                  <h4 className="text-base font-bold text-white tracking-tight mt-3 mb-2">
                    Qual é o próximo passo
                  </h4>
                  <p className="text-xs sm:text-sm text-[#A8B5C7] leading-relaxed">
                    {currentService.nextStep}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/5">
                  <button
                    onClick={() => handleOpenWhatsApp(currentService)}
                    className="w-full py-2.5 px-4 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Falar no WhatsApp Agora</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
