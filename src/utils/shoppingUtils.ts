import { startOfWeek, endOfWeek, format, eachWeekOfInterval, startOfMonth, endOfMonth } from 'date-fns';
import { ca } from 'date-fns/locale';
import { CalendarData, ShoppingItem, WeeklyShoppingList, ShoppingListData } from '../types';
import { getIngredientData } from './ingredientDatabase';

export const getWeekKey = (date: Date): string => {
  const weekStart = startOfWeek(date, { weekStartsOn: 1 });
  return format(weekStart, 'yyyy-MM-dd');
};

export const getWeekRange = (date: Date): { start: Date; end: Date } => {
  const start = startOfWeek(date, { weekStartsOn: 1 });
  const end = endOfWeek(date, { weekStartsOn: 1 });
  return { start, end };
};

export const getMonthWeeks = (currentDate: Date): Date[] => {
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  
  return eachWeekOfInterval(
    { start: monthStart, end: monthEnd },
    { weekStartsOn: 1 }
  );
};

export const formatWeekRange = (start: Date, end: Date): string => {
  const startStr = format(start, 'dd MMM', { locale: ca });
  const endStr = format(end, 'dd MMM yyyy', { locale: ca });
  return `${startStr} - ${endStr}`;
};

const ingredientCategories: { [key: string]: string } = {
  // Proteïnes
  'pollastre': 'Carn i Peix',
  'salmó': 'Carn i Peix',
  'tonyina': 'Carn i Peix',
  'bacallà': 'Carn i Peix',
  'daurada': 'Carn i Peix',
  'lluç': 'Carn i Peix',
  'peix blanc': 'Carn i Peix',
  'gambetes': 'Carn i Peix',
  'musclos': 'Carn i Peix',
  'calamar': 'Carn i Peix',
  'marisc': 'Carn i Peix',
  'anyell': 'Carn i Peix',
  'vedella': 'Carn i Peix',
  'carn picada': 'Carn i Peix',
  'pit de pollastre': 'Carn i Peix',
  'pavo': 'Carn i Peix',
  'pernil': 'Carn i Peix',
  'botifarra': 'Carn i Peix',
  'ous': 'Carn i Peix',
  'ou': 'Carn i Peix',
  'tofu': 'Proteïnes Vegetals',
  
  // Lactis
  'llet': 'Lactis',
  'iogurt grec': 'Lactis',
  'iogurt': 'Lactis',
  'formatge feta': 'Lactis',
  'formatge': 'Lactis',
  'formatge fresc': 'Lactis',
  'formatge crema': 'Lactis',
  'formatge de cabra': 'Lactis',
  'mozzarella': 'Lactis',
  'parmesà': 'Lactis',
  'mantega': 'Lactis',
  'labneh': 'Lactis',
  'llet de coco': 'Lactis',
  'llet d\'avena': 'Lactis',
  'llet d\'ametlla': 'Lactis',
  'llet vegetal': 'Lactis',
  'beguda d\'avena': 'Lactis',
  
  // Fruites i Verdures
  'aguacate': 'Fruites i Verdures',
  'tomàquet': 'Fruites i Verdures',
  'tomàquets': 'Fruites i Verdures',
  'tomàquet cherry': 'Fruites i Verdures',
  'cogombre': 'Fruites i Verdures',
  'cebolla': 'Fruites i Verdures',
  'ceba': 'Fruites i Verdures',
  'cebolla tendra': 'Fruites i Verdures',
  'cebolla morada': 'Fruites i Verdures',
  'cebolleta': 'Fruites i Verdures',
  'espinacs': 'Fruites i Verdures',
  'rúcula': 'Fruites i Verdures',
  'amanida': 'Fruites i Verdures',
  'enciam': 'Fruites i Verdures',
  'mango': 'Fruites i Verdures',
  'plàtan': 'Fruites i Verdures',
  'fruits vermells': 'Fruites i Verdures',
  'fruits del bosc': 'Fruites i Verdures',
  'mores': 'Fruites i Verdures',
  'kiwi': 'Fruites i Verdures',
  'pinya': 'Fruites i Verdures',
  'figues': 'Fruites i Verdures',
  'prunes': 'Fruites i Verdures',
  'dàtils': 'Fruites i Verdures',
  'llimona': 'Fruites i Verdures',
  'llima': 'Fruites i Verdures',
  'espàrrecs': 'Fruites i Verdures',
  'bròquil': 'Fruites i Verdures',
  'carbassó': 'Fruites i Verdures',
  'carabassa': 'Fruites i Verdures',
  'pebrot': 'Fruites i Verdures',
  'porro': 'Fruites i Verdures',
  'patata': 'Fruites i Verdures',
  'moniato': 'Fruites i Verdures',
  'pastanaga': 'Fruites i Verdures',
  'apio': 'Fruites i Verdures',
  'bolets': 'Fruites i Verdures',
  'bolets shiitake': 'Fruites i Verdures',
  'albergínia': 'Fruites i Verdures',
  'carxofes': 'Fruites i Verdures',
  'pèsols': 'Fruites i Verdures',
  'edamame': 'Fruites i Verdures',
  'mongetes verdes': 'Fruites i Verdures',
  'garrofó': 'Fruites i Verdures',
  'remolatxa': 'Fruites i Verdures',
  'bok choy': 'Fruites i Verdures',
  'bambú': 'Fruites i Verdures',
  
  // Cereals
  'pa integral': 'Pa i Cereals',
  'pa': 'Pa i Cereals',
  'pa rústic': 'Pa i Cereals',
  'pa de sègol': 'Pa i Cereals',
  'pa de centeno': 'Pa i Cereals',
  'pa japonès': 'Pa i Cereals',
  'pa pita': 'Pa i Cereals',
  'pa àrab': 'Pa i Cereals',
  'torradetes': 'Pa i Cereals',
  'avena': 'Pa i Cereals',
  'civada': 'Pa i Cereals',
  'quinoa': 'Pa i Cereals',
  'arròs': 'Pa i Cereals',
  'arròs integral': 'Pa i Cereals',
  'arròs bomba': 'Pa i Cereals',
  'arròs basmati': 'Pa i Cereals',
  'arròs jasmí': 'Pa i Cereals',
  'arròs arbori': 'Pa i Cereals',
  'pasta': 'Pa i Cereals',
  'pasta integral': 'Pa i Cereals',
  'fideus': 'Pa i Cereals',
  'fideus soba': 'Pa i Cereals',
  'fideus ramen': 'Pa i Cereals',
  'cuscús': 'Pa i Cereals',
  'bulgur': 'Pa i Cereals',
  'farina': 'Pa i Cereals',
  'farina de cigrons': 'Pa i Cereals',
  
  // Llegums
  'cigrons': 'Llegums',
  'llenties': 'Llegums',
  'llenties vermelles': 'Llegums',
  'mongetes': 'Llegums',
  'mongetes blanques': 'Llegums',
  'mongetes negres': 'Llegums',
  
  // Fruits Secs i Llavors
  'nous': 'Fruits Secs i Llavors',
  'ametlles': 'Fruits Secs i Llavors',
  'pistachos': 'Fruits Secs i Llavors',
  'pinons': 'Fruits Secs i Llavors',
  'cacauets': 'Fruits Secs i Llavors',
  'llavors de chia': 'Fruits Secs i Llavors',
  'llavors de sèsam': 'Fruits Secs i Llavors',
  'sèsam': 'Fruits Secs i Llavors',
  'llavors de cànem': 'Fruits Secs i Llavors',
  'llavors de carbassa': 'Fruits Secs i Llavors',
  'granola': 'Fruits Secs i Llavors',
  'mantega d\'ametlla': 'Fruits Secs i Llavors',
  'mantega de cacauet': 'Fruits Secs i Llavors',
  'tahini': 'Fruits Secs i Llavors',
  
  // Condiments i Espècies
  'oli d\'oliva': 'Olis i Condiments',
  'oli': 'Olis i Condiments',
  'oli de sèsam': 'Olis i Condiments',
  'sal': 'Olis i Condiments',
  'sal marina': 'Olis i Condiments',
  'pebre': 'Olis i Condiments',
  'vinagre': 'Olis i Condiments',
  'vinagre de Jerez': 'Olis i Condiments',
  'vinagre de arròs': 'Olis i Condiments',
  'mel': 'Olis i Condiments',
  'mel de bruc': 'Olis i Condiments',
  'mel de romaní': 'Olis i Condiments',
  'mostassa': 'Olis i Condiments',
  'mostassa de Dijon': 'Olis i Condiments',
  'salsa soja': 'Olis i Condiments',
  'salsa teriyaki': 'Olis i Condiments',
  'salsa ponzu': 'Olis i Condiments',
  'salsa tamarinde': 'Olis i Condiments',
  'gochujang': 'Olis i Condiments',
  'hummus': 'Olis i Condiments',
  'baba ganoush': 'Olis i Condiments',
  'za\'atar': 'Olis i Condiments',
  'canyella': 'Espècies',
  'cúrcuma': 'Espècies',
  'comí': 'Espècies',
  'curry': 'Espècies',
  'gingebre': 'Espècies',
  'cardamom': 'Espècies',
  'safrà': 'Espècies',
  'espècies': 'Espècies',
  'herbes': 'Herbes',
  'alfàbrega': 'Herbes',
  'perejil': 'Herbes',
  'menta': 'Herbes',
  'coriandre': 'Herbes',
  'eneldo': 'Herbes',
  'orenga': 'Herbes',
  'all': 'Herbes',
  'alls': 'Herbes',
  
  // Altres
  'olives': 'Conserves',
  'alcaparres': 'Conserves',
  'alga nori': 'Ingredients Asiàtics',
  'nori': 'Ingredients Asiàtics',
  'alga wakame': 'Ingredients Asiàtics',
  'miso': 'Ingredients Asiàtics',
  'wasabi': 'Ingredients Asiàtics',
  'matcha': 'Ingredients Asiàtics',
  'açaí': 'Superfood',
  'proteïna': 'Suplements',
  'xarop': 'Dolços',
  'coco': 'Ingredients Exòtics',
  'agua de rosa': 'Ingredients Orientals',
  'won ton': 'Ingredients Asiàtics',
  'brou': 'Base de Cuina',
  'vi blanc': 'Begudes per Cuinar',
  'fulles de vinya': 'Ingredients Mediterranis',
  'paste miso': 'Ingredients Asiàtics'
};

