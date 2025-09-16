import React, { useState } from 'react';
import './App.css';
import Navigation from './components/Navigation';
import CalendarHeader from './components/CalendarHeader';
import CalendarGrid from './components/CalendarGrid';
import DayDetailOverlay from './components/DayDetailOverlay';
import ShoppingList from './components/ShoppingList';
import { getCalendarDays } from './utils/dateUtils';
import { mockCalendarData } from './utils/mockData';
import { CalendarData, Meal, TabType } from './types';
import { addMonths, subMonths } from 'date-fns';

function App() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [calendarData, setCalendarData] = useState<CalendarData>(mockCalendarData);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<TabType>('calendar');

  const days = getCalendarDays(currentDate);

  const handlePrevMonth = () => {
    setCurrentDate(subMonths(currentDate, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(addMonths(currentDate, 1));
  };

  const handleDayClick = (date: string) => {
    setSelectedDate(date);
  };

  const handleCloseOverlay = () => {
    setSelectedDate(null);
  };

  const handleSaveMeal = (mealType: 'breakfast' | 'lunch' | 'dinner', meal: Meal) => {
    if (!selectedDate) return;

    setCalendarData(prev => {
      const updatedData = { ...prev };
      if (!updatedData[selectedDate]) {
        updatedData[selectedDate] = {
          date: selectedDate,
          breakfast: null,
          lunch: null,
          dinner: null,
        };
      }
      updatedData[selectedDate] = {
        ...updatedData[selectedDate],
        [mealType]: meal,
      };
      return updatedData;
    });
  };

  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);
    setSelectedDate(null);
  };

  const handleMonthChange = (date: Date) => {
    setCurrentDate(date);
  };

  return (
    <div className="App">
      <div className="app-container">
        <Navigation activeTab={activeTab} onTabChange={handleTabChange} />
        
        {activeTab === 'calendar' ? (
          <div className="calendar-container">
            <CalendarHeader
              currentDate={currentDate}
              onPrevMonth={handlePrevMonth}
              onNextMonth={handleNextMonth}
            />
            <CalendarGrid
              days={days}
              currentMonth={currentDate}
              calendarData={calendarData}
              onDayClick={handleDayClick}
            />
            {selectedDate && (
              <DayDetailOverlay
                date={selectedDate}
                dayMeals={calendarData[selectedDate] || null}
                onClose={handleCloseOverlay}
                onSaveMeal={handleSaveMeal}
              />
            )}
          </div>
        ) : (
          <ShoppingList
            calendarData={calendarData}
            currentDate={currentDate}
            onMonthChange={handleMonthChange}
          />
        )}
      </div>
    </div>
  );
}

export default App;
