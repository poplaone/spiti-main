
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

// Import the dynamic TourDetail page
import TourDetail from "./pages/TourDetail";

// Import tour detail pages with SEO-friendly URLs
import TourDetailSpitiBikeExpedition from "./pages/TourDetailSpitiBikeExpedition";
import TourDetailManaliLehExpedition from "./pages/TourDetailManaliLehExpedition";
import TourDetailUnexploredSpiti from "./pages/TourDetailUnexploredSpiti";
import TourDetailUnexploredKinnaur from "./pages/TourDetailUnexploredKinnaur";
import TourDetailBuddhistTribal from "./pages/TourDetailBuddhistTribal";
import TourDetailWomenExploreSpiti from "./pages/TourDetailWomenExploreSpiti";
import TourDetailWomenExploreLadakh from "./pages/TourDetailWomenExploreLadakh";
import TourDetailOwnCarSelfDrive from "./pages/TourDetailOwnCarSelfDrive";
import TourDetailHiddenHeavenSpiti from "./pages/TourDetailHiddenHeavenSpiti";
import TourDetailUnexploredLahaulSpiti from "./pages/TourDetailUnexploredLahaulSpiti";
import TourDetailLehLadakhCarTour from "./pages/TourDetailLehLadakhCarTour";

// Import new SEO-friendly tour detail pages
import TourDetailBuddhistAndTribalCircuit from "./pages/TourDetailBuddhistAndTribalCircuit";
import TourDetailIntoTheHeartOfSpiti from "./pages/TourDetailIntoTheHeartOfSpiti";
import TourDetailKinnaurValleyExploration from "./pages/TourDetailKinnaurValleyExploration";
import TourDetailLahaulSpitiBikeTour from "./pages/TourDetailLahaulSpitiBikeTour";
import TourDetailRoyalSpitiValleyWholeCircuit from "./pages/TourDetailRoyalSpitiValleyWholeCircuit";
import TourDetailSnowLeopardExpedition from "./pages/TourDetailSnowLeopardExpedition";
import TourDetailSoulfulSpitiGateway from "./pages/TourDetailSoulfulSpitiGateway";
import TourDetailSpitiCompleteCircuit from "./pages/TourDetailSpitiCompleteCircuit";
import TourDetailSpitiValleyTourInYourOwnCar from "./pages/TourDetailSpitiValleyTourInYourOwnCar";
import TourDetailSpitiValleyWomenOnlyTour from "./pages/TourDetailSpitiValleyWomenOnlyTour";
import TourDetailWinterWhiteSpiti from "./pages/TourDetailWinterWhiteSpiti";

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
            
            {/* Dynamic tour detail page route */}
            <Route path="/tour/:id" element={<TourDetail />} />
            
            {/* SEO-friendly tour detail pages - original */}
            <Route path="/spiti-bike-expedition" element={<TourDetailSpitiBikeExpedition />} />
            <Route path="/manali-leh-expedition" element={<TourDetailManaliLehExpedition />} />
            <Route path="/unexplored-spiti" element={<TourDetailUnexploredSpiti />} />
            <Route path="/unexplored-kinnaur" element={<TourDetailUnexploredKinnaur />} />
            <Route path="/buddhist-tribal-circuit" element={<TourDetailBuddhistTribal />} />
            <Route path="/women-explore-spiti" element={<TourDetailWomenExploreSpiti />} />
            <Route path="/women-explore-ladakh" element={<TourDetailWomenExploreLadakh />} />
            <Route path="/own-car-self-drive" element={<TourDetailOwnCarSelfDrive />} />
            <Route path="/hidden-heaven-spiti-valley" element={<TourDetailHiddenHeavenSpiti />} />
            <Route path="/unexplored-lahaul-spiti" element={<TourDetailUnexploredLahaulSpiti />} />
            <Route path="/leh-ladakh-car-tour" element={<TourDetailLehLadakhCarTour />} />
            
            {/* SEO-friendly tour detail pages - new URLs */}
            <Route path="/BUDDHIST-AND-TRIBAL-CIRCUIT-SPITI" element={<TourDetailBuddhistAndTribalCircuit />} />
            <Route path="/INTO-THE-HEART-OF-SPITI" element={<TourDetailIntoTheHeartOfSpiti />} />
            <Route path="/KINNAUR-VALLEY-EXPLORATION" element={<TourDetailKinnaurValleyExploration />} />
            <Route path="/LAHAUL-SPITI-BIKE-TOUR" element={<TourDetailLahaulSpitiBikeTour />} />
            <Route path="/ROYAL-SPITI-VALLEY-WHOLE-CIRCUIT" element={<TourDetailRoyalSpitiValleyWholeCircuit />} />
            <Route path="/SNOW-LEOPARD-EXPEDITION-WINTER-SPECIAL" element={<TourDetailSnowLeopardExpedition />} />
            <Route path="/SOULFUL-SPITI-GATEWAY" element={<TourDetailSoulfulSpitiGateway />} />
            <Route path="/SPITI-COMPLETE-CIRCUIT-MOST-POPULAR" element={<TourDetailSpitiCompleteCircuit />} />
            <Route path="/SPITI-VALLEY-TOUR-IN-YOUR-OWN-CAR" element={<TourDetailSpitiValleyTourInYourOwnCar />} />
            <Route path="/SPITI-VALLEY-WOMEN-ONLY-TOUR" element={<TourDetailSpitiValleyWomenOnlyTour />} />
            <Route path="/UNEXPLORED-SPITI" element={<TourDetailUnexploredSpiti />} />
            <Route path="/WINTER-WHITE-SPITI" element={<TourDetailWinterWhiteSpiti />} />
            
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
