import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { format } from 'date-fns';

interface CalendarHeaderProps {
  currentDate: Date;
  onPrevMonth: () => void;
  onNextMonth: () => void;
}

const CalendarHeader: React.FC<CalendarHeaderProps> = ({
  currentDate,
  onPrevMonth,
  onNextMonth,
}) => {
  return (
    <div className="calendar-header">
      <button onClick={onPrevMonth} className="nav-button">
        <ChevronLeft size={20} />
      </button>
      <h1 className="month-year">
        {format(currentDate, 'MMMM yyyy')}
      </h1>
      <button onClick={onNextMonth} className="nav-button">
        <ChevronRight size={20} />
      </button>
    </div>
  );
};

export default CalendarHeader;