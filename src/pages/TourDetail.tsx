
import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useTourDetail } from "@/hooks/useTourDetail";
import TourDetailSkeleton from "@/components/tour/TourDetailSkeleton";
import TourNotFound from "@/components/tour/TourNotFound";
import TourDetailContent from "@/components/tour/TourDetailContent";
import FloatingWhatsAppButton from "@/components/FloatingWhatsAppButton";
import { useToast } from "@/components/ui/use-toast";
import { initializeToursDatabase } from "@/services/tourService";

const TourDetail = () => {
  const { id } = useParams<{ id: string; }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Initialize tours database if needed
  useEffect(() => {
    const initTours = async () => {
      console.log("Initializing tours database from TourDetail component");
      try {
        await initializeToursDatabase();
      } catch (error) {
        console.error("Error initializing tours database:", error);
      }
    };
    
    initTours();
  }, []);
  
  const { 
    tour, 
    otherTours, 
    selectedMonth, 
    setSelectedMonth, 
    loading, 
    relatedToursLoading, 
    formatPrice 
  } = useTourDetail(id);

  useEffect(() => {
    if (id) {
      console.log("TourDetail component mounted with ID:", id);
    }
  }, [id]);

  // Show loading skeleton while data is being fetched
  if (loading) {
    return <TourDetailSkeleton />;
  }

  // Show not found message if tour doesn't exist
  if (!tour) {
    console.log("Tour not found for ID:", id);
    
    // Display toast notification
    toast({
      title: "Tour Not Found",
      description: `The tour "${id}" could not be found.`,
      variant: "destructive"
    });
    
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
