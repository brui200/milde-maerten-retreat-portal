
import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import SuiteCard from '@/components/SuiteCard';
import Footer from '@/components/Footer';
import { suites } from '@/data/hotelData';

const Suites = () => {
  const { t } = useLanguage();
  
  return (
    <>
      <Navbar />
      
      <main>
        {/* Hero Section */}
        <Hero 
          title={t('suites.title')} 
          subtitle={t('suites.subtitle')} 
          fullHeight={false}
          backgroundImage="/lovable-uploads/da579815-7db1-4a99-baf5-d241d4fcc53c.png"
        />
        
        {/* Suites Grid */}
        <section className="section-padding bg-white">
          <div className="container-custom">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {suites.map((suite) => (
                <SuiteCard key={suite.id} suite={suite} />
              ))}
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </>
  );
};

export default Suites;
