import React from 'react';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { StarIcon } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
const About = () => {
  return <div className="min-h-screen bg-gradient-to-b from-spiti-forest to-spiti-blue/30">
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-20 lg:pt-28">
        <div className="h-[50vh] md:h-[60vh] relative overflow-hidden">
          <img src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1600&q=80" alt="Spiti Valley Mountains" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-spiti-forest/80 to-transparent"></div>
          <div className="container mx-auto px-4 relative z-10 h-full flex flex-col justify-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">About Us</h1>
            <p className="text-xl text-white/90 max-w-2xl">
              Passionate explorers dedicated to sharing the magic of Spiti Valley with adventurous souls worldwide.
            </p>
          </div>
        </div>
      </section>
      
      {/* Our Story Section */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-white mb-6">Our Story</h2>
              <p className="text-white/90 mb-4">
                Founded in 2015 by a group of local Spiti residents and passionate travelers, Spiti Valley Tours was born out of a deep love for this extraordinary Himalayan region and a desire to share its wonders with the world.
              </p>
              <p className="text-white/90 mb-4">
                What started as a small operation with just two guides and a single jeep has now grown into the region's premier tour operator, while still maintaining our commitment to sustainable tourism, authentic experiences, and supporting local communities.
              </p>
              <p className="text-white/90">
                Our team consists of local guides who were born and raised in Spiti Valley, giving them unparalleled knowledge of the region's geography, culture, and hidden gems that most tourists never discover.
              </p>
            </div>
            <div className="rounded-lg overflow-hidden shadow-xl">
              <img src="https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=800&q=80" alt="Spiti Valley Landscape" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </section>
      
      {/* Our Mission Section */}
      <section className="py-16 bg-gradient-to-r from-spiti-blue/20 to-spiti-green/20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-8">Our Mission</h2>
          <div className="max-w-4xl mx-auto">
            <p className="text-xl text-white/90 mb-6">
              To provide unforgettable experiences that connect travelers with the natural beauty and cultural heritage of Spiti Valley, while preserving its delicate ecosystem and supporting local communities.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg">
                <div className="bg-spiti-green/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-spiti-green"><path d="m7 11 2-2-2-2"></path><path d="M11 13h4"></path><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect></svg>
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Sustainable Tourism</h3>
                <p className="text-white/80">
                  We are committed to minimizing our environmental footprint and promoting sustainable tourism practices.
                </p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg">
                <div className="bg-spiti-blue/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-spiti-blue"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Cultural Respect</h3>
                <p className="text-white/80">
                  We honor local traditions and ensure our tours provide authentic cultural insights with utmost respect.
                </p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg">
                <div className="bg-cyan-500/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-cyan-500"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"></path><path d="m15 5 4 4"></path></svg>
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Local Impact</h3>
                <p className="text-white/80">
                  We create employment opportunities for local communities and support regional development initiatives.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Team Section */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-white mb-12 text-center">Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="bg-white/10 backdrop-blur-sm border-0">
              <CardContent className="p-6">
                <div className="mb-4 h-48 rounded-lg overflow-hidden">
                  <img src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&q=80" alt="Team Member" className="w-full h-full object-cover" />
                </div>
                <h3 className="text-xl font-bold text-white mb-1">Tenzin Norgay</h3>
                <p className="text-spiti-green mb-3">Founder & Lead Guide</p>
                <p className="text-white/80">
                  Born in Kaza, Tenzin has been exploring Spiti's hidden corners since childhood. His knowledge of local culture and terrain is unmatched.
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-white/10 backdrop-blur-sm border-0">
              <CardContent className="p-6">
                <div className="mb-4 h-48 rounded-lg overflow-hidden">
                  <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80" alt="Team Member" className="w-full h-full object-cover" />
                </div>
                <h3 className="text-xl font-bold text-white mb-1">Padma Yangzom</h3>
                <p className="text-spiti-green mb-3">Operations Manager</p>
                <p className="text-white/80">
                  Padma ensures every tour runs smoothly, from planning logistics to coordinating with local homestays and monasteries.
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-white/10 backdrop-blur-sm border-0">
              <CardContent className="p-6">
                <div className="mb-4 h-48 rounded-lg overflow-hidden">
                  <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80" alt="Team Member" className="w-full h-full object-cover" />
                </div>
                <h3 className="text-xl font-bold text-white mb-1">Dorje Tsering</h3>
                <p className="text-spiti-green mb-3">Senior Guide & Photographer</p>
                <p className="text-white/80">
                  A professionally trained photographer, Dorje helps travelers capture the breathtaking landscapes and moments during their journey.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      
      
      <Footer />
    </div>;
};
export default About;