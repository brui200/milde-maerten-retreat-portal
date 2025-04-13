
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useLanguage } from '@/context/LanguageContext';
import StarRating from '@/components/StarRating';
import { Review } from '@/data/hotelData';
import { format, parseISO } from 'date-fns';

interface ReviewCardProps {
  review: Review;
}

const ReviewCard: React.FC<ReviewCardProps> = ({ review }) => {
  const { language } = useLanguage();
  
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };
  
  return (
    <Card className="h-full bg-white border-none shadow-sm hover:shadow-md transition-shadow duration-300">
      <CardContent className="p-6">
        <div className="flex items-start space-x-4">
          <Avatar className="h-10 w-10">
            <AvatarImage src={review.avatar} alt={review.author} />
            <AvatarFallback>{getInitials(review.author)}</AvatarFallback>
          </Avatar>
          
          <div className="flex-1">
            <div className="flex justify-between items-center mb-2">
              <h4 className="font-medium">{review.author}</h4>
              <span className="text-xs text-muted-foreground">
                {format(parseISO(review.date), 'MMM d, yyyy')}
              </span>
            </div>
            
            <StarRating rating={review.rating} size={14} className="mb-3" />
            
            <p className="text-sm text-muted-foreground line-clamp-4">
              {review.content[language as keyof typeof review.content]}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ReviewCard;
