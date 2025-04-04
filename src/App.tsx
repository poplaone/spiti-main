
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import About from "./pages/About";
import Contact from "./pages/Contact";
import FAQ from "./pages/FAQ";
import Blog from "./pages/Blog";
import ThankYou from "./pages/ThankYou";
import TermsOfService from "./pages/TermsOfService";
import PrivacyPolicy from "./pages/PrivacyPolicy";

// Import the new dynamic TourDetail page
import TourDetail from "./pages/TourDetail";

// Import individual tour detail pages
import TourDetailBike from "./pages/TourDetailBike";
import TourDetailUnexplored from "./pages/TourDetailUnexplored";
import TourDetailBuddhist from "./pages/TourDetailBuddhist";
import TourDetailWomen from "./pages/TourDetailWomen";
import TourDetailOwnCar from "./pages/TourDetailOwnCar";
import TourDetailHiddenHeaven from "./pages/TourDetailHiddenHeaven";

// Import new pages for road trips and fixed departures
import RoadTrips from "./pages/RoadTrips";
import FixedDepartures from "./pages/FixedDepartures";

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
            
            {/* Dynamic tour detail page route */}
            <Route path="/tour/:id" element={<TourDetail />} />
            
            {/* Tour detail pages with clean routes - all 6 tour types */}
            <Route path="/tour-bike" element={<TourDetailBike />} />
            <Route path="/tour-unexplored" element={<TourDetailUnexplored />} />
            <Route path="/tour-buddhist" element={<TourDetailBuddhist />} />
            <Route path="/tour-women" element={<TourDetailWomen />} />
            <Route path="/tour-owncar" element={<TourDetailOwnCar />} />
            <Route path="/tour-hiddenheaven" element={<TourDetailHiddenHeaven />} />
            
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
