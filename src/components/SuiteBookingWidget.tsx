
import React from 'react';
import { Suite } from '@/data/hotelData';
import AirbnbStyleBookingCard from './AirbnbStyleBookingCard';

interface SuiteBookingWidgetProps {
  suite: Suite;
}

const SuiteBookingWidget: React.FC<SuiteBookingWidgetProps> = ({ suite }) => {
  return (
    <div className="sticky top-24">
      <AirbnbStyleBookingCard suite={suite} showDetailsButton={false} />
    </div>
  );
};

export default SuiteBookingWidget;
