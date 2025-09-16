export interface Meal {
  id: string;
  name: string;
  recipe: string;
  person: 'me' | 'partner' | 'both';
  ingredients?: string[];
}

export interface DayMeals {
  date: string;
  breakfast: Meal | null;
  lunch: Meal | null;
  dinner: Meal | null;
}

export interface CalendarData {
  [date: string]: DayMeals;
}

export interface ShoppingItem {
  id: string;
  ingredient: string;
  quantity: string;
  unit?: string;
  category: string;
  subcategory?: string;
  checked: boolean;
  meals: string[];
  notes?: string;
  priority?: 'high' | 'medium' | 'low';
}

export interface WeeklyShoppingList {
  weekStart: string;
  weekEnd: string;
  items: ShoppingItem[];
  totalEstimatedCost?: number;
  notes?: string[];
  conservationTips?: string[];
}

export interface ShoppingListData {
  [weekKey: string]: WeeklyShoppingList;
}

export type TabType = 'calendar' | 'shopping';