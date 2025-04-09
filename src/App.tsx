
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import ScrollToTop from "./components/ScrollToTop";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

// Import pages that were missing
import About from "./pages/About";
import Contact from "./pages/Contact";
import FAQ from "./pages/FAQ";
import Blog from "./pages/Blog";
import ThankYou from "./pages/ThankYou";
import TermsOfService from "./pages/TermsOfService";
import PrivacyPolicy from "./pages/PrivacyPolicy";

// Import the dynamic TourDetail page
import TourDetail from "./pages/TourDetail";

// Import specific tour detail pages with custom URLs
import BuddhistAndTribalCircuit from "./pages/BuddhistAndTribalCircuit";
import IntoTheHeartOfSpiti from "./pages/IntoTheHeartOfSpiti";
import KinnaurValleyExploration from "./pages/KinnaurValleyExploration";
import LahaulSpitiBikeTour from "./pages/LahaulSpitiBikeTour";
import SpitiValleyOwnCar from "./pages/SpitiValleyOwnCar";
import SpitiValleyWomenOnlyTour from "./pages/SpitiValleyWomenOnlyTour";
import UnexploredSpiti from "./pages/UnexploredSpiti";
import WinterWhiteSpiti from "./pages/WinterWhiteSpiti";
import RoyalSpitiValleyWholeCircuit from "./pages/RoyalSpitiValleyWholeCircuit";
import SnowLeopardExpeditionWinterSpecial from "./pages/SnowLeopardExpeditionWinterSpecial";
import SoulfulSpitiGateway from "./pages/SoulfulSpitiGateway";
import SpitiCompleteCircuitMostPopular from "./pages/SpitiCompleteCircuitMostPopular";

// Import TourDetailBySlug for handling slug-based URLs
import TourDetailBySlug from "./pages/TourDetailBySlug";

// Import new pages for road trips and fixed departures
import RoadTrips from "./pages/RoadTrips";
import FixedDepartures from "./pages/FixedDepartures";
import CustomizableTours from "./pages/CustomizableTours";

// Import admin pages
import AdminLogin from "./pages/AdminLogin";
import AdminLayout from "./components/admin/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import TourPackageList from "./pages/admin/TourPackageList";
import CreatePackage from "./pages/admin/CreatePackage";
import EditPackage from "./pages/admin/EditPackage";
import AdminSettings from "./pages/admin/AdminSettings";

// Analytics tracking component
const PageTracker = () => {
  const location = useLocation();
  
  useEffect(() => {
    // Track page view when route changes
    if (window.dataLayer) {
      window.dataLayer.push({
        event: 'pageView',
        pagePath: location.pathname,
        pageTitle: document.title
      });
      console.log('Page tracked:', location.pathname);
    }
  }, [location]);
  
  return null;
};

const App = () => {
  // Create a new QueryClient instance within the component function
  // This ensures proper React context usage
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false, // Improves performance by not refetching when window gets focus
        staleTime: 300000, // 5 minutes - data will be considered fresh for 5 minutes
        retry: 1, // Only retry failed requests once
      },
    },
  }));

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTop />
          <PageTracker />
          <Routes>
            {/* Home page route */}
            <Route path="/" element={<Index />} />
            
            {/* New pages */}
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/thank-you" element={<ThankYou />} />
            <Route path="/terms-of-service" element={<TermsOfService />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            
            {/* New view all pages */}
            <Route path="/road-trips" element={<RoadTrips />} />
            <Route path="/fixed-departures" element={<FixedDepartures />} />
            <Route path="/customizable-tours" element={<CustomizableTours />} />
            
            {/* Custom tour detail pages with clean URLs - only keeping the ones not to be removed */}
            <Route path="/BUDDHIST-AND-TRIBAL-CIRCUIT–SPITI" element={<BuddhistAndTribalCircuit />} />
            <Route path="/INTO-THE-HEART-OF-SPITI" element={<IntoTheHeartOfSpiti />} />
            <Route path="/KINNAUR-VALLEY-EXPLORATION" element={<KinnaurValleyExploration />} />
            <Route path="/LAHAUL-SPITI-BIKE-TOUR" element={<LahaulSpitiBikeTour />} />
            <Route path="/SPITI-VALLEY-TOUR-IN-YOUR-OWN-CAR" element={<SpitiValleyOwnCar />} />
            <Route path="/SPITI-VALLEY-WOMEN-ONLY-TOUR" element={<SpitiValleyWomenOnlyTour />} />
            <Route path="/UNEXPLORED-SPITI" element={<UnexploredSpiti />} />
            <Route path="/WINTER-WHITE-SPITI" element={<WinterWhiteSpiti />} />
            <Route path="/ROYAL-SPITI-VALLEY-WHOLE-CIRCUIT" element={<RoyalSpitiValleyWholeCircuit />} />
            <Route path="/SNOW-LEOPARD-EXPEDITION-WINTER-SPECIAL" element={<SnowLeopardExpeditionWinterSpecial />} />
            <Route path="/SOULFUL-SPITI-GATEWAY" element={<SoulfulSpitiGateway />} />
            <Route path="/SPITI-COMPLETE-CIRCUIT-MOST-POPULAR" element={<SpitiCompleteCircuitMostPopular />} />
            
            {/* Dynamic tour detail page route */}
            <Route path="/tour/:id" element={<TourDetail />} />
            
            {/* Slug-based tour detail route */}
            <Route path="/tour-package/:slug" element={<TourDetailBySlug />} />
            
            {/* Admin routes */}
            <Route path="/admin-login" element={<AdminLogin />} />
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminDashboard />} />
              <Route path="tour-packages" element={<TourPackageList />} />
              <Route path="tour-packages/create" element={<CreatePackage />} />
              <Route path="tour-packages/edit/:id" element={<EditPackage />} />
              <Route path="settings" element={<AdminSettings />} />
            </Route>
            
            {/* Catch-all route for 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
