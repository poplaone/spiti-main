
import React from 'react';
import { BlogPost } from '@/types/blog';

interface MiniBlogGridProps {
  posts: BlogPost[];
  onPostClick: (post: BlogPost) => void;
}

const MiniBlogGrid = ({ posts, onPostClick }: MiniBlogGridProps) => {
  // Group Hindi and English mini blogs separately
  const hindiBlogs = posts.filter(post => post.author === "वैभव रीखान");
  const englishBlogs = posts.filter(post => post.author === "Vaibhav Reekhan");

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">Spiti Valley Mini Guides</h2>
        
        {/* English Mini Blogs */}
        <div className="mb-12">
          <h3 className="text-2xl font-semibold mb-6 text-gray-800">English Guides</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {englishBlogs.map(post => (
              <div 
                key={post.id}
                className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 cursor-pointer border border-gray-100"
                onClick={() => onPostClick(post)}
              >
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 hover:text-spiti-forest transition-colors">{post.title}</h3>
                  <p className="text-gray-500 text-sm mb-3">
                    {post.date} · {post.readTime}
                  </p>
                  <p className="text-gray-700 mb-4 line-clamp-3">{post.excerpt}</p>
                  <div className="flex items-center">
                    <div className="text-sm">
                      <p className="font-medium text-spiti-forest">{post.author}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Hindi Mini Blogs */}
        <div>
          <h3 className="text-2xl font-semibold mb-6 text-gray-800">हिंदी गाइड</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {hindiBlogs.map(post => (
              <div 
                key={post.id}
                className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 cursor-pointer border border-gray-100"
                onClick={() => onPostClick(post)}
              >
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 hover:text-spiti-forest transition-colors">{post.title}</h3>
                  <p className="text-gray-500 text-sm mb-3">
                    {post.date} · {post.readTime}
                  </p>
                  <p className="text-gray-700 mb-4 line-clamp-3">{post.excerpt}</p>
                  <div className="flex items-center">
                    <div className="text-sm">
                      <p className="font-medium text-spiti-forest">{post.author}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MiniBlogGrid;
