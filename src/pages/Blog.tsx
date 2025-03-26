
import React from 'react';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Calendar, User, Tag, Clock } from 'lucide-react';
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import LeadForm from "@/components/LeadForm";

const blogPosts = [
  {
    id: 1,
    title: "10 Hidden Gems in Spiti Valley You Must Explore",
    excerpt: "Discover the lesser-known marvels of Spiti Valley that most tourists miss out on. From secret viewpoints to hidden monasteries.",
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1200&q=80",
    date: "April 15, 2023",
    author: "Rahul Sharma",
    readTime: "8 min read",
    category: "Travel Guide",
    content: `
      <p class="mb-4">Nestled in the heart of the Himalayas, Spiti Valley is a desert mountain valley located high in the Himalayas mountains. The name "Spiti" means "The Middle Land", that is, the land between Tibet and India. It's a cold desert mountain valley located high in the eastern Himalayas.</p>
      
      <p class="mb-4">While popular attractions like Key Monastery and Chandratal Lake draw most tourists, there are numerous hidden treasures waiting to be discovered by the adventurous traveler.</p>
      
      <h3 class="text-xl font-bold mb-2 mt-6">1. Hikkim Village - World's Highest Post Office</h3>
      <p class="mb-4">Located at an altitude of 14,400 feet, Hikkim village houses the world's highest post office. Send a postcard to your loved ones from this unique location and make your journey memorable.</p>
      
      <h3 class="text-xl font-bold mb-2 mt-6">2. Giu Village - The Mummy Lama</h3>
      <p class="mb-4">This small village is home to a naturally preserved 500-year-old mummy of a Buddhist monk. The mummy, sitting in a meditating position, is said to still be growing hair and nails, making it a mysterious attraction.</p>
      
      <h3 class="text-xl font-bold mb-2 mt-6">3. Lhalung Monastery</h3>
      <p class="mb-4">One of the oldest monasteries in Spiti Valley, Lhalung Monastery remains off the typical tourist path. The monastery houses ancient Tibetan scriptures and beautiful murals that provide insight into Buddhist culture.</p>
      
      <h3 class="text-xl font-bold mb-2 mt-6">4. Demul Village</h3>
      <p class="mb-4">Experience authentic Spitian lifestyle in Demul, a remote village perched at 14,300 feet. Here, you can participate in daily activities like farming and yak herding, offering a genuine glimpse into local life.</p>
      
      <h3 class="text-xl font-bold mb-2 mt-6">5. Komic Village</h3>
      <p class="mb-4">Often claimed to be the highest motorable village with a monastery in Asia, Komic offers breathtaking panoramic views of the surrounding mountains and valleys.</p>
      
      <h3 class="text-xl font-bold mb-2 mt-6">6. Kunzum Pass Summit Temple</h3>
      <p class="mb-4">While most travelers just pass through Kunzum Pass, few take the time to climb to the small temple at its summit. The effort rewards you with 360-degree views of the Spiti and Lahaul valleys.</p>
      
      <h3 class="text-xl font-bold mb-2 mt-6">7. Pin Valley National Park</h3>
      <p class="mb-4">Home to the endangered snow leopard and Siberian ibex, this national park offers trekking opportunities through pristine landscapes relatively untouched by tourism.</p>
      
      <h3 class="text-xl font-bold mb-2 mt-6">8. Kibber Wildlife Sanctuary</h3>
      <p class="mb-4">Beyond the popular Kibber village lies this wildlife sanctuary. Take a guided tour at dawn or dusk for the best chances of spotting rare Himalayan wildlife.</p>
      
      <h3 class="text-xl font-bold mb-2 mt-6">9. Dhankar Lake</h3>
      <p class="mb-4">A short hike from Dhankar Monastery leads to this pristine high-altitude lake. Unlike Chandratal, you'll likely have this serene spot all to yourself.</p>
      
      <h3 class="text-xl font-bold mb-2 mt-6">10. Sopona Lake</h3>
      <p class="mb-4">This hidden gem near Langza village requires a moderate trek but rewards visitors with crystal clear waters reflecting the towering Himalayan peaks.</p>
      
      <p class="mt-6">These hidden gems offer a more authentic and less crowded experience of Spiti Valley. Include them in your itinerary to truly discover the magic of this Himalayan wonderland.</p>
    `
  },
  {
    id: 2,
    title: "Best Time to Visit Spiti Valley: A Seasonal Guide",
    excerpt: "Plan your perfect Spiti Valley trip with our comprehensive seasonal guide. Learn about weather conditions, accessibility, and experiences unique to each season.",
    image: "https://images.unsplash.com/photo-1515876305430-f06edab8282a?w=1200&q=80",
    date: "March 10, 2023",
    author: "Priya Patel",
    readTime: "6 min read",
    category: "Travel Tips"
  },
  {
    id: 3,
    title: "Spiti Valley Photography Guide: Capturing the Himalayan Desert",
    excerpt: "Master the art of landscape and cultural photography in Spiti Valley with these expert tips on equipment, timing, and composition.",
    image: "https://images.unsplash.com/photo-1476610182048-b716b8518aae?w=1200&q=80",
    date: "February 22, 2023",
    author: "Vikram Singh",
    readTime: "10 min read",
    category: "Photography"
  },
  {
    id: 4,
    title: "Cultural Etiquette: Respecting Local Traditions in Spiti Valley",
    excerpt: "Learn about the customs and traditions of Spiti Valley to ensure a respectful and enriching cultural experience during your visit.",
    image: "https://images.unsplash.com/photo-1511497584788-876760111969?w=1200&q=80",
    date: "January 5, 2023",
    author: "Ananya Gupta",
    readTime: "7 min read",
    category: "Culture"
  },
  {
    id: 5,
    title: "Trekking Routes in Spiti: From Beginner to Advanced",
    excerpt: "Explore various trekking options in Spiti Valley suitable for different fitness levels, from easy day hikes to challenging multi-day expeditions.",
    image: "https://images.unsplash.com/photo-1522163182402-834f871fd851?w=1200&q=80",
    date: "December 12, 2022",
    author: "Rohan Kapoor",
    readTime: "9 min read",
    category: "Adventure"
  },
  {
    id: 6,
    title: "Local Cuisine of Spiti Valley: A Food Lover's Guide",
    excerpt: "Discover the unique flavors of Spiti Valley's traditional cuisine, from butter tea to thukpa, and learn where to find the best local dining experiences.",
    image: "https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=1200&q=80",
    date: "November 8, 2022",
    author: "Meera Joshi",
    readTime: "5 min read",
    category: "Food & Cuisine"
  }
];

