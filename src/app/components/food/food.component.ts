import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Food, Nutrient } from '../../interfaces/meal.interface/meal.interface';
import { FoodService } from '../../service/food-service.service';
import { MealService } from '../../service/meal-service.service';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-foods',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './food.component.html',
  styleUrls: ['./food.component.css']
})
export class FoodsComponent implements OnInit {
  foodData: Food[] = []; // Datos del alimento
  foodItem: string = 'chicken'; // Cambia esto al valor que necesites
  foodNutritionalInfo: { [key: string]: { calories: number, protein: number, carbs: number, fat: number } } = {};
  selectedMeal: string = ''; // Almacena la comida seleccionada

  constructor(private foodService: FoodService, private mealService: MealService) {}
  
  ngOnInit(): void {
    this.searchFood(); // Llama a la búsqueda inicial
  }

  searchFood(): void {
    if (!this.foodItem.trim()) { // Verifica si foodItem está vacío o solo contiene espacios
      this.foodData = []; // Vacía la lista de alimentos
      return; // Salir del método si está vacío
    }
  
    this.foodService.getFood(this.foodItem).subscribe((data: { foods: Food[] }) => {
      const uniqueDescriptions = new Set<string>();
      const uniqueFoods: Food[] = [];
  
      data.foods.forEach(food => {
        if (food.description.toLowerCase().includes(this.foodItem.toLowerCase()) && !uniqueDescriptions.has(food.description.toLowerCase())) {
          uniqueDescriptions.add(food.description.toLowerCase());
          uniqueFoods.push(food);
        }
      });
  
      this.foodData = uniqueFoods.slice(0, 13);
  
      // Obtener información nutricional
      this.foodData.forEach(food => {
        const calories = food.foodNutrients.find(n => n.nutrientName === 'Energy')?.value || 0;
        const protein = food.foodNutrients.find(n => n.nutrientName === 'Protein')?.value || 0;
        const carbs = food.foodNutrients.find(n => n.nutrientName === 'Carbohydrate, by difference')?.value || 0;
        const fat = food.foodNutrients.find(n => n.nutrientName === 'Total lipid (fat)')?.value || 0;
  
        this.foodNutritionalInfo[food.description] = { calories, protein, carbs, fat };
      });
    });
  }
  

  onSearchChange(): void {
    this.searchFood(); // Llama a la búsqueda cada vez que cambie el input
  }

  addFoodToMeal(food: Food) {
    // Añadir el alimento a la comida seleccionada
    if (this.selectedMeal) {
      this.mealService.addFoodToMeal(food, this.selectedMeal);
      this.selectedMeal = ''; // Reiniciar la selección para ese alimento
    }
  }
}