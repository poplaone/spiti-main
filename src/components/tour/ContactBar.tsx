
import React from 'react';
import { Phone, MessageSquare, Facebook, Instagram } from 'lucide-react';

const ContactBar = () => {
  return (
    <div className="bg-spiti-forest text-white py-1.5 px-4 text-sm hidden md:block">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center gap-4">
          <a href="tel:+918353040008" className="flex items-center gap-1 hover:text-gray-300">
            <Phone className="w-3.5 h-3.5" /> +91 8353040008 / +91 8353010033
          </a>
          <a href="mailto:hello@spitivalleytravels.com" className="flex items-center gap-1 hover:text-gray-300">
            <MessageSquare className="w-3.5 h-3.5" /> hello@spitivalleytravels.com
          </a>
        </div>
        <div className="flex items-center gap-3">
          <span>Follow us on social media</span>
          <a href="https://www.facebook.com/profile.php?id=61571449392965" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300">
            <Facebook className="w-4 h-4" />
          </a>
          <a href="https://www.instagram.com/spitivalleytravels?igsh=NWdndDQ4bGNsM2t1" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300">
            <Instagram className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default ContactBar;
