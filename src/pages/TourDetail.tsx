import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from "@/components/Header";
import LeadForm from "@/components/LeadForm";
import TourPackage, { TourPackageProps } from "@/components/TourPackage";
import { tourPackagesData } from "@/components/TourPackages";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Car, Bike, Clock, Calendar, Users, Coffee, Home, MapPin, Check, ChevronRight, ArrowRight, ShieldCheck, Sunrise, Mountain } from "lucide-react";
import { Button } from "@/components/ui/button";
import Footer from "@/components/Footer";
const TourDetail = () => {
  const {
    id
  } = useParams<{
    id: string;
  }>();
  const [tour, setTour] = useState<TourPackageProps | null>(null);
  const [otherTours, setOtherTours] = useState<TourPackageProps[]>([]);
  useEffect(() => {
    window.scrollTo(0, 0);
    if (id) {
      const selectedTour = tourPackagesData.find((_, index) => index.toString() === id);
      if (selectedTour) {
        setTour(selectedTour);

        // Get other tours for the "More Popular Tours" section
        const others = tourPackagesData.filter((_, index) => index.toString() !== id).slice(0, 4); // Get up to 4 other tours
        setOtherTours(others);
      }
    }
  }, [id]);
  if (!tour) {
    return <div>Loading...</div>;
  }
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN').format(price);
  };

  // Choose the appropriate transport icon
  const getTransportIcon = () => {
    if (tour.transportType === 'bike') return <Bike className="text-spiti-blue w-6 h-6" />;
    if (tour.transportType === 'car') return <Car className="text-spiti-blue w-6 h-6" />;
    return <Car className="text-spiti-blue w-6 h-6" />;
  };

  // Format night stays for readability
  const formattedStays = tour.nightStays.map(stay => `${stay.nights} night${stay.nights > 1 ? 's' : ''} in ${stay.location}`).join(", ");
  const seoTitle = tour.title.toLowerCase().includes('spiti') ? tour.title : `${tour.title} - Spiti Valley Adventure`;
  return <div className="min-h-screen">
      <Header />
      
      {/* Hero Section - similar styling to the Index page */}
      <section className="min-h-[60vh] mt-16 relative flex items-center py-8 md:py-12" style={{
      backgroundImage: `url(https://images.unsplash.com/photo-1580289143186-03f54224aad6?w=1200&q=80)`,
      backgroundSize: 'cover',
      backgroundPosition: 'center'
    }}>
        <div className="container mx-auto px-4 flex flex-col-reverse md:flex-row items-center justify-between gap-8">
          <div className="flex-1 text-white max-w-2xl space-y-6 bg-black/30 backdrop-blur-sm p-6 rounded">
            <h1 className="text-3xl md:text-5xl font-bold">
              <span className="bg-gradient-to-r from-green-400 via-yellow-300 to-orange-500 text-transparent bg-clip-text">
                {seoTitle}
              </span>
            </h1>
            <div className="flex items-center text-lg">
              <Clock className="w-5 h-5 mr-2" />
              <span>{tour.duration.nights} Nights / {tour.duration.days} Days Himalayan Adventure</span>
            </div>
            <p className="text-lg">
              Explore the breathtaking landscapes of Spiti Valley with our expertly crafted tour package. 
              Journey through ancient monasteries, remote villages, and pristine high-altitude lakes in 
              the heart of the Indian Himalayas.
            </p>
            <div className="flex items-center space-x-4">
              <span className="text-2xl font-bold text-green-400">₹{formatPrice(tour.discountedPrice)}/-</span>
              <span className="text-sm line-through opacity-75">₹{formatPrice(tour.originalPrice)}/-</span>
              <Badge className="bg-red-500">{tour.discount}% OFF</Badge>
            </div>
          </div>
          <div className="w-full md:w-[400px]">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-2xl font-bold text-center text-spiti-dark mb-4">Book This Tour</h2>
              
              <div className="mb-6">
                <div className="flex items-baseline justify-between mb-2">
                  <span className="text-lg text-gray-700">Original Price:</span>
                  <span className="text-lg line-through text-gray-500">₹{formatPrice(tour.originalPrice)}/-</span>
                </div>
                <div className="flex items-baseline justify-between mb-2">
                  <span className="text-lg text-gray-700">Discount:</span>
                  <span className="text-lg text-red-500">{tour.discount}% OFF</span>
                </div>
                <div className="flex items-baseline justify-between border-t pt-2 mt-2">
                  <span className="text-xl font-bold text-gray-900">You Pay:</span>
                  <span className="text-2xl font-bold text-green-600">₹{formatPrice(tour.discountedPrice)}/-</span>
                </div>
                <p className="text-xs text-gray-500 mt-1 text-right">Per person on twin sharing</p>
              </div>
              
              <div className="space-y-3 mb-4">
                <div className="flex items-center">
                  <ShieldCheck className="text-green-500 w-5 h-5 mr-2" />
                  <span className="text-sm">100% Secure Payments</span>
                </div>
                <div className="flex items-center">
                  <Sunrise className="text-green-500 w-5 h-5 mr-2" />
                  <span className="text-sm">Scenic Accommodations</span>
                </div>
                <div className="flex items-center">
                  <Mountain className="text-green-500 w-5 h-5 mr-2" />
                  <span className="text-sm">Expert Mountain Guides</span>
                </div>
              </div>

              <Dialog>
                <DialogTrigger asChild>
                  <Button className="w-full mb-3 text-lg py-6 bg-fuchsia-600 hover:bg-fuchsia-500">
                    Book Now
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <LeadForm />
                </DialogContent>
              </Dialog>
              
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" className="w-full mb-4 text-lg py-6 text-slate-50 bg-indigo-700 hover:bg-indigo-600">
                    Enquire Now
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <LeadForm />
                </DialogContent>
              </Dialog>
              
              <div className="text-center">
                <Link to="https://wa.me/919876543210" className="flex items-center justify-center text-green-600 hover:text-green-700">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 mr-2"><path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" /><path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1zm0 0a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1" /></svg>
                  Chat on WhatsApp
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Package Details Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left column - Package details */}
            <div className="lg:col-span-2 space-y-8">
              <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
                <h2 className="text-2xl font-bold text-spiti-dark mb-4 flex items-center">
                  {getTransportIcon()}
                  <span className="ml-2">Tour Overview</span>
                </h2>
                <p className="text-gray-700 mb-6">
                  Experience the magic of Spiti Valley with our {tour.duration.nights}-night, {tour.duration.days}-day adventure through the breathtaking
                  Himalayan landscape. Journey through ancient Buddhist monasteries, remote high-altitude villages, and pristine
                  natural wonders in this trans-Himalayan region often called "Little Tibet" or the "Middle Land."
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center">
                    <Clock className="text-spiti-blue w-5 h-5 mr-3" />
                    <div>
                      <p className="text-gray-600 text-sm">Duration</p>
                      <p className="font-medium">{tour.duration.nights} Nights / {tour.duration.days} Days</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Home className="text-spiti-blue w-5 h-5 mr-3" />
                    <div>
                      <p className="text-gray-600 text-sm">Accommodation</p>
                      <p className="font-medium">Hotels & Homestays</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="text-spiti-blue w-5 h-5 mr-3" />
                    <div>
                      <p className="text-gray-600 text-sm">Best Time</p>
                      <p className="font-medium">June to September</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Users className="text-spiti-blue w-5 h-5 mr-3" />
                    <div>
                      <p className="text-gray-600 text-sm">Group Size</p>
                      <p className="font-medium">2-10 People</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
                <h2 className="text-2xl font-bold text-spiti-dark mb-4">Tour Itinerary</h2>
                <p className="text-gray-700 mb-6">
                  Follow our carefully crafted day-by-day itinerary through the magnificent landscapes of Spiti Valley. 
                  From ancient monasteries to quaint villages and breathtaking lakes, each day offers unique experiences in this Himalayan paradise.
                </p>
                <div className="border-l-2 border-spiti-blue pl-4 space-y-6">
                  {Array.from({
                  length: tour.duration.days
                }).map((_, index) => <div key={index} className="mb-4">
                      <h3 className="text-lg font-bold text-spiti-dark flex items-center">
                        <span className="inline-flex items-center justify-center w-8 h-8 bg-spiti-blue text-white rounded-full mr-2">
                          {index + 1}
                        </span>
                        Day {index + 1}: {tour.nightStays[index]?.location || "Tour End"}
                      </h3>
                      <p className="mt-2 text-gray-600">
                        {index === 0 ? "Start your journey from your pickup location and drive to your first destination. Enjoy the scenic beauty as you enter the highland regions." : index === tour.duration.days - 1 ? "After breakfast, check out from the hotel and end your journey with beautiful memories of Spiti Valley that will last a lifetime." : `Explore the beautiful landscapes of ${tour.nightStays[index]?.location || "the region"} and visit local attractions, ancient monasteries, and experience the unique culture of this Himalayan region.`}
                      </p>
                    </div>)}
                </div>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
                <h2 className="text-2xl font-bold text-spiti-dark mb-4">Accommodation</h2>
                <p className="text-gray-600 mb-4">
                  Stay in comfortable accommodations throughout your Spiti Valley journey, experiencing the warm hospitality 
                  of this Himalayan region while enjoying stunning mountain views:
                </p>
                <div className="space-y-2">
                  {tour.nightStays.map((stay, index) => <div key={index} className="flex items-center">
                      <Check className="text-green-500 w-5 h-5 mr-2" />
                      <span>{stay.nights} night{stay.nights > 1 ? 's' : ''} in {stay.location} - Experience the unique charm of this Himalayan destination</span>
                    </div>)}
                </div>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
                <h2 className="text-2xl font-bold text-spiti-dark mb-4">Package Inclusions</h2>
                <p className="text-gray-600 mb-4">
                  Our all-inclusive Spiti Valley package ensures you have everything you need for a comfortable and memorable journey:
                </p>
                <ul className="space-y-2">
                  {tour.inclusions.map((inclusion, index) => <li key={index} className="flex items-start">
                      <Check className="text-green-500 w-5 h-5 mr-2 mt-1" />
                      <span>{inclusion}</span>
                    </li>)}
                </ul>
              </div>
            </div>
            
            {/* Right column - Booking info (already implemented) */}
            <div className="hidden lg:block">
              <div className="sticky top-24">
                {/* This is intentionally left empty as we already have the booking section in the hero area for mobile */}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* More Popular Tours Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-6 text-spiti-dark">More Popular Spiti Valley Tours</h2>
          <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
            Discover our other handcrafted Spiti Valley adventures, each offering unique experiences through 
            this mesmerizing Himalayan region. From bike tours and women-only expeditions to family-friendly 
            journeys, find the perfect package for your next mountain getaway.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {otherTours.map((tour, index) => <div key={index} className="h-full">
                <TourPackage {...tour} index={tourPackagesData.findIndex(t => t.title === tour.title)} />
              </div>)}
          </div>
        </div>
      </section>
      
      <Footer />
    </div>;
};
export default TourDetail;