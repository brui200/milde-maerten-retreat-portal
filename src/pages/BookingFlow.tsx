import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { suites } from '@/data/hotelData';
import { useLanguage } from '@/context/LanguageContext';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useToast } from '@/components/ui/use-toast';
import BookingForm from '@/components/BookingForm';
import { ChevronRight, Users, Square, Check, CalendarIcon, ArrowDown } from 'lucide-react';
import { addDays, differenceInDays, format } from 'date-fns';

// Mock data for suite availability
const mockUnavailableSuites = ['suite-3', 'suite-4'];

// Add a type for suite with availability information
interface AvailableSuite extends Omit<typeof suites[0], 'available'> {
  available: boolean;
}

const BookingFlow = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [checkInDate, setCheckInDate] = useState<Date | undefined>(undefined);
  const [checkOutDate, setCheckOutDate] = useState<Date | undefined>(undefined);
  const [selectedSuite, setSelectedSuite] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState(1); // 1: Dates, 2: Suite Selection, 3: Checkout
  
  // Set min checkout date one day after checkin
  const minCheckoutDate = checkInDate ? addDays(checkInDate, 1) : undefined;
  
  // Check if dates are selected
  const datesSelected = checkInDate && checkOutDate;
  
  // Filter available suites based on dates
  const getAvailableSuites = () => {
    if (!datesSelected) return suites.map(suite => ({ ...suite, available: true }));
    return suites.map(suite => ({
      ...suite,
      available: !mockUnavailableSuites.includes(suite.id)
    }));
  };
  
  const availableSuites = getAvailableSuites();
  
  // Calculate nights
  const calculateNights = () => {
    if (!checkInDate || !checkOutDate) return 0;
    return differenceInDays(checkOutDate, checkInDate);
  };
  
  // Handle date selection
  useEffect(() => {
    if (checkInDate && checkOutDate) {
      // Move to suite selection when both dates are selected
      if (currentStep === 1) {
        setCurrentStep(2);
        setTimeout(() => {
          document.getElementById('suites-section')?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
        
        toast({
          title: t('datesSelected'),
          description: `${format(checkInDate, 'PPP')} - ${format(checkOutDate, 'PPP')}`,
        });
      }
    }
  }, [checkInDate, checkOutDate, currentStep, t, toast]);
  
  // Handle suite selection
  useEffect(() => {
    if (selectedSuite && currentStep === 2) {
      setCurrentStep(3);
      setTimeout(() => {
        document.getElementById('checkout-section')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  }, [selectedSuite, currentStep]);
  
  return (
    <>
      <Navbar />
      
      <main className="pt-24 pb-20 bg-hotel-beige min-h-screen">
        <div className="container-custom max-w-5xl">
          <div className="mb-8 text-center">
            <h1 className="text-3xl md:text-4xl font-medium font-playfair mb-3">
              {t('bookYourStay')}
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {t('selectDatesDescription')}
            </p>
          </div>
          
          {/* Booking steps */}
          <div className="flex items-center justify-center mb-10 text-sm">
            <div className={`flex items-center ${currentStep === 1 ? 'opacity-100' : 'opacity-75'}`}>
              <div className={`h-8 w-8 rounded-full ${currentStep === 1 ? 'bg-primary text-white' : 'border border-muted-foreground'} flex items-center justify-center`}>
                1
              </div>
              <span className={`ml-2 ${currentStep === 1 ? 'font-medium' : ''}`}>{t('chooseDates')}</span>
            </div>
            <ChevronRight className="mx-3 text-muted-foreground" size={16} />
            <div className={`flex items-center ${currentStep === 2 ? 'opacity-100' : currentStep > 2 ? 'opacity-75' : 'opacity-50'}`}>
              <div className={`h-8 w-8 rounded-full ${currentStep === 2 ? 'bg-primary text-white' : currentStep > 2 ? 'border border-muted-foreground' : 'border border-muted-foreground'} flex items-center justify-center`}>
                2
              </div>
              <span className={`ml-2 ${currentStep === 2 ? 'font-medium' : ''}`}>{t('selectSuiteShort')}</span>
            </div>
            <ChevronRight className="mx-3 text-muted-foreground" size={16} />
            <div className={`flex items-center ${currentStep === 3 ? 'opacity-100' : 'opacity-50'}`}>
              <div className={`h-8 w-8 rounded-full ${currentStep === 3 ? 'bg-primary text-white' : 'border border-muted-foreground'} flex items-center justify-center`}>
                3
              </div>
              <span className={`ml-2 ${currentStep === 3 ? 'font-medium' : ''}`}>{t('payment')}</span>
            </div>
          </div>
          
          {/* Step 1: Date Selection */}
          <section className="mb-16 animate-fadeIn">
            <h2 className="text-2xl font-playfair mb-6 text-center">{t('selectYourDates')}</h2>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
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
                        onSelect={setCheckInDate}
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
                        onSelect={setCheckOutDate}
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
              
              {datesSelected && (
                <div className="mt-4 text-center text-sm text-muted-foreground">
                  <p>{calculateNights()} {calculateNights() === 1 ? t('night') : t('nights')} selected</p>
                  <ArrowDown className="mx-auto mt-4 animate-bounce" size={20} />
                </div>
              )}
            </div>
          </section>
          
          {/* Step 2: Suite Selection - Always show, but make non-functional until dates are selected */}
          <section id="suites-section" className="mb-16 scroll-mt-24 animate-fadeIn">
            <h2 className="text-2xl font-playfair mb-6 text-center">{t('availableSuites')}</h2>
            
            {!datesSelected && (
              <div className="mb-4 p-4 bg-muted rounded-md text-center text-muted-foreground">
                {t('selectDatesToViewAvailability')}
              </div>
            )}
            
            <div className="space-y-6">
              {availableSuites.map((suite) => (
                <Card 
                  key={suite.id}
                  className={`p-0 overflow-hidden transition-all duration-300 hover:shadow-md ${
                    selectedSuite === suite.id ? 'ring-2 ring-primary' : ''
                  } ${!suite.available ? 'opacity-70' : ''} ${!datesSelected ? 'opacity-60' : ''}`}
                  onClick={() => datesSelected && suite.available && setSelectedSuite(suite.id)}
                >
                  <div className="flex flex-col md:flex-row">
                    {/* Suite image */}
                    <div className="md:w-1/3 h-64 md:h-auto relative">
                      <img 
                        src={suite.images[0]} 
                        alt={suite.name}
                        className="w-full h-full object-cover"
                      />
                      {selectedSuite === suite.id && (
                        <div className="absolute top-2 right-2 bg-primary text-white p-1 rounded-full">
                          <Check size={16} />
                        </div>
                      )}
                      {!suite.available && datesSelected && (
                        <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                          <span className="bg-black/70 text-white px-4 py-2 rounded">
                            {t('unavailableForDates')}
                          </span>
                        </div>
                      )}
                      {!datesSelected && (
                        <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                          <span className="bg-black/60 text-white px-4 py-2 rounded">
                            {t('selectDatesFirst')}
                          </span>
                        </div>
                      )}
                    </div>
                    
                    {/* Suite details */}
                    <div className="p-6 md:w-2/3">
                      <div className="flex justify-between items-start">
                        <h2 className="text-xl font-playfair mb-2">{suite.name}</h2>
                        <div>
                          <span className="font-playfair text-xl">€{suite.price}</span>
                          <span className="text-sm text-muted-foreground">/night</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-4 mb-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Users size={16} />
                          <span>{suite.capacity} {suite.capacity === 1 ? t('guest') : t('guests')}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Square size={16} />
                          <span>{suite.size} m²</span>
                        </div>
                      </div>
                      
                      <p className="text-muted-foreground mb-4 line-clamp-2">
                        {suite.description.en}
                      </p>
                      
                      <Separator className="my-4" />
                      
                      {/* Amenities highlights */}
                      <div className="grid grid-cols-2 gap-y-2 text-sm">
                        {suite.amenities.slice(0, 4).map((amenity, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <div className="w-1 h-1 bg-primary rounded-full"></div>
                            <span>{amenity}</span>
                          </div>
                        ))}
                      </div>
                      
                      {datesSelected && suite.available && (
                        <div className="mt-4">
                          <Button 
                            onClick={() => setSelectedSuite(suite.id)}
                            size="sm"
                            className="btn-primary"
                          >
                            {t('selectSuite')}
                          </Button>
                        </div>
                      )}
                      
                      {!datesSelected && (
                        <div className="mt-4">
                          <Button 
                            size="sm"
                            className="btn-primary"
                            disabled={true}
                          >
                            {t('selectSuite')}
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
            
            {selectedSuite && (
              <div className="mt-6 text-center">
                <ArrowDown className="mx-auto animate-bounce" size={20} />
              </div>
            )}
          </section>
          
          {/* Step 3: Checkout Form */}
          {currentStep === 3 && (
            <section id="checkout-section" className="scroll-mt-24 animate-fadeIn">
              <h2 className="text-2xl font-playfair mb-6 text-center">{t('completeYourBooking')}</h2>
              
              {/* Selected suite information */}
              {selectedSuite && (
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
                        {checkInDate && checkOutDate && (
                          <span>{format(checkInDate, 'MMM d')} - {format(checkOutDate, 'MMM d')}</span>
                        )} · {calculateNights()} {calculateNights() === 1 ? t('night') : t('nights')}
                      </p>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Booking Form */}
              <BookingForm 
                selectedSuite={selectedSuite || ""}
                checkInDate={checkInDate}
                checkOutDate={checkOutDate}
              />
            </section>
          )}
        </div>
      </main>
      
      <Footer />
    </>
  );
};

export default BookingFlow;
