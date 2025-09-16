import React, { useState } from 'react';
import { X, Edit, Plus } from 'lucide-react';
import { DayMeals, Meal } from '../types';
import { formatDisplayDate } from '../utils/dateUtils';
import MealForm from './MealForm';

interface DayDetailOverlayProps {
  date: string;
  dayMeals: DayMeals | null;
  onClose: () => void;
  onSaveMeal: (mealType: 'breakfast' | 'lunch' | 'dinner', meal: Meal) => void;
}

const DayDetailOverlay: React.FC<DayDetailOverlayProps> = ({
  date,
  dayMeals,
  onClose,
  onSaveMeal,
}) => {
  const [editingMeal, setEditingMeal] = useState<'breakfast' | 'lunch' | 'dinner' | null>(null);
  const dateObj = new Date(date);

  const mealTypeLabels = {
    breakfast: 'Esmorzar',
    lunch: 'Dinar',
    dinner: 'Sopar'
  };

  const handleEditMeal = (mealType: 'breakfast' | 'lunch' | 'dinner') => {
    setEditingMeal(mealType);
  };

  const handleSaveMeal = (mealType: 'breakfast' | 'lunch' | 'dinner', meal: Meal) => {
    onSaveMeal(mealType, meal);
    setEditingMeal(null);
  };

  const renderMealSection = (
    mealType: 'breakfast' | 'lunch' | 'dinner',
    meal: Meal | null,
    label: string
  ) => {
    if (editingMeal === mealType) {
      return (
        <MealForm
          mealType={mealType}
          existingMeal={meal}
          onSave={(meal) => handleSaveMeal(mealType, meal)}
          onCancel={() => setEditingMeal(null)}
        />
      );
    }

    return (
      <div className={`meal-section ${mealType}`}>
        <div className="meal-header">
          <h3>{label}</h3>
          <button
            onClick={() => handleEditMeal(mealType)}
            className="edit-meal-btn"
          >
            {meal ? <Edit size={16} /> : <Plus size={16} />}
          </button>
        </div>
        {meal ? (
          <div className="meal-content">
            <h4>{meal.name}</h4>
            <p className="meal-person">Per: {meal.person === 'both' ? 'Tots dos' : meal.person === 'me' ? 'Mi' : 'Parella'}</p>
            <p className="meal-recipe">{meal.recipe}</p>
          </div>
        ) : (
          <div className="meal-content empty">
            <p>Cap àpat planificat</p>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="overlay">
      <div className="overlay-content">
        <div className="overlay-header">
          <h2>Planificació del dia</h2>
          <p>{formatDisplayDate(dateObj)}</p>
          <button onClick={onClose} className="close-btn">
            <X size={24} />
          </button>
        </div>
        <div className="meals-container">
          {renderMealSection('breakfast', dayMeals?.breakfast || null, mealTypeLabels.breakfast)}
          {renderMealSection('lunch', dayMeals?.lunch || null, mealTypeLabels.lunch)}
          {renderMealSection('dinner', dayMeals?.dinner || null, mealTypeLabels.dinner)}
        </div>
      </div>
    </div>
  );
};

export default DayDetailOverlay;