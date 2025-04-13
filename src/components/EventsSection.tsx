
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
    <section className={`py-20 ${alternative ? 'bg-apple-silver' : 'bg-white'}`}>
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <div className={`${alternative ? 'order-1 md:order-1' : 'order-1 md:order-2'}`}>
            <div className="relative">
              <img 
                src="/lovable-uploads/14c256fa-1d3d-42d8-9029-9c0b5d0bb551.png" 
                alt="Garden View" 
                className="w-full h-auto object-cover rounded-xl shadow-xl"
              />
            </div>
          </div>
          
          {/* Content */}
          <div className={`${alternative ? 'order-2 md:order-2' : 'order-2 md:order-1'}`}>
            <h2 className="text-3xl md:text-4xl font-medium mb-4">{t('home.events.title')}</h2>
            <p className="text-muted-foreground mb-6">{t('events.church.description')}</p>
            <ul className="mb-8 space-y-3">
              <li className="flex items-center gap-3">
                <div className="w-2 h-2 bg-black rounded-full"></div>
                <span>Weddings & Ceremonies</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-2 h-2 bg-black rounded-full"></div>
                <span>Conferences & Meetings</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-2 h-2 bg-black rounded-full"></div>
                <span>Concerts & Performances</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-2 h-2 bg-black rounded-full"></div>
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
