export interface IngredientData {
  name: string;
  category: string;
  subcategory?: string;
  baseQuantity: number;
  unit: string;
  estimatedPrice: number; // per unit
  notes?: string;
  conservationTip?: string;
  priority: 'high' | 'medium' | 'low';
  alternatives?: string[];
}

export const ingredientDatabase: { [key: string]: IngredientData } = {
  // PROTEÏNES - Peix blau
  'salmó': {
    name: 'salmó fresc',
    category: 'Proteïnes',
    subcategory: 'Peix Blau',
    baseQuantity: 150,
    unit: 'g',
    estimatedPrice: 2.5,
    notes: 'Comprar el mateix dia o dia anterior al consum',
    conservationTip: 'Conservar a la nevera màxim 2 dies',
    priority: 'high'
  },
  'salmó fumat': {
    name: 'salmó fumat',
    category: 'Proteïnes',
    subcategory: 'Peix Blau',
    baseQuantity: 80,
    unit: 'g',
    estimatedPrice: 4.0,
    priority: 'medium'
  },
  
  // PROTEÏNES - Peix blanc
  'bacallà': {
    name: 'bacallà dessalat',
    category: 'Proteïnes',
    subcategory: 'Peix Blanc',
    baseQuantity: 200,
    unit: 'g',
    estimatedPrice: 2.0,
    notes: 'Es pot comprar ja preparat o dessalar-lo a casa',
    priority: 'medium'
  },
  'lluç': {
    name: 'lluç fresc',
    category: 'Proteïnes',
    subcategory: 'Peix Blanc',
    baseQuantity: 150,
    unit: 'g',
    estimatedPrice: 2.2,
    priority: 'high'
  },
  'daurada': {
    name: 'daurada fresca',
    category: 'Proteïnes',
    subcategory: 'Peix Blanc',
    baseQuantity: 400,
    unit: 'g',
    estimatedPrice: 3.0,
    priority: 'high'
  },
  'peix blanc': {
    name: 'peix blanc',
    category: 'Proteïnes',
    subcategory: 'Peix Blanc',
    baseQuantity: 150,
    unit: 'g',
    estimatedPrice: 2.0,
    priority: 'medium'
  },

  // PROTEÏNES - Marisc
  'gambetes': {
    name: 'gambetes',
    category: 'Proteïnes',
    subcategory: 'Marisc',
    baseQuantity: 200,
    unit: 'g',
    estimatedPrice: 5.0,
    priority: 'high'
  },

  // PROTEÏNES - Carn
  'pollastre': {
    name: 'pit de pollastre',
    category: 'Proteïnes',
    subcategory: 'Carn',
    baseQuantity: 200,
    unit: 'g',
    estimatedPrice: 1.5,
    conservationTip: 'Congelar si no es fa servir en 2 dies',
    priority: 'medium'
  },
  'pit de pollastre': {
    name: 'pit de pollastre',
    category: 'Proteïnes',
    subcategory: 'Carn',
    baseQuantity: 200,
    unit: 'g',
    estimatedPrice: 1.5,
    conservationTip: 'Congelar si no es fa servir en 2 dies',
    priority: 'medium'
  },
  'anyell': {
    name: 'anyell',
    category: 'Proteïnes',
    subcategory: 'Carn',
    baseQuantity: 180,
    unit: 'g',
    estimatedPrice: 3.0,
    priority: 'medium'
  },
  'vedella': {
    name: 'vedella per estofar',
    category: 'Proteïnes',
    subcategory: 'Carn',
    baseQuantity: 180,
    unit: 'g',
    estimatedPrice: 2.8,
    priority: 'medium'
  },

  // PROTEÏNES - Embotits
  'pavo': {
    name: 'pavo baix en sal',
    category: 'Proteïnes',
    subcategory: 'Embotits',
    baseQuantity: 60,
    unit: 'g',
    estimatedPrice: 0.8,
    priority: 'low'
  },
  'pernil': {
    name: 'pernil ibèric',
    category: 'Proteïnes',
    subcategory: 'Embotits',
    baseQuantity: 60,
    unit: 'g',
    estimatedPrice: 1.5,
    priority: 'low'
  },
  'pechuga de pavo braseada': {
    name: 'pechuga de pavo braseada',
    category: 'Proteïnes',
    subcategory: 'Embotits',
    baseQuantity: 80,
    unit: 'g',
    estimatedPrice: 0,
    notes: 'Ingredients disponibles a casa',
    priority: 'low'
  },
  'bacon': {
    name: 'bacon',
    category: 'Proteïnes',
    subcategory: 'Embotits',
    baseQuantity: 50,
    unit: 'g',
    estimatedPrice: 0,
    notes: 'Ingredients disponibles a casa',
    priority: 'low'
  },

  // PROTEÏNES - Ous
  'ous': {
    name: 'ous',
    category: 'Proteïnes',
    subcategory: 'Ous',
    baseQuantity: 12,
    unit: 'unitats',
    estimatedPrice: 3.5,
    priority: 'medium'
  },
  'ou': {
    name: 'ous',
    category: 'Proteïnes',
    subcategory: 'Ous',
    baseQuantity: 6,
    unit: 'unitats',
    estimatedPrice: 1.8,
    priority: 'medium'
  },

  // PROTEÏNES VEGETALS
  'tofu': {
    name: 'tofu ferm',
    category: 'Proteïnes Vegetals',
    baseQuantity: 300,
    unit: 'g',
    estimatedPrice: 2.5,
    notes: 'Si no trobes tofu ferm, serveix el normal escorregut',
    conservationTip: 'El tofu obert es conserva en aigua a la nevera',
    priority: 'medium'
  },
  'tofu fumat': {
    name: 'tofu fumat',
    category: 'Proteïnes Vegetals',
    baseQuantity: 200,
    unit: 'g',
    estimatedPrice: 3.0,
    notes: 'Ingredients disponibles a casa',
    priority: 'low'
  },

  // LLEGUMS
  'cigrons': {
    name: 'cigrons cuits',
    category: 'Llegums',
    baseQuantity: 400,
    unit: 'g',
    estimatedPrice: 1.2,
    priority: 'low'
  },
  'llenties': {
    name: 'llenties cuites',
    category: 'Llegums',
    baseQuantity: 200,
    unit: 'g',
    estimatedPrice: 1.0,
    priority: 'low'
  },
  'llenties vermelles': {
    name: 'llenties vermelles',
    category: 'Llegums',
    baseQuantity: 150,
    unit: 'g',
    estimatedPrice: 0.8,
    priority: 'low'
  },
  'mongetes blanques': {
    name: 'mongetes blanques cuites',
    category: 'Llegums',
    baseQuantity: 200,
    unit: 'g',
    estimatedPrice: 1.1,
    priority: 'low'
  },

  // LACTIS
  'iogurt grec': {
    name: 'iogurt grec natural',
    category: 'Lactis',
    baseQuantity: 500,
    unit: 'g',
    estimatedPrice: 2.5,
    priority: 'medium'
  },
  'iogurt': {
    name: 'iogurt natural',
    category: 'Lactis',
    baseQuantity: 200,
    unit: 'g',
    estimatedPrice: 1.2,
    priority: 'medium'
  },
  'formatge fresc': {
    name: 'formatge fresc',
    category: 'Lactis',
    baseQuantity: 80,
    unit: 'g',
    estimatedPrice: 1.5,
    priority: 'low'
  },
  'formatge de cabra': {
    name: 'formatge de cabra',
    category: 'Lactis',
    baseQuantity: 100,
    unit: 'g',
    estimatedPrice: 2.0,
    priority: 'low'
  },
  'formatge feta': {
    name: 'formatge feta',
    category: 'Lactis',
    baseQuantity: 50,
    unit: 'g',
    estimatedPrice: 1.8,
    priority: 'low'
  },
  'mozzarella': {
    name: 'mozzarella fresca',
    category: 'Lactis',
    baseQuantity: 100,
    unit: 'g',
    estimatedPrice: 1.5,
    priority: 'low'
  },
  'parmesà': {
    name: 'parmesà',
    category: 'Lactis',
    baseQuantity: 80,
    unit: 'g',
    estimatedPrice: 3.0,
    priority: 'low'
  },
  'brie': {
    name: 'brie',
    category: 'Lactis',
    baseQuantity: 60,
    unit: 'g',
    estimatedPrice: 0,
    notes: 'Ingredients disponibles a casa',
    priority: 'low'
  },
  'llet de coco': {
    name: 'llet de coco light',
    category: 'Lactis',
    baseQuantity: 200,
    unit: 'ml',
    estimatedPrice: 1.8,
    priority: 'medium'
  },

  // CEREALS
  'quinoa': {
    name: 'quinoa',
    category: 'Cereals i Llegums Secs',
    baseQuantity: 80,
    unit: 'g',
    estimatedPrice: 0.8,
    priority: 'medium'
  },
  'arròs integral': {
    name: 'arròs integral',
    category: 'Cereals i Llegums Secs',
    baseQuantity: 100,
    unit: 'g',
    estimatedPrice: 0.6,
    priority: 'low'
  },
  'arròs': {
    name: 'arròs',
    category: 'Cereals i Llegums Secs',
    baseQuantity: 100,
    unit: 'g',
    estimatedPrice: 0.5,
    priority: 'low'
  },
  'avena': {
    name: 'avena',
    category: 'Cereals i Llegums Secs',
    baseQuantity: 100,
    unit: 'g',
    estimatedPrice: 0.4,
    priority: 'low'
  },

  // VERDURES FRESQUES
  'carbassó': {
    name: 'carbassó',
    category: 'Verdures Fresques',
    baseQuantity: 1,
    unit: 'unitat',
    estimatedPrice: 1.2,
    conservationTip: 'Conservar a la nevera fins 1 setmana',
    priority: 'medium'
  },
  'bròquil': {
    name: 'bròquil',
    category: 'Verdures Fresques',
    baseQuantity: 250,
    unit: 'g',
    estimatedPrice: 1.5,
    conservationTip: 'Conservar a la nevera màxim 5 dies',
    priority: 'medium'
  },
  'espinacs': {
    name: 'espinacs frescos',
    category: 'Verdures Fresques',
    baseQuantity: 100,
    unit: 'g',
    estimatedPrice: 1.8,
    conservationTip: 'Rentar abans de guardar, consumir en 2-3 dies',
    priority: 'high'
  },
  'rúcula': {
    name: 'rúcula',
    category: 'Verdures Fresques',
    baseQuantity: 100,
    unit: 'g',
    estimatedPrice: 1.2,
    conservationTip: 'Rentar abans de guardar',
    priority: 'medium'
  },
  'cebolla': {
    name: 'cebolla',
    category: 'Verdures Fresques',
    baseQuantity: 1,
    unit: 'unitat',
    estimatedPrice: 0.5,
    priority: 'low'
  },
  'tomàquet': {
    name: 'tomàquets madurs',
    category: 'Fruites i Verdures',
    baseQuantity: 500,
    unit: 'g',
    estimatedPrice: 2.0,
    priority: 'medium'
  },
  'tomàquet cherry': {
    name: 'tomàquets cherry',
    category: 'Fruites i Verdures',
    baseQuantity: 250,
    unit: 'g',
    estimatedPrice: 1.8,
    priority: 'medium'
  },
  'tomàquet de sucar': {
    name: 'tomàquet de sucar',
    category: 'Fruites i Verdures',
    baseQuantity: 300,
    unit: 'g',
    estimatedPrice: 0,
    notes: 'Ingredients disponibles a casa',
    priority: 'low'
  },

  // FRUITES
  'aguacate': {
    name: 'aguacates',
    category: 'Fruites',
    baseQuantity: 2,
    unit: 'unitats',
    estimatedPrice: 3.0,
    priority: 'medium'
  },
  'plàtan': {
    name: 'plàtans',
    category: 'Fruites',
    baseQuantity: 3,
    unit: 'unitats',
    estimatedPrice: 1.5,
    priority: 'medium'
  },
  'fruits vermells': {
    name: 'fruits vermells variats',
    category: 'Fruites',
    baseQuantity: 200,
    unit: 'g',
    estimatedPrice: 3.5,
    priority: 'medium'
  },
  'llimona': {
    name: 'llimones',
    category: 'Fruites',
    baseQuantity: 4,
    unit: 'unitats',
    estimatedPrice: 1.0,
    priority: 'low'
  },

  // PA
  'pa integral': {
    name: 'pa integral (llesques)',
    category: 'Pa',
    baseQuantity: 1,
    unit: 'unitat',
    estimatedPrice: 1.2,
    priority: 'medium'
  },
  'pa': {
    name: 'pa',
    category: 'Pa',
    baseQuantity: 1,
    unit: 'unitat',
    estimatedPrice: 1.0,
    priority: 'medium'
  },

  // CONDIMENTS
  'oli d\'oliva': {
    name: 'oli d\'oliva verge extra',
    category: 'Condiments i Espècies',
    baseQuantity: 500,
    unit: 'ml',
    estimatedPrice: 4.0,
    priority: 'high'
  },
  'sal': {
    name: 'sal marina',
    category: 'Condiments i Espècies',
    baseQuantity: 1,
    unit: 'kg',
    estimatedPrice: 1.0,
    priority: 'low'
  },
  'mel': {
    name: 'mel de bruc',
    category: 'Condiments i Espècies',
    baseQuantity: 250,
    unit: 'g',
    estimatedPrice: 3.5,
    priority: 'low'
  },
  'vinagre balsàmic': {
    name: 'vinagre balsàmic',
    category: 'Condiments i Espècies',
    baseQuantity: 250,
    unit: 'ml',
    estimatedPrice: 2.0,
    priority: 'low'
  },

  // HERBES FRESQUES
  'alfàbrega': {
    name: 'alfàbrega fresca',
    category: 'Herbes Fresques',
    baseQuantity: 1,
    unit: 'ram',
    estimatedPrice: 1.0,
    conservationTip: 'Conservar en got amb aigua',
    priority: 'low'
  },
  'perejil': {
    name: 'perejil fresc',
    category: 'Herbes Fresques',
    baseQuantity: 1,
    unit: 'ram',
    estimatedPrice: 0.8,
    conservationTip: 'Conservar en got amb aigua',
    priority: 'low'
  },

  // FRUITS SECS
  'nous': {
    name: 'nous',
    category: 'Fruits Secs i Llavors',
    baseQuantity: 100,
    unit: 'g',
    estimatedPrice: 2.5,
    priority: 'low'
  },
  'ametlles': {
    name: 'ametlles',
    category: 'Fruits Secs i Llavors',
    baseQuantity: 50,
    unit: 'g',
    estimatedPrice: 1.8,
    priority: 'low'
  },

  // INGREDIENTS ESPECIALS
  'miso': {
    name: 'pasta miso',
    category: 'Ingredients Asiàtics',
    baseQuantity: 200,
    unit: 'g',
    estimatedPrice: 4.5,
    notes: 'Trobar en botigues asiàtiques o grans superfícies',
    alternatives: ['brou vegetal concentrat'],
    priority: 'low'
  },
  'alga nori': {
    name: 'alga nori',
    category: 'Ingredients Asiàtics',
    baseQuantity: 1,
    unit: 'paquet',
    estimatedPrice: 2.0,
    priority: 'low'
  }
};

export const getIngredientData = (ingredientName: string): IngredientData | null => {
  const normalizedName = ingredientName.toLowerCase().trim();
  return ingredientDatabase[normalizedName] || null;
};