
import React from 'react';
import { Star, StarHalf, StarOff } from 'lucide-react';

interface StarRatingProps {
  rating: number;
  maxRating?: number;
  size?: number;
  color?: string;
  className?: string;
}

const StarRating: React.FC<StarRatingProps> = ({
  rating,
  maxRating = 5,
  size = 16,
  color = "text-apple-blue",
  className = "",
}) => {
  // Create an array representing the stars
  const stars = [];
  
  // Calculate full and partial stars
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  
  // Add full stars
  for (let i = 0; i < fullStars; i++) {
    stars.push(<Star key={`star-${i}`} size={size} className={color} fill="currentColor" />);
  }
  
  // Add half star if needed
  if (hasHalfStar) {
    stars.push(<StarHalf key="star-half" size={size} className={color} fill="currentColor" />);
  }
  
  // Add empty stars
  const emptyStars = maxRating - fullStars - (hasHalfStar ? 1 : 0);
  for (let i = 0; i < emptyStars; i++) {
    stars.push(<StarOff key={`star-empty-${i}`} size={size} className="text-muted-foreground" />);
  }
  
  return (
    <div className={`flex items-center ${className}`}>
      {stars}
      <span className="ml-1 text-sm text-muted-foreground">
        {rating.toFixed(1)}
      </span>
    </div>
  );
};

export default StarRating;
