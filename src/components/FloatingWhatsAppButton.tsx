
import React from 'react';
import { MessageSquare } from 'lucide-react';
import { trackButtonClick } from '@/utils/analyticsUtils';

const FloatingWhatsAppButton = () => {
  const handleWhatsAppClick = () => {
    // Track the WhatsApp button click
    trackButtonClick('whatsapp_floating', 'global_floating_button');
    
    // Open WhatsApp with a prepared message
    const message = "Hi! I'm interested in booking a tour to Spiti Valley.";
    const whatsappURL = `https://wa.me/918894216348?text=${encodeURIComponent(message)}`;
    window.open(whatsappURL, '_blank');
  };

  return (
    <button
      onClick={handleWhatsAppClick}
      className="fixed bottom-20 md:bottom-8 right-6 z-50 bg-green-600 hover:bg-green-700 transition-colors p-3 rounded-full shadow-lg text-white"
      aria-label="Contact via WhatsApp"
    >
      <MessageSquare className="h-7 w-7" />
    </button>
  );
};

export default FloatingWhatsAppButton;
