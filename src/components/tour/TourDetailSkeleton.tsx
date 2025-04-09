
import React from 'react';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Skeleton } from "@/components/ui/skeleton";

const TourDetailSkeleton = () => {
  return (
    <div className="min-h-screen">
      <Header />
      
      <div className="relative h-[80vh] sm:h-[70vh] mt-0">
        <Skeleton className="absolute inset-0" />
        <div className="container mx-auto px-4 h-full flex items-end sm:items-center pb-16 sm:pb-0 relative z-10">
          <div className="max-w-3xl space-y-6">
            <Skeleton className="h-10 w-3/4" />
            <Skeleton className="h-6 w-1/2" />
            <div className="flex flex-wrap items-center gap-3">
              <Skeleton className="h-8 w-32" />
              <Skeleton className="h-8 w-8 rounded-full" />
              <Skeleton className="h-8 w-8 rounded-full" />
            </div>
            <Skeleton className="h-10 w-40" />
          </div>
        </div>
      </div>
      
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <Skeleton className="h-48 w-full rounded-lg" />
              <Skeleton className="h-96 w-full rounded-lg" />
              <Skeleton className="h-64 w-full rounded-lg" />
            </div>
            
            <div className="hidden lg:block">
              <Skeleton className="h-96 w-full rounded-lg sticky top-24" />
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default TourDetailSkeleton;
