import React from 'react';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { BlogPost } from '@/types/blog';
import BlogHero from '@/components/blog/BlogHero';
import FeaturedPost from '@/components/blog/FeaturedPost';
import BlogPostGrid from '@/components/blog/BlogPostGrid';
import FullBlogPost from '@/components/blog/FullBlogPost';

const blogPosts: BlogPost[] = [
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
      <BlogHero />
      <FeaturedPost post={featuredPost} />
      <BlogPostGrid posts={recentPosts} />
      <FullBlogPost post={featuredPost} />
      <Footer />
    </div>
  );
};

export default Blog;
