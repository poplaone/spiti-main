
import React from 'react';
import { MapPin, Phone, Mail, Clock, Facebook, Instagram } from 'lucide-react';

const ContactInfo = () => {
  return (
    <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg h-full">
      <h2 className="text-2xl font-bold text-white mb-6">Get In Touch</h2>
      
      <div className="space-y-6">
        <div className="flex items-start">
          <MapPin className="text-spiti-green h-6 w-6 mt-1 mr-3 flex-shrink-0" />
          <div>
            <h3 className="font-semibold text-white">Office Address</h3>
            <p className="text-white/80 mb-2">
              Ground Floor, Mehta Villa, Upper Khalini Chowk,<br />
              Shimla, Himachal Pradesh
            </p>
            <p className="text-white/80">
              Quality Restaurant Building, 1st Floor,<br />
              Main Bazar Chirgaon, Distt. Shimla,<br />
              Himachal Pradesh
            </p>
          </div>
        </div>
        
        <div className="flex items-start">
          <Phone className="text-spiti-green h-6 w-6 mt-1 mr-3 flex-shrink-0" />
          <div>
            <h3 className="font-semibold text-white">Phone</h3>
            <p className="text-white/80">+91 83530 40008</p>
            <p className="text-white/80">+91 83530 10033</p>
            <p className="text-white/80">+91 78761 63051</p>
          </div>
        </div>
        
        <div className="flex items-start">
          <Mail className="text-spiti-green h-6 w-6 mt-1 mr-3 flex-shrink-0" />
          <div>
            <h3 className="font-semibold text-white">Email</h3>
            <p className="text-white/80">Hello@spitivalleytravels.com</p>
            <p className="text-white/80">spitivalleytravels@gmail.com</p>
          </div>
        </div>
        
        <div className="flex items-start">
          <Clock className="text-spiti-green h-6 w-6 mt-1 mr-3 flex-shrink-0" />
          <div>
            <h3 className="font-semibold text-white">Office Hours</h3>
            <p className="text-white/80">Monday - Friday: 9:00 AM - 6:00 PM</p>
            <p className="text-white/80">Saturday: 10:00 AM - 4:00 PM</p>
            <p className="text-white/80">Sunday: Closed</p>
          </div>
        </div>

        <div className="flex items-start">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-spiti-green h-6 w-6 mt-1 mr-3 flex-shrink-0"><path d="m19 5 3-3m-3 3-3-3m3 3v13a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path></svg>
          <div>
            <h3 className="font-semibold text-white">Approvals</h3>
            <p className="text-white/80">Approved by the Government of Himachal Pradesh, Department of Tourism</p>
          </div>
        </div>

        <div className="flex items-start">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-spiti-green h-6 w-6 mt-1 mr-3 flex-shrink-0"><path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2"></path><path d="M18 14h-8"></path><path d="M15 18h-5"></path><path d="M10 6h8v4h-8V6Z"></path></svg>
          <div>
            <h3 className="font-semibold text-white">Website</h3>
            <p className="text-white/80">www.spitivalleytravels.com</p>
          </div>
        </div>
      </div>
      
      <div className="mt-8">
        <h3 className="font-semibold text-white mb-3">Follow Us</h3>
        <div className="flex space-x-4">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="bg-white/10 hover:bg-white/20 transition-colors p-3 rounded-full">
            <Facebook className="text-white h-5 w-5" />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="bg-white/10 hover:bg-white/20 transition-colors p-3 rounded-full">
            <Instagram className="text-white h-5 w-5" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;
