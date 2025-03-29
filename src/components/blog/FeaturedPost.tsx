
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock } from 'lucide-react';
import { BlogPost } from '@/types/blog';

interface FeaturedPostProps {
  post: BlogPost;
}

const FeaturedPost = ({ post }: FeaturedPostProps) => {
  return (
    <section className="-mt-8 mb-12">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="md:flex">
            <div className="md:w-1/2">
              <img src={post.image} alt={post.title} className="h-full w-full object-cover" />
            </div>
            <div className="md:w-1/2 p-6 md:p-8">
              <div className="flex items-center space-x-2 mb-4">
                <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">{post.category}</Badge>
                <span className="text-sm text-gray-500 flex items-center">
                  <Clock className="w-3 h-3 mr-1" /> {post.readTime}
                </span>
              </div>
              
              <h2 className="text-2xl font-bold mb-4">{post.title}</h2>
              <p className="text-gray-600 mb-6">{post.excerpt}</p>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 rounded-full bg-spiti-slate flex items-center justify-center text-white font-semibold">
                    {post.author.charAt(0)}
                  </div>
                  <div>
                    <div className="font-medium">{post.author}</div>
                    <div className="text-sm text-gray-500 flex items-center">
                      <Calendar className="w-3 h-3 mr-1" /> {post.date}
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
  );
};

export default FeaturedPost;
