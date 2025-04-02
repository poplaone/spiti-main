
import React from 'react';
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-spiti-forest to-spiti-blue/30">
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-20 lg:pt-28">
        <div className="h-[30vh] relative overflow-hidden">
          <img src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1600&q=80" alt="Spiti Valley Mountains" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-spiti-forest/80 to-transparent"></div>
          <div className="container mx-auto px-4 relative z-10 h-full flex flex-col justify-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">Privacy Policy</h1>
          </div>
        </div>
      </section>
      
      {/* Privacy Policy Content */}
      <section className="py-12 lg:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-white/10 backdrop-blur-sm p-6 md:p-8 rounded-lg">
            <p className="text-white/90 mb-6">
              At Spitivalleytravels, we value your privacy and are committed to protecting the personal information you share with us. This Privacy Policy outlines how we collect, use, store, and protect your information when you visit our website and use our services. By using our website and services, you agree to the collection and use of information in accordance with this policy.
            </p>
            
            <h2 className="text-2xl font-bold text-white mt-8 mb-4">1. Information We Collect</h2>
            <p className="text-white/90 mb-4">We may collect the following types of personal information:</p>
            <ul className="list-disc pl-6 text-white/90 space-y-2">
              <li>Personal Identification Information: Name, email address, phone number, address, payment information, etc.</li>
              <li>Tour Details: Information related to the tours you book, such as destination, dates, preferences, and special requests.</li>
              <li>Usage Data: Information on how you access and use our website (e.g., IP address, browser type, pages visited, and timestamps).</li>
              <li>Cookies and Tracking Technologies: We may use cookies and similar technologies to improve your user experience and track your activity on our site.</li>
            </ul>
            
            <h2 className="text-2xl font-bold text-white mt-8 mb-4">2. How We Use Your Information</h2>
            <p className="text-white/90 mb-4">The information we collect may be used for the following purposes:</p>
            <ul className="list-disc pl-6 text-white/90 space-y-2">
              <li>Booking and Reservation: To process your bookings, confirm your reservations, and provide customer support.</li>
              <li>Communication: To send you booking confirmations, promotional offers, newsletters, and important updates related to your tours.</li>
              <li>Payment Processing: To process payments for the services you book through our website.</li>
              <li>Personalization: To customize your experience and offer recommendations based on your travel preferences.</li>
              <li>Improvement of Services: To analyze trends, improve the functionality of our website, and enhance customer service.</li>
              <li>Legal Requirements: To comply with applicable laws, regulations, and legal processes.</li>
            </ul>
            
            <h2 className="text-2xl font-bold text-white mt-8 mb-4">3. Sharing of Your Information</h2>
            <p className="text-white/90 mb-4">
              We do not sell, rent, or trade your personal information to third parties. However, we may share your information in the following cases:
            </p>
            <ul className="list-disc pl-6 text-white/90 space-y-2">
              <li>Third-Party Service Providers: We may share your information with third-party service providers, such as hotels, transportation companies, or payment processors, to fulfill your booking and provide related services.</li>
              <li>Legal Compliance: If required by law or in response to a valid legal request (e.g., subpoenas or court orders), we may share your information with law enforcement or regulatory authorities.</li>
              <li>Business Transfers: In the event of a merger, acquisition, or sale of assets, your information may be transferred as part of the transaction. We will notify you of any change in ownership or use of your personal data.</li>
            </ul>
            
            <h2 className="text-2xl font-bold text-white mt-8 mb-4">4. Cookies and Tracking Technologies</h2>
            <p className="text-white/90 mb-4">
              We use cookies and similar technologies to collect information about how you use our website. This helps us provide a more personalized experience and understand user behavior on the site. You can control the use of cookies through your browser settings, but please note that disabling cookies may affect the functionality of our website.
            </p>
            
            <h2 className="text-2xl font-bold text-white mt-8 mb-4">5. Data Security</h2>
            <p className="text-white/90 mb-4">
              We take reasonable precautions to protect your personal information from unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet or electronic storage is 100% secure. We cannot guarantee the absolute security of your information, but we are committed to ensuring its protection to the best of our ability.
            </p>
            
            <h2 className="text-2xl font-bold text-white mt-8 mb-4">6. Data Retention</h2>
            <p className="text-white/90 mb-4">
              We will retain your personal information for as long as necessary to fulfill the purposes outlined in this Privacy Policy, or as required by law. If you request to delete your personal data, we will comply with applicable legal requirements, but some data may be retained for legal or business purposes.
            </p>
            
            <h2 className="text-2xl font-bold text-white mt-8 mb-4">7. Your Rights and Choices</h2>
            <p className="text-white/90 mb-4">You have the following rights regarding your personal information:</p>
            <ul className="list-disc pl-6 text-white/90 space-y-2">
              <li>Access: You have the right to request a copy of the personal information we hold about you.</li>
              <li>Correction: You may request that we correct any inaccuracies in your personal information.</li>
              <li>Deletion: You may request the deletion of your personal data, subject to certain legal exceptions.</li>
              <li>Opt-out: You can opt out of receiving marketing emails and promotional offers from us by following the unsubscribe instructions in the email or by contacting us directly.</li>
            </ul>
            
            <h2 className="text-2xl font-bold text-white mt-8 mb-4">8. Children's Privacy</h2>
            <p className="text-white/90 mb-4">
              Our services are not intended for individuals under the age of 18. We do not knowingly collect personal information from children under 18. If we become aware that we have inadvertently collected personal information from a child, we will take steps to delete such information from our records.
            </p>
            
            <h2 className="text-2xl font-bold text-white mt-8 mb-4">9. Changes to this Privacy Policy</h2>
            <p className="text-white/90 mb-4">
              We reserve the right to update or modify this Privacy Policy at any time. Any changes will be posted on this page, with the updated date indicated at the top of the policy. We encourage you to review this policy periodically to stay informed about how we are protecting your information.
            </p>
            
            <h2 className="text-2xl font-bold text-white mt-8 mb-4">10. Contact Us</h2>
            <p className="text-white/90 mb-4">
              If you have any questions or concerns about this Privacy Policy or our data practices, please contact us at:
            </p>
            <ul className="list-none text-white/90 space-y-2">
              <li>Email: Hello@spitivalleytravels.com or spitivalleytravels@gmail.com</li>
              <li>Phone: +91-8353040008 / 8353010033</li>
              <li>Address: Quality Restaurant Building, 1st Floor, Main Bazar Chirgaon Distt. Shimla Himachal Pradesh.</li>
            </ul>
            
            <p className="text-white/90 mt-6">
              By using our website and services, you acknowledge that you have read, understood, and agree to the terms outlined in this Privacy Policy.
            </p>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
