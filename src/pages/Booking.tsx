
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useToast } from '@/components/ui/use-toast';
import { suites } from '@/data/hotelData';
import { useLanguage } from '@/context/LanguageContext';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Card } from '@/components/ui/card';
import { CalendarIcon } from 'lucide-react';
import { format, addDays, differenceInDays } from 'date-fns';
import AirbnbStyleBookingCard from '@/components/AirbnbStyleBookingCard';
import BookingForm from '@/components/BookingForm';

// Mock data for unavailable suites
const mockUnavailableSuites = ['historic-suite'];

const Booking = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { t } = useLanguage();
  
  // Parse query parameters
  const queryParams = new URLSearchParams(location.search);
  const suiteId = queryParams.get('suite');
  const checkinParam = queryParams.get('checkin');
  const checkoutParam = queryParams.get('checkout');
  
  // State
  const [checkInDate, setCheckInDate] = useState<Date | undefined>(
    checkinParam ? new Date(checkinParam) : undefined
  );
  const [checkOutDate, setCheckOutDate] = useState<Date | undefined>(
    checkoutParam ? new Date(checkoutParam) : undefined
  );
  const [selectedSuite, setSelectedSuite] = useState<string | null>(suiteId);
  const [showCheckout, setShowCheckout] = useState(false);
  
  // Set min checkout date one day after checkin
  const minCheckoutDate = checkInDate ? addDays(checkInDate, 1) : undefined;
  
  // Get available suites based on dates
  const getAvailableSuites = () => {
    if (!checkInDate || !checkOutDate) return suites.map(suite => ({ ...suite, available: true }));
    
    return suites.map(suite => ({
      ...suite,
      available: !mockUnavailableSuites.includes(suite.id)
    }));
  };
  
  const availableSuites = getAvailableSuites();
  
  // Handle check in date change
  const handleCheckInChange = (date: Date | undefined) => {
    setCheckInDate(date);
    // If checkout date is before new checkin date, reset it
    if (checkOutDate && date && checkOutDate <= date) {
      setCheckOutDate(undefined);
    }
    // Reset selected suite
    setSelectedSuite(null);
    setShowCheckout(false);
    
    // Update URL
    if (date) {
      const params = new URLSearchParams(location.search);
      params.set('checkin', date.toISOString());
      if (checkOutDate && checkOutDate > date) {
        params.set('checkout', checkOutDate.toISOString());
      } else {
        params.delete('checkout');
      }
      navigate(`${location.pathname}?${params.toString()}`);
    }
  };
  
  // Handle check out date change
  const handleCheckOutChange = (date: Date | undefined) => {
    setCheckOutDate(date);
    // Reset selected suite
    setSelectedSuite(null);
    setShowCheckout(false);
    
    // Update URL
    if (date && checkInDate) {
      const params = new URLSearchParams(location.search);
      params.set('checkout', date.toISOString());
      navigate(`${location.pathname}?${params.toString()}`);
    }
  };
  
  // Handle suite selection
  useEffect(() => {
    if (selectedSuite) {
      const suite = availableSuites.find(s => s.id === selectedSuite);
      if (suite && suite.available === false) {
        toast({
          title: "Suite Unavailable",
          description: "This suite is not available for the selected dates. Please choose another suite or different dates.",
          variant: "destructive",
        });
        setSelectedSuite(null);
      } else if (suite && checkInDate && checkOutDate) {
        // Update URL
        const params = new URLSearchParams(location.search);
        params.set('suite', selectedSuite);
        navigate(`${location.pathname}?${params.toString()}`);
        
        // Show checkout
        setShowCheckout(true);
        
        // Scroll to checkout section
        setTimeout(() => {
          document.getElementById('checkout-section')?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }, [selectedSuite, availableSuites, checkInDate, checkOutDate, navigate, location.search, toast]);
  
  return (
    <>
      <Navbar />
      
      <main className="page-content min-h-screen bg-hotel-beige pb-20">
        <div className="container-custom max-w-5xl">
          <div className="mb-8 mt-24 text-center">
            <h1 className="text-3xl md:text-4xl font-medium font-playfair mb-3">
              {t('bookYourStay')}
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {t('selectDatesDescription')}
            </p>
          </div>
          
          {/* Date Selection */}
          <Card className="p-6 mb-10 shadow-sm">
            <h2 className="text-xl font-playfair mb-4">{t('selectYourDates')}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Check-in Date */}
              <div className="space-y-2">
                <label className="block text-sm font-medium">{t('booking.checkIn')}</label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {checkInDate ? format(checkInDate, 'PPP') : <span>{t('selectDate')}</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={checkInDate}
                      onSelect={handleCheckInChange}
                      initialFocus
                      disabled={(date) => date < new Date()}
                      className="p-3 pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
              </div>
              
              {/* Check-out Date */}
              <div className="space-y-2">
                <label className="block text-sm font-medium">{t('booking.checkOut')}</label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal"
                      disabled={!checkInDate}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {checkOutDate ? format(checkOutDate, 'PPP') : <span>{t('selectDate')}</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={checkOutDate}
                      onSelect={handleCheckOutChange}
                      initialFocus
                      disabled={(date) => 
                        date < (minCheckoutDate || new Date())
                      }
                      className="p-3 pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
            
            {checkInDate && checkOutDate && (
              <div className="mt-4 text-center text-sm text-muted-foreground">
                <p>
                  {differenceInDays(checkOutDate, checkInDate)} 
                  {differenceInDays(checkOutDate, checkInDate) === 1 ? t('night') : t('nights')} selected
                </p>
              </div>
            )}
          </Card>
          
          {/* Suites Grid */}
          {checkInDate && checkOutDate && (
            <div className="mb-10 animate-fade-in">
              <h2 className="text-xl font-playfair mb-4">{t('availableSuites')}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {availableSuites.map((suite) => (
                  <div 
                    key={suite.id}
                    onClick={() => suite.available && setSelectedSuite(suite.id)}
                    className={`cursor-pointer transform transition duration-200 ${
                      selectedSuite === suite.id ? 'scale-[1.02]' : ''
                    } ${
                      selectedSuite === suite.id ? 'ring-2 ring-primary' : ''
                    }`}
                  >
                    <AirbnbStyleBookingCard 
                      suite={suite}
                      initialCheckInDate={checkInDate}
                      initialCheckOutDate={checkOutDate}
                      showDetailsButton={true}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Checkout Section */}
          {showCheckout && selectedSuite && checkInDate && checkOutDate && (
            <div id="checkout-section" className="animate-fade-in scroll-mt-24">
              <h2 className="text-xl font-playfair mb-4">{t('completeYourBooking')}</h2>
              
              {/* Selected suite information */}
              <div className="bg-white p-4 rounded-md shadow-sm mb-8">
                <div className="flex items-center">
                  <img 
                    src={suites.find(s => s.id === selectedSuite)?.images[0]} 
                    alt={suites.find(s => s.id === selectedSuite)?.name}
                    className="w-16 h-16 object-cover rounded-md mr-4"
                  />
                  <div>
                    <h3 className="font-playfair">{suites.find(s => s.id === selectedSuite)?.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {format(checkInDate, 'MMM d')} - {format(checkOutDate, 'MMM d')} · 
                      {differenceInDays(checkOutDate, checkInDate)} {
                        differenceInDays(checkOutDate, checkInDate) === 1 ? t('night') : t('nights')
                      }
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Booking Form */}
              <BookingForm 
                selectedSuite={selectedSuite}
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

export default Booking;
