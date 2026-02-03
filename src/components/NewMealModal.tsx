import React, { useState } from 'react';
import { Save, X, Plus, Trash2 } from 'lucide-react';
import { Meal, Ingredient } from '../types';

interface NewMealModalProps {
  date: string;
  onSave: (meal: Omit<Meal, 'id'>) => Promise<void>;
  onClose: () => void;
}

const NewMealModal: React.FC<NewMealModalProps> = ({ date, onSave, onClose }) => {
  const [titol, setTitol] = useState('');
  const [ingredients, setIngredients] = useState<Ingredient[]>([
    { ingredient: '', quantitat: 0, unitat: '' }
  ]);
  const [passos, setPassos] = useState<string[]>(['']);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAddIngredient = () => {
    setIngredients([...ingredients, { ingredient: '', quantitat: 0, unitat: '' }]);
  };

  const handleRemoveIngredient = (index: number) => {
    if (ingredients.length > 1) {
      setIngredients(ingredients.filter((_, i) => i !== index));
    }
  };

  const handleIngredientChange = (index: number, field: keyof Ingredient, value: string | number) => {
    const newIngredients = [...ingredients];
    newIngredients[index] = { ...newIngredients[index], [field]: value };
    setIngredients(newIngredients);
  };

  const handleAddPas = () => {
    setPassos([...passos, '']);
  };

  const handleRemovePas = (index: number) => {
    if (passos.length > 1) {
      setPassos(passos.filter((_, i) => i !== index));
    }
  };

  const handlePasChange = (index: number, value: string) => {
    const newPassos = [...passos];
    newPassos[index] = value;
    setPassos(newPassos);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!titol.trim()) {
      alert('El títol és obligatori');
      return;
    }

    // Filtrar ingredients i passos buits
    const validIngredients = ingredients.filter(
      ing => ing.ingredient.trim() && ing.quantitat > 0 && ing.unitat.trim()
    );
    const validPassos = passos.filter(pas => pas.trim());

    if (validIngredients.length === 0) {
      alert('Has d\'afegir almenys un ingredient vàlid');
      return;
    }

    if (validPassos.length === 0) {
      alert('Has d\'afegir almenys un pas d\'elaboració');
      return;
    }

    const mealData: Omit<Meal, 'id'> = {
      titol: titol.trim(),
      ingredients: validIngredients,
      passos: validPassos
    };

    try {
      setIsSubmitting(true);
      await onSave(mealData);
      onClose();
    } catch (error) {
      console.error('Error guardant àpat:', error);
      alert('Error guardant l\'àpat. Torna-ho a intentar.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content new-meal-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Crear nou àpat</h2>
          <button type="button" onClick={onClose} className="close-btn">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="new-meal-form">
          <div className="form-section">
            <label htmlFor="meal-titol">Títol de l'àpat *</label>
            <input
              id="meal-titol"
              type="text"
              value={titol}
              onChange={(e) => setTitol(e.target.value)}
              placeholder="Ex: Pasta amb tomàquet"
              required
            />
          </div>

          <div className="form-section">
            <div className="section-header">
              <label>Ingredients *</label>
              <button type="button" onClick={handleAddIngredient} className="add-btn">
                <Plus size={16} />
                Afegir ingredient
              </button>
            </div>
            <div className="ingredients-list">
              {ingredients.map((ingredient, index) => (
                <div key={index} className="ingredient-row">
                  <input
                    type="text"
                    value={ingredient.ingredient}
                    onChange={(e) => handleIngredientChange(index, 'ingredient', e.target.value)}
                    placeholder="Ingredient"
                    className="ingredient-name"
                  />
                  <input
                    type="number"
                    value={ingredient.quantitat || ''}
                    onChange={(e) => handleIngredientChange(index, 'quantitat', parseFloat(e.target.value) || 0)}
                    placeholder="0"
                    className="ingredient-quantity"
                    step="0.1"
                    min="0"
                  />
                  <input
                    type="text"
                    value={ingredient.unitat}
                    onChange={(e) => handleIngredientChange(index, 'unitat', e.target.value)}
                    placeholder="Unitat"
                    className="ingredient-unit"
                  />
                  {ingredients.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveIngredient(index)}
                      className="remove-btn"
                    >
                      <Trash2 size={16} />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="form-section">
            <div className="section-header">
              <label>Elaboració *</label>
              <button type="button" onClick={handleAddPas} className="add-btn">
                <Plus size={16} />
                Afegir pas
              </button>
            </div>
            <div className="passos-list">
              {passos.map((pas, index) => (
                <div key={index} className="pas-row">
                  <span className="pas-number">{index + 1}.</span>
                  <textarea
                    value={pas}
                    onChange={(e) => handlePasChange(index, e.target.value)}
                    placeholder="Descriu aquest pas de l'elaboració..."
                    rows={2}
                  />
                  {passos.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemovePas(index)}
                      className="remove-btn"
                    >
                      <Trash2 size={16} />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="form-actions">
            <button type="button" onClick={onClose} className="cancel-btn" disabled={isSubmitting}>
              <X size={16} />
              Cancel·lar
            </button>
            <button type="submit" className="save-btn" disabled={isSubmitting}>
              <Save size={16} />
              {isSubmitting ? 'Guardant...' : 'Guardar àpat'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewMealModal;
