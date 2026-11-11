import React, { useState, useEffect } from 'react';
import { 
  Send, 
  CheckCircle2, 
  MessageSquare, 
  Calendar, 
  ShieldCheck, 
  AlertCircle, 
  ArrowRight,
  Clock,
  Sparkles
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { submitLead, trackEvent } from '../services/api';

export default function ContactForm({ selectedService, preselectedService, onConsultationClick, whatsappNumber, whatsappMessage }) {
  const [formData, setFormData] = useState({
    fullName: '',
    businessName: '',
    email: '',
    phone: '',
    service: 'New Website',
    budget: '$1,000–$2,500',
    projectDetails: '',
    honeypot: '' // Spam trap
  });

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [submittedLead, setSubmittedLead] = useState(null);

  useEffect(() => {
    if (selectedService || preselectedService) {
      setFormData(prev => ({
        ...prev,
        service: selectedService || preselectedService
      }));
    }
  }, [selectedService, preselectedService]);

  const serviceOptions = [
    'New Website',
    'Website Redesign',
    'Custom Software',
    'Web or Mobile App',
    'AI & Automation',
    'Not Sure Yet'
  ];

  const budgetOptions = [
    'Under $1,000',
    '$1,000–$2,500',
    '$2,500–$5,000',
    '$5,000+',
    'Let\'s Discuss'
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setLoading(true);

    try {
      const response = await submitLead(formData);

      // Trigger Confetti effect on verified save
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#087CFF', '#00D5FF', '#FFFFFF']
        });
      } catch (cErr) {
        // Confetti optional
      }

      setSubmittedLead({
        id: response.leadId,
        fullName: formData.fullName,
        service: formData.service
      });

      trackEvent('lead_submission_success');
    } catch (err) {
      setErrorMsg(err.message || 'Unable to submit your quote request. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleWhatsAppFollowup = () => {
    trackEvent('post_lead_whatsapp_click');
    const cleanNumber = (whatsappNumber || '+13058902184').replace(/[^0-9]/g, '');
    const text = encodeURIComponent(`Hi! I just submitted a quote request for ${formData.fullName} regarding a ${formData.service} project.`);
    window.open(`https://wa.me/${cleanNumber}?text=${text}`, '_blank');
  };

  return (
    <section id="contact" className="py-24 lg:py-32 relative bg-[#07111F] overflow-hidden">
      {/* Background Lighting Elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[550px] bg-gradient-to-tr from-[#087CFF]/15 via-[#00D5FF]/10 to-transparent blur-[160px] pointer-events-none rounded-full"></div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center space-y-4 mb-12">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#101F35] border border-[#00D5FF]/30 text-xs font-semibold text-[#00D5FF]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Direct Commercial Inquiry</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Let&apos;s Build Something <span className="gradient-text">Exceptional.</span>
          </h2>
          
          <p className="text-base sm:text-lg text-[#A8B5C7] max-w-2xl mx-auto leading-relaxed">
            Tell us what you have in mind. We&apos;ll help you explore the right digital solution for your business.
          </p>
        </div>

        {/* Success State Card */}
        {submittedLead ? (
          <div className="rounded-3xl bg-[#0B1730] border-2 border-emerald-500/40 p-8 sm:p-12 text-center shadow-2xl backdrop-blur-xl animate-fadeIn space-y-6">
            <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 mx-auto flex items-center justify-center text-emerald-400">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                Inquiry Received Securely
              </h3>
              <p className="text-sm sm:text-base text-[#A8B5C7] max-w-xl mx-auto">
                Thank you, <span className="text-white font-semibold">{submittedLead.fullName}</span>. Your project brief has been logged into our management system. A RydenTec specialist will review your requirements and provide a detailed proposal within 24 business hours.
              </p>
            </div>

            {/* Next Steps: WhatsApp or Schedule Consultation */}
            <div className="pt-6 border-t border-white/10 space-y-4">
              <div className="text-xs uppercase tracking-wider text-[#00D5FF] font-semibold">
                Want to expedite discussion right now?
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <button
                  onClick={handleWhatsAppFollowup}
                  className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-sm flex items-center justify-center space-x-2 shadow-lg shadow-emerald-500/20 transition-all"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Chat on WhatsApp</span>
                </button>

                <button
                  onClick={onConsultationClick}
                  className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-[#101F35] hover:bg-[#132540] border border-white/10 text-white font-semibold text-sm flex items-center justify-center space-x-2 transition-all"
                >
                  <Calendar className="w-4 h-4 text-[#00D5FF]" />
                  <span>Schedule Consultation Call</span>
                </button>
              </div>
            </div>

            <button
              onClick={() => {
                setSubmittedLead(null);
                setFormData({
                  fullName: '',
                  businessName: '',
                  email: '',
                  phone: '',
                  service: 'New Website',
                  budget: '$1,000–$2,500',
                  projectDetails: '',
                  honeypot: ''
                });
              }}
              className="text-xs text-[#A8B5C7] hover:text-white underline pt-4"
            >
              Submit Another Inquiry
            </button>
          </div>
        ) : (
          /* Main Functional Form */
          <form
            onSubmit={handleSubmit}
            className="rounded-3xl bg-[#0B1730]/90 border border-white/10 p-6 sm:p-10 shadow-2xl backdrop-blur-xl space-y-6"
          >
            {/* Honeypot hidden input for spam protection */}
            <input
              type="text"
              name="honeypot"
              value={formData.honeypot}
              onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
              className="hidden"
              autoComplete="off"
              tabIndex={-1}
            />

            {errorMsg && (
              <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-center space-x-3 text-rose-300 text-sm">
                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* Row 1: Name and Business */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-semibold text-white/90 uppercase tracking-wider mb-2">
                  Full Name <span className="text-[#00D5FF]">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Alexander Stone"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full px-4 py-3.5 rounded-xl bg-[#101F35] border border-white/10 text-white placeholder-[#A8B5C7]/50 focus:outline-none focus:border-[#087CFF] focus:ring-1 focus:ring-[#087CFF] transition-all text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-white/90 uppercase tracking-wider mb-2">
                  Business / Company Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Stone Architecture LLC"
                  value={formData.businessName}
                  onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                  className="w-full px-4 py-3.5 rounded-xl bg-[#101F35] border border-white/10 text-white placeholder-[#A8B5C7]/50 focus:outline-none focus:border-[#087CFF] focus:ring-1 focus:ring-[#087CFF] transition-all text-sm"
                />
              </div>
            </div>

            {/* Row 2: Email and Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-semibold text-white/90 uppercase tracking-wider mb-2">
                  Email Address <span className="text-[#00D5FF]">*</span>
                </label>
                <input
                  type="email"
                  required
                  placeholder="alexander@company.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3.5 rounded-xl bg-[#101F35] border border-white/10 text-white placeholder-[#A8B5C7]/50 focus:outline-none focus:border-[#087CFF] focus:ring-1 focus:ring-[#087CFF] transition-all text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-white/90 uppercase tracking-wider mb-2">
                  Phone Number <span className="text-[#A8B5C7] text-[11px] font-normal">(Optional)</span>
                </label>
                <input
                  type="tel"
                  placeholder="+1 (555) 000-0000"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-3.5 rounded-xl bg-[#101F35] border border-white/10 text-white placeholder-[#A8B5C7]/50 focus:outline-none focus:border-[#087CFF] focus:ring-1 focus:ring-[#087CFF] transition-all text-sm"
                />
              </div>
            </div>

            {/* Row 3: What Do You Need? (Service Selection) */}
            <div>
              <label className="block text-xs font-semibold text-white/90 uppercase tracking-wider mb-2.5">
                What Do You Need? <span className="text-[#00D5FF]">*</span>
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {serviceOptions.map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => setFormData({ ...formData, service: opt })}
                    className={`p-3 rounded-xl text-xs font-semibold text-left border transition-all ${
                      formData.service === opt
                        ? 'bg-[#087CFF]/20 border-[#00D5FF] text-white shadow-md'
                        : 'bg-[#101F35] border-white/5 text-[#A8B5C7] hover:border-white/20 hover:text-white'
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            {/* Row 4: Optional Project Budget */}
            <div>
              <label className="block text-xs font-semibold text-white/90 uppercase tracking-wider mb-2.5">
                Estimated Project Budget <span className="text-[#A8B5C7] text-[11px] font-normal">(Optional)</span>
              </label>
              <div className="flex flex-wrap gap-2">
                {budgetOptions.map((b) => (
                  <button
                    key={b}
                    type="button"
                    onClick={() => setFormData({ ...formData, budget: b })}
                    className={`px-3.5 py-2 rounded-lg text-xs font-medium border transition-all ${
                      formData.budget === b
                        ? 'bg-[#00D5FF]/15 border-[#00D5FF] text-[#00D5FF]'
                        : 'bg-[#101F35] border-white/5 text-[#A8B5C7] hover:border-white/20 hover:text-white'
                    }`}
                  >
                    {b}
                  </button>
                ))}
              </div>
            </div>

            {/* Row 5: Project Details */}
            <div>
              <label className="block text-xs font-semibold text-white/90 uppercase tracking-wider mb-2">
                Project Details <span className="text-[#00D5FF]">*</span>
              </label>
              <textarea
                required
                rows={4}
                placeholder="Tell us about your business, current website or software challenges, desired features, or key objectives..."
                value={formData.projectDetails}
                onChange={(e) => setFormData({ ...formData, projectDetails: e.target.value })}
                className="w-full px-4 py-3.5 rounded-xl bg-[#101F35] border border-white/10 text-white placeholder-[#A8B5C7]/50 focus:outline-none focus:border-[#087CFF] focus:ring-1 focus:ring-[#087CFF] transition-all text-sm resize-none"
              ></textarea>
            </div>

            {/* Privacy notice */}
            <div className="text-[11px] text-[#A8B5C7] flex items-center space-x-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <span>
                Your privacy is respected. Information submitted is kept confidential and strictly used to prepare your project proposal.
              </span>
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-[#087CFF] to-[#00D5FF] text-white font-bold text-base shadow-lg shadow-[#087CFF]/35 hover:shadow-[#087CFF]/50 hover:scale-[1.01] active:scale-98 transition-all duration-200 flex items-center justify-center space-x-2 disabled:opacity-50"
              >
                {loading ? (
                  <span>Processing Inquiry...</span>
                ) : (
                  <>
                    <span>Get My Free Quote</span>
                    <Send className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>

          </form>
        )}

      </div>
    </section>
  );
}
