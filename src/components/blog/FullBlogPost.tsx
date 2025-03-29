
import React from 'react';
import { Calendar, User, Tag } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import LeadForm from "@/components/LeadForm";
import { BlogPost } from '@/types/blog';

interface FullBlogPostProps {
  post: BlogPost;
}

const FullBlogPost = ({ post }: FullBlogPostProps) => {
  return (
    <section id="full-post" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="mb-8">
            <h2 className="text-3xl font-bold mb-6">{post.title}</h2>
            <div className="flex items-center space-x-4 mb-6">
              <div className="flex items-center">
                <User className="w-4 h-4 mr-2 text-gray-500" />
                <span className="text-gray-700">{post.author}</span>
              </div>
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-2 text-gray-500" />
                <span className="text-gray-700">{post.date}</span>
              </div>
              <div className="flex items-center">
                <Tag className="w-4 h-4 mr-2 text-gray-500" />
                <span className="text-gray-700">{post.category}</span>
              </div>
            </div>
            <img src={post.image} alt={post.title} className="w-full h-80 object-cover rounded-lg mb-8" />
            <div className="prose prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: post.content || '' }} />
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
  );
};

export default FullBlogPost;