const getCategoryForIngredient = (ingredient: string): string => {
  const lowerIngredient = ingredient.toLowerCase();
  
  for (const [key, category] of Object.entries(ingredientCategories)) {
    if (lowerIngredient.includes(key)) {
      return category;
    }
  }
  
  return 'Altres';
};

const extractQuantityFromText = (text: string): { quantity: number; unit: string; ingredient: string } => {
  // Expressions regulars per extreure quantitats
  const patterns = [
    /(\d+)g\s+(.+)/i,           // 200g ingredient
    /(\d+)ml\s+(.+)/i,          // 200ml ingredient
    /(\d+)\s*cullerades?\s+(.+)/i, // 2 cullerades ingredient
    /(\d+)\s*culleradetes?\s+(.+)/i, // 1 culleradeta ingredient
    /(\d+)\/(\d+)\s+(.+)/i,     // 1/2 ingredient
    /(\d+)\s+(.+)/i,            // 3 ingredients
    /mig\s+(.+)/i,              // mig ingredient
    /mitja\s+(.+)/i,            // mitja ingredient
  ];

  for (const pattern of patterns) {
    const match = text.match(pattern);
    if (match) {
      if (pattern.source.includes('cullerades?')) {
        return { quantity: parseInt(match[1]), unit: 'cullerades', ingredient: match[2].trim() };
      } else if (pattern.source.includes('culleradetes?')) {
        return { quantity: parseInt(match[1]), unit: 'culleradetes', ingredient: match[2].trim() };
      } else if (pattern.source.includes('g')) {
        return { quantity: parseInt(match[1]), unit: 'g', ingredient: match[2].trim() };
      } else if (pattern.source.includes('ml')) {
        return { quantity: parseInt(match[1]), unit: 'ml', ingredient: match[2].trim() };
      } else if (pattern.source.includes('/')) {
        const fraction = parseInt(match[1]) / parseInt(match[2]);
        return { quantity: fraction, unit: 'unitat', ingredient: match[3].trim() };
      } else if (pattern.source.includes('mig|mitja')) {
        return { quantity: 0.5, unit: 'unitat', ingredient: match[1].trim() };
      } else {
        return { quantity: parseInt(match[1]), unit: 'unitats', ingredient: match[2].trim() };
      }
    }
  }

  // Si no troba patró, retorna ingredient sencer
  return { quantity: 1, unit: 'unitat', ingredient: text.trim() };
};

