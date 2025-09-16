import React, { useState } from 'react';
import { Save, X } from 'lucide-react';
import { Meal } from '../types';

interface MealFormProps {
  mealType: 'breakfast' | 'lunch' | 'dinner';
  existingMeal: Meal | null;
  onSave: (meal: Meal) => void;
  onCancel: () => void;
}

const MealForm: React.FC<MealFormProps> = ({
  mealType,
  existingMeal,
  onSave,
  onCancel,
}) => {
  const [name, setName] = useState(existingMeal?.name || '');
  const [recipe, setRecipe] = useState(existingMeal?.recipe || '');
  const [person, setPerson] = useState<'me' | 'partner' | 'both'>(existingMeal?.person || 'both');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim() || !recipe.trim()) {
      return;
    }

    const meal: Meal = {
      id: existingMeal?.id || `${mealType}_${Date.now()}`,
      name: name.trim(),
      recipe: recipe.trim(),
      person,
    };

    onSave(meal);
  };

  const mealTypeLabels = {
    breakfast: 'Esmorzar',
    lunch: 'Dinar',
    dinner: 'Sopar'
  };

  return (
    <div className="meal-form">
      <div className="meal-form-header">
        <h3>Editar {mealTypeLabels[mealType]}</h3>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="meal-name">Nom de l'àpat</label>
          <input
            id="meal-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Ex: Amanida mediterrània"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="meal-person">Per a qui és?</label>
          <select
            id="meal-person"
            value={person}
            onChange={(e) => setPerson(e.target.value as 'me' | 'partner' | 'both')}
          >
            <option value="both">Tots dos</option>
            <option value="me">Mi</option>
            <option value="partner">Parella</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="meal-recipe">Recepta</label>
          <textarea
            id="meal-recipe"
            value={recipe}
            onChange={(e) => setRecipe(e.target.value)}
            placeholder="Descriu els ingredients i la preparació..."
            rows={4}
            required
          />
        </div>

        <div className="form-actions">
          <button type="button" onClick={onCancel} className="cancel-btn">
            <X size={16} />
            Cancel·lar
          </button>
          <button type="submit" className="save-btn">
            <Save size={16} />
            Guardar
          </button>
        </div>
      </form>
    </div>
  );
};

export default MealForm;