import React, { useState, useEffect } from 'react';
import { ArrowRight, Layers, Briefcase, Monitor, Compass, ShieldCheck, Tag, MessageSquare } from 'lucide-react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import Showcase from './components/Showcase';
import Portfolio from './components/Portfolio';
import WhyChooseUs from './components/WhyChooseUs';
import HowWeWork from './components/HowWeWork';
import Pricing from './components/Pricing';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';
import WhatsAppFloating from './components/WhatsAppFloating';
import ConsultationModal from './components/ConsultationModal';
import LegalModals from './components/LegalModals';
import AdminLogin from './components/admin/AdminLogin';
import AdminDashboard from './components/admin/AdminDashboard';
import PreviewPage from './components/PreviewPage';
import { fetchSettings, fetchPortfolio, trackEvent } from './services/api';

const normalizePath = (rawPath) => {
  if (!rawPath || rawPath === '/') return '/';
  const trimmed = rawPath.replace(/\/+$/, '');
  return trimmed || '/';
};

const QUICK_PAGES = [
  { path: '/servicos', title: 'Serviços', desc: 'Sites, lojas virtuais, landing pages e software sob medida.', icon: Layers },
  { path: '/portfolio', title: 'Nosso Trabalho', desc: 'Projetos reais em produção e soluções sob medida.', icon: Briefcase },
  { path: '/vitrine', title: 'Vitrine Interativa', desc: 'Teste demonstrações no computador e no celular.', icon: Monitor },
  { path: '/como-trabalhamos', title: 'Como Trabalhamos', desc: 'Do primeiro contato à entrega final em 5 etapas.', icon: Compass },
  { path: '/por-que-ryden', title: 'Por que a Ryden', desc: 'Engenharia, design com propósito e foco em escala.', icon: ShieldCheck },
  { path: '/precos', title: 'Preços', desc: 'Planos transparentes e orçamento sob consulta.', icon: Tag },
  { path: '/contato', title: 'Contato', desc: 'Solicite um orçamento gratuito ou fale no WhatsApp.', icon: MessageSquare },
];

