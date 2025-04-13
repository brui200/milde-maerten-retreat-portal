
import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { suites } from '@/data/hotelData';
import { useLanguage } from '@/context/LanguageContext';
import { useToast } from '@/components/ui/use-toast';
import BookingForm from '@/components/BookingForm';
import { format } from 'date-fns';

const Checkout = () => {
  const { t } = useLanguage();
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Get query parameters
  const searchParams = new URLSearchParams(location.search);
  const suiteId = searchParams.get('suiteId');
  const checkInParam = searchParams.get('checkIn');
  const checkOutParam = searchParams.get('checkOut');
  
  // Parse dates
  const checkInDate = checkInParam ? new Date(checkInParam) : undefined;
  const checkOutDate = checkOutParam ? new Date(checkOutParam) : undefined;
  
  // Find the selected suite
  const selectedSuite = suites.find(s => s.id === suiteId);
  
  useEffect(() => {
    // Validate that we have all required data
    if (!suiteId || !checkInDate || !checkOutDate || !selectedSuite) {
      toast({
        title: "Missing Information",
        description: "Some booking details are missing. Please try again.",
        variant: "destructive"
      });
      navigate('/booking');
    }
  }, [suiteId, checkInDate, checkOutDate, selectedSuite, navigate, toast]);
  
  return (
    <>
      <Navbar />
      
      <main className="pt-24 pb-20 bg-hotel-beige min-h-screen">
        <div className="container-custom max-w-4xl">
          <div className="mb-8 text-center">
            <h1 className="text-3xl md:text-4xl font-medium font-playfair mb-3">
              {t('completeYourBooking')}
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {t('booking.finalSteps')}
            </p>
          </div>
          
          {/* Booking Summary */}
          {selectedSuite && checkInDate && checkOutDate && (
            <div className="bg-white p-6 rounded-md shadow-sm mb-8 max-w-2xl mx-auto">
              <h2 className="text-xl font-playfair mb-4">Booking Summary</h2>
              
              <div className="flex items-start gap-4 mb-4">
                <img 
                  src={selectedSuite.images[0]} 
                  alt={selectedSuite.name}
                  className="w-20 h-20 object-cover rounded-sm"
                />
                <div>
                  <h3 className="font-medium">{selectedSuite.name}</h3>
                  <div className="text-sm text-muted-foreground">
                    <div className="flex items-center gap-4 mt-1">
                      <span>{format(checkInDate, 'MMM dd')} - {format(checkOutDate, 'MMM dd, yyyy')}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Booking Form */}
              <BookingForm 
                selectedSuite={suiteId || ""}
                checkInDate={checkInDate}
                checkOutDate={checkOutDate}
              />
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </>
  );
};

export default Checkout;
