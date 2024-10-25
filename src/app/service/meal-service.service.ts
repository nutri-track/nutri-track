import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Meal, Food } from '../interfaces/meal.interface/meal.interface';

@Injectable({
  providedIn: 'root'
})
export class MealService {
  private mealsSubject = new BehaviorSubject<Meal[]>([]);
  meals$ = this.mealsSubject.asObservable();
  
  // Método para agregar un alimento a una comida
  addFoodToMeal(food: Food, mealName: string) {
    const currentMeals = this.mealsSubject.getValue();
    const meal = currentMeals.find((m) => m.name === mealName);

    if (meal) {
      meal.foods.push(food);
      meal.totalCalories += this.calculateCalories(food);
    } else {
      currentMeals.push({
        name: mealName,
        foods: [food],
        totalCalories: this.calculateCalories(food)
      });
    }

    this.mealsSubject.next(currentMeals);
  }

  private calculateCalories(food: Food): number {
    const calories = food.foodNutrients?.find((n) => n.nutrientName === 'Energy');
    return calories ? calories.value : 0;
  }

  

}
