
import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BookingForm from '@/components/BookingForm';
import { useToast } from '@/components/ui/use-toast';

const Booking = () => {
  const location = useLocation();
  const { toast } = useToast();
  const queryParams = new URLSearchParams(location.search);
  const hasParams = queryParams.has('suite') || queryParams.has('checkin') || queryParams.has('checkout') || queryParams.has('guests');
  
  useEffect(() => {
    if (hasParams) {
      toast({
        title: "Booking Information",
        description: "Your selected information has been pre-filled in the booking form.",
      });
    }
  }, [hasParams, toast]);
  
  return (
    <>
      <Navbar />
      
      <main className="pt-24 pb-20 bg-hotel-beige min-h-screen">
        <div className="container-custom">
          <BookingForm />
        </div>
      </main>
      
      <Footer />
    </>
  );
};

export default Booking;
