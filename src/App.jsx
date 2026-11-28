import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import HomeExploreBento from './components/HomeExploreBento';
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

export default function App() {
  const [currentPath, setCurrentPath] = useState(() => normalizePath(window.location.pathname));
  const [introProgress, setIntroProgress] = useState(0);
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
              onExploreShowcase={() => navigate('/vitrine')}
              onProgressChange={setIntroProgress}
            />

            <HomeExploreBento
              onNavigate={navigate}
              whatsappNumber={settings?.whatsappNumber}
              instagramHandle={settings?.instagramHandle}
              instagramUrl={settings?.instagramUrl}
            />
          </main>
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#07111F] text-white selection:bg-[#087CFF] selection:text-white flex flex-col justify-between">
      {/* Sticky Header with Official RydenTec Logo & Multi-Page Navigation */}
      <Navbar
        currentPath={currentPath}
        introProgress={introProgress}
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
