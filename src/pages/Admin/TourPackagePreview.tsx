
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Edit, Bike, Car, Loader2 } from 'lucide-react';
import { useAdminAuth } from '@/hooks/useAdminAuth';
import { tourPackagesData } from '@/data/tourPackagesData';
import { getTourPackageById, getTourPackages } from '@/lib/db';
import { TourPackageProps } from '@/components/TourPackage';

// Import components from tour detail page
import TourHero from '@/components/tour/TourHero';
import TourOverview from '@/components/tour/TourOverview';
import TourItinerary from '@/components/tour/TourItinerary';
import TourInclusions from '@/components/tour/TourInclusions';
import TourAccommodation from '@/components/tour/TourAccommodation';
import RelatedTours from '@/components/tour/RelatedTours';

const TourPackagePreview = () => {
  useAdminAuth();
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedMonth, setSelectedMonth] = useState("June");
  const [isLoading, setIsLoading] = useState(true);
  const [tourPackage, setTourPackage] = useState<TourPackageProps | null>(null);
  const [relatedTours, setRelatedTours] = useState<TourPackageProps[]>([]);
  
  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      
      // Fetch the requested tour package
      const data = await getTourPackageById(id!);
      if (data) {
        setTourPackage(data);
        
        // Fetch related tours
        const allPackages = await getTourPackages();
        if (allPackages) {
          const related = allPackages
            .filter(p => p.id !== data.id)
            .slice(0, 4);
          setRelatedTours(related);
        }
      } else {
        // Fall back to static data
        console.log('Failed to fetch from database, using static data');
        const packageIndex = parseInt(id || '-1');
        const staticPackage = packageIndex >= 0 && packageIndex < tourPackagesData.length ? 
          tourPackagesData[packageIndex] as TourPackageProps : null;
        setTourPackage(staticPackage);
        
        // Get related tours from static data
        const staticRelated = staticPackage ? 
          tourPackagesData.filter((_, index) => index !== packageIndex).slice(0, 4) : 
          [];
        setRelatedTours(staticRelated);
      }
      
      setIsLoading(false);
    }
    
    fetchData();
  }, [id]);
    
  // Format price for display
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN').format(price);
  };

  // Get the transport icon based on the tour's transport type
  const getTransportIcon = () => {
    if (tourPackage?.transportType === 'bike') return <Bike className="text-spiti-blue w-6 h-6" />;
    return <Car className="text-spiti-blue w-6 h-6" />;
  };
    
  if (isLoading) {
    return (
      <div className="min-h-screen bg-white">
        <div className="sticky top-0 z-50 bg-white border-b shadow-sm p-4">
          <div className="container mx-auto flex justify-between items-center">
            <Button variant="outline" onClick={() => navigate('/admin/tour-packages')}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Admin
            </Button>
          </div>
        </div>
        <div className="container mx-auto py-20 flex justify-center items-center">
          <Loader2 className="h-10 w-10 animate-spin text-spiti-forest mr-3" />
          <span className="text-xl">Loading tour package...</span>
        </div>
      </div>
    );
  }

  if (!tourPackage) {
    return (
      <div className="container mx-auto py-12 px-4 text-center">
        <h1 className="text-3xl font-bold text-red-600">Tour Package Not Found</h1>
        <p className="mt-4 text-xl">The requested tour package does not exist or has been removed.</p>
        <Button 
          className="mt-8"
          onClick={() => navigate('/admin/tour-packages')}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Return to Tour Packages
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Admin Control Bar */}
      <div className="sticky top-0 z-50 bg-white border-b shadow-sm p-4">
        <div className="container mx-auto flex justify-between items-center">
          <Button variant="outline" onClick={() => navigate('/admin/tour-packages')}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Admin
          </Button>
          <div className="flex items-center gap-2">
            <div className="text-sm bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full">
              Preview Mode
            </div>
            <Button onClick={() => navigate(`/admin/tour-packages/${id}/edit`)}>
              <Edit className="mr-2 h-4 w-4" />
              Edit Package
            </Button>
          </div>
        </div>
      </div>

      {/* Regular Tour Detail Content */}
      <TourHero
        tour={tourPackage}
        selectedMonth={selectedMonth}
        setSelectedMonth={setSelectedMonth}
        formatPrice={formatPrice}
      />
      
      <div className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-12 gap-8">
          <div className="md:col-span-8">
            <TourOverview tour={tourPackage} getTransportIcon={getTransportIcon} />
            <TourItinerary tour={tourPackage} />
            <TourInclusions tour={tourPackage} />
          </div>
          
          <div className="md:col-span-4">
            <div className="space-y-6 sticky top-24">
              <div className="bg-white rounded-lg shadow-md p-6 border">
                <h2 className="text-xl font-semibold mb-4 text-spiti-forest">Package Pricing</h2>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-600">Original Price:</span>
                  <span className="text-gray-500 line-through">₹{formatPrice(tourPackage.originalPrice)}</span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-600">Discounted Price:</span>
                  <span className="text-2xl font-bold text-spiti-forest">₹{formatPrice(tourPackage.discountedPrice)}</span>
                </div>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-gray-600">You Save:</span>
                  <span className="text-green-600 font-medium">
                    ₹{formatPrice(tourPackage.originalPrice - tourPackage.discountedPrice)} ({tourPackage.discount}%)
                  </span>
                </div>
              </div>
              
              <TourAccommodation tour={tourPackage} />
            </div>
          </div>
        </div>
      </div>
      
      <RelatedTours tours={relatedTours} tourPackagesData={tourPackagesData} />
    </div>
  );
};

export default TourPackagePreview;
