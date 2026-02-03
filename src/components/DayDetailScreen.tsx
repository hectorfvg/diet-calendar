import React, { useState } from 'react';
import { ArrowLeft, Plus, Trash2 } from 'lucide-react';
import { formatDisplayDate } from '../utils/dateUtils';
import { useIngredientTotals } from '../hooks/useIngredientTotals';
import { CalendarData, Meal, Ingredient } from '../types';
import NewMealModal from './NewMealModal';

interface DayDetailScreenProps {
  date: string;
  dayData: any;
  calendarData: CalendarData;
  onBack: () => void;
  onCreateMeal: (mealData: Omit<Meal, 'id'>) => Promise<string>;
  onUpdateMealInDay: (date: string, mealType: 'breakfast' | 'lunch' | 'dinner', meal: Meal | null) => Promise<void>;
}

const DayDetailScreen: React.FC<DayDetailScreenProps> = ({
  date,
  dayData,
  calendarData,
  onBack,
  onCreateMeal,
  onUpdateMealInDay,
}) => {
  const dateObj = new Date(date);
  const { getIngredientTotal, isRepeatedIngredient } = useIngredientTotals(calendarData);
  const [showNewMealModal, setShowNewMealModal] = useState(false);

  // Comprovar si el dia té àpats assignats
  const hasAnyMeal = dayData?.breakfast || dayData?.lunch || dayData?.dinner;

  const handleSaveNewMeal = async (mealData: Omit<Meal, 'id'>) => {
    try {
      // Crear el nou àpat a Firebase
      const mealId = await onCreateMeal(mealData);

      // Afegir l'àpat al dia com a lunch (àpat principal)
      const meal: Meal = {
        ...mealData,
        id: mealId
      };

      await onUpdateMealInDay(date, 'lunch', meal);

      // Tancar el modal
      setShowNewMealModal(false);
    } catch (error) {
      console.error('Error creant i assignant àpat:', error);
      throw error;
    }
  };

  const handleDeleteMeal = async (mealType: 'breakfast' | 'lunch' | 'dinner', mealTitle: string) => {
    const confirmed = window.confirm(
      `Estàs segur que vols eliminar l'àpat "${mealTitle}"?\n\nAquesta acció no es pot desfer.`
    );

    if (!confirmed) return;

    try {
      await onUpdateMealInDay(date, mealType, null);
    } catch (error) {
      console.error('Error eliminant àpat:', error);
      alert('Error eliminant l\'àpat. Torna-ho a intentar.');
    }
  };

  const renderMealSection = (meal: any, title: string, color: string, mealType: 'breakfast' | 'lunch' | 'dinner') => {
    if (!meal) return null;

    return (
      <div className={`meal-section ${color}`}>
        <div className="meal-title-container">
          <h3 className="meal-title">{title}</h3>
          <button
            onClick={() => handleDeleteMeal(mealType, meal.titol || meal.name || 'aquest àpat')}
            className="delete-meal-btn"
            title="Eliminar àpat"
          >
            <Trash2 size={18} />
            Eliminar
          </button>
        </div>
        <div className="meal-content">
          <h4 className="meal-name">{meal.titol || meal.name || 'Sense nom'}</h4>

          {meal.ingredients && meal.ingredients.length > 0 && (
            <div className="meal-ingredients">
              <h5>Ingredients:</h5>
              <ul className="ingredients-list">
                {meal.ingredients.map((ingredient: Ingredient | string, index: number) => {
                  if (typeof ingredient === 'string') {
                    // Handle string ingredients (legacy format)
                    const total = getIngredientTotal(ingredient);
                    const isRepeated = isRepeatedIngredient(ingredient);

                    return (
                      <li key={index} className="ingredient-item">
                        <strong>{ingredient}</strong>
                        {isRepeated && total && (
                          <span className="ingredient-total"> ({total.count} vegades utilitzat)</span>
                        )}
                      </li>
                    );
                  } else {
                    // Handle Ingredient objects (new format)
                    const total = getIngredientTotal(ingredient.ingredient);
                    const isRepeated = isRepeatedIngredient(ingredient.ingredient);

                    return (
                      <li key={index} className="ingredient-item">
                        <strong>{ingredient.ingredient}</strong> — {ingredient.quantitat} {ingredient.unitat}
                        {isRepeated && total && (
                          <span className="ingredient-total"> ({total.total} {total.unit} disponibles)</span>
                        )}
                      </li>
                    );
                  }
                })}
              </ul>
            </div>
          )}

          {meal.passos && meal.passos.length > 0 && (
            <div className="meal-recipe">
              <h5>Elaboració:</h5>
              <div className="recipe-steps">
                {meal.passos.map((step: string, index: number) => (
                  <p key={index} className="recipe-step">
                    <span className="step-number">{index + 1}.</span> {step.trim()}
                  </p>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  const mainMeal = dayData?.lunch || null;

  return (
    <div className="day-detail-screen">
      <div className="day-detail-header">
        <button onClick={onBack} className="back-btn">
          <ArrowLeft size={24} />
        </button>
        <div className="day-detail-title">
          <h1>Planificació del dia</h1>
          <p className="day-detail-date">{formatDisplayDate(dateObj)}</p>
        </div>
        {!hasAnyMeal && (
          <button onClick={() => setShowNewMealModal(true)} className="new-meal-cta">
            <Plus size={20} />
            Crear àpat
          </button>
        )}
      </div>

      <div className="day-detail-content">
        {renderMealSection(mainMeal, 'Àpat Principal', 'main', 'lunch')}
        {renderMealSection(dayData?.breakfast, 'Esmorzar', 'breakfast', 'breakfast')}

        {!dayData?.breakfast && !mainMeal && (
          <div className="empty-day">
            <p>No hi ha cap àpat planificat per aquest dia</p>
          </div>
        )}
      </div>

      {showNewMealModal && (
        <NewMealModal
          date={date}
          onSave={handleSaveNewMeal}
          onClose={() => setShowNewMealModal(false)}
        />
      )}
    </div>
  );
};

export default DayDetailScreen;