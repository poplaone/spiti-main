
import React, { useState } from 'react';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { BlogPost } from '@/types/blog';
import BlogHero from '@/components/blog/BlogHero';
import FeaturedPost from '@/components/blog/FeaturedPost';
import BlogPostGrid from '@/components/blog/BlogPostGrid';
import FullBlogPost from '@/components/blog/FullBlogPost';
import BlogCategoryTabs from '@/components/blog/BlogCategoryTabs';
import MiniBlogGrid from '@/components/blog/MiniBlogGrid';
import { getPostsByType, getFeaturedPosts, getRecentPosts } from '@/data/blogPosts';

const Blog = () => {
  const [selectedPost, setSelectedPost] = useState<BlogPost>(getFeaturedPosts()[0]);
  const [activeTab, setActiveTab] = useState<"full" | "mini">("full");
  
  const featuredPosts = getFeaturedPosts();
  const recentFullPosts = getRecentPosts();
  const miniBlogPosts = getPostsByType("mini");

  const handlePostClick = (post: BlogPost) => {
    setSelectedPost(post);
    // Scroll to the full blog post section
    document.getElementById('full-post')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <BlogHero />
      
      <BlogCategoryTabs activeTab={activeTab} setActiveTab={setActiveTab} />
      
      {activeTab === "full" && (
        <>
          <FeaturedPost post={featuredPosts[0]} />
          <BlogPostGrid posts={recentFullPosts} />
          <FullBlogPost post={selectedPost} />
        </>
      )}
      
      {activeTab === "mini" && (
        <>
          <MiniBlogGrid posts={miniBlogPosts} onPostClick={handlePostClick} />
          <FullBlogPost post={selectedPost} />
        </>
      )}
      
      <Footer />
    </div>
  );
};

export default Blog;