const extractIngredientsFromRecipe = (recipe: string, mealName: string): ShoppingItem[] => {
  const ingredients: ShoppingItem[] = [];
  
  // Separar per comes i netejar
  const lines = recipe.split(',').map(line => line.trim()).filter(line => line.length > 0);
  
  lines.forEach((line, index) => {
    const { quantity, unit, ingredient: rawIngredient } = extractQuantityFromText(line);
    
    // Netejar ingredient
    let cleanIngredient = rawIngredient
      .toLowerCase()
      .replace(/frescos?|fresca?/g, '') // eliminar "fresc"
      .replace(/tallats?|tallada?/g, '') // eliminar "tallat"
      .replace(/picats?|picada?/g, '') // eliminar "picat" 
      .replace(/en\s+(daus|trossos|rodanxes)/g, '') // eliminar formes de tall
      .trim();

    // Buscar dades de l'ingredient a la base de dades
    const ingredientData = getIngredientData(cleanIngredient);
    
    if (ingredientData) {
      // Calcular quantitat ajustada per 2 persones
      const adjustedQuantity = Math.ceil((quantity * ingredientData.baseQuantity) / 100) * 100; // Arrodonir a 100g
      
      ingredients.push({
        id: `${mealName.replace(/\s+/g, '_')}_${index}`,
        ingredient: ingredientData.name,
        quantity: adjustedQuantity.toString(),
        unit: ingredientData.unit,
        category: ingredientData.category,
        subcategory: ingredientData.subcategory,
        checked: false,
        meals: [mealName],
        notes: ingredientData.notes,
        priority: ingredientData.priority
      });
    } else {
      // Si no està a la BD, usar categorització antiga
      const category = getCategoryForIngredient(cleanIngredient);
      
      ingredients.push({
        id: `${mealName.replace(/\s+/g, '_')}_${index}`,
        ingredient: line,
        quantity: quantity.toString(),
        unit: unit,
        category,
        checked: false,
        meals: [mealName],
        priority: 'medium'
      });
    }
  });
  
  return ingredients;
};

