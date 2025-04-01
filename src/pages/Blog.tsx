
import React, { useState, useEffect } from 'react';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { BlogPost } from '@/types/blog';
import BlogHero from '@/components/blog/BlogHero';
import FeaturedPost from '@/components/blog/FeaturedPost';
import BlogPostGrid from '@/components/blog/BlogPostGrid';
import FullBlogPost from '@/components/blog/FullBlogPost';
import BlogCategoryTabs from '@/components/blog/BlogCategoryTabs';
import { getPostsByType, getFeaturedPosts, getRecentPosts } from '@/data/blogPosts';

const Blog = () => {
  const [selectedPost, setSelectedPost] = useState<BlogPost>(getFeaturedPosts()[0]);
  const [activeTab] = useState<"full">("full");
  
  const featuredPosts = getFeaturedPosts();
  const recentFullPosts = getRecentPosts();

  const handlePostClick = (post: BlogPost) => {
    setSelectedPost(post);
    // Scroll to the full blog post section
    document.getElementById('full-post')?.scrollIntoView({ behavior: 'smooth' });
  };

  // Ensure the selectedPost has content
  useEffect(() => {
    // When no valid post is selected, make sure we have a valid post with content
    if (!selectedPost || !selectedPost.content) {
      setSelectedPost(recentFullPosts[0]);
    }
  }, [selectedPost, recentFullPosts]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <BlogHero />
      
      <BlogCategoryTabs activeTab={activeTab} setActiveTab={() => {}} />
      
      <FeaturedPost post={featuredPosts[0]} onPostClick={() => handlePostClick(featuredPosts[0])} />
      <BlogPostGrid posts={recentFullPosts} onPostClick={handlePostClick} />
      <FullBlogPost post={selectedPost} />
      
      <Footer />
    </div>
  );
};

export default Blog;
