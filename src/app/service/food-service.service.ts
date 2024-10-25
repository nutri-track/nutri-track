import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Food } from '../interfaces/meal.interface/meal.interface';
@Injectable({
  providedIn: 'root',
})
export class FoodService {
  apiKey = 'WXR98JlYSznuZKeTrZ475zL2bGhiZHlSaL390rxV';
  url = `https://api.nal.usda.gov/fdc/v1/foods/search?api_key=${this.apiKey}`;

  constructor(private http: HttpClient) {}

  getFood(foodItem: string): Observable<{ foods: Food[] }> {
    const url = `https://api.nal.usda.gov/fdc/v1/foods/search?query=${foodItem}&api_key=${this.apiKey}`;
    return this.http.get<{ foods: Food[] }>(url);
  }
  
}




