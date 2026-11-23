import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ScrollDrivenHero from './components/ScrollDrivenHero';
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

export default function App() {
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
  const [selectedService, setSelectedService] = useState('New Website');
  const [consultationOpen, setConsultationOpen] = useState(false);
  const [activeLegalModal, setActiveLegalModal] = useState(null); // 'privacy' | 'terms' | null

  const [isPreviewRoute, setIsPreviewRoute] = useState(
    window.location.pathname === '/preview'
  );

  // Check URL path on mount & listen to popstate
  useEffect(() => {
    const checkPath = () => {
      const isPathAdmin = window.location.pathname.startsWith('/admin') || window.location.hash === '#admin';
      setIsAdminRoute(isPathAdmin);
      setIsPreviewRoute(window.location.pathname === '/preview');
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

  // Navigate to contact form
  const scrollToContact = (serviceName) => {
    if (serviceName) setSelectedService(serviceName);
    const el = document.getElementById('contact');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToPortfolio = () => {
    const el = document.getElementById('portfolio');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
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
          onBackToSite={() => {
            window.history.pushState({}, '', '/');
            setIsAdminRoute(false);
          }}
        />
      );
    }

    return (
      <AdminDashboard
        token={adminToken}
        user={adminUser}
        initialSettings={settings}
        onLogout={handleAdminLogout}
        onGoToSite={() => {
          window.history.pushState({}, '', '/');
          setIsAdminRoute(false);
        }}
      />
    );
  }

  // Public Landing Page
  return (
    <div className="min-h-screen bg-[#07111F] text-white selection:bg-[#087CFF] selection:text-white">
      {/* Sticky Header with Official RydenTec Logo & Navigation */}
      <Navbar onQuoteClick={() => scrollToContact('Novo Site')} />

      {/* Abertura Automática da RydenTec (Cena de Construção Digital em ~3 segundos) */}
      <Hero
        onStartProject={() => scrollToContact('Novo Site')}
        onExploreServices={() => {
          const el = document.getElementById('services');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* Services Section with 4 Interactive Cards */}
      <Services onSelectService={scrollToContact} />

      {/* Interactive Website Showcase with Desktop & Mobile Device Switcher */}
      <Showcase onBuildYours={() => scrollToContact('New Website')} />

      {/* Portfolio / Our Work */}
      <Portfolio
        projects={portfolio}
        onQuoteClick={scrollToContact}
      />

      {/* Why Choose RydenTec */}
      <WhyChooseUs />

      {/* How We Work: Horizontal / Vertical Progressive Timeline */}
      <HowWeWork onStartProject={() => scrollToContact('New Website')} />

      {/* Pricing Section */}
      <Pricing
        pricingData={settings?.pricing}
        onSelectPlan={scrollToContact}
      />

      {/* Lead Generation Contact Form */}
      <ContactForm
        selectedService={selectedService}
        onConsultationClick={() => setConsultationOpen(true)}
        whatsappNumber={settings?.whatsappNumber}
        whatsappMessage={settings?.whatsappMessage}
      />

      {/* Sophisticated Dark Footer */}
      <Footer
        whatsappNumber={settings?.whatsappNumber}
        contactEmail={settings?.contactEmail}
        onLegalOpen={(type) => setActiveLegalModal(type)}
        onAdminOpen={() => {
          window.history.pushState({}, '', '/admin');
          setIsAdminRoute(true);
        }}
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
