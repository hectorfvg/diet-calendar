import React from 'react';
import { CalendarData } from '../types';
import { formatDate, isToday, isSameMonth } from '../utils/dateUtils';

interface CalendarGridProps {
  days: Date[];
  currentMonth: Date;
  calendarData: CalendarData;
  onDayClick: (date: string) => void;
}

const CalendarGrid: React.FC<CalendarGridProps> = ({
  days,
  currentMonth,
  calendarData,
  onDayClick,
}) => {
  const weekDays = ['Dll', 'Dmt', 'Dmc', 'Djo', 'Div', 'Dis', 'Dmg'];

  const getMealPreview = (dateStr: string) => {
    const dayMeals = calendarData[dateStr];
    if (!dayMeals) return null;

    const mealCount = [dayMeals.breakfast, dayMeals.lunch, dayMeals.dinner]
      .filter(meal => meal !== null).length;

    if (mealCount === 0) return null;

    return (
      <div className="meal-preview">
        <div className="meal-dots">
          {dayMeals.breakfast && <div className="meal-dot breakfast"></div>}
          {dayMeals.lunch && <div className="meal-dot lunch"></div>}
          {dayMeals.dinner && <div className="meal-dot dinner"></div>}
        </div>
        <span className="meal-count">{mealCount} àpats</span>
      </div>
    );
  };

  return (
    <div className="calendar-grid">
      <div className="weekdays">
        {weekDays.map((day) => (
          <div key={day} className="weekday">
            {day}
          </div>
        ))}
      </div>
      <div className="days-grid">
        {days.map((day) => {
          const dateStr = formatDate(day);
          const isCurrentMonth = isSameMonth(day, currentMonth);
          const isTodayDate = isToday(day);
          
          return (
            <div
              key={dateStr}
              className={`day-cell ${isCurrentMonth ? 'current-month' : 'other-month'} ${
                isTodayDate ? 'today' : ''
              }`}
              onClick={() => onDayClick(dateStr)}
            >
              <div className="day-number">
                {day.getDate()}
              </div>
              {isCurrentMonth && getMealPreview(dateStr)}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CalendarGrid;