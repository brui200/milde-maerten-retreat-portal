
import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { useLocation } from 'react-router-dom';
import { suites } from '@/data/hotelData';
import { Calendar } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/components/ui/use-toast';
import { format, addDays, parseISO } from 'date-fns';
import { CalendarIcon, CreditCard, CheckCircle, Loader2 } from 'lucide-react';

const BookingForm = () => {
  const { t, language } = useLanguage();
  const location = useLocation();
  const { toast } = useToast();
  
  const queryParams = new URLSearchParams(location.search);
  const suiteParam = queryParams.get('suite');
  const checkinParam = queryParams.get('checkin');
  const checkoutParam = queryParams.get('checkout');
  const guestsParam = queryParams.get('guests');
  
  const [checkInDate, setCheckInDate] = useState<Date | undefined>(
    checkinParam ? parseISO(checkinParam) : undefined
  );
  const [checkOutDate, setCheckOutDate] = useState<Date | undefined>(
    checkoutParam ? parseISO(checkoutParam) : undefined
  );
  const [guests, setGuests] = useState<string>(guestsParam || "2");
  const [selectedSuite, setSelectedSuite] = useState<string>(suiteParam || "");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [specialRequests, setSpecialRequests] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  
  // Credit card state
  const [showPaymentDialog, setShowPaymentDialog] = useState<boolean>(false);
  const [cardNumber, setCardNumber] = useState<string>("");
  const [cardName, setCardName] = useState<string>("");
  const [cardExpiry, setCardExpiry] = useState<string>("");
  const [cardCvc, setCardCvc] = useState<string>("");
  const [isProcessingPayment, setIsProcessingPayment] = useState<boolean>(false);
  const [paymentComplete, setPaymentComplete] = useState<boolean>(false);
  
  // Set min checkout date one day after checkin
  const minCheckoutDate = checkInDate ? addDays(checkInDate, 1) : undefined;
  
  // Calculate the total price
  const calculateTotal = () => {
    if (!checkInDate || !checkOutDate || !selectedSuite) return 0;
    
    const suite = suites.find(s => s.id === selectedSuite);
    if (!suite) return 0;
    
    const days = Math.ceil((checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 3600 * 24));
    return suite.price * days;
  };
  
  // Format a credit card number with spaces
  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    
    if (parts.length) {
      return parts.join(' ');
    } else {
      return value;
    }
  };
  
  // Format card expiry date
  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    
    if (v.length > 2) {
      return `${v.substring(0, 2)}/${v.substring(2, 4)}`;
    }
    
    return v;
  };
  
  // Handle changes to credit card fields
  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedValue = formatCardNumber(e.target.value);
    setCardNumber(formattedValue.substring(0, 19)); // Limit to 16 digits + 3 spaces
  };
  
  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedValue = formatExpiryDate(e.target.value);
    setCardExpiry(formattedValue.substring(0, 5)); // Limit to MM/YY format
  };
  
  const handleCvcChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '');
    setCardCvc(value.substring(0, 3)); // Limit to 3 digits
  };
  
  // Process payment
  const processPayment = () => {
    // Validate payment form
    if (!cardNumber || cardNumber.replace(/\s/g, '').length < 16 || 
        !cardName || !cardExpiry || cardExpiry.length < 5 ||
        !cardCvc || cardCvc.length < 3) {
      toast({
        title: "Error",
        description: "Please fill in all payment details correctly.",
        variant: "destructive",
      });
      return;
    }
    
    setIsProcessingPayment(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessingPayment(false);
      setPaymentComplete(true);
      
      // Close dialog after showing success for 1.5 seconds
      setTimeout(() => {
        setShowPaymentDialog(false);
        // Clear form
        setCardNumber("");
        setCardName("");
        setCardExpiry("");
        setCardCvc("");
        
        // Show confirmation toast
        toast({
          title: "Booking Confirmed",
          description: t('booking.success'),
        });
        
        // Reset booking form
        setCheckInDate(undefined);
        setCheckOutDate(undefined);
        setGuests("2");
        setSelectedSuite("");
        setFirstName("");
        setLastName("");
        setEmail("");
        setPhone("");
        setSpecialRequests("");
        setPaymentComplete(false);
      }, 1500);
    }, 2000);
  };
  
  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!checkInDate || !checkOutDate || !firstName || !lastName || !email || !selectedSuite) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }
    
    // Open payment dialog
    setShowPaymentDialog(true);
  };
  
  useEffect(() => {
    // Auto-populate form fields if data is provided via URL
    if (suiteParam) {
      setSelectedSuite(suiteParam);
    }
  }, [suiteParam]);
  
  // Selected suite data
  const selectedSuiteData = suites.find(s => s.id === selectedSuite);
  
  return (
    <div className="max-w-3xl mx-auto">
      <h2 className="text-3xl font-serif mb-8">{t('booking.title')}</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Booking Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Check-in Date */}
          <div className="space-y-2">
            <Label htmlFor="checkin">{t('booking.checkIn')}</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left font-normal"
                  id="checkin"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {checkInDate ? format(checkInDate, 'PPP') : <span>Select date</span>}
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
            <Label htmlFor="checkout">{t('booking.checkOut')}</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left font-normal"
                  id="checkout"
                  disabled={!checkInDate}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {checkOutDate ? format(checkOutDate, 'PPP') : <span>Select date</span>}
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
          
          {/* Number of Guests */}
          <div className="space-y-2">
            <Label htmlFor="guests">{t('booking.guests')}</Label>
            <Select value={guests} onValueChange={setGuests}>
              <SelectTrigger id="guests">
                <SelectValue placeholder="Select number of guests" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">1</SelectItem>
                <SelectItem value="2">2</SelectItem>
                <SelectItem value="3">3</SelectItem>
                <SelectItem value="4">4</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          {/* Suite Selection */}
          <div className="space-y-2">
            <Label htmlFor="suite">{t('booking.selectSuite')}</Label>
            <Select value={selectedSuite} onValueChange={setSelectedSuite}>
              <SelectTrigger id="suite">
                <SelectValue placeholder="Select a suite" />
              </SelectTrigger>
              <SelectContent>
                {suites.map((suite) => (
                  <SelectItem key={suite.id} value={suite.id}>
                    {suite.name} - €{suite.price}/night
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        
        {/* Personal Information */}
        <div className="pt-4 border-t border-muted">
          <h3 className="text-xl font-serif mb-4">Personal Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* First Name */}
            <div className="space-y-2">
              <Label htmlFor="firstname">{t('booking.firstName')}</Label>
              <Input 
                id="firstname" 
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </div>
            
            {/* Last Name */}
            <div className="space-y-2">
              <Label htmlFor="lastname">{t('booking.lastName')}</Label>
              <Input 
                id="lastname" 
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </div>
            
            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email">{t('booking.email')}</Label>
              <Input 
                id="email" 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            
            {/* Phone */}
            <div className="space-y-2">
              <Label htmlFor="phone">{t('booking.phone')}</Label>
              <Input 
                id="phone" 
                type="tel" 
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            
            {/* Special Requests */}
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="specialrequests">{t('booking.specialRequests')}</Label>
              <Textarea 
                id="specialrequests" 
                className="resize-none"
                rows={4}
                value={specialRequests}
                onChange={(e) => setSpecialRequests(e.target.value)}
              />
            </div>
          </div>
        </div>
        
        {/* Price Summary */}
        {selectedSuiteData && checkInDate && checkOutDate && (
          <div className="bg-muted/50 p-4 rounded-md">
            <h3 className="font-serif text-lg mb-2">Price Summary</h3>
            <div className="space-y-1">
              <div className="flex justify-between">
                <span>
                  {selectedSuiteData.name} x {
                    Math.ceil((checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 3600 * 24))
                  } {t('suites.nights')}
                </span>
                <span>€{calculateTotal()}</span>
              </div>
              <div className="flex justify-between">
                <span>{t('booking.serviceFee')}</span>
                <span>€{Math.round(calculateTotal() * 0.1)}</span>
              </div>
              <Separator className="my-2" />
              <div className="flex justify-between font-medium">
                <span>{t('booking.total')}</span>
                <span>€{calculateTotal() + Math.round(calculateTotal() * 0.1)}</span>
              </div>
            </div>
          </div>
        )}
        
        {/* Submit Button */}
        <Button 
          type="submit" 
          className="btn-primary w-full md:w-auto px-8"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Processing...
            </>
          ) : (
            <>
              <CreditCard className="mr-2 h-4 w-4" />
              {t('booking.proceedToPayment')}
            </>
          )}
        </Button>
      </form>
      
      {/* Payment Dialog */}
      <Dialog open={showPaymentDialog} onOpenChange={setShowPaymentDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>
              {paymentComplete 
                ? "Payment Successful!" 
                : "Complete Your Payment"
              }
            </DialogTitle>
            <DialogDescription>
              {paymentComplete 
                ? "Your booking has been confirmed. Thank you for choosing Milde Maerten Hotel!" 
                : "Enter your card details to secure your reservation."
              }
            </DialogDescription>
          </DialogHeader>
          
          {paymentComplete ? (
            <div className="flex flex-col items-center py-6">
              <CheckCircle className="h-16 w-16 text-green-500 mb-4" />
              <p className="text-center">
                A confirmation email has been sent to your email address.
              </p>
            </div>
          ) : (
            <>
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="cardNumber">Card Number</Label>
                  <Input 
                    id="cardNumber" 
                    placeholder="1234 5678 9012 3456" 
                    value={cardNumber}
                    onChange={handleCardNumberChange}
                    maxLength={19}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cardName">Name on Card</Label>
                  <Input 
                    id="cardName" 
                    placeholder="John Smith" 
                    value={cardName}
                    onChange={(e) => setCardName(e.target.value)}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="cardExpiry">Expiry Date</Label>
                    <Input 
                      id="cardExpiry" 
                      placeholder="MM/YY" 
                      value={cardExpiry}
                      onChange={handleExpiryChange}
                      maxLength={5}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cardCvc">CVC</Label>
                    <Input 
                      id="cardCvc" 
                      placeholder="123" 
                      value={cardCvc}
                      onChange={handleCvcChange}
                      maxLength={3}
                    />
                  </div>
                </div>
                
                <div className="pt-2">
                  <p className="text-sm text-muted-foreground">
                    Amount to be charged: <strong>€{calculateTotal() + Math.round(calculateTotal() * 0.1)}</strong>
                  </p>
                </div>
              </div>
              <DialogFooter>
                <Button type="button" onClick={processPayment} disabled={isProcessingPayment}>
                  {isProcessingPayment ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    "Complete Payment"
                  )}
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BookingForm;
