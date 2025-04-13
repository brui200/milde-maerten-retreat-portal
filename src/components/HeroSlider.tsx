
import React, { useState, useEffect } from 'react';

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
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    // Set up automatic sliding
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        const newIndex = prevIndex === images.length - 1 ? 0 : prevIndex + 1;
        setActiveIndex(newIndex);
        return newIndex;
      });
    }, interval);

    // Clear timer on component unmount
    return () => clearInterval(timer);
  }, [images.length, interval]);

  if (!images || images.length === 0) {
    return null;
  }

  return (
    <div className={`relative w-full h-full overflow-hidden ${className}`}>
      {images.map((image, index) => (
        <div
          key={index}
          className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ${
            index === activeIndex ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            backgroundImage: `url(${image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        />
      ))}
    </div>
  );
};

export default HeroSlider;
