
import React from 'react';

interface BlogCategoryTabsProps {
  activeTab: "full" | "mini";
  setActiveTab: (tab: "full" | "mini") => void;
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
              className={`px-6 py-2 text-sm font-medium border border-gray-200 rounded-l-lg ${
                activeTab === "full"
                  ? "bg-spiti-forest text-white"
                  : "bg-white text-gray-900 hover:bg-gray-100"
              }`}
            >
              Full Articles
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("mini")}
              className={`px-6 py-2 text-sm font-medium border border-gray-200 rounded-r-lg ${
                activeTab === "mini"
                  ? "bg-spiti-forest text-white"
                  : "bg-white text-gray-900 hover:bg-gray-100"
              }`}
            >
              Mini Guides
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogCategoryTabs;
