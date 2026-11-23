import React from 'react';
import { X, ShieldCheck, FileText } from 'lucide-react';

export default function LegalModals({ activeModal, onClose }) {
  if (!activeModal) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-2xl rounded-2xl bg-[#0B1730] border border-white/10 shadow-2xl p-6 sm:p-8 max-h-[85vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-lg text-[#A8B5C7] hover:text-white hover:bg-white/10 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {activeModal === 'privacy' && (
          <div className="space-y-4 text-xs sm:text-sm text-[#A8B5C7] leading-relaxed">
            <div className="flex items-center space-x-2 text-white pb-3 border-b border-white/10">
              <ShieldCheck className="w-6 h-6 text-[#00D5FF]" />
              <h3 className="text-xl font-bold">Política de Privacidade da RydenTec</h3>
            </div>

            <p className="text-white/90 font-medium">Vigência: 2026 • Em conformidade com a LGPD (Lei Nº 13.709/2018)</p>

            <h4 className="text-white font-semibold text-sm pt-2">1. Coleta de Informações</h4>
            <p>
              Ao solicitar um orçamento ou proposta na RydenTec, coletamos apenas os dados fornecidos voluntariamente: nome completo, nome da empresa, e-mail, telefone/WhatsApp, interesse em serviços e necessidades do projeto.
            </p>

            <h4 className="text-white font-semibold text-sm pt-2">2. Uso dos Dados</h4>
            <p>
              Os dados são utilizados exclusivamente para analisar os requisitos técnicos, formular propostas comerciais personalizadas e manter contato direto sobre o serviço solicitado. Não comercializamos nem compartilhamos seus dados com terceiros.
            </p>

            <h4 className="text-white font-semibold text-sm pt-2">3. Segurança e Confidencialidade</h4>
            <p>
              Adotamos práticas e padrões rigorosos de segurança técnica e organizacional para garantir a proteção de todas as informações contra acessos não autorizados.
            </p>

            <h4 className="text-white font-semibold text-sm pt-2">4. Seus Direitos</h4>
            <p>
              Você pode solicitar a alteração ou exclusão de seus dados a qualquer momento enviando um e-mail para <span className="text-[#00D5FF]">hello@rydentec.com</span>.
            </p>
          </div>
        )}

        {activeModal === 'terms' && (
          <div className="space-y-4 text-xs sm:text-sm text-[#A8B5C7] leading-relaxed">
            <div className="flex items-center space-x-2 text-white pb-3 border-b border-white/10">
              <FileText className="w-6 h-6 text-[#087CFF]" />
              <h3 className="text-xl font-bold">Termos de Serviço da RydenTec</h3>
            </div>

            <p className="text-white/90 font-medium">Vigência: 2026</p>

            <h4 className="text-white font-semibold text-sm pt-2">1. Escopo dos Serviços</h4>
            <p>
              A RydenTec desenvolve soluções digitais sob medida: websites institucionais, lojas virtuais de alta conversão, landing pages, softwares sob demanda e automações comerciais inteligentes. As entregas, prazos e condições financeiras são definidos e formalizados em proposta técnica e contrato de prestação de serviços.
            </p>

            <h4 className="text-white font-semibold text-sm pt-2">2. Orçamentos e Propostas</h4>
            <p>
              Os projetos são cotados sob consulta de acordo com as necessidades específicas, volume de páginas, integrações com APIs e prazos requeridos pelo cliente.
            </p>

            <h4 className="text-white font-semibold text-sm pt-2">3. Propriedade Intelectual</h4>
            <p>
              Após a quitação integral do projeto contratado, os direitos patrimoniais do código-fonte, layout e ativos criados exclusivamente para o cliente são transferidos integralmente a ele.
            </p>

            <h4 className="text-white font-semibold text-sm pt-2">4. Contato Comercial</h4>
            <p>
              Para esclarecimentos contratuais ou dúvidas, contate nossa equipe em <span className="text-[#00D5FF]">hello@rydentec.com</span>.
            </p>
          </div>
        )}

        <div className="pt-6 mt-6 border-t border-white/10 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-[#101F35] text-white hover:bg-white/10 text-xs font-semibold"
          >
            Fechar
          </button>
        </div>

      </div>
    </div>
  );
}
