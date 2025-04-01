
import React from 'react';

interface BlogCategoryTabsProps {
  activeTab: "full";
  setActiveTab: (tab: "full") => void;
}

const BlogCategoryTabs = ({ activeTab, setActiveTab }: BlogCategoryTabsProps) => {
  return (
    <section className="py-8 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex justify-center mb-8">
          <div className="inline-flex rounded-md shadow-sm" role="group">
            <button
              type="button"
              onClick={() => setActiveTab("full")}
              className="px-6 py-2 text-sm font-medium border border-gray-200 rounded-lg bg-spiti-forest text-white"
            >
              Full Articles
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogCategoryTabs;