// Llista específica per la setmana 1 (25-31 d'agost 2025)
const getWeek1SpecificShoppingList = (): WeeklyShoppingList => {
  const items: ShoppingItem[] = [
    // Proteïnes
    { id: 'week1_bacalla', ingredient: 'Bacallà dessalat', quantity: '300', unit: 'g', category: 'Carn i Peix', subcategory: 'Peix blanc', checked: false, meals: ['Esqueixada de Bacallà Mediterrània'], priority: 'high', notes: 'Comprar el mateix dia o dia anterior al consum' },
    { id: 'week1_pollastre', ingredient: 'Pit de pollastre', quantity: '400', unit: 'g', category: 'Carn i Peix', subcategory: 'Carn', checked: false, meals: ['Curry de Pollastre amb Pebrots', 'Pollastre amb Pebrots Confitats'], priority: 'high' },
    { id: 'week1_ous', ingredient: 'Ous', quantity: '4', unit: 'unitats', category: 'Carn i Peix', subcategory: 'Ous', checked: false, meals: ['Truita de Formatge Brie', 'Torrada amb Bacon i Ou', 'Truita de Carbassó'], priority: 'high' },
    { id: 'week1_llenties', ingredient: 'Llenties cuites', quantity: '200', unit: 'g', category: 'Llegums', subcategory: 'Llauna', checked: false, meals: ['Amanida de Llenties amb Pavo'], priority: 'medium', notes: 'Buscar sense sal afegida' },
    { id: 'week1_mongetes', ingredient: 'Mongetes blanques cuites', quantity: '200', unit: 'g', category: 'Llegums', subcategory: 'Llauna', checked: false, meals: ['Esqueixada de Bacallà Mediterrània'], priority: 'medium', notes: 'Buscar sense sal afegida' },
    
    // Lactis
    { id: 'week1_iogurt_grec', ingredient: 'Iogurt grec natural', quantity: '500', unit: 'g', category: 'Lactis', checked: false, meals: ['Iogurt Grec amb Fruits Vermells'], priority: 'medium' },
    { id: 'week1_iogurt', ingredient: 'Iogurt natural', quantity: '200', unit: 'g', category: 'Lactis', checked: false, meals: ['Iogurt amb Fruits Secs i Mel'], priority: 'medium' },
    { id: 'week1_parmesa', ingredient: 'Parmesà', quantity: '80', unit: 'g', category: 'Lactis', subcategory: 'Formatgès', checked: false, meals: ['Pasta amb Verdures i Bacon', 'Risotto de Verdures'], priority: 'medium' },
    
    // Cereals
    { id: 'week1_quinoa', ingredient: 'Quinoa', quantity: '80', unit: 'g', category: 'Pa i Cereals', checked: false, meals: ['Bowl de Quinoa amb Mango i Tofu'], priority: 'medium' },
    { id: 'week1_arros_integral', ingredient: 'Arròs integral', quantity: '200', unit: 'g', category: 'Pa i Cereals', checked: false, meals: ['Curry de Pollastre amb Pebrots', 'Pebrot Farcit Vegetarià'], priority: 'medium' },
    { id: 'week1_arros_arbori', ingredient: 'Arròs arbori', quantity: '100', unit: 'g', category: 'Pa i Cereals', subcategory: 'Per risotto', checked: false, meals: ['Risotto de Verdures'], priority: 'medium' },
    { id: 'week1_pasta', ingredient: 'Pasta integral', quantity: '100', unit: 'g', category: 'Pa i Cereals', checked: false, meals: ['Pasta amb Verdures i Bacon'], priority: 'medium' },
    { id: 'week1_avena', ingredient: 'Avena', quantity: '100', unit: 'g', category: 'Pa i Cereals', checked: false, meals: ['Overnight Oats Energètic'], priority: 'medium' },
    
    // Verdures fresques
    { id: 'week1_espinacs', ingredient: 'Espinacs frescos', quantity: '200', unit: 'g', category: 'Fruites i Verdures', checked: false, meals: ['Batut Verd Proteic'], priority: 'high', notes: 'Rentar abans de guardar' },
    { id: 'week1_rucula', ingredient: 'Rúcula', quantity: '200', unit: 'g', category: 'Fruites i Verdures', checked: false, meals: ['Amanida de Llenties amb Pavo'], priority: 'medium' },
    { id: 'week1_amanida', ingredient: 'Amanida verda variada', quantity: '1', unit: 'bossa', category: 'Fruites i Verdures', checked: false, meals: ['Truita de Carbassó'], priority: 'medium' },
    
    // Verdures i fruites
    { id: 'week1_tomaquet_cherry', ingredient: 'Tomàquet cherry', quantity: '200', unit: 'g', category: 'Fruites i Verdures', checked: false, meals: ['Amanida de Llenties amb Pavo'], priority: 'medium' },
    { id: 'week1_llimons', ingredient: 'Llimones', quantity: '3', unit: 'unitats', category: 'Fruites i Verdures', checked: false, meals: ['Bowl de Quinoa amb Mango i Tofu'], priority: 'medium' },
    
    // Fruites
    { id: 'week1_fruits_vermells', ingredient: 'Fruits vermells variats', quantity: '200', unit: 'g', category: 'Fruites i Verdures', checked: false, meals: ['Iogurt Grec amb Fruits Vermells'], priority: 'medium' },
    { id: 'week1_platans', ingredient: 'Plàtans', quantity: '3', unit: 'unitats', category: 'Fruites i Verdures', checked: false, meals: ['Batut Verd Proteic'], priority: 'medium' },
    
    // Pa
    { id: 'week1_pa_integral', ingredient: 'Pa integral', quantity: '1', unit: 'barra', category: 'Pa i Cereals', subcategory: 'Llesques', checked: false, meals: ['Torrada amb Pavo i Formatge Fresc', 'Torrada amb Bacon i Ou'], priority: 'medium' },
    { id: 'week1_pa_croutons', ingredient: 'Pa per fer croutons', quantity: '1', unit: 'barra', category: 'Pa i Cereals', subcategory: 'Torradetes', checked: false, meals: ['Gaspatxo de Pebrots'], priority: 'low' },
    
    // Condiments bàsics
    { id: 'week1_oli_oliva', ingredient: 'Oli d\'oliva verge extra', quantity: '1', unit: 'ampolla', category: 'Olis i Condiments', checked: false, meals: ['Múltiples plats'], priority: 'high' },
    { id: 'week1_vinagre_balsamic', ingredient: 'Vinagre balsàmic', quantity: '1', unit: 'ampolla', category: 'Olis i Condiments', checked: false, meals: ['Amanida de Tomàquet amb Formatge'], priority: 'low' },
    { id: 'week1_sal_marina', ingredient: 'Sal marina', quantity: '1', unit: 'paquet', category: 'Olis i Condiments', checked: false, meals: ['Múltiples plats'], priority: 'low' },
    { id: 'week1_pebre_negre', ingredient: 'Pebre negre', quantity: '1', unit: 'paquet', category: 'Espècies', checked: false, meals: ['Múltiples plats'], priority: 'low' },
    { id: 'week1_curcuma', ingredient: 'Cúrcuma en pols', quantity: '1', unit: 'paquet', category: 'Espècies', checked: false, meals: ['Curry de Pollastre amb Pebrots'], priority: 'low' },
    { id: 'week1_comi', ingredient: 'Comí en pols', quantity: '1', unit: 'paquet', category: 'Espècies', checked: false, meals: ['Curry de Pollastre amb Pebrots'], priority: 'low' },
    { id: 'week1_canyella', ingredient: 'Canyella en pols', quantity: '1', unit: 'paquet', category: 'Espècies', checked: false, meals: ['Iogurt amb Fruits Secs i Mel'], priority: 'low' },
    { id: 'week1_herbes_provencals', ingredient: 'Herbes provençals', quantity: '1', unit: 'paquet', category: 'Herbes', checked: false, meals: ['Pollastre amb Pebrots Confitats'], priority: 'low' },
    
    // Herbes fresques
    { id: 'week1_alfabrega', ingredient: 'Alfàbrega fresca', quantity: '1', unit: 'manat', category: 'Herbes', checked: false, meals: ['Amanida de Tomàquet amb Formatge'], priority: 'medium', notes: 'Conservar en got amb aigua' },
    { id: 'week1_herbes_varias', ingredient: 'Herbes variades', quantity: '1', unit: 'manat', category: 'Herbes', subcategory: 'Perejil, etc.', checked: false, meals: ['Múltiples plats'], priority: 'medium', notes: 'Conservar en got amb aigua' },
    
    // Fruits secs i llavors
    { id: 'week1_nous', ingredient: 'Nous', quantity: '40', unit: 'g', category: 'Fruits Secs i Llavors', checked: false, meals: ['Iogurt amb Fruits Secs i Mel'], priority: 'low' },
    { id: 'week1_ametlles', ingredient: 'Ametlles', quantity: '20', unit: 'g', category: 'Fruits Secs i Llavors', checked: false, meals: ['Iogurt amb Fruits Secs i Mel'], priority: 'low' },
    { id: 'week1_chia', ingredient: 'Llavors de chia', quantity: '1', unit: 'paquet', category: 'Fruits Secs i Llavors', checked: false, meals: ['Overnight Oats Energètic'], priority: 'low' },
    { id: 'week1_granola', ingredient: 'Granola', quantity: '1', unit: 'paquet', category: 'Fruits Secs i Llavors', subcategory: 'O ingredients per fer-la', checked: false, meals: ['Iogurt Grec amb Fruits Vermells'], priority: 'medium' },
    
    // Altres
    { id: 'week1_mel', ingredient: 'Mel', quantity: '1', unit: 'pot', category: 'Olis i Condiments', checked: false, meals: ['Iogurt Grec amb Fruits Vermells', 'Overnight Oats Energètic'], priority: 'medium' },
    { id: 'week1_mantega_ametlla', ingredient: 'Mantega d\'ametlla', quantity: '1', unit: 'pot', category: 'Fruits Secs i Llavors', checked: false, meals: ['Batut Verd Proteic'], priority: 'medium' },
    { id: 'week1_proteina', ingredient: 'Proteïna vanilla', quantity: '1', unit: 'mesura', category: 'Suplements', checked: false, meals: ['Batut Verd Proteic'], priority: 'medium' },
    { id: 'week1_llet_coco', ingredient: 'Llet de coco', quantity: '200', unit: 'ml', category: 'Lactis', checked: false, meals: ['Curry de Pollastre amb Pebrots'], priority: 'medium' },
    { id: 'week1_beguda_avena', ingredient: 'Beguda d\'avena', quantity: '1', unit: 'bric', category: 'Lactis', checked: false, meals: ['Batut Verd Proteic'], priority: 'medium' },
    { id: 'week1_llet_ametlla', ingredient: 'Llet d\'ametlla', quantity: '1', unit: 'bric', category: 'Lactis', checked: false, meals: ['Overnight Oats Energètic'], priority: 'medium' },
    { id: 'week1_olives', ingredient: 'Olives negres', quantity: '1', unit: 'pot', category: 'Conserves', checked: false, meals: ['Esqueixada de Bacallà Mediterrània'], priority: 'low' },
    { id: 'week1_brou', ingredient: 'Brou vegetal', quantity: '2', unit: 'brics', category: 'Base de Cuina', checked: false, meals: ['Crema de Pastanaga i Carbassó', 'Risotto de Verdures', 'Sopa de Verdures Casolana'], priority: 'medium' },
    { id: 'week1_teriyaki', ingredient: 'Salsa teriyaki suau', quantity: '1', unit: 'ampolla', category: 'Olis i Condiments', subcategory: 'Opcional', checked: false, meals: ['Tofu Fumat amb Verdures'], priority: 'low', notes: 'Per menys asiàtic' }
  ];
  
  return {
    weekStart: '2025-08-25',
    weekEnd: '2025-08-31', 
    items,
    totalEstimatedCost: 50, // Cost aproximat
    notes: [
      'Comprar bacallà el mateix dia o dia anterior al consum',
      'Buscar llegums en conserva sense sal afegida',
      'Herbes fresques es conserven millor en got amb aigua'
    ],
    conservationTips: [
      'Rentar verdures de fulla abans de guardar a la nevera',
      'Conservar herbes fresques en got amb aigua',
      'Congelar carn si no es fa servir en 2 dies',
      'El tofu obert es conserva en aigua a la nevera'
    ]
  };
};

