
import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/context/LanguageContext';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import SuiteCard from '@/components/SuiteCard';
import AmenityCard from '@/components/AmenityCard';
import EventsSection from '@/components/EventsSection';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { suites, amenities } from '@/data/hotelData';

const Index = () => {
  const { t } = useLanguage();
  
  // Only show first 3 suites and amenities on homepage
  const featuredSuites = suites.slice(0, 3);
  const featuredAmenities = amenities.slice(0, 3);
  
  return (
    <>
      <Navbar />
      
      <main>
        {/* Hero Section */}
        <Hero 
          title={t('home.hero.title')} 
          subtitle={t('home.hero.subtitle')} 
          ctaText={t('home.hero.cta')} 
          ctaLink="/booking"
        />
        
        {/* About Section */}
        <section className="section-padding bg-white">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-serif mb-4">{t('home.about.title')}</h2>
              <p className="text-muted-foreground">{t('home.about.description')}</p>
            </div>
          </div>
        </section>
        
        {/* Suites Section */}
        <section className="section-padding bg-hotel-beige">
          <div className="container-custom">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-serif mb-4">{t('home.suites.title')}</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">{t('home.suites.description')}</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredSuites.map((suite) => (
                <SuiteCard key={suite.id} suite={suite} />
              ))}
            </div>
            
            <div className="text-center mt-12">
              <Link to="/suites">
                <Button className="btn-secondary">{t('home.suites.viewAll')}</Button>
              </Link>
            </div>
          </div>
        </section>
        
        {/* Amenities Section */}
        <section className="section-padding bg-white">
          <div className="container-custom">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-serif mb-4">{t('home.amenities.title')}</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">{t('home.amenities.description')}</p>
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
