
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { MapPin, Phone, Mail, Clock, Facebook, Instagram, Send, Loader2 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

const Contact = () => {
  const navigate = useNavigate();
  const { toast: uiToast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const submitContactForm = async (data: any) => {
    try {
      setIsSubmitting(true);
      
      // Minimize data sent to edge function to reduce egress
      const minimizedData = {
        name: data.name,
        email: data.email,
        phone: data.phone || 'N/A',
        subject: data.subject,
        message: data.message,
        formType: 'Contact Form',
      };
      
      console.log("Submitting contact form with minimized data");
      
      const { data: responseData, error } = await supabase.functions.invoke('send-lead-email', {
        body: minimizedData
      });

      if (error) {
        console.error("Error sending contact form:", error);
        toast.error("Failed to send your message. Please try again later.");
        return false;
      }

      if (!responseData || !responseData.success) {
        console.error("Contact form submission failed:", responseData);
        toast.error("Failed to send your message. Please try again later.");
        return false;
      }

      console.log("Contact form submitted successfully");
      return true;
    } catch (err) {
      console.error("Exception sending contact form:", err);
      toast.error("Failed to send your message. Please try again later.");
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!formData.name.trim()) {
      toast.error("Please enter your name");
      return;
    }
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) {
      toast.error("Please enter a valid email address");
      return;
    }
    if (!formData.subject.trim()) {
      toast.error("Please enter a subject");
      return;
    }
    if (!formData.message.trim()) {
      toast.error("Please enter your message");
      return;
    }

    const toastId = toast.loading("Sending your message...");
    
    const success = await submitContactForm(formData);
    
    toast.dismiss(toastId);

    if (success) {
      toast.success("Your message has been sent successfully!");
      
      // Use a simpler approach for thank-you navigation to reduce state size
      navigate('/thank-you', { 
        state: { 
          name: formData.name,
          email: formData.email 
        }
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-spiti-forest to-spiti-blue/30">
      <Header />
      
      <section className="relative pt-20 lg:pt-28">
        <div className="h-[40vh] md:h-[50vh] relative overflow-hidden">
          <img 
            src="/lovable-uploads/ca833426-3806-4da0-b1eb-d94155df1935.png" 
            alt="Spiti Valley in Winter with Prayer Flags" 
            className="absolute inset-0 w-full h-full object-cover" 
            loading="eager"
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
      
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            <div className="lg:col-span-1">
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
            </div>
            
            <div className="lg:col-span-2">
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg">
                <h2 className="text-2xl font-bold text-white mb-6">Send Us a Message</h2>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-white font-medium mb-2">Your Name</label>
                      <Input 
                        id="name" 
                        value={formData.name}
                        onChange={handleChange}
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
                        value={formData.email}
                        onChange={handleChange}
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
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+91 98765 43210" 
                        className="bg-white/5 border-white/20 text-white placeholder:text-white/50" 
                      />
                    </div>
                    <div>
                      <label htmlFor="subject" className="block text-white font-medium mb-2">Subject</label>
                      <Input 
                        id="subject" 
                        value={formData.subject}
                        onChange={handleChange}
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
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="I'm interested in booking a tour for..." 
                      rows={6} 
                      required 
                      className="bg-white/5 border-white/20 text-white placeholder:text-white/50 resize-none" 
                    />
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="bg-gradient-to-r from-spiti-green to-spiti-blue hover:opacity-90"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Sending...
                      </>
                    ) : (
                      <>
                        <Send className="mr-2 h-4 w-4" /> Send Message
                      </>
                    )}
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};
export default Contact;
