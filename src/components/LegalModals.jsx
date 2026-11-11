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
              <h3 className="text-xl font-bold">RydenTec Privacy Policy</h3>
            </div>

            <p className="text-white/90 font-medium">Effective Date: January 1, 2026</p>

            <h4 className="text-white font-semibold text-sm pt-2">1. Information We Collect</h4>
            <p>
              When you submit a project inquiry or request a quote through RydenTec (rydentec.com), we collect the contact details you voluntarily provide: your full name, business name, email address, optional phone number, service interests, budget range, and project requirements.
            </p>

            <h4 className="text-white font-semibold text-sm pt-2">2. How We Use Your Information</h4>
            <p>
              Information is exclusively used to evaluate your technical requirements, formulate commercial proposals, coordinate project consultations, and communicate about services requested. We do not sell, rent, or trade your personal information to third parties.
            </p>

            <h4 className="text-white font-semibold text-sm pt-2">3. Data Security &amp; Storage</h4>
            <p>
              We maintain industry-standard physical, electronic, and procedural safeguards to protect your personal information against unauthorized access, loss, or alteration.
            </p>

            <h4 className="text-white font-semibold text-sm pt-2">4. Your Rights</h4>
            <p>
              You may request a copy of the personal information we hold about you or request its deletion at any time by contacting our team at <span className="text-[#00D5FF]">hello@rydentec.com</span>.
            </p>
          </div>
        )}

        {activeModal === 'terms' && (
          <div className="space-y-4 text-xs sm:text-sm text-[#A8B5C7] leading-relaxed">
            <div className="flex items-center space-x-2 text-white pb-3 border-b border-white/10">
              <FileText className="w-6 h-6 text-[#087CFF]" />
              <h3 className="text-xl font-bold">RydenTec Terms of Service</h3>
            </div>

            <p className="text-white/90 font-medium">Effective Date: January 1, 2026</p>

            <h4 className="text-white font-semibold text-sm pt-2">1. Scope of Services</h4>
            <p>
              RydenTec provides custom web development, bespoke software systems, mobile/web application engineering, and business automation consulting. Detailed deliverables, delivery milestones, and payment terms are formally governed by individual written proposals and statements of work (SOW) executed between RydenTec and the client.
            </p>

            <h4 className="text-white font-semibold text-sm pt-2">2. Commercial Proposals &amp; Pricing</h4>
            <p>
              Prices shown on the website represent initial starting parameters. Final contract value depends on specific functional requirements, third-party integrations, infrastructure hosting, and requested turnaround.
            </p>

            <h4 className="text-white font-semibold text-sm pt-2">3. Intellectual Property</h4>
            <p>
              Upon receipt of full contract payment, all custom deliverables, code, designs, and content created specifically for the client are assigned in full to the client, subject to standard open-source license inclusions.
            </p>

            <h4 className="text-white font-semibold text-sm pt-2">4. Contact</h4>
            <p>
              For legal inquiries, contract clarifications, or commercial questions, please contact <span className="text-[#00D5FF]">hello@rydentec.com</span>.
            </p>
          </div>
        )}

        <div className="pt-6 mt-6 border-t border-white/10 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-[#101F35] text-white hover:bg-white/10 text-xs font-semibold"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
}
