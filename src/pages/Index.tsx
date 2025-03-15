
import Header from "@/components/Header";
import LeadForm from "@/components/LeadForm";
import PhotoGallery from "@/components/PhotoGallery";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section 
        className="h-[90vh] pt-16 relative flex items-center"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(51, 38, 30, 0.8), rgba(51, 38, 30, 0.9)), url(https://images.unsplash.com/photo-1472396961693-142e6e269027?w=800&q=70)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex-1 text-white max-w-2xl">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 animate-fade-in-up bg-gradient-to-r from-white to-spiti-green bg-clip-text text-transparent">
              Leave the office behind
            </h1>
            <p className="text-3xl mb-6 animate-fade-in-up text-spiti-green" style={{ animationDelay: '0.2s' }}>
              Upto 40% off
            </p>
            <div className="space-y-4 text-lg">
              <p className="animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                Get Multiple Itineraries & Personalised Suggestions from our Experts
              </p>
              <p className="animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                Best Priced Packages within your budget
              </p>
              <p className="animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
                Friendly Customer Support
              </p>
              <p className="animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
                100% Money Safe Guarantee
              </p>
              <p className="animate-fade-in-up" style={{ animationDelay: '0.7s' }}>
                Secure & Safe Online Transactions
              </p>
            </div>
          </div>
          <div className="w-full md:w-[400px] animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            <LeadForm />
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-16 bg-gradient-to-b from-[#33261E] to-[#2A1F19]">
        <div className="container mx-auto px-4">
          <PhotoGallery />
        </div>
      </section>

      {/* Call to Action Section */}
      <section 
        className="py-16 relative"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(51, 38, 30, 0.9), rgba(51, 38, 30, 0.95)), url(https://images.unsplash.com/photo-1501854140801-50d01698950b?w=800&q=70)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="container mx-auto px-4 text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready for Your Adventure?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Explore our curated collection of Spiti Valley tours and create memories that last a lifetime.
          </p>
          <button className="bg-gradient-to-r from-spiti-green to-spiti-blue px-8 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity">
            Explore Tours
          </button>
        </div>
      </section>
    </div>
  );
};

export default Index;
