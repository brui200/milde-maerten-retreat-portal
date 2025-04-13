
import React, { useState, useEffect } from 'react';
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem
} from '@/components/ui/carousel';

interface HeroSliderProps {
  images: string[];
  interval?: number;
  className?: string;
}

const HeroSlider: React.FC<HeroSliderProps> = ({ 
  images,
  interval = 5000,
  className = ""
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // Set up automatic sliding
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, interval);

    // Clear timer on component unmount
    return () => clearInterval(timer);
  }, [images.length, interval]);

  if (!images || images.length === 0) {
    return null;
  }

  return (
    <div className={`relative w-full h-full ${className}`}>
      <Carousel
        className="w-full h-full"
        opts={{
          loop: true,
          align: "start",
          skipSnaps: true,
          startIndex: currentIndex,
        }}
      >
        <CarouselContent className="h-full">
          {images.map((image, index) => (
            <CarouselItem 
              key={index} 
              className="h-full w-full relative"
            >
              <div
                className="absolute inset-0 w-full h-full transition-opacity duration-1000"
                style={{
                  backgroundImage: `url(${image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat',
                }}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
};

export default HeroSlider;
