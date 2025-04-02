
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useTourDetail } from "@/hooks/useTourDetail";
import TourDetailSkeleton from "@/components/tour/TourDetailSkeleton";
import TourNotFound from "@/components/tour/TourNotFound";
import TourDetailContent from "@/components/tour/TourDetailContent";
import FloatingWhatsAppButton from "@/components/FloatingWhatsAppButton";
import { initializeStorageListener } from "@/services/tours/localTourService";

const TourDetail = () => {
  const { id } = useParams<{ id: string; }>();
  const { 
    tour, 
    otherTours, 
    selectedMonth, 
    setSelectedMonth, 
    loading, 
    relatedToursLoading, 
    formatPrice 
  } = useTourDetail(id);

  // Initialize the storage listener for real-time updates
  useEffect(() => {
    initializeStorageListener();
  }, []);

  // Show loading skeleton while data is being fetched
  if (loading) {
    return <TourDetailSkeleton />;
  }

  // Show not found message if tour doesn't exist
  if (!tour) {
    return <TourNotFound />;
  }

  return (
    <div className="min-h-screen" style={{
      backgroundImage: `linear-gradient(to bottom, rgba(44, 82, 130, 0.15), rgba(99, 179, 237, 0.1)), url('https://images.unsplash.com/photo-1522441815192-d9f04eb0615c?q=80&w=1920&auto=format&fit=crop')`,
      backgroundAttachment: 'fixed',
      backgroundSize: 'cover',
      backgroundPosition: 'center'
    }}>
      <Header />
      
      <TourDetailContent
        tour={tour}
        otherTours={otherTours}
        selectedMonth={selectedMonth}
        setSelectedMonth={setSelectedMonth}
        relatedToursLoading={relatedToursLoading}
        formatPrice={formatPrice}
      />
      
      <FloatingWhatsAppButton />
      
      <Footer />
    </div>
  );
};

export default TourDetail;
