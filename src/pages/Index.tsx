import { useRef } from 'react';
import Header from "@/components/Header";
import HeroCarousel from "@/components/HeroCarousel";
import PhotoGallery from "@/components/PhotoGallery";
import TourPackages from "@/components/TourPackages";
import SpitiCircuitMap from "@/components/SpitiCircuitMap";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import LeadForm from "@/components/LeadForm";
import Footer from "@/components/Footer";
import { Phone, MessageSquare, PhoneCall } from 'lucide-react';
import ScrollingInfoStrip from "@/components/ScrollingInfoStrip";
import FloatingWhatsAppButton from "@/components/FloatingWhatsAppButton";
const Index = () => {
  const packagesSectionRef = useRef<HTMLElement>(null);
  const scrollToPackages = () => {
    packagesSectionRef.current?.scrollIntoView({
      behavior: 'smooth'
    });
  };
  return <div className="min-h-screen">
      {/* Hero Carousel with overlaid Header */}
      <HeroCarousel />
      <Header scrollToPackages={scrollToPackages} />
      
      {/* Add the scrolling info strip between sections */}
      <ScrollingInfoStrip />
      
      {/* Tour Packages Section - Updated to remove cream gradient */}
      <section id="tour-packages" ref={packagesSectionRef} className="py-16 bg-transparent">
        <div className="container mx-auto px-4 bg-transparent">
          <div className="flex flex-col md:flex-row gap-8 items-start mb-12">
            {/* Booking Card */}
            <div className="w-full md:w-[350px] bg-white/90 p-6 rounded-lg shadow-lg order-2 md:order-1">
              <h2 className="text-2xl font-heading font-bold text-center text-spiti-forest mb-4">Book Your Spiti Adventure</h2>
              <div className="space-y-4">
                <div className="text-center">
                  <p className="text-xl font-bold text-green-600">Starting from ₹18,900/-</p>
                  <p className="text-sm text-gray-600">All-inclusive packages with accommodation, meals & transport</p>
                </div>
                <div className="space-y-2">
                  <p className="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-500"><path d="M20 6 9 17l-5-5" /></svg>
                    Expert Himalayan Local Guides
                  </p>
                  <p className="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-500"><path d="M20 6 9 17l-5-5" /></svg>
                    Comfortable Stays at Scenic Locations
                  </p>
                  <p className="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-500"><path d="M20 6 9 17l-5-5" /></svg>
                    Authentic Cultural Experiences
                  </p>
                  <p className="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-500"><path d="M20 6 9 17l-5-5" /></svg>
                    Safe Travel in High Altitude Desert
                  </p>
                </div>
                <div className="space-y-3">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="w-full py-2 bg-spiti-forest hover:bg-spiti-forest/90">Book Now</Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md">
                      <LeadForm />
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </div>

            {/* Section heading and text */}
            <div className="max-w-3xl mx-auto text-left md:text-left order-1 md:order-2">
              <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4 text-spiti-forest text-center">Explore Unforgettable Spiti Valley Tour Packages</h2>
              <p className="mb-4 text-neutral-950 text-base text-center">Embark on an extraordinary journey through the breathtaking landscapes of Spiti Valley, where rugged terrains meet ancient monasteries, pristine lakes, and towering Himalayan peaks. Our meticulously designed tour packages ensure an immersive experience, blending adventure, culture, and natural beauty.

            </p>
              <p className="text-neutral-950 text-center">Whether you crave the thrill of a bike expedition, a women-only adventure, or a family road trip, we have the perfect itinerary tailored for you. Choose from our all-inclusive packages and let us take care of the details while you soak in the magic of Spiti.

            </p>
            </div>
          </div>

          {/* First display the Discover Spiti Valley section */}
          <TourPackages />
          
          {/* Then show the Spiti Circuit Map section - moved as requested */}
          <div className="mt-8">
            <div className="text-center mb-6">
              
              
            </div>
            <SpitiCircuitMap />
          </div>
        </div>
      </section>

      {/* Gallery Section - Updated to maintain bluish background but reduced top margin */}
      <section className="pt-8 pb-16 bg-transparent">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4 text-spiti-forest">Spiti Valley Photo Gallery</h2>
            <p className="text-gray-700 mb-4">
              Immerse yourself in the breathtaking vistas and cultural wonders of Spiti Valley through our curated collection of photographs.
              From ancient monasteries perched on hilltops to the crystal-clear Chandrataal Lake and the rugged terrain of the Himalayan cold desert,
              these images offer a glimpse into the remote paradise awaiting your exploration.
            </p>
          </div>
          <PhotoGallery />
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-16 relative" style={{
      backgroundImage: `linear-gradient(to bottom, rgba(45, 58, 58, 0.9), rgba(45, 58, 58, 0.95)), url(https://images.unsplash.com/photo-1501854140801-50d01698950b?w=800&q=70)`,
      backgroundSize: 'cover',
      backgroundPosition: 'center'
    }}>
        <div className="container mx-auto px-4 text-center text-white">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">Ready for Your Spiti Valley Adventure?</h2>
          <p className="text-xl mb-4 max-w-2xl mx-auto">
            Explore our curated collection of Spiti Valley tours and create memories that last a lifetime. Our expert local guides
            are waiting to show you the hidden gems of this Himalayan wonderland.
          </p>
          <p className="mb-8 max-w-2xl mx-auto">
            Book your journey through the ancient monasteries, remote villages, and breathtaking landscapes of the Tibetan Buddhist 
            culture tucked away in the Indian Himalayas.
          </p>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-spiti-green to-spiti-blue px-8 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity">
                Plan Your Journey Now
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <LeadForm />
            </DialogContent>
          </Dialog>
        </div>
      </section>
      
      {/* Mobile Sticky Footer */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-spiti-forest shadow-[0_-2px_10px_rgba(0,0,0,0.1)] z-40">
        <div className="flex items-center">
          <Dialog>
            <DialogTrigger asChild>
              <Button className="flex-1 rounded-none h-14 bg-spiti-slate hover:bg-spiti-slate/90 text-white">
                <MessageSquare className="mr-2 h-5 w-5" />
                Send Enquiry
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <LeadForm />
            </DialogContent>
          </Dialog>
          
          <a href="tel:+918626888979" className="flex-1 flex items-center justify-center h-14 bg-green-600 hover:bg-green-700 text-white">
            <PhoneCall className="mr-2 h-5 w-5" />
            Call Now
          </a>
        </div>
      </div>
      
      {/* Floating WhatsApp Button */}
      <FloatingWhatsAppButton />
      
      <Footer />
    </div>;
};
export default Index;