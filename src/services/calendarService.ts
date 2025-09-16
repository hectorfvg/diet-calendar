import { 
  collection, 
  doc, 
  getDocs, 
  getDoc, 
  setDoc, 
  updateDoc, 
  query, 
  where,
  orderBy 
} from 'firebase/firestore';
import { db } from '../config/firebase';
import { DayMeals, CalendarData } from '../types';

const CALENDAR_COLLECTION = 'calendar';

export const calendarService = {
  // Obtenir tot el calendari
  async getCalendarData(): Promise<CalendarData> {
    try {
      const querySnapshot = await getDocs(collection(db, CALENDAR_COLLECTION));
      const calendarData: CalendarData = {};
      
      querySnapshot.docs.forEach(doc => {
        calendarData[doc.id] = {
          date: doc.id,
          ...doc.data()
        } as DayMeals;
      });
      
      return calendarData;
    } catch (error) {
      console.error('Error getting calendar data:', error);
      throw error;
    }
  },

  // Obtenir àpats d'un dia específic
  async getDayMeals(date: string): Promise<DayMeals | null> {
    try {
      const docRef = doc(db, CALENDAR_COLLECTION, date);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        return {
          date,
          ...docSnap.data()
        } as DayMeals;
      }
      return null;
    } catch (error) {
      console.error('Error getting day meals:', error);
      throw error;
    }
  },

  // Actualitzar àpats d'un dia
  async updateDayMeals(date: string, dayMeals: Omit<DayMeals, 'date'>): Promise<void> {
    try {
      const docRef = doc(db, CALENDAR_COLLECTION, date);
      await setDoc(docRef, dayMeals, { merge: true });
    } catch (error) {
      console.error('Error updating day meals:', error);
      throw error;
    }
  },

  // Actualitzar un àpat específic d'un dia
  async updateMealInDay(
    date: string, 
    mealType: 'breakfast' | 'lunch' | 'dinner', 
    meal: any
  ): Promise<void> {
    try {
      const docRef = doc(db, CALENDAR_COLLECTION, date);
      await updateDoc(docRef, {
        [mealType]: meal
      });
    } catch (error) {
      console.error('Error updating meal in day:', error);
      throw error;
    }
  },

  // Obtenir calendari per un rang de dates
  async getCalendarRange(startDate: string, endDate: string): Promise<CalendarData> {
    try {
      const q = query(
        collection(db, CALENDAR_COLLECTION),
        where('date', '>=', startDate),
        where('date', '<=', endDate),
        orderBy('date')
      );
      
      const querySnapshot = await getDocs(q);
      const calendarData: CalendarData = {};
      
      querySnapshot.docs.forEach(doc => {
        calendarData[doc.id] = {
          date: doc.id,
          ...doc.data()
        } as DayMeals;
      });
      
      return calendarData;
    } catch (error) {
      console.error('Error getting calendar range:', error);
      throw error;
    }
  }
};