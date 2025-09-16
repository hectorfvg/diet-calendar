import { 
  collection, 
  doc, 
  getDocs, 
  getDoc, 
  setDoc, 
  updateDoc, 
  deleteDoc,
  query, 
  where,
  orderBy 
} from 'firebase/firestore';
import { db } from '../config/firebase';
import { WeeklyShoppingList, ShoppingListData, ShoppingItem } from '../types';

const SHOPPING_COLLECTION = 'shopping_lists';

export const shoppingService = {
  // Obtenir totes les llistes de compra
  async getAllShoppingLists(): Promise<ShoppingListData> {
    try {
      const querySnapshot = await getDocs(collection(db, SHOPPING_COLLECTION));
      const shoppingData: ShoppingListData = {};
      
      querySnapshot.docs.forEach(doc => {
        shoppingData[doc.id] = {
          ...doc.data()
        } as WeeklyShoppingList;
      });
      
      return shoppingData;
    } catch (error) {
      console.error('Error getting shopping lists:', error);
      throw error;
    }
  },

  // Obtenir una llista de compra per clau de setmana
  async getWeeklyShoppingList(weekKey: string): Promise<WeeklyShoppingList | null> {
    try {
      const docRef = doc(db, SHOPPING_COLLECTION, weekKey);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        return docSnap.data() as WeeklyShoppingList;
      }
      return null;
    } catch (error) {
      console.error('Error getting weekly shopping list:', error);
      throw error;
    }
  },

  // Crear o actualitzar una llista de compra setmanal
  async saveWeeklyShoppingList(weekKey: string, shoppingList: WeeklyShoppingList): Promise<void> {
    try {
      const docRef = doc(db, SHOPPING_COLLECTION, weekKey);
      await setDoc(docRef, shoppingList);
    } catch (error) {
      console.error('Error saving weekly shopping list:', error);
      throw error;
    }
  },

  // Actualitzar un element de la llista de compra
  async updateShoppingItem(
    weekKey: string, 
    itemId: string, 
    updatedItem: Partial<ShoppingItem>
  ): Promise<void> {
    try {
      const shoppingList = await this.getWeeklyShoppingList(weekKey);
      if (!shoppingList) {
        throw new Error(`Shopping list for week ${weekKey} not found`);
      }

      const itemIndex = shoppingList.items.findIndex(item => item.id === itemId);
      if (itemIndex === -1) {
        throw new Error(`Item ${itemId} not found in shopping list`);
      }

      shoppingList.items[itemIndex] = {
        ...shoppingList.items[itemIndex],
        ...updatedItem
      };

      await this.saveWeeklyShoppingList(weekKey, shoppingList);
    } catch (error) {
      console.error('Error updating shopping item:', error);
      throw error;
    }
  },

  // Marcar/desmarcar un element com a comprat
  async toggleShoppingItem(weekKey: string, itemId: string): Promise<void> {
    try {
      const shoppingList = await this.getWeeklyShoppingList(weekKey);
      if (!shoppingList) {
        throw new Error(`Shopping list for week ${weekKey} not found`);
      }

      const itemIndex = shoppingList.items.findIndex(item => item.id === itemId);
      if (itemIndex === -1) {
        throw new Error(`Item ${itemId} not found in shopping list`);
      }

      shoppingList.items[itemIndex].checked = !shoppingList.items[itemIndex].checked;
      await this.saveWeeklyShoppingList(weekKey, shoppingList);
    } catch (error) {
      console.error('Error toggling shopping item:', error);
      throw error;
    }
  },

  // Eliminar una llista de compra
  async deleteShoppingList(weekKey: string): Promise<void> {
    try {
      const docRef = doc(db, SHOPPING_COLLECTION, weekKey);
      await deleteDoc(docRef);
    } catch (error) {
      console.error('Error deleting shopping list:', error);
      throw error;
    }
  }
};