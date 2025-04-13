
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/context/LanguageContext';
import { Suite } from '@/data/hotelData';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { useToast } from '@/components/ui/use-toast';
import { CalendarIcon, CreditCard, Loader2 } from 'lucide-react';
import { addDays, differenceInDays, format } from 'date-fns';

interface SuiteBookingWidgetProps {
  suite: Suite;
}

const SuiteBookingWidget: React.FC<SuiteBookingWidgetProps> = ({ suite }) => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [checkInDate, setCheckInDate] = useState<Date | undefined>(undefined);
  const [checkOutDate, setCheckOutDate] = useState<Date | undefined>(undefined);
  const [guests, setGuests] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  
  // Set min checkout date one day after checkin
  const minCheckoutDate = checkInDate ? addDays(checkInDate, 1) : undefined;
  
  // Calculate total price based on the number of nights
  const calculateTotalPrice = () => {
    if (!checkInDate || !checkOutDate) return 0;
    
    const nights = differenceInDays(checkOutDate, checkInDate);
    return suite.price * nights;
  };
  
  const totalPrice = calculateTotalPrice();
  const nights = checkInDate && checkOutDate ? differenceInDays(checkOutDate, checkInDate) : 0;
  
  // Handle reservation
  const handleReservation = () => {
    if (!checkInDate || !checkOutDate) {
      toast({
        title: "Error",
        description: t('selectDates'),
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    // Simulate processing payment
    setTimeout(() => {
      setIsLoading(false);
      
      // Redirect to booking page with pre-filled information
      navigate(`/booking?suite=${suite.id}&checkin=${checkInDate.toISOString()}&checkout=${checkOutDate.toISOString()}&guests=${guests}`);
    }, 1500);
  };
  
  return (
    <Card className="p-6 shadow-md sticky top-24">
      <div className="flex items-center justify-between mb-4">
        <div>
          <span className="font-serif text-2xl">€{suite.price}</span>
          <span className="text-muted-foreground"> / {t('night')}</span>
        </div>
        <div className="flex items-center">
          <span className="text-sm mr-1">4.9</span>
          <div className="flex text-yellow-400">
            {[1, 2, 3, 4, 5].map((star) => (
              <svg key={star} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
              </svg>
            ))}
          </div>
        </div>
      </div>
      
      <div className="border rounded-md mb-4">
        <div className="grid grid-cols-2 divide-x">
          {/* Check-in Date */}
          <div className="p-3">
            <Label htmlFor="checkin" className="text-xs text-muted-foreground">{t('checkIn')}</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="ghost"
                  className="w-full justify-start text-left p-0 h-auto font-normal hover:bg-transparent"
                  id="checkin"
                >
                  {checkInDate ? (
                    format(checkInDate, 'MMM d, yyyy')
                  ) : (
                    <span className="text-muted-foreground">{t('selectDate')}</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
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
          <div className="p-3">
            <Label htmlFor="checkout" className="text-xs text-muted-foreground">{t('checkOut')}</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="ghost"
                  className="w-full justify-start text-left p-0 h-auto font-normal hover:bg-transparent"
                  id="checkout"
                  disabled={!checkInDate}
                >
                  {checkOutDate ? (
                    format(checkOutDate, 'MMM d, yyyy')
                  ) : (
                    <span className="text-muted-foreground">{t('selectDate')}</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
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
        
        {/* Guests */}
        <div className="border-t p-3">
          <Label htmlFor="guests" className="text-xs text-muted-foreground">{t('guests')}</Label>
          <div className="flex justify-between items-center">
            <span>{t('guests')}</span>
            <div className="flex items-center">
              <Button 
                variant="outline" 
                size="icon" 
                className="h-8 w-8 rounded-full"
                onClick={() => setGuests(Math.max(1, guests - 1))}
                disabled={guests <= 1}
              >
                <span>-</span>
              </Button>
              <span className="mx-3">{guests}</span>
              <Button 
                variant="outline" 
                size="icon" 
                className="h-8 w-8 rounded-full"
                onClick={() => setGuests(Math.min(suite.capacity, guests + 1))}
                disabled={guests >= suite.capacity}
              >
                <span>+</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      <Button 
        className="w-full mb-4"
        onClick={handleReservation}
        disabled={!checkInDate || !checkOutDate || isLoading}
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            {t('processing')}
          </>
        ) : (
          t('reserveBtn')
        )}
      </Button>
      
      <Button 
        variant="outline"
        className="w-full mb-6"
        onClick={() => navigate(`/booking?suite=${suite.id}`)}
      >
        <CreditCard className="mr-2 h-4 w-4" />
        {t('checkoutDirectly')}
      </Button>
      
      {checkInDate && checkOutDate && (
        <div className="space-y-2">
          <div className="flex justify-between">
            <span>€{suite.price} x {nights} {t('nights')}</span>
            <span>€{suite.price * nights}</span>
          </div>
          <div className="flex justify-between">
            <span>{t('serviceFee')}</span>
            <span>€{Math.round(totalPrice * 0.1)}</span>
          </div>
          <div className="flex justify-between border-t pt-2 mt-2 font-medium">
            <span>{t('total')}</span>
            <span>€{totalPrice + Math.round(totalPrice * 0.1)}</span>
          </div>
        </div>
      )}
    </Card>
  );
};

export default SuiteBookingWidget;
