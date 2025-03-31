
import React from 'react';
import { BlogPost } from '@/types/blog';

interface MiniBlogGridProps {
  posts: BlogPost[];
  onPostClick: (post: BlogPost) => void;
}

const MiniBlogGrid = ({ posts, onPostClick }: MiniBlogGridProps) => {
  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">Spiti Valley Mini Guides</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map(post => (
            <div 
              key={post.id}
              className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 cursor-pointer"
              onClick={() => onPostClick(post)}
            >
              <div className="relative h-56">
                <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
                <div className="absolute top-4 right-4 bg-spiti-forest text-white text-xs font-semibold px-2 py-1 rounded">
                  {post.category}
                </div>
              </div>
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
    </section>
  );
};

export default MiniBlogGrid;
