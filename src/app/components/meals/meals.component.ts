import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MealService } from '../../service/meal-service.service';
import { Meal, Food } from '../../interfaces/meal.interface/meal.interface';

@Component({
  selector: 'app-meals',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './meals.component.html',
  styleUrls: ['./meals.component.css']
})
export class MealsComponent implements OnInit {
  meals: Meal[] = [];

  constructor(private mealService: MealService) {}

  ngOnInit(): void {
    // Suscribirse a los datos de las comidas provenientes del servicio
    this.mealService.meals$.subscribe((meals) => {
      this.meals = meals;
    });
  }

  // Método para obtener las calorías de un alimento o un mensaje alternativo
  getCalories(food: Food): string {
    const calories = food.foodNutrients?.find(n => n.nutrientName === 'Energy');
    return calories ? calories.value.toString() : 'Nutrient data not available';
  }
}
