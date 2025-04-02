
import React from 'react';
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-spiti-forest to-spiti-blue/30">
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-20 lg:pt-28">
        <div className="h-[30vh] relative overflow-hidden">
          <img src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1600&q=80" alt="Spiti Valley Mountains" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-spiti-forest/80 to-transparent"></div>
          <div className="container mx-auto px-4 relative z-10 h-full flex flex-col justify-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">Terms and Conditions</h1>
          </div>
        </div>
      </section>
      
      {/* Terms Content */}
      <section className="py-12 lg:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-white/10 backdrop-blur-sm p-6 md:p-8 rounded-lg">
            <p className="text-white/90 mb-6">
              Welcome to Spitivalleytravels! By using our services, including fixed departure group tours, customized personal tours, treks, and other related activities, you agree to the following Terms and Conditions. Please read them carefully.
            </p>
            
            <h2 className="text-2xl font-bold text-white mt-8 mb-4">1. Booking and Payment Terms</h2>
            <ul className="list-disc pl-6 text-white/90 space-y-2">
              <li>Booking Confirmation: To confirm your booking, an advance of 30% of the total tour cost is required.</li>
              <li>Payment Schedule:</li>
              <ul className="list-disc pl-6 text-white/90 space-y-2 mt-2">
                <li>50% of the total tour cost must be paid at least 7 days before the tour start date.</li>
                <li>100% payment is due upon arrival at the first destination.</li>
                <li>For certain specific destinations and treks, 100% payment is required 2 days before arrival.</li>
                <li>For higher category hotels, a minimum of 50% booking amount is required.</li>
              </ul>
            </ul>
            
            <h2 className="text-2xl font-bold text-white mt-8 mb-4">2. Cancellation Policy</h2>
            <ul className="list-disc pl-6 text-white/90 space-y-2">
              <li>Cancellations must be submitted to us Email only.</li>
              <li>Cancellation charges are as follows:</li>
              <ul className="list-disc pl-6 text-white/90 space-y-2 mt-2">
                <li>From Date of Booking to 30 Days: Communication charges of Rs 2000.00 per person.</li>
                <li>30-15 Days Prior to Departure: 25% of tour cost.</li>
                <li>14-7 Days Prior to Departure: 50% of tour cost.</li>
                <li>7-3 Days Prior to Departure: 75% of tour cost.</li>
                <li>2 Days or No Show: 100% of tour cost.</li>
              </ul>
              <li>Exceptional Circumstances:</li>
              <ul className="list-disc pl-6 text-white/90 space-y-2 mt-2">
                <li>In the event of serious health issues, accidents, or instant death, the company may consider refunding the advance payment after deducting a service charge. Medical certificates or relevant documents must be provided for such requests.</li>
              </ul>
              <li>Refund for Unused Services: No refund will be provided for any unused services such as hotel, meals, cab, or other services. These will be non-refundable and non-exchangeable.</li>
            </ul>
            
            <h2 className="text-2xl font-bold text-white mt-8 mb-4">3. Tour Services and Accommodations</h2>
            <ul className="list-disc pl-6 text-white/90 space-y-2">
              <li>Room Allocation: Rooms are allocated as per the hotel policy at check-in. The room category will be as per the booking confirmation provided at the time of booking.</li>
              <li>Accommodation: Accommodation in the itinerary is at the mentioned hotels or similar. The confirmation is subject to availability at the time of booking.</li>
              <li>Air Conditioning: AC will not work in hill stations.</li>
              <li>Hotel Amenities: No refund shall be claimed if the hotel services and amenities are not up to your expectations. This will be considered on a case-by-case basis.</li>
            </ul>
            
            <h2 className="text-2xl font-bold text-white mt-8 mb-4">4. Travel and Trekking Conditions</h2>
            <ul className="list-disc pl-6 text-white/90 space-y-2">
              <li>Inherent Risks: Spitivalleytravels organizes treks and outdoor activities primarily in the Himalayan mountain ranges. Travel in remote mountain regions involves certain risks such as extreme weather (landslides, cloudbursts, snowfall), high altitudes, and difficult terrain, which could lead to delays, injuries, or, in rare cases, death.</li>
              <li>Safety Measures: While Spitivalleytravels takes reasonable measures to ensure safety, the participant acknowledges the inherent risks and dangers of such activities.</li>
              <li>Participant Responsibility: By booking with us, the participant agrees to these terms and conditions and understands that participating in these activities is done at their own risk.</li>
            </ul>
            
            <h2 className="text-2xl font-bold text-white mt-8 mb-4">5. Tour Modifications and Weather Conditions</h2>
            <p className="text-white/90 mb-4">
              Itinerary Changes: The itinerary is subject to road and weather conditions. In case of adverse weather or inaccessible destinations, we will make every effort to arrange alternatives. However, no part of the tour cost will be refunded if the itinerary is altered due to bad weather or unforeseen circumstances after the tour has commenced.
            </p>
            
            <h2 className="text-2xl font-bold text-white mt-8 mb-4">6. Refund and Cancellation of Services</h2>
            <ul className="list-disc pl-6 text-white/90 space-y-2">
              <li>Unused Services: No refunds will be issued for any unused or missed services such as hotel, cab, meals, or other facilities.</li>
              <li>Hotel Issues: If the hotel's amenities do not meet expectations, it will be considered on a case-by-case basis. No refund shall be claimed for dissatisfaction with hotel services unless due to significant issues directly caused by the hotel.</li>
            </ul>
            
            <h2 className="text-2xl font-bold text-white mt-8 mb-4">7. Special Remarks</h2>
            <ul className="list-disc pl-6 text-white/90 space-y-2">
              <li>Rates: The rates are subject to change without prior notice.</li>
              <li>Hotel Availability: No reservations have been made until booking confirmation. This is only a quotation, and the rates are valid only for the mentioned dates or month.</li>
              <li>Accommodation Substitution: If the original hotels are unavailable, equivalent or alternative accommodations will be provided.</li>
            </ul>
            
            <h2 className="text-2xl font-bold text-white mt-8 mb-4">8. Liability</h2>
            <ul className="list-disc pl-6 text-white/90 space-y-2">
              <li>Limitation of Liability: While we aim to provide a safe and enjoyable experience, Spitivalleytravels is not liable for injuries, accidents, delays, or any damages resulting from unforeseen events or conditions, including but not limited to natural disasters, strikes, accidents, or other factors beyond our control.</li>
              <li>Force Majeure: We are not responsible for any failure to deliver services due to causes beyond our control, including but not limited to natural disasters, war, government actions, or other force majeure events.</li>
            </ul>
            
            <h2 className="text-2xl font-bold text-white mt-8 mb-4">9. Travel Insurance</h2>
            <p className="text-white/90 mb-4">
              We recommend that all participants purchase travel insurance that covers cancellations, medical emergencies, and lost baggage. We are not responsible for any medical or travel-related issues that may arise during the tour.
            </p>
            
            <h2 className="text-2xl font-bold text-white mt-8 mb-4">10. Privacy and Data Protection</h2>
            <p className="text-white/90 mb-4">
              By booking with us, you consent to the collection and use of your personal data as described in our Privacy Policy available on the website.
            </p>
            
            <h2 className="text-2xl font-bold text-white mt-8 mb-4">11. Governing Law</h2>
            <p className="text-white/90 mb-4">
              These Terms and Conditions are governed by the laws of India. Any disputes will be resolved in the courts of Shimla jurisdiction.
            </p>
            
            <h2 className="text-2xl font-bold text-white mt-8 mb-4">12. Acceptance of Terms</h2>
            <p className="text-white/90 mb-4">
              By booking any tour or service through Spitivalleytravels, you confirm that you have read, understood, and agree to these Terms and Conditions, which are binding throughout your tour experience.
            </p>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default TermsOfService;
