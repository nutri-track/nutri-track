export interface Nutrient {
    nutrientName: string;
    value: number;
    unitName: string;
  }
  
  export interface Food {
    description: string;
    foodNutrients: Nutrient[];
    selectedMeal?: string; // nuevo atributo para almacenar la comida seleccionada
  }
  
  export interface Meal {
    name: string; // Desayuno, Almuerzo, etc.
    foods: Food[];
    totalCalories: number;
  }
  