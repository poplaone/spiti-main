import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import ScrollToTop from "./components/ScrollToTop";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import About from "./pages/About";
import Contact from "./pages/Contact";
import FAQ from "./pages/FAQ";
import Blog from "./pages/Blog";
import ThankYou from "./pages/ThankYou";
import TermsOfService from "./pages/TermsOfService";
import PrivacyPolicy from "./pages/PrivacyPolicy";

// Import the tour detail pages
import TourDetail from "./pages/TourDetail";
import TourDetailBySlug from "./pages/TourDetailBySlug";
import TourDetailBike from "./pages/TourDetailBike";
import TourDetailUnexplored from "./pages/TourDetailUnexplored";
import TourDetailBuddhist from "./pages/TourDetailBuddhist";
import TourDetailWomen from "./pages/TourDetailWomen";
import TourDetailOwnCar from "./pages/TourDetailOwnCar";
import TourDetailHiddenHeaven from "./pages/TourDetailHiddenHeaven";

// Import custom tour pages
import BuddhistTribalCircuit from "./pages/tours/BuddhistTribalCircuit";
import IntoHeartSpiti from "./pages/tours/IntoHeartSpiti";
import KinnaurValleyExploration from "./pages/tours/KinnaurValleyExploration";
import LahaulSpitiBikeTour from "./pages/tours/LahaulSpitiBikeTour";
import RoyalSpitiValleyCircuit from "./pages/tours/RoyalSpitiValleyCircuit";
import SnowLeopardExpedition from "./pages/tours/SnowLeopardExpedition";
import SoulfulSpitiGateway from "./pages/tours/SoulfulSpitiGateway";
import SpitiCompleteCircuit from "./pages/tours/SpitiCompleteCircuit";
import SpitiValleyOwnCar from "./pages/tours/SpitiValleyOwnCar";
import SpitiValleyWomenTour from "./pages/tours/SpitiValleyWomenTour";
import UnexploredSpiti from "./pages/tours/UnexploredSpiti";
import WinterWhiteSpiti from "./pages/tours/WinterWhiteSpiti";

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

const App = () => {
  // Create a new QueryClient instance within the component function
  // This ensures proper React context usage
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTop />
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
            
            {/* Dynamic tour detail page route with ID */}
            <Route path="/tour/:id" element={<TourDetail />} />
            
            {/* Tour detail pages with clean routes - all 6 tour types */}
            <Route path="/tour-bike" element={<TourDetailBike />} />
            <Route path="/tour-unexplored" element={<TourDetailUnexplored />} />
            <Route path="/tour-buddhist" element={<TourDetailBuddhist />} />
            <Route path="/tour-women" element={<TourDetailWomen />} />
            <Route path="/tour-owncar" element={<TourDetailOwnCar />} />
            <Route path="/tour-hiddenheaven" element={<TourDetailHiddenHeaven />} />
            
            {/* Custom URL routes for each specific tour package */}
            <Route path="/BUDDHIST-AND-TRIBAL-CIRCUIT–SPITI" element={<BuddhistTribalCircuit />} />
            <Route path="/INTO-THE-HEART-OF-SPITI" element={<IntoHeartSpiti />} />
            <Route path="/KINNAUR-VALLEY-EXPLORATION" element={<KinnaurValleyExploration />} />
            <Route path="/LAHAUL-SPITI-BIKE-TOUR" element={<LahaulSpitiBikeTour />} />
            <Route path="/ROYAL-SPITI-VALLEY-WHOLE-CIRCUIT" element={<RoyalSpitiValleyCircuit />} />
            <Route path="/SNOW-LEOPARD-EXPEDITION-WINTER-SPECIAL" element={<SnowLeopardExpedition />} />
            <Route path="/SOULFUL-SPITI-GATEWAY" element={<SoulfulSpitiGateway />} />
            <Route path="/SPITI-COMPLETE-CIRCUIT-MOST-POPULAR" element={<SpitiCompleteCircuit />} />
            <Route path="/SPITI-VALLEY-TOUR-IN-YOUR-OWN-CAR" element={<SpitiValleyOwnCar />} />
            <Route path="/SPITI-VALLEY-WOMEN-ONLY-TOUR" element={<SpitiValleyWomenTour />} />
            <Route path="/UNEXPLORED-SPITI" element={<UnexploredSpiti />} />
            <Route path="/WINTER-WHITE-SPITI" element={<WinterWhiteSpiti />} />
            
            {/* Fallback route for other slugs - keep at the end for correct routing priority */}
            <Route path="/:slug" element={<TourDetailBySlug />} />
            
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
