
import React from 'react';
import { Phone, MessageSquare, Facebook, Instagram, Twitter } from 'lucide-react';

const ContactBar = () => {
  return (
    <div className="bg-spiti-forest text-white py-1.5 px-4 text-sm hidden md:block">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center gap-4">
          <a href="tel:+918626888979" className="flex items-center gap-1 hover:text-gray-300">
            <Phone className="w-3.5 h-3.5" /> +91 86268 88979 / +91 70188 71513
          </a>
          <a href="mailto:hello@spitiholiday.com" className="flex items-center gap-1 hover:text-gray-300">
            <MessageSquare className="w-3.5 h-3.5" /> hello@spitiholiday.com
          </a>
        </div>
        <div className="flex items-center gap-3">
          <span>Follow us on social media</span>
          <a href="#" className="hover:text-gray-300"><Facebook className="w-4 h-4" /></a>
          <a href="#" className="hover:text-gray-300"><Instagram className="w-4 h-4" /></a>
          <a href="#" className="hover:text-gray-300"><Twitter className="w-4 h-4" /></a>
        </div>
      </div>
    </div>
  );
};

export default ContactBar;