export default function App() {
  const [currentPath, setCurrentPath] = useState(() => normalizePath(window.location.pathname));
  const [isAdminRoute, setIsAdminRoute] = useState(false);
  const [adminToken, setAdminToken] = useState(() => localStorage.getItem('rydentec_admin_token') || '');
  const [adminUser, setAdminUser] = useState(() => {
    try {
      const saved = localStorage.getItem('rydentec_admin_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [settings, setSettings] = useState(null);
  const [portfolio, setPortfolio] = useState([]);
  const [selectedService, setSelectedService] = useState('Site Institucional');
  const [consultationOpen, setConsultationOpen] = useState(false);
  const [activeLegalModal, setActiveLegalModal] = useState(null); // 'privacy' | 'terms' | null

  const [isPreviewRoute, setIsPreviewRoute] = useState(
    normalizePath(window.location.pathname) === '/preview'
  );

  // Sync URL path on mount & listen to popstate/hashchange
  useEffect(() => {
    const checkPath = () => {
      const normalized = normalizePath(window.location.pathname);
      const isPathAdmin = normalized.startsWith('/admin') || window.location.hash === '#admin';
      setIsAdminRoute(isPathAdmin);
      setIsPreviewRoute(normalized === '/preview');
      setCurrentPath(normalized);
    };

    checkPath();
    window.addEventListener('popstate', checkPath);
    window.addEventListener('hashchange', checkPath);

    return () => {
      window.removeEventListener('popstate', checkPath);
      window.removeEventListener('hashchange', checkPath);
    };
  }, []);

  // Initial data load and Pageview tracking
  useEffect(() => {
    trackEvent('pageview', window.location.pathname);

    fetchSettings().then(data => {
      if (data) setSettings(data);
    });

    fetchPortfolio().then(data => {
      if (data) setPortfolio(data);
    });
  }, []);

  const navigate = (path) => {
    const target = normalizePath(path);
    if (window.location.pathname !== target) {
      window.history.pushState({}, '', target);
    }
    setIsAdminRoute(target.startsWith('/admin'));
    setIsPreviewRoute(target === '/preview');
    setCurrentPath(target);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    trackEvent('pageview', target);
  };

  // Admin login handler
  const handleLoginSuccess = (token, user) => {
    setAdminToken(token);
    setAdminUser(user);
    localStorage.setItem('rydentec_admin_token', token);
    localStorage.setItem('rydentec_admin_user', JSON.stringify(user));
  };

  const handleAdminLogout = () => {
    setAdminToken('');
    setAdminUser(null);
    localStorage.removeItem('rydentec_admin_token');
    localStorage.removeItem('rydentec_admin_user');
  };

  // Navigate to contact page with optional preselected service
  const goToContact = (serviceName) => {
    if (serviceName) setSelectedService(serviceName);
    navigate('/contato');
  };

  // If visitor navigated to /preview
  if (isPreviewRoute) {
    return (
      <PreviewPage
        settings={settings}
        portfolio={portfolio}
      />
    );
  }

  // If visitor navigated to /admin
  if (isAdminRoute) {
    if (!adminToken) {
      return (
        <AdminLogin
          onLoginSuccess={handleLoginSuccess}
          onBackToSite={() => navigate('/')}
        />
      );
    }

    return (
      <AdminDashboard
        token={adminToken}
        user={adminUser}
        initialSettings={settings}
        onLogout={handleAdminLogout}
        onGoToSite={() => navigate('/')}
      />
    );
  }

  const renderPageContent = () => {
    switch (currentPath) {
      case '/servicos':
        return (
          <main className="pt-16 sm:pt-20">
            <Services
              onSelectService={goToContact}
              whatsappNumber={settings?.whatsappNumber}
            />
          </main>
        );
      case '/portfolio':
        return (
          <main className="pt-16 sm:pt-20">
            <Portfolio
              projects={portfolio}
              onQuoteClick={goToContact}
            />
          </main>
        );
      case '/vitrine':
        return (
          <main className="pt-16 sm:pt-20">
            <Showcase onBuildYours={() => goToContact('Site Institucional')} />
          </main>
        );
      case '/como-trabalhamos':
        return (
          <main className="pt-16 sm:pt-20">
            <HowWeWork onStartProject={() => goToContact('Site Institucional')} />
          </main>
        );
      case '/por-que-ryden':
        return (
          <main className="pt-16 sm:pt-20">
            <WhyChooseUs />
          </main>
        );
      case '/precos':
        return (
          <main className="pt-16 sm:pt-20">
            <Pricing
              pricingData={settings?.pricing}
              whatsappNumber={settings?.whatsappNumber}
              onSelectPlan={goToContact}
            />
          </main>
        );
      case '/contato':
        return (
          <main className="pt-16 sm:pt-20">
            <ContactForm
              selectedService={selectedService}
              onConsultationClick={() => setConsultationOpen(true)}
              whatsappNumber={settings?.whatsappNumber}
              whatsappMessage={settings?.whatsappMessage}
            />
          </main>
        );
      case '/':
      default:
        return (
          <main>
            <Hero
              onStartProject={() => goToContact('Site Institucional')}
              onExploreServices={() => navigate('/servicos')}
            />

            {/* Acesso limpo e direto às páginas separadas */}
            <section className="py-16 sm:py-20 bg-[#07111F] border-t border-white/5">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
                  <div>
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                      Explore a <span className="gradient-text">RydenTec</span>
                    </h2>
                    <p className="text-sm text-[#A8B5C7] mt-1">
                      Navegue diretamente pela página que você precisa.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {QUICK_PAGES.map((item) => {
                    const Icon = item.icon;
                    return (
                      <a
                        key={item.path}
                        href={item.path}
                        onClick={(e) => {
                          e.preventDefault();
                          navigate(item.path);
                        }}
                        className="group p-5 rounded-2xl bg-[#0B1730]/80 border border-white/10 hover:border-[#00D5FF]/60 hover:bg-[#101F35] transition-all duration-200 flex flex-col justify-between"
                      >
                        <div>
                          <div className="w-10 h-10 rounded-xl bg-[#07111F] border border-[#087CFF]/30 flex items-center justify-center text-[#00D5FF] mb-4 group-hover:scale-105 transition-transform">
                            <Icon className="w-5 h-5" />
                          </div>
                          <h3 className="text-base font-bold text-white group-hover:text-[#00D5FF] transition-colors">
                            {item.title}
                          </h3>
                          <p className="text-xs text-[#A8B5C7] mt-1.5 leading-relaxed">
                            {item.desc}
                          </p>
                        </div>
                        <div className="mt-4 pt-3 border-t border-white/5 flex items-center text-xs font-semibold text-[#00D5FF]">
                          <span>Acessar página</span>
                          <ArrowRight className="w-3.5 h-3.5 ml-1.5 transition-transform group-hover:translate-x-1" />
                        </div>
                      </a>
                    );
                  })}
                </div>
              </div>
            </section>
          </main>
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#07111F] text-white selection:bg-[#087CFF] selection:text-white flex flex-col justify-between">
      {/* Sticky Header with Official RydenTec Logo & Multi-Page Navigation */}
      <Navbar
        currentPath={currentPath}
        onNavigate={navigate}
        onQuoteClick={() => goToContact('Site Institucional')}
      />

      {renderPageContent()}

      {/* Sophisticated Dark Footer */}
      <Footer
        whatsappNumber={settings?.whatsappNumber}
        contactEmail={settings?.contactEmail}
        instagramHandle={settings?.instagramHandle}
        instagramUrl={settings?.instagramUrl}
        onNavigate={navigate}
        onLegalOpen={(type) => setActiveLegalModal(type)}
        onAdminOpen={() => navigate('/admin')}
      />

      {/* Floating Discreet WhatsApp CTA */}
      <WhatsAppFloating
        whatsappNumber={settings?.whatsappNumber}
        whatsappMessage={settings?.whatsappMessage}
      />

      {/* Meeting Consultation Modal */}
      <ConsultationModal
        isOpen={consultationOpen}
        onClose={() => setConsultationOpen(false)}
        schedulingUrl={settings?.schedulingUrl}
      />

      {/* Legal Modals (Privacy & Terms) */}
      <LegalModals
        activeModal={activeLegalModal}
        onClose={() => setActiveLegalModal(null)}
      />
    </div>
  );
}
