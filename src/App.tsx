
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { LanguageProvider } from "./context/LanguageContext";
import { useEffect } from "react";

// Pages
import Index from "./pages/Index";
import Suites from "./pages/Suites";
import SuiteDetail from "./pages/SuiteDetail";
import Amenities from "./pages/Amenities";
import Events from "./pages/Events";
import Contact from "./pages/Contact";
import Booking from "./pages/Booking";
import BookingFlow from "./pages/BookingFlow";
import History from "./pages/History";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// Page transition component
const PageTransition = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  
  useEffect(() => {
    // Scroll to top on page change
    window.scrollTo(0, 0);
    
    // Apply transition class
    const mainElement = document.querySelector('main');
    if (mainElement) {
      mainElement.style.opacity = '0';
      setTimeout(() => {
        mainElement.style.opacity = '1';
      }, 50);
    }
  }, [location]);
  
  return <>{children}</>;
};

const AppRoutes = () => {
  return (
    <PageTransition>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/suites" element={<Suites />} />
        <Route path="/suite/:suiteId" element={<SuiteDetail />} />
        <Route path="/amenities" element={<Amenities />} />
        <Route path="/events" element={<Events />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/booking-flow" element={<BookingFlow />} />
        <Route path="/history" element={<History />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </PageTransition>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </TooltipProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;
