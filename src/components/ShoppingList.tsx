import React, { useState, useMemo } from 'react';
import { ChevronLeft, ChevronRight, Check, Package, Euro, AlertTriangle, Lightbulb } from 'lucide-react';
import { CalendarData, ShoppingListData, ShoppingItem } from '../types';
import { generateMonthShoppingLists, getMonthWeeks, getWeekRange, formatWeekRange, getWeekKey } from '../utils/shoppingUtils';
import { addMonths, subMonths, format } from 'date-fns';
import { ca } from 'date-fns/locale';

interface ShoppingListProps {
  calendarData: CalendarData;
  currentDate: Date;
  onMonthChange: (date: Date) => void;
}

const ShoppingList: React.FC<ShoppingListProps> = ({
  calendarData,
  currentDate,
  onMonthChange,
}) => {
  const [checkedItems, setCheckedItems] = useState<Set<string>>(new Set());
  const [selectedWeek, setSelectedWeek] = useState<string>(() => {
    const weeks = getMonthWeeks(currentDate);
    return getWeekKey(weeks[0]);
  });

  const shoppingListsData: ShoppingListData = useMemo(() => {
    return generateMonthShoppingLists(calendarData, currentDate);
  }, [calendarData, currentDate]);

  const weeks = useMemo(() => {
    return getMonthWeeks(currentDate);
  }, [currentDate]);

  const currentWeekList = shoppingListsData[selectedWeek];

  const handlePrevMonth = () => {
    const newDate = subMonths(currentDate, 1);
    onMonthChange(newDate);
    const newWeeks = getMonthWeeks(newDate);
    setSelectedWeek(getWeekKey(newWeeks[0]));
  };

  const handleNextMonth = () => {
    const newDate = addMonths(currentDate, 1);
    onMonthChange(newDate);
    const newWeeks = getMonthWeeks(newDate);
    setSelectedWeek(getWeekKey(newWeeks[0]));
  };

  const handleItemToggle = (itemId: string) => {
    const newCheckedItems = new Set(checkedItems);
    if (newCheckedItems.has(itemId)) {
      newCheckedItems.delete(itemId);
    } else {
      newCheckedItems.add(itemId);
    }
    setCheckedItems(newCheckedItems);
  };

  const groupItemsByCategory = (items: ShoppingItem[]) => {
    const grouped: { [category: string]: ShoppingItem[] } = {};
    items.forEach(item => {
      if (!grouped[item.category]) {
        grouped[item.category] = [];
      }
      grouped[item.category].push(item);
    });
    return grouped;
  };


  return (
    <div className="shopping-list-container">
      <div className="shopping-header">
        <button onClick={handlePrevMonth} className="nav-button">
          <ChevronLeft size={20} />
        </button>
        <h1 className="month-year">
          {format(currentDate, 'MMMM yyyy', { locale: ca })}
        </h1>
        <button onClick={handleNextMonth} className="nav-button">
          <ChevronRight size={20} />
        </button>
      </div>

      <div className="week-selector">
        {weeks.map(week => {
          const weekKey = getWeekKey(week);
          const { start, end } = getWeekRange(week);
          const isSelected = weekKey === selectedWeek;
          
          return (
            <button
              key={weekKey}
              className={`week-button ${isSelected ? 'active' : ''}`}
              onClick={() => setSelectedWeek(weekKey)}
            >
              {formatWeekRange(start, end)}
            </button>
          );
        })}
      </div>

      {currentWeekList && currentWeekList.items.length > 0 ? (
        <div className="shopping-content">
          <div className="shopping-summary">
            <Package size={20} />
            <span>
              {currentWeekList.items.filter(item => !checkedItems.has(item.id)).length} articles pendents
              {' / '}
              {currentWeekList.items.length} total
            </span>
            {currentWeekList.totalEstimatedCost && (
              <div className="cost-estimate">
                <Euro size={16} />
                <span>~{currentWeekList.totalEstimatedCost}€</span>
              </div>
            )}
          </div>

          {currentWeekList.notes && currentWeekList.notes.length > 0 && (
            <div className="shopping-notes">
              <div className="notes-header">
                <AlertTriangle size={18} />
                <h4>Notes Importants</h4>
              </div>
              <ul>
                {currentWeekList.notes.map((note, index) => (
                  <li key={index}>{note}</li>
                ))}
              </ul>
            </div>
          )}

          {currentWeekList.conservationTips && currentWeekList.conservationTips.length > 0 && (
            <div className="conservation-tips">
              <div className="tips-header">
                <Lightbulb size={18} />
                <h4>Consells de Conservació</h4>
              </div>
              <ul>
                {currentWeekList.conservationTips.map((tip, index) => (
                  <li key={index}>{tip}</li>
                ))}
              </ul>
            </div>
          )}

          <div className="shopping-categories">
            {Object.entries(groupItemsByCategory(currentWeekList.items)).map(([category, items]) => (
              <div key={category} className="category-section">
                <h3 className="category-title">{category}</h3>
                <div className="category-items">
                  {items.map(item => {
                    const isChecked = checkedItems.has(item.id);
                    return (
                      <div
                        key={item.id}
                        className={`shopping-item ${isChecked ? 'checked' : ''}`}
                        onClick={() => handleItemToggle(item.id)}
                      >
                        <div className="item-checkbox">
                          {isChecked && <Check size={16} />}
                        </div>
                        <div className="item-content">
                          <div className="item-header">
                            <span className="item-name">{item.ingredient}</span>
                            {item.quantity && (
                              <span className="item-quantity">
                                {item.quantity}{item.unit && ` ${item.unit}`}
                              </span>
                            )}
                          </div>
                          {item.subcategory && (
                            <span className="item-subcategory">{item.subcategory}</span>
                          )}
                          {item.notes && (
                            <div className="item-notes">
                              <AlertTriangle size={12} />
                              <span>{item.notes}</span>
                            </div>
                          )}
                          <div className="item-meals">
                            {item.meals.map((meal, index) => (
                              <span 
                                key={index} 
                                className={`meal-tag priority-${item.priority || 'medium'}`}
                              >
                                {meal}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="empty-shopping-list">
          <Package size={48} />
          <h3>No hi ha àpats planificats</h3>
          <p>Afegeix àpats al calendari per generar automàticament la llista de la compra</p>
        </div>
      )}
    </div>
  );
};

export default ShoppingList;