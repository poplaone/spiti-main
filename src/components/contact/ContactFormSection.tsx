
import React, { useState } from 'react';
import { Send, Loader2 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

interface ContactFormProps {
  onSubmitSuccess: (formData: ContactFormData) => void;
}

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

const ContactFormSection = ({ onSubmitSuccess }: ContactFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<ContactFormData>({
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

  const submitContactForm = async (data: ContactFormData) => {
    try {
      setIsSubmitting(true);
      
      console.log("Submitting contact form to edge function:", data);
      
      const { data: responseData, error } = await supabase.functions.invoke('send-lead-email', {
        body: {
          ...data,
          duration: "Contact Form",
          guests: "N/A",
          isCustomized: false,
          isFixedDeparture: false
        }
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

      console.log("Contact form submitted successfully:", responseData);
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
      onSubmitSuccess(formData);
    }
  };

  return (
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
  );
};

export default ContactFormSection;
