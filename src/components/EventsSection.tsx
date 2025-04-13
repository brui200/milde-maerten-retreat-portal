
import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/context/LanguageContext';
import { Button } from '@/components/ui/button';

interface EventsSectionProps {
  alternative?: boolean;
}

const EventsSection: React.FC<EventsSectionProps> = ({ alternative = false }) => {
  const { t } = useLanguage();
  
  return (
    <section className={`py-20 ${alternative ? 'bg-hotel-beige' : 'bg-white'}`}>
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <div className={`${alternative ? 'order-1 md:order-1' : 'order-1 md:order-2'}`}>
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1623170095789-a1d37891e67e?q=80&w=2574" 
                alt="Church Venue" 
                className="w-full h-auto object-cover rounded-sm shadow-xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent rounded-sm"></div>
            </div>
          </div>
          
          {/* Content */}
          <div className={`${alternative ? 'order-2 md:order-2' : 'order-2 md:order-1'}`}>
            <h2 className="text-3xl md:text-4xl font-serif mb-4">{t('home.events.title')}</h2>
            <p className="text-muted-foreground mb-6">{t('events.church.description')}</p>
            <ul className="mb-8 space-y-2">
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-hotel-brown rounded-full"></div>
                <span>Weddings & Ceremonies</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-hotel-brown rounded-full"></div>
                <span>Conferences & Meetings</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-hotel-brown rounded-full"></div>
                <span>Concerts & Performances</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-hotel-brown rounded-full"></div>
                <span>Private Celebrations</span>
              </li>
            </ul>
            <Link to="/events">
              <Button className={alternative ? "btn-primary" : "btn-secondary"}>
                {t('home.events.learnMore')}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EventsSection;
