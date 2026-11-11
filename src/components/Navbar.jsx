import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowRight, ShieldCheck } from 'lucide-react';
import { trackEvent } from '../services/api';

export default function Navbar({ onQuoteClick }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Services', href: '#services' },
    { name: 'Our Work', href: '#portfolio' },
    { name: 'Showcase', href: '#showcase' },
    { name: 'How We Work', href: '#how-we-work' },
    { name: 'Why Us', href: '#why-us' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'Contact', href: '#contact' },
  ];

  const handleLinkClick = (href) => {
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#07111F]/90 backdrop-blur-md border-b border-white/10 shadow-lg py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo - Preserving original typography, proportions and visual characteristics */}
          <a
            href="#home"
            className="flex items-center group transition-transform duration-200 hover:opacity-95"
          >
            <img
              src="/brand/rydentec-logo.png"
              alt="RydenTec — Technology That Moves Your Business Forward"
              className="h-9 sm:h-11 w-auto object-contain filter drop-shadow-[0_2px_12px_rgba(8,124,255,0.3)]"
            />
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick(link.href);
                }}
                className="px-3 py-2 text-sm font-medium text-[#A8B5C7] hover:text-white transition-colors duration-200 rounded-lg hover:bg-white/5"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Primary Navigation CTA */}
          <div className="hidden lg:flex items-center space-x-4">
            <button
              onClick={() => {
                trackEvent('quote_cta_nav_click');
                onQuoteClick();
              }}
              className="relative group overflow-hidden rounded-xl p-[1px] focus:outline-none focus:ring-2 focus:ring-[#087CFF]"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-[#087CFF] to-[#00D5FF] transition-all duration-300 group-hover:opacity-100 opacity-90"></span>
              <span className="relative flex items-center space-x-2 px-5 py-2.5 rounded-[11px] bg-[#07111F] transition-all duration-200 group-hover:bg-opacity-0">
                <span className="text-sm font-semibold text-white tracking-wide">
                  Get a Free Quote
                </span>
                <ArrowRight className="w-4 h-4 text-[#00D5FF] transition-transform duration-200 group-hover:translate-x-1 group-hover:text-white" />
              </span>
            </button>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex items-center lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-[#A8B5C7] hover:text-white hover:bg-white/5 focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#07111F]/98 border-b border-white/10 px-4 pt-3 pb-6 shadow-2xl backdrop-blur-xl animate-fadeIn">
          <div className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick(link.href);
                }}
                className="px-4 py-3 rounded-xl text-base font-medium text-white/90 hover:text-white hover:bg-white/5 transition-colors"
              >
                {link.name}
              </a>
            ))}
            <div className="pt-3">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  trackEvent('quote_cta_mobile_nav');
                  onQuoteClick();
                }}
                className="w-full flex items-center justify-center space-x-2 py-3 px-5 rounded-xl bg-gradient-to-r from-[#087CFF] to-[#00D5FF] text-white font-semibold shadow-lg shadow-[#087CFF]/30 active:scale-98 transition-all"
              >
                <span>Get a Free Quote</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
