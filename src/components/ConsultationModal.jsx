import React from 'react';
import { X, Calendar, Clock, Globe, ArrowRight, ShieldCheck } from 'lucide-react';
import { trackEvent } from '../services/api';

export default function ConsultationModal({ isOpen, onClose, schedulingUrl }) {
  if (!isOpen) return null;

  const targetUrl = schedulingUrl || 'https://calendly.com';

  const handleOpenCalendly = () => {
    trackEvent('consultation_external_click');
    window.open(targetUrl, '_blank');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-lg rounded-2xl bg-[#0B1730] border border-[#087CFF]/40 shadow-2xl p-6 sm:p-8">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-lg text-[#A8B5C7] hover:text-white hover:bg-white/10 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="space-y-3 mb-6">
          <div className="w-12 h-12 rounded-xl bg-[#087CFF]/15 border border-[#087CFF]/30 flex items-center justify-center text-[#00D5FF]">
            <Calendar className="w-6 h-6" />
          </div>
          <h3 className="text-2xl font-bold text-white tracking-tight">
            Agendar Consultoria Gratuita
          </h3>
          <p className="text-sm text-[#A8B5C7] leading-relaxed">
            Converse diretamente com um especialista da RydenTec. Vamos entender as necessidades do seu negócio, recomendar a melhor arquitetura e tirar todas as suas dúvidas técnicas.
          </p>
        </div>

        {/* Feature Highlights */}
        <div className="p-4 rounded-xl bg-[#101F35] border border-white/5 space-y-2.5 mb-6 text-xs text-white/90">
          <div className="flex items-center space-x-2">
            <Clock className="w-4 h-4 text-[#00D5FF]" />
            <span>Sessão focada de 25 minutos</span>
          </div>
          <div className="flex items-center space-x-2">
            <Globe className="w-4 h-4 text-[#087CFF]" />
            <span>Horário adaptado ao seu fuso (Horário de Brasília)</span>
          </div>
          <div className="flex items-center space-x-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Sem compromisso comercial • Diagnóstico estratégico real</span>
          </div>
        </div>

        {/* Action Button */}
        <div className="space-y-3">
          <button
            onClick={handleOpenCalendly}
            className="w-full py-3.5 px-5 rounded-xl bg-gradient-to-r from-[#087CFF] to-[#00D5FF] text-white font-bold text-sm shadow-lg shadow-[#087CFF]/30 hover:shadow-[#087CFF]/50 transition-all flex items-center justify-center space-x-2"
          >
            <span>Abrir Agenda e Escolher Horário</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={onClose}
            className="w-full py-2.5 text-xs text-[#A8B5C7] hover:text-white"
          >
            Vou agendar depois
          </button>
        </div>

      </div>
    </div>
  );
}
