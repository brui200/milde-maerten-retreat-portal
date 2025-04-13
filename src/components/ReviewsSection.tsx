
import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { reviews, suites } from '@/data/hotelData';
import ReviewCard from '@/components/ReviewCard';
import StarRating from '@/components/StarRating';
import { Button } from '@/components/ui/button';

const ReviewsSection: React.FC = () => {
  const { t } = useLanguage();
  const [activeSuiteId, setActiveSuiteId] = useState<string | null>(null);
  
  // Calculate average rating for all reviews
  const averageRating = reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length;
  
  // Filter reviews by selected suite or show all if none selected
  const filteredReviews = activeSuiteId 
    ? reviews.filter(review => review.suiteId === activeSuiteId)
    : reviews;
  
  return (
    <section className="section-padding bg-apple-silver">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-medium mb-2">
            {t('home.reviews.title')}
          </h2>
          
          <div className="flex justify-center mb-4">
            <StarRating 
              rating={averageRating} 
              size={24}
              className="mx-auto"
            />
          </div>
          
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t('home.reviews.description')}
          </p>
        </div>
        
        {/* Suite filter buttons */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          <Button
            variant={activeSuiteId === null ? "default" : "outline"}
            className={activeSuiteId === null ? "btn-primary" : ""}
            onClick={() => setActiveSuiteId(null)}
          >
            {t('home.reviews.allReviews')}
          </Button>
          
          {suites.map(suite => (
            <Button
              key={suite.id}
              variant={activeSuiteId === suite.id ? "default" : "outline"}
              className={activeSuiteId === suite.id ? "btn-primary" : ""}
              onClick={() => setActiveSuiteId(suite.id)}
            >
              {suite.name}
            </Button>
          ))}
        </div>
        
        {/* Reviews grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredReviews.map(review => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ReviewsSection;
