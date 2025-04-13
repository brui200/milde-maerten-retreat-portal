
import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import AmenityCard from '@/components/AmenityCard';
import Footer from '@/components/Footer';
import { amenities } from '@/data/hotelData';

const Amenities = () => {
  const { t } = useLanguage();
  
  return (
    <>
      <Navbar />
      
      <main>
        {/* Hero Section */}
        <Hero 
          title={t('amenities.title')} 
          subtitle={t('amenities.subtitle')} 
          fullHeight={false}
          backgroundImage="https://images.unsplash.com/photo-1549007994-cb92caebd54b?q=80&w=2670"
        />
        
        {/* Amenities Section */}
        <section className="section-padding bg-white">
          <div className="container-custom">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
              {/* Café */}
              <div>
                <img 
                  src={amenities[0].image}
                  alt={amenities[0].name.en}
                  className="w-full h-64 object-cover mb-6 rounded-sm"
                />
                <h3 className="text-2xl font-serif mb-2">{t('amenities.cafe.title')}</h3>
                <p className="text-muted-foreground">{t('amenities.cafe.description')}</p>
                <div className="mt-4 grid grid-cols-2 gap-2 text-sm text-muted-foreground">
                  <div>
                    <strong>Hours:</strong><br />
                    Monday - Sunday: 8:00 - 18:00
                  </div>
                  <div>
                    <strong>Location:</strong><br />
                    Ground floor
                  </div>
                </div>
              </div>
              
              {/* Chocolaterie */}
              <div>
                <img 
                  src={amenities[1].image}
                  alt={amenities[1].name.en}
                  className="w-full h-64 object-cover mb-6 rounded-sm"
                />
                <h3 className="text-2xl font-serif mb-2">{t('amenities.chocolaterie.title')}</h3>
                <p className="text-muted-foreground">{t('amenities.chocolaterie.description')}</p>
                <div className="mt-4 grid grid-cols-2 gap-2 text-sm text-muted-foreground">
                  <div>
                    <strong>Hours:</strong><br />
                    Tuesday - Sunday: 10:00 - 17:00<br />
                    Monday: Closed
                  </div>
                  <div>
                    <strong>Location:</strong><br />
                    Ground floor
                  </div>
                </div>
              </div>
            </div>
            
            {/* Garden & Terrace and Church */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {/* Garden & Terrace */}
              <div>
                <img 
                  src={amenities[2].image}
                  alt={amenities[2].name.en}
                  className="w-full h-64 object-cover mb-6 rounded-sm"
                />
                <h3 className="text-2xl font-serif mb-2">{t('amenities.garden.title')}</h3>
                <p className="text-muted-foreground">{t('amenities.garden.description')}</p>
                <div className="mt-4 grid grid-cols-2 gap-2 text-sm text-muted-foreground">
                  <div>
                    <strong>Access:</strong><br />
                    Guests only: 24 hours<br />
                    Café service: 10:00 - 21:00 (weather permitting)
                  </div>
                  <div>
                    <strong>Location:</strong><br />
                    Behind the main building
                  </div>
                </div>
              </div>
              
              {/* Church Venue */}
              <div>
                <img 
                  src={amenities[3].image}
                  alt={amenities[3].name.en}
                  className="w-full h-64 object-cover mb-6 rounded-sm"
                />
                <h3 className="text-2xl font-serif mb-2">{t('events.church.title')}</h3>
                <p className="text-muted-foreground">{t('events.church.description')}</p>
                <div className="mt-4 grid grid-cols-2 gap-2 text-sm text-muted-foreground">
                  <div>
                    <strong>Capacity:</strong><br />
                    Seated events: 150 guests<br />
                    Standing reception: 200 guests
                  </div>
                  <div>
                    <strong>Bookings:</strong><br />
                    Contact us for availability and rates
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </>
  );
};

export default Amenities;
