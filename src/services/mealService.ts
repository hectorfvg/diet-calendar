import { 
  collection, 
  doc, 
  getDocs, 
  getDoc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where,
  orderBy 
} from 'firebase/firestore';
import { db } from '../config/firebase';
import { Meal } from '../types';

const MEALS_COLLECTION = 'meals';

export const mealService = {
  // Obtenir tots els àpats
  async getAllMeals(): Promise<Meal[]> {
    try {
      const querySnapshot = await getDocs(collection(db, MEALS_COLLECTION));
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as Meal));
    } catch (error) {
      console.error('Error getting meals:', error);
      throw error;
    }
  },

  // Obtenir un àpat per ID
  async getMealById(id: string): Promise<Meal | null> {
    try {
      const docRef = doc(db, MEALS_COLLECTION, id);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        return {
          id: docSnap.id,
          ...docSnap.data()
        } as Meal;
      }
      return null;
    } catch (error) {
      console.error('Error getting meal:', error);
      throw error;
    }
  },

  // Crear un nou àpat
  async createMeal(meal: Omit<Meal, 'id'>): Promise<string> {
    try {
      const docRef = await addDoc(collection(db, MEALS_COLLECTION), meal);
      return docRef.id;
    } catch (error) {
      console.error('Error creating meal:', error);
      throw error;
    }
  },

  // Actualitzar un àpat
  async updateMeal(id: string, meal: Partial<Meal>): Promise<void> {
    try {
      const docRef = doc(db, MEALS_COLLECTION, id);
      await updateDoc(docRef, meal);
    } catch (error) {
      console.error('Error updating meal:', error);
      throw error;
    }
  },

  // Eliminar un àpat
  async deleteMeal(id: string): Promise<void> {
    try {
      const docRef = doc(db, MEALS_COLLECTION, id);
      await deleteDoc(docRef);
    } catch (error) {
      console.error('Error deleting meal:', error);
      throw error;
    }
  },

  // Obtenir àpats per persona
  async getMealsByPerson(person: 'me' | 'partner' | 'both'): Promise<Meal[]> {
    try {
      const q = query(
        collection(db, MEALS_COLLECTION), 
        where('person', '==', person)
      );
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as Meal));
    } catch (error) {
      console.error('Error getting meals by person:', error);
      throw error;
    }
  }
};