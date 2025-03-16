import Header from "@/components/Header";
import LeadForm from "@/components/LeadForm";
import PhotoGallery from "@/components/PhotoGallery";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section 
        className="min-h-[calc(100vh-4rem)] mt-16 relative flex items-center py-8 md:py-12"
        style={{
          backgroundImage: `url(https://images.unsplash.com/photo-1472396961693-142e6e269027?w=800&q=70)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="container mx-auto px-4 flex flex-col-reverse md:flex-row items-center justify-between gap-8">
          <div className="flex-1 text-white max-w-2xl space-y-6">
            <h1 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-white to-spiti-sand bg-clip-text text-transparent">
              SPITI VALLEY TOUR PACKAGES
            </h1>
            <p className="text-xl md:text-2xl text-spiti-sand">
              Customized Tours from Trusted Local Agents At Lowest Prices
            </p>
            <div className="space-y-3 text-base md:text-lg">
              <p>Best Priced Packages within your budget</p>
              <p>Friendly Customer Support</p>
              <p>100% Money Safe Guarantee</p>
              <p>Secure & Safe Online Transactions</p>
            </div>
            <button className="bg-gradient-to-r from-spiti-brown/80 to-spiti-sand/80 backdrop-blur-sm px-8 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity text-white">
              Explore Tours
            </button>
          </div>
          <div className="w-full md:w-[400px]">
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
