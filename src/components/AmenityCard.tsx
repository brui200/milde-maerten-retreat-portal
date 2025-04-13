
import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Amenity } from '@/data/hotelData';

interface AmenityCardProps {
  amenity: Amenity;
}

const AmenityCard: React.FC<AmenityCardProps> = ({ amenity }) => {
  const { language } = useLanguage();
  
  return (
    <div className="group relative overflow-hidden rounded-sm">
      {/* Image */}
      <div className="aspect-[3/2] overflow-hidden">
        <img 
          src={amenity.image} 
          alt={amenity.name[language as keyof typeof amenity.name]}
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
        />
      </div>
      
      {/* Content */}
      <div className="p-6 bg-white">
        <h3 className="text-xl font-serif mb-2">
          {amenity.name[language as keyof typeof amenity.name]}
        </h3>
        <p className="text-sm text-muted-foreground">
          {amenity.description[language as keyof typeof amenity.description]}
        </p>
      </div>
    </div>
  );
};

export default AmenityCard;
