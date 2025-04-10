
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactHero from "@/components/contact/ContactHero";
import ContactInfo from "@/components/contact/ContactInfo";
import ContactFormSection, { ContactFormData } from "@/components/contact/ContactFormSection";

const Contact = () => {
  const navigate = useNavigate();

  const handleFormSuccess = (formData: ContactFormData) => {
    navigate('/thank-you', { 
      state: { 
        formData: {
          ...formData
        } 
      }
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-spiti-forest to-spiti-blue/30">
      <Header />
      
      <ContactHero 
        title="Contact Us" 
        description="Reach out to plan your dream Spiti Valley adventure." 
      />
      
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            <div className="lg:col-span-1">
              <ContactInfo />
            </div>
            
            <div className="lg:col-span-2">
              <ContactFormSection onSubmitSuccess={handleFormSuccess} />
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Contact;
