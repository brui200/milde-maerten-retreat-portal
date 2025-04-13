
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
import { useToast } from '@/components/ui/use-toast';
import { format, addDays } from 'date-fns';
import { CalendarIcon, Loader2 } from 'lucide-react';

const BookingForm = () => {
  const { t, language } = useLanguage();
  const location = useLocation();
  const { toast } = useToast();
  
  const queryParams = new URLSearchParams(location.search);
  const suiteParam = queryParams.get('suite');
  
  const [checkInDate, setCheckInDate] = useState<Date | undefined>(undefined);
  const [checkOutDate, setCheckOutDate] = useState<Date | undefined>(undefined);
  const [guests, setGuests] = useState<string>("2");
  const [selectedSuite, setSelectedSuite] = useState<string>(suiteParam || "");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [specialRequests, setSpecialRequests] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  
  // Set min checkout date one day after checkin
  const minCheckoutDate = checkInDate ? addDays(checkInDate, 1) : undefined;
  
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
    
    // Simulate form submission
    setIsSubmitting(true);
    
    // In a real application, you would send this data to a backend
    setTimeout(() => {
      setIsSubmitting(false);
      
      // Success message
      toast({
        title: "Booking Confirmed",
        description: t('booking.success'),
      });
      
      // Reset form
      setCheckInDate(undefined);
      setCheckOutDate(undefined);
      setGuests("2");
      setSelectedSuite("");
      setFirstName("");
      setLastName("");
      setEmail("");
      setPhone("");
      setSpecialRequests("");
    }, 1500);
  };
  
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
            t('booking.confirm')
          )}
        </Button>
      </form>
    </div>
  );
};

export default BookingForm;
