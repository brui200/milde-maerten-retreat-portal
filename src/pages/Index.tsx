import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import SuiteCard from '@/components/SuiteCard';
import AmenityCard from '@/components/AmenityCard';
import EventsSection from '@/components/EventsSection';
import ReviewsSection from '@/components/ReviewsSection';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { suites, amenities } from '@/data/hotelData';

const Index = () => {
  const { t } = useLanguage();
  
  // Show all suites on the homepage instead of just the first 3
  const featuredAmenities = amenities.slice(0, 3);
  
  // Hero images remain the same
  const heroImages = [
    "/lovable-uploads/70a83751-a5b6-48f6-9562-dda2ddc2d508.png",
    "/lovable-uploads/14c256fa-1d3d-42d8-9029-9c0b5d0bb551.png",
    "/lovable-uploads/da579815-7db1-4a99-baf5-d241d4fcc53c.png"
  ];
  
  return (
    <>
      <Navbar />
      
      <main>
        {/* Hero Section with image slider */}
        <Hero 
          backgroundImages={heroImages}
          title={t('home.hero.title')} 
          subtitle={t('home.hero.subtitle')} 
          ctaText={t('home.hero.cta')} 
          ctaLink="/booking"
        />
        
        {/* About Section */}
        <section className="section-padding bg-white">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-medium mb-4 font-playfair">{t('home.about.title')}</h2>
              <p className="text-muted-foreground max-w-xl mx-auto text-justify">{t('home.about.description')}</p>
            </div>
          </div>
        </section>
        
        {/* Suites Section */}
        <section className="section-padding bg-apple-silver">
          <div className="container-custom">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-medium mb-4 font-playfair">{t('home.suites.title')}</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto text-justify">{t('home.suites.description')}</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {suites.map((suite) => (
                <SuiteCard key={suite.id} suite={suite} />
              ))}
            </div>
            
            {/* Removed 'View All Suites' button */}
          </div>
        </section>
        
        {/* Reviews Section */}
        <ReviewsSection />
        
        {/* Amenities Section */}
        <section className="section-padding bg-white">
          <div className="container-custom">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-medium mb-4 font-playfair">{t('home.amenities.title')}</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto text-justify">{t('home.amenities.description')}</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {featuredAmenities.map((amenity) => (
                <AmenityCard key={amenity.id} amenity={amenity} />
              ))}
            </div>
            
            <div className="text-center mt-12">
              <Link to="/amenities">
                <Button className="btn-secondary">{t('home.amenities.viewAll')}</Button>
              </Link>
            </div>
          </div>
        </section>
        
        {/* Events Section */}
        <EventsSection />
      </main>
      
      <Footer />
    </>
  );
};

export default Index;
