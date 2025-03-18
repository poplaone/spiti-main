import { useRef } from 'react';
import Header from "@/components/Header";
import LeadForm from "@/components/LeadForm";
import PhotoGallery from "@/components/PhotoGallery";
import TourPackages from "@/components/TourPackages";
import SpitiCircuitMap from "@/components/SpitiCircuitMap";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import Footer from "@/components/Footer";
const Index = () => {
  const packagesSectionRef = useRef<HTMLElement>(null);
  const scrollToPackages = () => {
    packagesSectionRef.current?.scrollIntoView({
      behavior: 'smooth'
    });
  };
  return <div className="min-h-screen">
      <Header scrollToPackages={scrollToPackages} />
      
      {/* Hero Section - Added pt-16 md:pt-20 to fix header overlap */}
      <section className="min-h-[calc(100vh)] relative flex items-center py-8 md:py-12 pt-16 md:pt-20" style={{
      backgroundImage: `url(https://images.unsplash.com/photo-1472396961693-142e6e269027?w=800&q=70)`,
      backgroundSize: 'cover',
      backgroundPosition: 'center'
    }}>
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="container mx-auto px-4 flex flex-col-reverse md:flex-row items-center justify-between gap-8 relative z-10">
          <div className="flex-1 text-white max-w-2xl space-y-6">
            <h1 className="text-3xl md:text-5xl font-bold bg-black/30 backdrop-blur-sm inline-block px-4 py-2 rounded">
              <span className="bg-gradient-to-r from-green-400 via-yellow-300 to-orange-500 text-transparent bg-clip-text">
                SPITI VALLEY TOUR PACKAGES
              </span>
            </h1>
            <p className="text-xl md:text-2xl bg-black/30 backdrop-blur-sm px-4 py-2 rounded">
              <span className="bg-gradient-to-r from-green-300 via-yellow-200 to-orange-400 text-transparent bg-clip-text">
                Experience the Himalayan Adventure with Customized Tours from Trusted Local Agents
              </span>
            </p>
            <div className="space-y-3 text-base md:text-lg">
              {["Best Priced Spiti Valley Packages within your budget", "Expert Local Guides for Authentic Himalayan Experiences", "Safe and Comfortable Travel in the High-Altitude Desert"].map((text, index) => <p key={index} className="bg-black/30 backdrop-blur-sm px-4 py-2 rounded inline-block">
                  <span className="bg-gradient-to-r from-green-200 via-yellow-100 to-orange-300 text-transparent bg-clip-text">
                    {text}
                  </span>
                </p>)}
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="bg-spiti-blue hover:bg-spiti-blue/90 px-8 py-3 rounded-lg font-semibold transition-opacity">
                    Enquire Now
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <LeadForm />
                </DialogContent>
              </Dialog>
              
              <Button onClick={scrollToPackages} className="px-8 py-3 rounded-lg font-semibold transition-opacity bg-fuchsia-600 hover:bg-fuchsia-500">
                Explore Packages
              </Button>
            </div>
          </div>
          
          <div className="w-full md:w-[400px] bg-white/20 backdrop-blur-md p-3 md:p-4 shadow-lg border border-white/20 rounded-sm">
            <LeadForm />
          </div>
        </div>
      </section>

      {/* Tour Packages Section - Updated background image */}
      <section id="tour-packages" ref={packagesSectionRef} className="py-16 relative" style={{
      backgroundImage: `url(public/lovable-uploads/439d44cf-b459-4b3c-b69c-650fafbf80dc.png)`,
      backgroundSize: 'cover',
      backgroundPosition: 'center'
    }}>
        <div className="absolute inset-0 bg-black/30 backdrop-blur-[2px]"></div>
        <div className="container mx-auto px-4 relative z-10 bg-neutral-700">
          <div className="flex flex-col md:flex-row gap-8 items-start mb-12">
            {/* Booking Card */}
            <div className="w-full md:w-[350px] bg-white/30 backdrop-blur-md p-6 rounded-lg shadow-lg border border-white/20 order-2 md:order-1">
              <h2 className="text-2xl font-bold text-center text-white mb-4">Book Your Spiti Adventure</h2>
              <div className="space-y-4">
                <div className="text-center">
                  <p className="text-xl font-bold text-white">Starting from ₹18,900/-</p>
                  <p className="text-sm text-white">All-inclusive packages with accommodation, meals & transport</p>
                </div>
                <div className="space-y-2">
                  <p className="flex items-center gap-2 text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-300"><path d="M20 6 9 17l-5-5" /></svg>
                    Expert Himalayan Local Guides
                  </p>
                  <p className="flex items-center gap-2 text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-300"><path d="M20 6 9 17l-5-5" /></svg>
                    Comfortable Stays at Scenic Locations
                  </p>
                  <p className="flex items-center gap-2 text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-300"><path d="M20 6 9 17l-5-5" /></svg>
                    Authentic Cultural Experiences
                  </p>
                  <p className="flex items-center gap-2 text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-300"><path d="M20 6 9 17l-5-5" /></svg>
                    Safe Travel in High Altitude Desert
                  </p>
                </div>
                <div className="space-y-3">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="w-full py-2 bg-fuchsia-600 hover:bg-fuchsia-500 text-white">Book Now</Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md">
                      <LeadForm />
                    </DialogContent>
                  </Dialog>
                  
                  <Button className="w-full bg-spiti-blue hover:bg-spiti-blue/90 py-2" onClick={scrollToPackages}>
                    Packages
                  </Button>
                </div>
              </div>
            </div>

            {/* Section heading and text */}
            <div className="max-w-3xl mx-auto text-left md:text-left order-1 md:order-2 bg-black/30 backdrop-blur-md p-6 rounded-lg border border-white/10">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Explore Unforgettable Spiti Valley Tour Packages</h2>
              <p className="text-white mb-4">
                Discover the breathtaking landscapes of the Himalayan cold desert with our carefully curated tour packages. 
                From Buddhist monasteries and high-altitude villages to pristine lakes and snow-capped peaks, our all-inclusive 
                packages offer the perfect blend of adventure, culture, and natural beauty.
              </p>
              <p className="text-white">
                Whether you're seeking a thrilling bike tour, a women-only expedition, or a family adventure in your own car, 
                we have the ideal Spiti Valley experience waiting for you.
              </p>
            </div>
          </div>

          {/* Add the Spiti Circuit Map here */}
          <SpitiCircuitMap />
          
          <div className="mt-12">
            <TourPackages />
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-16 relative" style={{
      backgroundImage: `url(public/lovable-uploads/2c721e96-fc7b-4945-b1ee-5078a2398571.png)`,
      backgroundSize: 'cover',
      backgroundPosition: 'center'
    }}>
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px]"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center mb-12 bg-black/30 backdrop-blur-md p-6 rounded-lg border border-white/20">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Spiti Valley Photo Gallery</h2>
            <p className="text-white mb-4">
              Immerse yourself in the breathtaking vistas and cultural wonders of Spiti Valley through our curated collection of photographs.
              From ancient monasteries perched on hilltops to the crystal-clear Chandrataal Lake and the rugged terrain of the Himalayan cold desert,
              these images offer a glimpse into the remote paradise awaiting your exploration.
            </p>
          </div>
          <PhotoGallery />
        </div>
      </section>

      {/* Discover Section */}
      <section className="py-16 relative" style={{
      backgroundImage: `url(public/lovable-uploads/97184aed-98be-4a28-a800-b8ad75fa1ab1.png)`,
      backgroundSize: 'cover',
      backgroundPosition: 'center'
    }}>
        <div className="absolute inset-0 bg-black/50 backdrop-blur-[1px]"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">Ready for Your Spiti Valley Adventure?</h2>
          <p className="text-xl mb-4 max-w-2xl mx-auto text-white">
            Explore our curated collection of Spiti Valley tours and create memories that last a lifetime. Our expert local guides
            are waiting to show you the hidden gems of this Himalayan wonderland.
          </p>
          <p className="mb-8 max-w-2xl mx-auto text-white">
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
      
      <Footer />
    </div>;
};
export default Index;