import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { trackEvent } from '../services/api';

export default function WhatsAppFloating({ whatsappNumber, whatsappMessage }) {
  const [showTooltip, setShowTooltip] = useState(false);

  const defaultNumber = '+1 (305) 890-2184';
  const defaultMsg = 'Hi! I found RydenTec online and I\'m interested in discussing a digital project for my business.';

  const targetNumber = (whatsappNumber || defaultNumber).replace(/[^0-9]/g, '');
  const messageText = whatsappMessage || defaultMsg;

  const handleClick = () => {
    trackEvent('whatsapp_click');
    const url = `https://wa.me/${targetNumber}?text=${encodeURIComponent(messageText)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex items-center group">
      {/* Floating Tooltip Pill */}
      {showTooltip && (
        <div className="mr-3 hidden sm:flex items-center space-x-2 px-3.5 py-2 rounded-xl bg-[#0B1730] border border-emerald-500/30 text-white text-xs shadow-xl backdrop-blur-md animate-fadeIn">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span>Chat directly with RydenTec</span>
          <button 
            onClick={(e) => {
              e.stopPropagation();
              setShowTooltip(false);
            }} 
            className="text-[#A8B5C7] hover:text-white ml-1"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      )}

      {/* Main WhatsApp Floating Button */}
      <button
        onClick={handleClick}
        onMouseEnter={() => setShowTooltip(true)}
        className="relative p-3.5 sm:p-4 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white shadow-2xl shadow-emerald-500/40 hover:scale-110 active:scale-95 transition-all duration-300 flex items-center justify-center focus:outline-none focus:ring-4 focus:ring-emerald-400/30"
        aria-label="Chat on WhatsApp with RydenTec"
      >
        {/* Subtle Ping Ring */}
        <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-300 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-400 border-2 border-[#07111F]"></span>
        </span>

        {/* WhatsApp Icon */}
        <svg 
          className="w-6 h-6 sm:w-7 sm:h-7 fill-current" 
          viewBox="0 0 24 24"
        >
          <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.771-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.275.072.376-.044c.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.045.072.045.419-.099.824zm-3.392-12.416c-5.514 0-10 4.486-10 10 0 1.761.459 3.418 1.26 4.863l-1.299 4.747 4.869-1.277c1.396.762 2.99 1.199 4.685 1.199 5.514 0 10-4.486 10-10s-4.486-10-10-10zm0 18.232c-1.528 0-2.973-.42-4.218-1.151l-.302-.179-2.883.756.769-2.809-.197-.313c-.808-1.287-1.237-2.778-1.237-4.316 0-4.542 3.696-8.238 8.238-8.238 4.541 0 8.238 3.696 8.238 8.238 0 4.541-3.697 8.238-8.238 8.238z" />
        </svg>
      </button>
    </div>
  );
}
