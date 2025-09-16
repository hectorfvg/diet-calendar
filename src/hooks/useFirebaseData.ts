import { useState, useEffect } from 'react';
import { CalendarData, Meal } from '../types';
import { calendarService } from '../services/calendarService';
import { mealService } from '../services/mealService';

export const useFirebaseData = () => {
  const [calendarData, setCalendarData] = useState<CalendarData>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Carregar dades del calendari en iniciar
  useEffect(() => {
    loadCalendarData();
  }, []);

  const loadCalendarData = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await calendarService.getCalendarData();
      setCalendarData(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error carregant dades');
      console.error('Error loading calendar data:', err);
    } finally {
      setLoading(false);
    }
  };

  const updateMealInDay = async (
    date: string,
    mealType: 'breakfast' | 'lunch' | 'dinner',
    meal: Meal | null
  ) => {
    try {
      // Actualitzar Firebase
      await calendarService.updateMealInDay(date, mealType, meal);
      
      // Actualitzar estat local
      setCalendarData(prev => ({
        ...prev,
        [date]: {
          date,
          breakfast: prev[date]?.breakfast || null,
          lunch: prev[date]?.lunch || null,
          dinner: prev[date]?.dinner || null,
          [mealType]: meal
        }
      }));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error actualitzant àpat');
      console.error('Error updating meal:', err);
      throw err;
    }
  };

  const createMeal = async (mealData: Omit<Meal, 'id'>): Promise<string> => {
    try {
      const mealId = await mealService.createMeal(mealData);
      return mealId;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error creant àpat');
      console.error('Error creating meal:', err);
      throw err;
    }
  };

  return {
    calendarData,
    loading,
    error,
    loadCalendarData,
    updateMealInDay,
    createMeal
  };
};