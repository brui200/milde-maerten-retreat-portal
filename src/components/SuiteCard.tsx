
import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/context/LanguageContext';
import { Button } from '@/components/ui/button';
import { Suite } from '@/data/hotelData';
import { Users, ArrowRight, Square } from 'lucide-react';

interface SuiteCardProps {
  suite: Suite;
}

const SuiteCard: React.FC<SuiteCardProps> = ({ suite }) => {
  const { language, t } = useLanguage();
  
  return (
    <div className="bg-white rounded-sm overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
      <div className="aspect-[4/3] overflow-hidden">
        <img 
          src={suite.images[0]} 
          alt={suite.name}
          className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
        />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-serif mb-2">{suite.name}</h3>
        <p className="text-sm text-muted-foreground mb-4">
          {suite.description[language as keyof typeof suite.description]}
        </p>
        
        <div className="flex items-center gap-4 mb-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Users size={16} />
            <span>{suite.capacity} {suite.capacity === 1 ? 'guest' : 'guests'}</span>
          </div>
          <div className="flex items-center gap-1">
            <Square size={16} />
            <span>{suite.size} m²</span>
          </div>
        </div>
        
        <div className="flex justify-between items-center pt-4 border-t border-muted">
          <div>
            <span className="font-serif text-xl">€{suite.price}</span>
            <span className="text-sm text-muted-foreground">/night</span>
          </div>
          <div className="flex gap-2">
            <Link to={`/suites/${suite.id}`}>
              <Button variant="outline" size="sm" className="gap-1">
                {t('suites.viewDetails')}
                <ArrowRight size={14} />
              </Button>
            </Link>
            <Link to={`/booking?suite=${suite.id}`}>
              <Button size="sm" className="btn-primary">
                {t('suites.book')}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuiteCard;
