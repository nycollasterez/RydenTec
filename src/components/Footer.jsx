import React from 'react';
import { 
  ArrowUp, 
  Mail, 
  MessageSquare, 
  ShieldCheck, 
  Lock,
  Globe
} from 'lucide-react';

export default function Footer({ onLegalOpen, onAdminOpen, whatsappNumber, contactEmail }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const email = contactEmail || 'hello@rydentec.com';

  return (
    <footer className="bg-[#050C16] border-t border-white/10 pt-16 pb-12 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main Footer Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-12 border-b border-white/10">
          
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <a href="#home" className="inline-block">
              <img
                src="/brand/rydentec-logo.png"
                alt="RydenTec — Technology That Moves Your Business Forward"
                className="h-10 w-auto object-contain filter drop-shadow-[0_2px_8px_rgba(8,124,255,0.25)]"
              />
            </a>
            
            <p className="text-sm font-semibold text-white/90">
              Tecnologia Que Impulsiona Seu Negócio.
            </p>

            <p className="text-xs text-[#A8B5C7] leading-relaxed max-w-sm">
              Criamos e desenvolvemos sites institucionais de alta performance, lojas virtuais, sistemas sob medida e automações comerciais para empresas que querem crescer com consistência.
            </p>

            <div className="flex items-center space-x-3 pt-2">
              <a
                href={`mailto:${email}`}
                className="px-3 py-1.5 rounded-lg bg-[#101F35] border border-white/10 hover:border-[#087CFF] text-xs text-white/90 flex items-center space-x-2 transition-colors"
              >
                <Mail className="w-3.5 h-3.5 text-[#00D5FF]" />
                <span>{email}</span>
              </a>
            </div>
          </div>

          {/* Quick Navigation Col */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Navegação
            </h4>
            <ul className="space-y-2 text-xs text-[#A8B5C7]">
              <li><a href="#home" className="hover:text-white transition-colors">Início</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">Serviços</a></li>
              <li><a href="#portfolio" className="hover:text-white transition-colors">Nosso Trabalho</a></li>
              <li><a href="#showcase" className="hover:text-white transition-colors">Vitrine</a></li>
              <li><a href="#how-we-work" className="hover:text-white transition-colors">Como Trabalhamos</a></li>
              <li><a href="#pricing" className="hover:text-white transition-colors">Preços</a></li>
              <li><a href="#contact" className="hover:text-white transition-colors">Contato</a></li>
            </ul>
          </div>

          {/* Services Col */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Soluções
            </h4>
            <ul className="space-y-2 text-xs text-[#A8B5C7]">
              <li><a href="#services" className="hover:text-white transition-colors">Desenvolvimento de Sites</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">Software Sob Medida &amp; ERP</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">Desenvolvimento de Apps &amp; PWAs</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">IA &amp; Automação Comercial</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">Landing Pages de Conversão</a></li>
            </ul>
          </div>

          {/* Trust & Legal Col */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Legal &amp; Acesso
            </h4>
            <ul className="space-y-2 text-xs text-[#A8B5C7]">
              <li>
                <button
                  onClick={() => onLegalOpen('privacy')}
                  className="hover:text-white transition-colors text-left"
                >
                  Política de Privacidade
                </button>
              </li>
              <li>
                <button
                  onClick={() => onLegalOpen('terms')}
                  className="hover:text-white transition-colors text-left"
                >
                  Termos de Serviço
                </button>
              </li>
              <li>
                <button
                  onClick={onAdminOpen}
                  className="hover:text-[#00D5FF] transition-colors text-left flex items-center space-x-1 pt-2 text-[#087CFF]"
                >
                  <Lock className="w-3 h-3" />
                  <span>Portal Administrativo</span>
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#A8B5C7]">
          <div>
            &copy; 2026 RydenTec. Todos os direitos reservados.
          </div>

          <div className="flex items-center space-x-4">
            <span className="text-[11px] text-[#A8B5C7]/70">
              Domínios: rydentec.com &bull; rydentec.online
            </span>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-lg bg-[#101F35] border border-white/5 hover:border-[#087CFF] text-[#A8B5C7] hover:text-white transition-colors"
              aria-label="Voltar ao Topo"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
