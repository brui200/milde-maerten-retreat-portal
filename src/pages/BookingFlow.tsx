
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { suites } from '@/data/hotelData';
import { useLanguage } from '@/context/LanguageContext';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { ChevronRight, Users, Square, Check } from 'lucide-react';

const BookingFlow = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [selectedSuite, setSelectedSuite] = useState<string | null>(null);
  
  const handleContinue = () => {
    if (selectedSuite) {
      navigate(`/booking?suite=${selectedSuite}`);
    }
  };
  
  return (
    <>
      <Navbar />
      
      <main className="pt-24 pb-20 bg-hotel-beige min-h-screen">
        <div className="container-custom max-w-5xl">
          <div className="mb-8 text-center">
            <h1 className="text-3xl md:text-4xl font-medium font-playfair mb-3">
              {t('booking.selectSuite')}
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {t('booking.selectSuiteDescription')}
            </p>
          </div>
          
          {/* Booking steps */}
          <div className="flex items-center justify-center mb-10 text-sm">
            <div className="flex items-center">
              <div className="h-8 w-8 rounded-full bg-primary text-white flex items-center justify-center">
                1
              </div>
              <span className="ml-2 font-medium">{t('booking.selectSuiteShort')}</span>
            </div>
            <ChevronRight className="mx-3 text-muted-foreground" size={16} />
            <div className="flex items-center opacity-50">
              <div className="h-8 w-8 rounded-full border border-muted-foreground flex items-center justify-center">
                2
              </div>
              <span className="ml-2">{t('booking.chooseDates')}</span>
            </div>
            <ChevronRight className="mx-3 text-muted-foreground opacity-50" size={16} />
            <div className="flex items-center opacity-50">
              <div className="h-8 w-8 rounded-full border border-muted-foreground flex items-center justify-center">
                3
              </div>
              <span className="ml-2">{t('booking.payment')}</span>
            </div>
          </div>
          
          {/* Suite options */}
          <div className="space-y-6 mb-8">
            {suites.map((suite) => (
              <Card 
                key={suite.id}
                className={`p-0 overflow-hidden transition-all duration-300 hover:shadow-md ${
                  selectedSuite === suite.id ? 'ring-2 ring-primary' : ''
                }`}
                onClick={() => setSelectedSuite(suite.id)}
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
                        <span>{suite.capacity} {suite.capacity === 1 ? t('suites.guest') : t('suites.guests')}</span>
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
                  </div>
                </div>
              </Card>
            ))}
          </div>
          
          {/* Continue button */}
          <div className="flex justify-end">
            <Button 
              onClick={handleContinue} 
              disabled={!selectedSuite}
              className="btn-primary"
            >
              {t('booking.continueToDateSelection')}
              <ChevronRight size={16} />
            </Button>
          </div>
        </div>
      </main>
      
      <Footer />
    </>
  );
};

export default BookingFlow;
