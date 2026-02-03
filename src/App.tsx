import React, { useState } from 'react';
import './Nordic.css';
import Navigation from './components/Navigation';
import CalendarHeader from './components/CalendarHeader';
import CalendarGrid from './components/CalendarGrid';
import DayDetailScreen from './components/DayDetailScreen';
import FirebaseShoppingList from './components/FirebaseShoppingList';
import { getCalendarDays } from './utils/dateUtils';
import { CalendarData, Meal, TabType } from './types';
import { addMonths, subMonths } from 'date-fns';
import { useFirebaseData } from './hooks/useFirebaseData';

function App() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [showDayDetail, setShowDayDetail] = useState(false);
  const [activeTab, setActiveTab] = useState<TabType>('calendar');
  
  const {
    calendarData,
    loading,
    error,
    updateMealInDay,
    createMeal,
    swapMealsBetweenDays
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
    setShowDayDetail(true);
  };

  const handleBackToCalendar = () => {
    setSelectedDate(null);
    setShowDayDetail(false);
  };


  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);
    setSelectedDate(null);
    setShowDayDetail(false);
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
      <div className="app-container">
        <Navigation activeTab={activeTab} onTabChange={handleTabChange} />
        
        {activeTab === 'calendar' ? (
          showDayDetail && selectedDate ? (
            <DayDetailScreen
              date={selectedDate}
              dayData={calendarData[selectedDate] || null}
              calendarData={calendarData}
              onBack={handleBackToCalendar}
              onCreateMeal={createMeal}
              onUpdateMealInDay={updateMealInDay}
            />
          ) : (
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
                onMealMove={swapMealsBetweenDays}
              />
            </div>
          )
        ) : (
          <FirebaseShoppingList />
        )}
      </div>
    </div>
  );
}

export default App;
