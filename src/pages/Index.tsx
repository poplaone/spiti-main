
import Header from "@/components/Header";
import LeadForm from "@/components/LeadForm";
import PhotoGallery from "@/components/PhotoGallery";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section 
        className="min-h-screen pt-16 relative flex items-center"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.6)), url(https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center gap-8">
          <div className="flex-1 text-white">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in-up">
              SPITI VALLEY TOUR PACKAGES
            </h1>
            <p className="text-xl mb-8 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              Customized Tours from Trusted Local Agents at Lowest Prices
            </p>
          </div>
          <div className="w-full md:w-auto animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            <LeadForm />
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-20 bg-spiti-gray">
        <div className="container mx-auto px-4">
          <PhotoGallery />
        </div>
      </section>

      {/* Call to Action Section */}
      <section 
        className="py-20 relative"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(44, 82, 130, 0.9), rgba(44, 82, 130, 0.95)), url(https://images.unsplash.com/photo-1501854140801-50d01698950b)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="container mx-auto px-4 text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready for Your Adventure?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Explore our curated collection of Spiti Valley tours and create memories that last a lifetime.
          </p>
          <button className="bg-white text-spiti-blue px-8 py-3 rounded-lg font-semibold hover:bg-opacity-90 transition-colors">
            Explore Tours
          </button>
        </div>
      </section>

    </div>
  );
};

export default Index;
