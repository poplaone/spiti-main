
import React from 'react';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { StarIcon } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

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
              <h2 className="text-3xl font-bold text-white mb-6">About Our Company</h2>
              <p className="text-white/90 mb-4">
                Established in 2016, Spiti Valley Travels is a trusted travel agency dedicated to providing unforgettable journeys through the mesmerizing landscapes of Spiti Valley and the Himalayas. With years of experience and a passion for exploration, we specialize in crafting personalized itineraries that offer a perfect blend of adventure, culture, and comfort.
              </p>
              <p className="text-white/90 mb-4">
                Our mission is to ensure every traveler experiences the untouched beauty of Spiti while enjoying a seamless and well-organized trip. From thrilling bike expeditions and cultural Buddhist circuits to women-only tours and self-drive adventures, we cater to every kind of explorer.
              </p>
              <p className="text-white/90">
                At Spiti Valley Travels, our priority is to guide travelers and make their trips smooth and memorable. With expert local knowledge, handpicked accommodations, and 24/7 customer support, we ensure a journey filled with breathtaking sights and enriching experiences.
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
      
      {/* Team Section - Updated with photos */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-white mb-12 text-center">Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="bg-white/10 backdrop-blur-sm border-0">
              <CardContent className="p-6">
                <div className="mb-4 flex justify-center">
                  <Avatar className="h-32 w-32 border-2 border-spiti-green">
                    <AvatarImage src="/lovable-uploads/d47c6479-484a-4cb5-9355-748f70db022c.png" alt="Vaibhav Reekhan" />
                    <AvatarFallback>VR</AvatarFallback>
                  </Avatar>
                </div>
                <h3 className="text-xl font-bold text-white mb-1 text-center">Vaibhav Reekhan</h3>
                <p className="text-spiti-green mb-3 text-center">Founder</p>
                <p className="text-white/80 text-sm">
                  Vaibhav is the founder of SpitiValleyTravels and HimalayanFootslog. With over nine years of experience in the travel industry, he is a passionate traveler at heart. A true nature lover, Vaibhav has always been drawn to the mountains and trekking.
                </p>
                <p className="text-white/80 text-sm mt-2">
                  His expertise lies in organizing and leading large road trips, as well as managing low-budget group tours for students while maintaining high-quality services. He also runs a small homestay at Chirgaon (Shimla).
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-white/10 backdrop-blur-sm border-0">
              <CardContent className="p-6">
                <div className="mb-4 flex justify-center">
                  <Avatar className="h-32 w-32 border-2 border-spiti-green">
                    <AvatarImage src="/lovable-uploads/ac372afb-1d03-4781-9bfb-5cb6f0eac18a.png" alt="Sheetla" />
                    <AvatarFallback>SD</AvatarFallback>
                  </Avatar>
                </div>
                <h3 className="text-xl font-bold text-white mb-1 text-center">Sheetla</h3>
                <p className="text-spiti-green mb-3 text-center">Business Development</p>
                <p className="text-white/80 text-sm">
                  A hardworking and spiritual person who believes in simplicity yet dreams big. Sales and marketing are her passion, and she takes pride in supporting teammates, which is why they call her Sheetla Didi. She embraces challenges with dedication and never backs down.
                </p>
                <p className="text-white/80 text-sm mt-2">
                  Beyond work, she finds joy in shopping, makeup, cooking, and driving. As a business development professional, she is committed to driving growth and creating new opportunities.
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-white/10 backdrop-blur-sm border-0">
              <CardContent className="p-6">
                <div className="mb-4 flex justify-center">
                  <Avatar className="h-32 w-32 border-2 border-spiti-green">
                    <AvatarImage src="/lovable-uploads/7a0cca0c-1799-4f16-9e61-ca50207023de.png" alt="Monika" />
                    <AvatarFallback>M</AvatarFallback>
                  </Avatar>
                </div>
                <h3 className="text-xl font-bold text-white mb-1 text-center">Monika</h3>
                <p className="text-spiti-green mb-3 text-center">Sales Executive</p>
                <p className="text-white/80 text-sm">
                  Colleagues call her Monu, a nickname she loves. Life has been full of ups and downs, but even in her lowest moments, her mind pushes her to focus on the positive, helping her grow and handle challenges.
                </p>
                <p className="text-white/80 text-sm mt-2">
                  With 5 years of experience as a Sales Executive, she is passionate about her work and always strives to give her best. Outside of work, her favorite hobby is simple yet priceless—she loves sleeping!
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur-sm border-0">
              <CardContent className="p-6">
                <div className="mb-4 flex justify-center">
                  <Avatar className="h-32 w-32 border-2 border-spiti-green">
                    <AvatarImage src="/lovable-uploads/666eddfd-7fea-48b0-9cfa-543555743e7a.png" alt="Jayesh Chauhan" />
                    <AvatarFallback>JC</AvatarFallback>
                  </Avatar>
                </div>
                <h3 className="text-xl font-bold text-white mb-1 text-center">Jayesh Chauhan</h3>
                <p className="text-spiti-green mb-3 text-center">Sales & Travel Director</p>
                <p className="text-white/80 text-sm">
                  Son to an apple grower and a true movies and sports enthusiast working as a salesperson. Leaving his comfort zone and taking on challenges is his thing. He loves to guide people on their journey and considers himself an actor with the world as his stage.
                </p>
                <p className="text-white/80 text-sm mt-2">
                  As a travel director, he's dedicated to turning vacation dreams into blockbuster experiences, delivering "paisa wasool" experiences with full entertainment, drama, and adventure!
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur-sm border-0">
              <CardContent className="p-6">
                <div className="mb-4 flex justify-center">
                  <Avatar className="h-32 w-32 border-2 border-spiti-green">
                    <AvatarImage src="/lovable-uploads/40aa1564-8488-400b-a683-6de12e9b4c28.png" alt="Shabnam Kultwan" />
                    <AvatarFallback>SK</AvatarFallback>
                  </Avatar>
                </div>
                <h3 className="text-xl font-bold text-white mb-1 text-center">Shabnam Kultwan</h3>
                <p className="text-spiti-green mb-3 text-center">Sales Executive</p>
                <p className="text-white/80 text-sm">
                  A quiet and calm person who loves to observe and learn, which helps her grow every day. Being the youngest on the team, she feels blessed to have supportive seniors who guide her and help her improve both personally and professionally.
                </p>
                <p className="text-white/80 text-sm mt-2">
                  She believes that success comes from trust and strong relationships. Beyond work, she loves reading fiction. No matter what she does, she always tries to give her best and constantly pushes herself to improve and excel in her field.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>;
};

export default About;
