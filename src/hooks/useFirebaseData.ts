import { useState, useEffect } from 'react';
import { CalendarData, Meal } from '../types';
import { calendarService } from '../services/calendarService';
import { mealService } from '../services/mealService';
import { isFirebaseConfigured } from '../config/firebase';
import { mockCalendarData } from '../utils/mockData';

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
      
      if (isFirebaseConfigured()) {
        // Usar Firebase si està configurat
        const data = await calendarService.getCalendarData();
        setCalendarData(data);
      } else {
        // Usar dades mock si Firebase no està configurat
        setCalendarData(mockCalendarData);
      }
    } catch (err) {
      console.error('Error loading calendar data from Firebase, falling back to mock data:', err);
      setCalendarData(mockCalendarData);
      setError(null); // No mostrar error si podem usar mock data
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
      if (isFirebaseConfigured()) {
        // Usar Firebase si està configurat
        if (meal) {
          // Si l'àpat té un ID que comença amb 's' (àpat migrat), crear un nou àpat
          if (meal.id.startsWith('s')) {
            const { id, ...mealData } = meal;
            const newMealId = await mealService.createMeal(mealData);
            meal = { ...mealData, id: newMealId };
          } else {
            // Si és un àpat existent, actualitzar-lo
            await mealService.updateMeal(meal.id, meal);
          }
        }

        // Actualitzar Firebase calendari
        await calendarService.updateMealInDay(date, mealType, meal);
      } else {
        // Mode mock: només actualitzar localment
        console.warn('⚠️ Firebase not configured - changes will not persist');
      }
      
      // Actualitzar estat local (sempre)
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