const Blog = () => {
  const featuredPost = blogPosts[0];
  const recentPosts = blogPosts.slice(1);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero section with main blog post */}
      <section className="pt-20 md:pt-24 pb-16 bg-spiti-forest text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">Spiti Valley Travel Blog</h1>
            <p className="text-lg text-white/80">Discover tips, stories, and insights from our adventures in the beautiful Spiti Valley</p>
          </div>
        </div>
      </section>
      
      {/* Featured Blog Post */}
      <section className="-mt-8 mb-12">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="md:flex">
              <div className="md:w-1/2">
                <img src={featuredPost.image} alt={featuredPost.title} className="h-full w-full object-cover" />
              </div>
              <div className="md:w-1/2 p-6 md:p-8">
                <div className="flex items-center space-x-2 mb-4">
                  <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">{featuredPost.category}</Badge>
                  <span className="text-sm text-gray-500 flex items-center">
                    <Clock className="w-3 h-3 mr-1" /> {featuredPost.readTime}
                  </span>
                </div>
                
                <h2 className="text-2xl font-bold mb-4">{featuredPost.title}</h2>
                <p className="text-gray-600 mb-6">{featuredPost.excerpt}</p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 rounded-full bg-spiti-slate flex items-center justify-center text-white font-semibold">
                      {featuredPost.author.charAt(0)}
                    </div>
                    <div>
                      <div className="font-medium">{featuredPost.author}</div>
                      <div className="text-sm text-gray-500 flex items-center">
                        <Calendar className="w-3 h-3 mr-1" /> {featuredPost.date}
                      </div>
                    </div>
                  </div>
                  <Button variant="outline" className="border-spiti-forest text-spiti-forest hover:bg-spiti-forest hover:text-white" asChild>
                    <a href="#full-post">Read More</a>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Recent Blog Posts Grid */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8 text-center">Recent Articles</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {recentPosts.map(post => (
              <div key={post.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <div className="h-48 overflow-hidden">
                  <img src={post.image} alt={post.title} className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">{post.category}</Badge>
                    <span className="text-sm text-gray-500 flex items-center">
                      <Clock className="w-3 h-3 mr-1" /> {post.readTime}
                    </span>
                  </div>
                  <h3 className="font-bold text-xl mb-2">{post.title}</h3>
                  <p className="text-gray-600 mb-4 line-clamp-2">{post.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-500 flex items-center">
                      <Calendar className="w-3 h-3 mr-1" /> {post.date}
                    </div>
                    <Button variant="link" className="text-spiti-forest p-0 h-auto">Read More</Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Full Blog Post */}
      <section id="full-post" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="mb-8">
              <h2 className="text-3xl font-bold mb-6">{featuredPost.title}</h2>
              <div className="flex items-center space-x-4 mb-6">
                <div className="flex items-center">
                  <User className="w-4 h-4 mr-2 text-gray-500" />
                  <span className="text-gray-700">{featuredPost.author}</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-2 text-gray-500" />
                  <span className="text-gray-700">{featuredPost.date}</span>
                </div>
                <div className="flex items-center">
                  <Tag className="w-4 h-4 mr-2 text-gray-500" />
                  <span className="text-gray-700">{featuredPost.category}</span>
                </div>
              </div>
              <img src={featuredPost.image} alt={featuredPost.title} className="w-full h-80 object-cover rounded-lg mb-8" />
              <div className="prose prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: featuredPost.content }} />
            </div>
            
            <div className="mt-12 p-6 bg-gray-50 rounded-lg">
              <h3 className="text-xl font-bold mb-4">Ready to Experience Spiti Valley?</h3>
              <p className="mb-6">Book your adventure with our expert local guides and discover all these hidden gems for yourself.</p>
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="bg-spiti-forest hover:bg-spiti-forest/90">Plan Your Journey Now</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <LeadForm />
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Blog;
