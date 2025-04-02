
import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useTourDetail } from "@/hooks/useTourDetail";
import TourDetailSkeleton from "@/components/tour/TourDetailSkeleton";
import TourNotFound from "@/components/tour/TourNotFound";
import TourDetailContent from "@/components/tour/TourDetailContent";

const TourDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  // Check if the URL format is old style (/tour/customurl) and redirect if needed
  useEffect(() => {
    if (id && window.location.pathname.startsWith('/tour/')) {
      navigate(`/tour-${id}`, { replace: true });
    }
  }, [id, navigate]);

  const { 
    tour, 
    otherTours, 
    selectedMonth, 
    setSelectedMonth, 
    loading, 
    relatedToursLoading, 
    formatPrice 
  } = useTourDetail(id);

  // Show loading skeleton while data is being fetched
  if (loading) {
    return <TourDetailSkeleton />;
  }

  // Show not found message if tour doesn't exist
  if (!tour) {
    console.error("Tour not found with ID:", id);
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
      
      <Footer />
    </div>
  );
};

export default TourDetail;
