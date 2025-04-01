
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock } from 'lucide-react';
import { BlogPost } from '@/types/blog';

interface BlogPostGridProps {
  posts: BlogPost[];
  onPostClick: (post: BlogPost) => void;
}

const BlogPostGrid = ({ posts, onPostClick }: BlogPostGridProps) => {
  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold mb-8 text-center">Recent Articles</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map(post => (
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
                  <Button 
                    variant="link" 
                    className="text-spiti-forest p-0 h-auto"
                    onClick={() => onPostClick(post)}
                  >
                    Read More
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogPostGrid;
