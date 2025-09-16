import React, { useState } from 'react';
import { mealService } from '../services/mealService';
import { calendarService } from '../services/calendarService';
import { Meal, DayMeals } from '../types';

const FirebaseDebug: React.FC = () => {
  const [debugInfo, setDebugInfo] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const checkMeals = async () => {
    setLoading(true);
    try {
      const meals = await mealService.getAllMeals();
      setDebugInfo(`📊 Total àpats a Firebase: ${meals.length}\n\n` + 
        meals.slice(0, 5).map(meal => 
          `🍽️ ${meal.name} (ID: ${meal.id})\n   📝 ${meal.recipe.substring(0, 50)}...`
        ).join('\n\n')
      );
    } catch (error) {
      setDebugInfo(`❌ Error carregant àpats: ${error}`);
    } finally {
      setLoading(false);
    }
  };

  const checkCalendar = async () => {
    setLoading(true);
    try {
      const calendarData = await calendarService.getCalendarData();
      const dates = Object.keys(calendarData).sort().slice(0, 5);
      
      let info = `📅 Total dies al calendari: ${Object.keys(calendarData).length}\n\n`;
      
      dates.forEach(date => {
        const day = calendarData[date];
        info += `📅 ${date}:\n`;
        info += `  🌅 Esmorzar: ${day.breakfast?.name || 'Cap'}\n`;
        info += `  🌞 Dinar: ${day.lunch?.name || 'Cap'}\n`;
        info += `  🌙 Sopar: ${day.dinner?.name || 'Cap'}\n\n`;
      });
      
      setDebugInfo(info);
    } catch (error) {
      setDebugInfo(`❌ Error carregant calendari: ${error}`);
    } finally {
      setLoading(false);
    }
  };

  const checkSpecificDay = async () => {
    setLoading(true);
    try {
      const today = '2025-08-25'; // Primera data del calendari
      const dayMeals = await calendarService.getDayMeals(today);
      
      if (dayMeals) {
        let info = `📅 Detalls per ${today}:\n\n`;
        
        if (dayMeals.breakfast) {
          info += `🌅 ESMORZAR:\n`;
          info += `   📝 Nom: ${dayMeals.breakfast.name}\n`;
          info += `   🆔 ID: ${dayMeals.breakfast.id}\n`;
          info += `   👤 Persona: ${dayMeals.breakfast.person}\n`;
          info += `   📜 Recepta: ${dayMeals.breakfast.recipe.substring(0, 100)}...\n\n`;
        }
        
        if (dayMeals.lunch) {
          info += `🌞 DINAR:\n`;
          info += `   📝 Nom: ${dayMeals.lunch.name}\n`;
          info += `   🆔 ID: ${dayMeals.lunch.id}\n`;
          info += `   👤 Persona: ${dayMeals.lunch.person}\n`;
          info += `   📜 Recepta: ${dayMeals.lunch.recipe.substring(0, 100)}...\n\n`;
        }
        
        if (dayMeals.dinner) {
          info += `🌙 SOPAR:\n`;
          info += `   📝 Nom: ${dayMeals.dinner.name}\n`;
          info += `   🆔 ID: ${dayMeals.dinner.id}\n`;
          info += `   👤 Persona: ${dayMeals.dinner.person}\n`;
          info += `   📜 Recepta: ${dayMeals.dinner.recipe.substring(0, 100)}...\n`;
        }
        
        setDebugInfo(info);
      } else {
        setDebugInfo(`❌ No s'han trobat dades per ${today}`);
      }
    } catch (error) {
      setDebugInfo(`❌ Error carregant dia específic: ${error}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ 
      position: 'fixed', 
      top: '10px', 
      right: '10px', 
      width: '400px',
      backgroundColor: 'white', 
      border: '2px solid #333', 
      borderRadius: '8px', 
      padding: '15px',
      maxHeight: '80vh',
      overflow: 'auto',
      zIndex: 1000,
      fontSize: '12px'
    }}>
      <h3>🔍 Firebase Debug</h3>
      
      <div style={{ marginBottom: '15px' }}>
        <button 
          onClick={checkMeals} 
          disabled={loading}
          style={{ 
            padding: '8px 12px', 
            marginRight: '5px',
            backgroundColor: '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            fontSize: '11px',
            cursor: loading ? 'not-allowed' : 'pointer'
          }}
        >
          📊 Check Àpats
        </button>

        <button 
          onClick={checkCalendar} 
          disabled={loading}
          style={{ 
            padding: '8px 12px', 
            marginRight: '5px',
            backgroundColor: '#2196F3',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            fontSize: '11px',
            cursor: loading ? 'not-allowed' : 'pointer'
          }}
        >
          📅 Check Calendari
        </button>

        <button 
          onClick={checkSpecificDay} 
          disabled={loading}
          style={{ 
            padding: '8px 12px',
            backgroundColor: '#FF9800',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            fontSize: '11px',
            cursor: loading ? 'not-allowed' : 'pointer'
          }}
        >
          🔍 Check Dia
        </button>
      </div>

      {loading && (
        <div style={{ color: '#666', marginBottom: '10px' }}>
          ⏳ Carregant...
        </div>
      )}

      {debugInfo && (
        <div style={{ 
          backgroundColor: '#f5f5f5', 
          padding: '10px', 
          borderRadius: '4px',
          whiteSpace: 'pre-wrap',
          fontFamily: 'monospace',
          fontSize: '11px',
          maxHeight: '300px',
          overflow: 'auto'
        }}>
          {debugInfo}
        </div>
      )}
    </div>
  );
};

export default FirebaseDebug;