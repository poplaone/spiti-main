
import React from 'react';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { MapPin, Phone, Mail, Clock, Facebook, Instagram, Twitter, Send } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";

const Contact = () => {
  const { toast } = useToast();
  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast({
      title: "Message sent!",
      description: "We'll get back to you as soon as possible.",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-spiti-forest to-spiti-blue/30">
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-20 lg:pt-28">
        <div className="h-[40vh] md:h-[50vh] relative overflow-hidden">
          <img 
            src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1600&q=80" 
            alt="Spiti Valley Road" 
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-spiti-forest/80 to-transparent"></div>
          <div className="container mx-auto px-4 relative z-10 h-full flex flex-col justify-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">Contact Us</h1>
            <p className="text-xl text-white/90 max-w-2xl">
              Reach out to plan your dream Spiti Valley adventure.
            </p>
          </div>
        </div>
      </section>
      
      {/* Contact Information & Form */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Contact Information */}
            <div className="lg:col-span-1">
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg h-full">
                <h2 className="text-2xl font-bold text-white mb-6">Get In Touch</h2>
                
                <div className="space-y-6">
                  <div className="flex items-start">
                    <MapPin className="text-spiti-green h-6 w-6 mt-1 mr-3 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-white">Office Address</h3>
                      <p className="text-white/80">
                        123 Himalayan Way, Kaza,<br />
                        Spiti Valley, Himachal Pradesh,<br />
                        India - 172114
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Phone className="text-spiti-green h-6 w-6 mt-1 mr-3 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-white">Phone</h3>
                      <p className="text-white/80">+91 98765 43210</p>
                      <p className="text-white/80">+91 88888 77777</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Mail className="text-spiti-green h-6 w-6 mt-1 mr-3 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-white">Email</h3>
                      <p className="text-white/80">info@spititours.com</p>
                      <p className="text-white/80">bookings@spititours.com</p>
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
                    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="bg-white/10 hover:bg-white/20 transition-colors p-3 rounded-full">
                      <Twitter className="text-white h-5 w-5" />
                    </a>
                    <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer" className="bg-white/10 hover:bg-white/20 transition-colors p-3 rounded-full">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white"><path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21"></path><path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1Z"></path><path d="M14 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1Z"></path><path d="M9.5 15.5a5 5 0 0 0 5 0"></path></svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg">
                <h2 className="text-2xl font-bold text-white mb-6">Send Us a Message</h2>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-white font-medium mb-2">Your Name</label>
                      <Input 
                        id="name" 
                        placeholder="John Doe" 
                        required 
                        className="bg-white/5 border-white/20 text-white placeholder:text-white/50" 
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-white font-medium mb-2">Email Address</label>
                      <Input 
                        id="email" 
                        type="email" 
                        placeholder="john@example.com" 
                        required 
                        className="bg-white/5 border-white/20 text-white placeholder:text-white/50" 
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="phone" className="block text-white font-medium mb-2">Phone Number</label>
                      <Input 
                        id="phone" 
                        placeholder="+91 98765 43210" 
                        className="bg-white/5 border-white/20 text-white placeholder:text-white/50" 
                      />
                    </div>
                    <div>
                      <label htmlFor="subject" className="block text-white font-medium mb-2">Subject</label>
                      <Input 
                        id="subject" 
                        placeholder="Booking Inquiry" 
                        required 
                        className="bg-white/5 border-white/20 text-white placeholder:text-white/50" 
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-white font-medium mb-2">Your Message</label>
                    <Textarea 
                      id="message" 
                      placeholder="I'm interested in booking a tour for..."
                      rows={6}
                      required
                      className="bg-white/5 border-white/20 text-white placeholder:text-white/50 resize-none"
                    />
                  </div>
                  
                  <Button type="submit" className="bg-gradient-to-r from-spiti-green to-spiti-blue hover:opacity-90">
                    <Send className="mr-2 h-4 w-4" /> Send Message
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Map Section */}
      <section className="py-8 pb-16">
        <div className="container mx-auto px-4">
          <div className="bg-white/10 backdrop-blur-sm p-1 rounded-lg overflow-hidden">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d54301.04853550023!2d78.0045329019235!3d32.22466088662!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39064c45fd55de77%3A0xec91f0c00c4d865d!2sKaza%2C%20Himachal%20Pradesh%20172114!5e0!3m2!1sen!2sin!4v1689245845349!5m2!1sen!2sin" 
              width="100%" 
              height="450" 
              style={{ border: 0 }} 
              allowFullScreen 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="Spiti Valley Map"
            ></iframe>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Contact;
