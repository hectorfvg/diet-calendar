import { mockCalendarData } from '../utils/mockData';
import { mealService } from '../services/mealService';
import { calendarService } from '../services/calendarService';
import { Meal } from '../types';

// Script per migrar les dades mockejades a Firebase
export const migrateDataToFirebase = async () => {
  try {
    console.log('🚀 Iniciant migració de dades a Firebase...');
    
    // 1. Extreure tots els àpats únics del calendari mock
    const uniqueMeals = new Map<string, Meal>();
    
    Object.values(mockCalendarData).forEach(dayMeals => {
      [dayMeals.breakfast, dayMeals.lunch, dayMeals.dinner].forEach(meal => {
        if (meal && !uniqueMeals.has(meal.id)) {
          uniqueMeals.set(meal.id, meal);
        }
      });
    });

    console.log(`📊 Trobats ${uniqueMeals.size} àpats únics per migrar`);

    // 2. Migrar àpats a Firebase
    console.log('🍽️ Migrant àpats...');
    const mealMigrationPromises = Array.from(uniqueMeals.values()).map(async (meal) => {
      try {
        // Crear l'àpat sense l'ID (Firebase generarà un de nou)
        const { id, ...mealData } = meal;
        const newMealId = await mealService.createMeal(mealData);
        console.log(`✅ Àpat migrat: ${meal.name} (${id} -> ${newMealId})`);
        return { oldId: id, newId: newMealId, meal: { ...mealData, id: newMealId } };
      } catch (error) {
        console.error(`❌ Error migrant àpat ${meal.name}:`, error);
        throw error;
      }
    });

    const migratedMeals = await Promise.all(mealMigrationPromises);
    
    // 3. Crear un mapa d'IDs antics a nous
    const idMap = new Map<string, string>();
    const newMealsMap = new Map<string, Meal>();
    
    migratedMeals.forEach(({ oldId, newId, meal }) => {
      idMap.set(oldId, newId);
      newMealsMap.set(newId, meal);
    });

    // 4. Migrar dades del calendari amb els nous IDs
    console.log('📅 Migrant dades del calendari...');
    const calendarMigrationPromises = Object.entries(mockCalendarData).map(async ([date, dayMeals]) => {
      try {
        const updatedDayMeals = {
          breakfast: dayMeals.breakfast ? {
            ...dayMeals.breakfast,
            id: idMap.get(dayMeals.breakfast.id) || dayMeals.breakfast.id
          } : null,
          lunch: dayMeals.lunch ? {
            ...dayMeals.lunch,
            id: idMap.get(dayMeals.lunch.id) || dayMeals.lunch.id
          } : null,
          dinner: dayMeals.dinner ? {
            ...dayMeals.dinner,
            id: idMap.get(dayMeals.dinner.id) || dayMeals.dinner.id
          } : null
        };

        await calendarService.updateDayMeals(date, updatedDayMeals);
        console.log(`✅ Calendari migrat per data: ${date}`);
      } catch (error) {
        console.error(`❌ Error migrant calendari per ${date}:`, error);
        throw error;
      }
    });

    await Promise.all(calendarMigrationPromises);

    console.log('🎉 Migració completada amb èxit!');
    console.log(`📊 Resum:`);
    console.log(`   - ${uniqueMeals.size} àpats migrats`);
    console.log(`   - ${Object.keys(mockCalendarData).length} dies de calendari migrats`);

  } catch (error) {
    console.error('💥 Error durant la migració:', error);
    throw error;
  }
};

// Funció per executar la migració (només en desenvolupament)
export const runMigration = async () => {
  if (process.env.NODE_ENV === 'development') {
    try {
      await migrateDataToFirebase();
    } catch (error) {
      console.error('Error executant la migració:', error);
    }
  } else {
    console.warn('⚠️ La migració només es pot executar en mode desenvolupament');
  }
};