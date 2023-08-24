export interface Meal {
  strMeal: string;
  strInstructions: string;
  strMealThumb: string;
}

export interface MealsResponse {
  meals: Meal[];
}
