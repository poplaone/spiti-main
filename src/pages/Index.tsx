import Header from "@/components/Header";
import LeadForm from "@/components/LeadForm";
import MomentGallery from "@/components/MomentGallery";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section 
        className="min-h-[calc(100vh-4rem)] mt-16 relative flex items-center py-8 md:py-12"
        style={{
          backgroundImage: `url(https://images.unsplash.com/photo-1506057776723-ddd5f6c77f1f?w=800&q=70)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="container mx-auto px-4 flex flex-col-reverse md:flex-row items-center justify-between gap-8">
          <div className="flex-1 text-white max-w-2xl space-y-6">
            <h1 className="text-3xl md:text-5xl font-bold bg-black/30 backdrop-blur-sm inline-block px-4 py-2 rounded">
              <span className="bg-gradient-to-r from-green-400 via-yellow-300 to-orange-500 text-transparent bg-clip-text">
                SPITI VALLEY TOUR PACKAGES
              </span>
            </h1>
            <p className="text-xl md:text-2xl bg-black/30 backdrop-blur-sm px-4 py-2 rounded">
              <span className="bg-gradient-to-r from-green-300 via-yellow-200 to-orange-400 text-transparent bg-clip-text">
                Customized Tours from Trusted Local Agents At Lowest Prices
              </span>
            </p>
            <div className="space-y-3 text-base md:text-lg">
              {[
                "Best Priced Packages within your budget",
                "Friendly Customer Support"
              ].map((text, index) => (
                <p key={index} className="bg-black/30 backdrop-blur-sm px-4 py-2 rounded inline-block">
                  <span className="bg-gradient-to-r from-green-200 via-yellow-100 to-orange-300 text-transparent bg-clip-text">
                    {text}
                  </span>
                </p>
              ))}
            </div>
            <button className="bg-spiti-blue hover:bg-spiti-blue/90 px-8 py-3 rounded-lg font-semibold transition-opacity">
              Explore Tours
            </button>
          </div>
          <div className="w-full md:w-[400px]">
            <LeadForm />
          </div>
        </div>
      </section>

      {/* Best Moments Gallery */}
      <section className="py-8">
        <MomentGallery />
      </section>
    </div>
  );
};

export default Index;
