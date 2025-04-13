
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/context/LanguageContext';
import { Suite } from '@/data/hotelData';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { useToast } from '@/components/ui/use-toast';
import { CalendarIcon, Users, Square, Loader2 } from 'lucide-react';
import { addDays, differenceInDays, format } from 'date-fns';
import StarRating from '@/components/StarRating';

interface AirbnbStyleBookingCardProps {
  suite: Suite;
  initialCheckInDate?: Date;
  initialCheckOutDate?: Date;
  onDatesChange?: (checkIn: Date | undefined, checkOut: Date | undefined) => void;
  showDetailsButton?: boolean;
  compact?: boolean;
  redirectToCheckout?: boolean;
}

const AirbnbStyleBookingCard: React.FC<AirbnbStyleBookingCardProps> = ({
  suite,
  initialCheckInDate,
  initialCheckOutDate,
  onDatesChange,
  showDetailsButton = true,
  compact = false,
  redirectToCheckout = false,
}) => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [checkInDate, setCheckInDate] = useState<Date | undefined>(initialCheckInDate);
  const [checkOutDate, setCheckOutDate] = useState<Date | undefined>(initialCheckOutDate);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  
  // Set min checkout date one day after checkin
  const minCheckoutDate = checkInDate ? addDays(checkInDate, 1) : undefined;
  
  // Update dates when props change
  useEffect(() => {
    setCheckInDate(initialCheckInDate);
    setCheckOutDate(initialCheckOutDate);
  }, [initialCheckInDate, initialCheckOutDate]);
  
  // Notify parent when dates change
  useEffect(() => {
    if (onDatesChange) {
      onDatesChange(checkInDate, checkOutDate);
    }
  }, [checkInDate, checkOutDate, onDatesChange]);
  
  // Calculate total price based on the number of nights
  const calculateTotalPrice = () => {
    if (!checkInDate || !checkOutDate) return 0;
    
    const nights = differenceInDays(checkOutDate, checkInDate);
    return suite.price * nights;
  };
  
  const totalPrice = calculateTotalPrice();
  const nights = checkInDate && checkOutDate ? differenceInDays(checkOutDate, checkInDate) : 0;
  
  // Handle booking
  const handleBookNow = () => {
    if (!checkInDate || !checkOutDate) {
      toast({
        title: "Please select dates",
        description: t('selectDates'),
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    // If redirectToCheckout is true, navigate to checkout page instead of booking page
    if (redirectToCheckout) {
      setTimeout(() => {
        setIsLoading(false);
        navigate(`/checkout?suiteId=${suite.id}&checkIn=${checkInDate.toISOString()}&checkOut=${checkOutDate.toISOString()}`);
      }, 500);
    } else {
      // Navigate to booking page with selected dates (original behavior)
      setTimeout(() => {
        setIsLoading(false);
        navigate(`/booking?suite=${suite.id}&checkin=${checkInDate.toISOString()}&checkout=${checkOutDate.toISOString()}`);
      }, 500);
    }
  };
  
  // Handle check in date change
  const handleCheckInChange = (date: Date | undefined) => {
    setCheckInDate(date);
    // If checkout date is before new checkin date, reset it
    if (checkOutDate && date && checkOutDate <= date) {
      setCheckOutDate(undefined);
    }
  };
  
  return (
    <Card className={`overflow-hidden ${suite.available === false ? 'opacity-75' : ''}`}>
      <div className={`p-6 ${compact ? 'space-y-3' : 'space-y-4'}`}>
        <div className="flex justify-between items-start">
          <div>
            <h3 className={`font-playfair ${compact ? 'text-lg' : 'text-xl'}`}>{suite.name}</h3>
            {suite.rating && !compact && (
              <StarRating rating={suite.rating} size={14} className="mb-1" />
            )}
          </div>
          <div className="text-right">
            <span className="font-playfair text-xl">€{suite.price}</span>
            <span className="text-sm text-muted-foreground">/{t('night')}</span>
          </div>
        </div>
        
        {!compact && (
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Users size={16} />
              <span>{suite.capacity} {suite.capacity === 1 ? t('guest') : t('guests')}</span>
            </div>
            <div className="flex items-center gap-1">
              <Square size={16} />
              <span>{suite.size} m²</span>
            </div>
          </div>
        )}
        
        {suite.available === false ? (
          <div className="bg-muted p-4 rounded text-center text-muted-foreground">
            {t('unavailableForDates')}
          </div>
        ) : (
          <>
            <div className="border rounded-md">
              <div className="grid grid-cols-2 divide-x">
                {/* Check-in Date */}
                <div className="p-3">
                  <label className="text-xs text-muted-foreground block mb-1">{t('checkIn')}</label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="ghost"
                        className="w-full justify-start text-left p-0 h-auto font-normal hover:bg-transparent"
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
                        onSelect={handleCheckInChange}
                        initialFocus
                        disabled={(date) => date < new Date()}
                        className="p-3 pointer-events-auto"
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                
                {/* Check-out Date */}
                <div className="p-3">
                  <label className="text-xs text-muted-foreground block mb-1">{t('checkOut')}</label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="ghost"
                        className="w-full justify-start text-left p-0 h-auto font-normal hover:bg-transparent"
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
            </div>
            
            {/* Price calculation and booking button */}
            {checkInDate && checkOutDate && (
              <div className="space-y-2 mt-2">
                <div className="flex justify-between text-sm">
                  <span>€{suite.price} x {nights} {nights === 1 ? t('night') : t('nights')}</span>
                  <span>€{totalPrice}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>{t('serviceFee')}</span>
                  <span>€{Math.round(totalPrice * 0.1)}</span>
                </div>
                <div className="flex justify-between font-medium border-t pt-2">
                  <span>{t('total')}</span>
                  <span>€{totalPrice + Math.round(totalPrice * 0.1)}</span>
                </div>
              </div>
            )}
            
            <div className="flex gap-2">
              {showDetailsButton && (
                <Button 
                  variant="outline" 
                  className="flex-1"
                  onClick={() => navigate(`/suite/${suite.id}`)}
                >
                  {t('viewDetails')}
                </Button>
              )}
              
              <Button 
                className="flex-1"
                onClick={handleBookNow}
                disabled={!checkInDate || !checkOutDate || isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {t('processing')}
                  </>
                ) : (
                  t('bookNow')
                )}
              </Button>
            </div>
          </>
        )}
      </div>
    </Card>
  );
};

export default AirbnbStyleBookingCard;
