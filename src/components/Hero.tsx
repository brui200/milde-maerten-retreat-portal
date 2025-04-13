
import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/context/LanguageContext';
import { Button } from '@/components/ui/button';
import HeroSlider from './HeroSlider';

interface HeroProps {
  backgroundImage?: string;
  backgroundImages?: string[];
  title?: string;
  subtitle?: string;
  ctaText?: string;
  ctaLink?: string;
  fullHeight?: boolean;
}

const Hero: React.FC<HeroProps> = ({
  backgroundImage = "/lovable-uploads/70a83751-a5b6-48f6-9562-dda2ddc2d508.png",
  backgroundImages,
  title,
  subtitle,
  ctaText,
  ctaLink = "/booking-flow",
  fullHeight = true
}) => {
  const { t } = useLanguage();
  
  // Use backgroundImages if provided, otherwise create an array with the single backgroundImage
  const images = backgroundImages || [backgroundImage];
  
  return (
    <div className={`relative w-full ${fullHeight ? 'h-screen' : 'h-[60vh]'}`}>
      {/* Image slider */}
      <HeroSlider images={images} className="absolute inset-0" />
      
      {/* Overlay with reduced opacity for better image visibility */}
      <div className="absolute inset-0 bg-black/20"></div>
      
      {/* Content with centered text overlay */}
      <div className="absolute inset-0 flex items-center justify-center z-10">
        <div className="text-center px-4 max-w-3xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium text-white font-playfair">
            {title || t('hero.title')}
          </h1>
          <p className="mt-4 text-lg md:text-xl text-white/90 max-w-xl mx-auto font-light">
            {subtitle || t('hero.subtitle')}
          </p>
          {ctaText && (
            <div className="flex justify-center mt-8">
              <Link to={ctaLink}>
                <Button className="btn-primary">
                  {ctaText}
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
      
      {/* Scroll down indicator for full height hero */}
      {fullHeight && (
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-8 h-12 border-2 border-white/70 rounded-full flex justify-center pt-1">
            <div className="w-1 h-3 bg-white/70 rounded-full"></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Hero;
