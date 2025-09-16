import React, { useState } from 'react';
import './App.css';
import Navigation from './components/Navigation';
import CalendarHeader from './components/CalendarHeader';
import CalendarGrid from './components/CalendarGrid';
import DayDetailOverlay from './components/DayDetailOverlay';
import ShoppingList from './components/ShoppingList';
import FirebaseDebug from './components/FirebaseDebug';
import { getCalendarDays } from './utils/dateUtils';
import { CalendarData, Meal, TabType } from './types';
import { addMonths, subMonths } from 'date-fns';
import { useFirebaseData } from './hooks/useFirebaseData';

function App() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<TabType>('calendar');
  
  const { 
    calendarData, 
    loading, 
    error, 
    updateMealInDay,
    createMeal 
  } = useFirebaseData();

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

  const handleSaveMeal = async (mealType: 'breakfast' | 'lunch' | 'dinner', meal: Meal) => {
    if (!selectedDate) return;

    try {
      await updateMealInDay(selectedDate, mealType, meal);
    } catch (error) {
      console.error('Error saving meal:', error);
      // Aquí podries mostrar un missatge d'error a l'usuari
    }
  };

  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);
    setSelectedDate(null);
  };

  const handleMonthChange = (date: Date) => {
    setCurrentDate(date);
  };

  if (loading) {
    return (
      <div className="App">
        <div className="app-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
          <div>⏳ Carregant dades del calendari...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="App">
        <div className="app-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
          <div style={{ color: 'red' }}>❌ Error: {error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="App">
      <FirebaseDebug />
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
