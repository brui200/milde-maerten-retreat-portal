
import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/context/LanguageContext';
import { Button } from '@/components/ui/button';

interface HeroProps {
  backgroundImage?: string;
  title?: string;
  subtitle?: string;
  ctaText?: string;
  ctaLink?: string;
  fullHeight?: boolean;
}

const Hero: React.FC<HeroProps> = ({
  backgroundImage = "/lovable-uploads/70a83751-a5b6-48f6-9562-dda2ddc2d508.png",
  title,
  subtitle,
  ctaText,
  ctaLink = "/booking",
  fullHeight = true
}) => {
  const { t } = useLanguage();
  
  return (
    <div 
      className={`relative w-full ${fullHeight ? 'h-screen' : 'h-[60vh]'} flex items-center`}
      style={{ 
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Overlay with reduced opacity for better image visibility */}
      <div className="absolute inset-0 bg-black/30"></div>
      
      {/* Content with improved contrast */}
      <div className="container-custom relative z-10 text-white">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-white">
            {title || t('home.hero.title')}
          </h1>
          <p className="mt-4 text-lg md:text-xl text-white">
            {subtitle || t('home.hero.subtitle')}
          </p>
          {ctaText && (
            <Link to={ctaLink}>
              <Button className="mt-8 px-6 py-3 bg-white text-hotel-charcoal hover:bg-hotel-cream transition-colors duration-200">
                {ctaText}
              </Button>
            </Link>
          )}
        </div>
      </div>
      
      {/* Scroll down indicator for full height hero */}
      {fullHeight && (
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-8 h-12 border-2 border-white rounded-full flex justify-center pt-1">
            <div className="w-1 h-3 bg-white rounded-full"></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Hero;