export const generateWeeklyShoppingList = (
  calendarData: CalendarData,
  weekStart: Date,
  weekEnd: Date
): WeeklyShoppingList => {
  // Comprovar si és la setmana 1 específica (25-31 d'agost 2025)
  const weekStartStr = format(weekStart, 'yyyy-MM-dd');
  if (weekStartStr === '2025-08-25') {
    return getWeek1SpecificShoppingList();
  }
  const items: ShoppingItem[] = [];
  const itemsMap = new Map<string, ShoppingItem>();
  
  const startStr = format(weekStart, 'yyyy-MM-dd');
  const endStr = format(weekEnd, 'yyyy-MM-dd');
  
  Object.entries(calendarData).forEach(([dateStr, dayMeals]) => {
    if (dateStr >= startStr && dateStr <= endStr) {
      [dayMeals.breakfast, dayMeals.lunch, dayMeals.dinner].forEach(meal => {
        if (meal) {
          const mealIngredients = extractIngredientsFromRecipe(meal.recipe, meal.name);
          
          mealIngredients.forEach(ingredient => {
            const key = ingredient.ingredient.toLowerCase();
            if (itemsMap.has(key)) {
              const existingItem = itemsMap.get(key)!;
              existingItem.meals.push(meal.name);
              // Sumar quantitats si és el mateix ingredient
              const existingQuantity = parseFloat(existingItem.quantity);
              const newQuantity = parseFloat(ingredient.quantity);
              if (!isNaN(existingQuantity) && !isNaN(newQuantity) && existingItem.unit === ingredient.unit) {
                existingItem.quantity = (existingQuantity + newQuantity).toString();
              }
            } else {
              itemsMap.set(key, { ...ingredient });
            }
          });
        }
      });
    }
  });
  
  items.push(...Array.from(itemsMap.values()));
  
  // Ordenar per prioritat i després per categoria
  items.sort((a, b) => {
    const priorityOrder = { high: 3, medium: 2, low: 1 };
    const aPriority = priorityOrder[a.priority || 'medium'];
    const bPriority = priorityOrder[b.priority || 'medium'];
    
    if (aPriority !== bPriority) {
      return bPriority - aPriority; // High primer
    }
    
    if (a.category !== b.category) {
      return a.category.localeCompare(b.category);
    }
    
    if (a.subcategory && b.subcategory && a.subcategory !== b.subcategory) {
      return a.subcategory.localeCompare(b.subcategory);
    }
    
    return a.ingredient.localeCompare(b.ingredient);
  });

  // Calcular cost estimat
  let totalCost = 0;
  items.forEach(item => {
    const ingredientData = getIngredientData(item.ingredient.toLowerCase());
    if (ingredientData) {
      const quantity = parseFloat(item.quantity) || 1;
      const unitMultiplier = item.unit === 'g' ? quantity / 1000 : 
                           item.unit === 'ml' ? quantity / 1000 : quantity;
      totalCost += ingredientData.estimatedPrice * unitMultiplier;
    }
  });

  // Notes importants
  const notes = [
    'Comprar peix fresc el mateix dia o dia anterior al consum',
    'Revisar dates de caducitat dels lactis',
    'Portar bosses reutilitzables per la compra'
  ];

  // Consells de conservació
  const conservationTips = [
    'Rentar verdures de fulla abans de guardar a la nevera',
    'Conservar herbes fresques en got amb aigua',
    'Congelar carn si no es fa servir en 2 dies',
    'El tofu obert es conserva en aigua a la nevera'
  ];
  
  return {
    weekStart: format(weekStart, 'yyyy-MM-dd'),
    weekEnd: format(weekEnd, 'yyyy-MM-dd'),
    items,
    totalEstimatedCost: Math.round(totalCost),
    notes,
    conservationTips
  };
};

export const generateMonthShoppingLists = (
  calendarData: CalendarData,
  currentDate: Date
): ShoppingListData => {
  const weeks = getMonthWeeks(currentDate);
  const shoppingLists: ShoppingListData = {};
  
  weeks.forEach(weekStartDate => {
    const { start, end } = getWeekRange(weekStartDate);
    const weekKey = getWeekKey(weekStartDate);
    
    shoppingLists[weekKey] = generateWeeklyShoppingList(calendarData, start, end);
  });
  
  return shoppingLists;
};