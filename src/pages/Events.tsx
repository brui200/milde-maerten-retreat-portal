
import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/context/LanguageContext';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';

const Events = () => {
  const { t } = useLanguage();
  
  return (
    <>
      <Navbar />
      
      <main>
        {/* Hero Section */}
        <Hero 
          title={t('events.title')} 
          subtitle={t('events.subtitle')} 
          fullHeight={false}
          backgroundImage="/lovable-uploads/14c256fa-1d3d-42d8-9029-9c0b5d0bb551.png"
        />
        
        {/* Church Venue Details */}
        <section className="section-padding bg-white">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-serif mb-4">{t('events.church.title')}</h2>
                <p className="text-muted-foreground mb-6">{t('events.church.description')}</p>
                
                <div className="space-y-6 mb-8">
                  {/* Capacity and Features */}
                  <div>
                    <h3 className="text-xl font-serif mb-2">Capacity & Features</h3>
                    <ul className="space-y-2 text-muted-foreground">
                      <li className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-hotel-brown rounded-full"></div>
                        <span>Seated capacity: 150 guests</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-hotel-brown rounded-full"></div>
                        <span>Standing reception: 200 guests</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-hotel-brown rounded-full"></div>
                        <span>Professional sound system</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-hotel-brown rounded-full"></div>
                        <span>Modern lighting system</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-hotel-brown rounded-full"></div>
                        <span>Catering facilities</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-hotel-brown rounded-full"></div>
                        <span>Fully accessible</span>
                      </li>
                    </ul>
                  </div>
                  
                  {/* Event Types */}
                  <div>
                    <h3 className="text-xl font-serif mb-2">Perfect For</h3>
                    <ul className="space-y-2 text-muted-foreground">
                      <li className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-hotel-brown rounded-full"></div>
                        <span>Weddings & Ceremonies</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-hotel-brown rounded-full"></div>
                        <span>Conferences & Corporate Events</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-hotel-brown rounded-full"></div>
                        <span>Concerts & Musical Performances</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-hotel-brown rounded-full"></div>
                        <span>Art Exhibitions</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-hotel-brown rounded-full"></div>
                        <span>Private Celebrations</span>
                      </li>
                    </ul>
                  </div>
                </div>
                
                <Link to="/contact">
                  <Button className="btn-primary">{t('events.inquire')}</Button>
                </Link>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <img 
                  src="/lovable-uploads/70a83751-a5b6-48f6-9562-dda2ddc2d508.png" 
                  alt="Garden view" 
                  className="w-full h-auto object-cover rounded-sm"
                />
                <img 
                  src="/lovable-uploads/da579815-7db1-4a99-baf5-d241d4fcc53c.png" 
                  alt="Hotel facade" 
                  className="w-full h-auto object-cover rounded-sm"
                />
                <img 
                  src="/lovable-uploads/14c256fa-1d3d-42d8-9029-9c0b5d0bb551.png" 
                  alt="Garden seating area" 
                  className="w-full h-auto object-cover rounded-sm"
                />
                <img 
                  src="/lovable-uploads/70a83751-a5b6-48f6-9562-dda2ddc2d508.png" 
                  alt="Garden landscape" 
                  className="w-full h-auto object-cover rounded-sm"
                />
              </div>
            </div>
          </div>
        </section>
        
        {/* Event Packages */}
        <section className="section-padding bg-hotel-beige">
          <div className="container-custom">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-serif mb-4">Event Packages</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                We offer various packages to meet your event needs. Each package can be customized to your specific requirements.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Wedding Package */}
              <div className="bg-white p-8 rounded-sm shadow-md">
                <h3 className="text-xl font-serif mb-4">Wedding Package</h3>
                <ul className="space-y-2 text-muted-foreground mb-8">
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-hotel-brown rounded-full"></div>
                    <span>Exclusive use of church venue</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-hotel-brown rounded-full"></div>
                    <span>Garden reception area</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-hotel-brown rounded-full"></div>
                    <span>Catering for up to 100 guests</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-hotel-brown rounded-full"></div>
                    <span>Wedding coordinator</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-hotel-brown rounded-full"></div>
                    <span>Sound and lighting</span>
                  </li>
                </ul>
                <Link to="/contact">
                  <Button className="btn-secondary w-full">{t('events.inquire')}</Button>
                </Link>
              </div>
              
              {/* Conference Package */}
              <div className="bg-white p-8 rounded-sm shadow-md">
                <h3 className="text-xl font-serif mb-4">Conference Package</h3>
                <ul className="space-y-2 text-muted-foreground mb-8">
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-hotel-brown rounded-full"></div>
                    <span>Church venue setup for presentations</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-hotel-brown rounded-full"></div>
                    <span>AV equipment and tech support</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-hotel-brown rounded-full"></div>
                    <span>Coffee breaks and lunch</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-hotel-brown rounded-full"></div>
                    <span>Wi-Fi and stationery</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-hotel-brown rounded-full"></div>
                    <span>Event coordinator</span>
                  </li>
                </ul>
                <Link to="/contact">
                  <Button className="btn-secondary w-full">{t('events.inquire')}</Button>
                </Link>
              </div>
              
              {/* Concert Package */}
              <div className="bg-white p-8 rounded-sm shadow-md">
                <h3 className="text-xl font-serif mb-4">Concert Package</h3>
                <ul className="space-y-2 text-muted-foreground mb-8">
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-hotel-brown rounded-full"></div>
                    <span>Professional sound system</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-hotel-brown rounded-full"></div>
                    <span>Stage lighting</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-hotel-brown rounded-full"></div>
                    <span>Backstage area</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-hotel-brown rounded-full"></div>
                    <span>Ticket management</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-hotel-brown rounded-full"></div>
                    <span>Bar service</span>
                  </li>
                </ul>
                <Link to="/contact">
                  <Button className="btn-secondary w-full">{t('events.inquire')}</Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </>
  );
};

export default Events;
