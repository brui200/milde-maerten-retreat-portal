import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BookingForm from '@/components/BookingForm';
import { useToast } from '@/components/ui/use-toast';
import { suites } from '@/data/hotelData';
import { useLanguage } from '@/context/LanguageContext';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Booking = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { t } = useLanguage();
  const queryParams = new URLSearchParams(location.search);
  const suiteId = queryParams.get('suite');
  const checkinParam = queryParams.get('checkin');
  const checkoutParam = queryParams.get('checkout');
  const guestsParam = queryParams.get('guests');
  
  const [currentStep, setCurrentStep] = useState(2); // Assuming we're on step 2 (date selection) by default
  
  // Find the selected suite
  const selectedSuite = suites.find(suite => suite.id === suiteId);
  
  useEffect(() => {
    if (suiteId) {
      if (!selectedSuite) {
        // Invalid suite ID, redirect back to the booking flow
        navigate('/booking-flow');
        return;
      }
      
      // If we have dates and guests, we're likely on step 3
      if (checkinParam && checkoutParam && guestsParam) {
        setCurrentStep(3);
        toast({
          title: "Ready for Checkout",
          description: "Please review your booking details and complete payment.",
        });
      } else {
        toast({
          title: "Suite Selected",
          description: `You've selected the ${selectedSuite.name}. Now choose your dates.`,
        });
      }
    } else {
      // No suite selected, redirect back to the booking flow
      navigate('/booking-flow');
    }
  }, [suiteId, checkinParam, checkoutParam, guestsParam, navigate, selectedSuite, toast]);
  
  const handleBack = () => {
    if (currentStep === 3) {
      // Go back to date selection, keeping the suite selection
      navigate(`/booking?suite=${suiteId}`);
    } else {
      // Go back to suite selection
      navigate('/booking-flow');
    }
  };
  
  return (
    <>
      <Navbar />
      
      <main className="pt-24 pb-20 bg-hotel-beige min-h-screen">
        <div className="container-custom">
          {/* Booking steps */}
          <div className="flex items-center justify-center mb-10 text-sm">
            <div className="flex items-center opacity-75">
              <div className="h-8 w-8 rounded-full bg-primary text-white flex items-center justify-center">
                <ChevronLeft size={16} className="cursor-pointer" onClick={handleBack} />
              </div>
              <span className="ml-2">{t('booking.selectSuiteShort')}</span>
            </div>
            <ChevronRight className="mx-3 text-muted-foreground" size={16} />
            <div className={`flex items-center ${currentStep === 2 ? 'opacity-100' : 'opacity-75'}`}>
              <div className={`h-8 w-8 rounded-full ${currentStep === 2 ? 'bg-primary text-white' : 'border border-muted-foreground'} flex items-center justify-center`}>
                2
              </div>
              <span className="ml-2 font-medium">{t('booking.chooseDates')}</span>
            </div>
            <ChevronRight className="mx-3 text-muted-foreground" size={16} />
            <div className={`flex items-center ${currentStep === 3 ? 'opacity-100' : 'opacity-50'}`}>
              <div className={`h-8 w-8 rounded-full ${currentStep === 3 ? 'bg-primary text-white' : 'border border-muted-foreground'} flex items-center justify-center`}>
                3
              </div>
              <span className="ml-2">{t('booking.payment')}</span>
            </div>
          </div>
          
          {/* Selected suite information if we have it */}
          {selectedSuite && (
            <div className="bg-white p-4 rounded-md shadow-sm mb-8">
              <div className="flex items-center">
                <img 
                  src={selectedSuite.images[0]} 
                  alt={selectedSuite.name}
                  className="w-16 h-16 object-cover rounded-md mr-4"
                />
                <div>
                  <h3 className="font-playfair">{selectedSuite.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    €{selectedSuite.price} / night · {selectedSuite.capacity} {selectedSuite.capacity === 1 ? t('suites.guest') : t('suites.guests')}
                  </p>
                </div>
              </div>
            </div>
          )}
          
          <BookingForm />
        </div>
      </main>
      
      <Footer />
    </>
  );
};

export default Booking;
