import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useLanguage } from '@/context/LanguageContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import SuiteBookingWidget from '@/components/SuiteBookingWidget';
import StarRating from '@/components/StarRating';
import { suites, reviews } from '@/data/hotelData';
import { Users, Square, Wifi, Coffee, ShowerHead, Wine } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';

const SuiteDetail = () => {
  const { suiteId } = useParams<{ suiteId: string }>();
  const { t, language } = useLanguage();
  const navigate = useNavigate();
  
  const suite = suites.find((s) => s.id === suiteId);
  
  // Get reviews for this suite
  const suiteReviews = reviews.filter(review => review.suiteId === suiteId);
  
  // If suite doesn't exist, redirect to suites page
  useEffect(() => {
    if (!suite) {
      navigate('/suites');
    }
  }, [suite, navigate]);
  
  if (!suite) return null;
  
  const amenityIcons: { [key: string]: React.ReactNode } = {
    'King-size bed': <Users size={20} />,
    'Queen-size bed': <Users size={20} />,
    'Twin beds': <Users size={20} />,
    'Freestanding bathtub': <ShowerHead size={20} />,
    'Rainfall shower': <ShowerHead size={20} />,
    'Coffee machine': <Coffee size={20} />,
    'Minibar': <Wine size={20} />,
    'Smart TV': <Wifi size={20} />
  };
  
  return (
    <>
      <Navbar />
      
      <main className="pt-16 pb-20">
        {/* Hero with main image */}
        <div className="h-[50vh] relative overflow-hidden">
          <img 
            src={suite.images[0]} 
            alt={suite.name}
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="container-custom mt-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Suite Details */}
            <div className="lg:col-span-2">
              <div className="flex justify-between items-start">
                <h1 className="font-serif text-3xl mb-2">{suite.name}</h1>
                {suite.rating && (
                  <StarRating rating={suite.rating} size={20} />
                )}
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
              
              <Separator className="my-6" />
              
              <div className="prose max-w-none mb-8">
                <p className="text-lg">{suite.description[language as keyof typeof suite.description]}</p>
              </div>
              
              {/* Gallery */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                {suite.images.map((image, index) => (
                  <div key={index} className="aspect-[4/3] overflow-hidden rounded-md">
                    <img 
                      src={image} 
                      alt={`${suite.name} - ${index + 1}`}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                ))}
              </div>
              
              {/* Amenities */}
              <h2 className="font-serif text-2xl mb-4">{t('suites.amenities')}</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-y-4 mb-8">
                {suite.amenities.map((amenity, index) => (
                  <div key={index} className="flex items-center gap-2">
                    {amenityIcons[amenity] || <div className="w-5 h-5" />}
                    <span>{amenity}</span>
                  </div>
                ))}
              </div>
              
              {/* Policies */}
              <h2 className="font-serif text-2xl mb-4">{t('suites.policies')}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div>
                  <h3 className="font-medium mb-2">{t('suites.checkInOut')}</h3>
                  <p className="text-muted-foreground">{t('suites.checkInTime')}: 3:00 PM</p>
                  <p className="text-muted-foreground">{t('suites.checkOutTime')}: 11:00 AM</p>
                </div>
                <div>
                  <h3 className="font-medium mb-2">{t('suites.cancellation')}</h3>
                  <p className="text-muted-foreground">{t('suites.cancellationPolicy')}</p>
                </div>
              </div>
              
              {/* Reviews */}
              {suiteReviews.length > 0 && (
                <>
                  <h2 className="font-serif text-2xl mb-4">{t('suites.reviews')}</h2>
                  <div className="space-y-6 mb-8">
                    {suiteReviews.map(review => (
                      <div key={review.id} className="bg-apple-silver p-4 rounded-md">
                        <div className="flex items-start gap-4">
                          <img 
                            src={review.avatar} 
                            alt={review.author}
                            className="w-10 h-10 rounded-full object-cover"
                          />
                          <div>
                            <div className="flex items-center gap-2">
                              <h4 className="font-medium">{review.author}</h4>
                              <StarRating rating={review.rating} size={14} />
                            </div>
                            <p className="text-sm text-muted-foreground mt-1">
                              {review.content[language as keyof typeof review.content]}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
            
            {/* Booking Widget */}
            <div className="lg:col-span-1">
              <SuiteBookingWidget suite={suite} />
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </>
  );
};

export default SuiteDetail;
