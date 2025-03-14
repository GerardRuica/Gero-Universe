import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Ingredient } from '../types/yourChefBasicTypes';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../../../environments/environment';

/**
 * Injectable to get and set data of ingredients
 */
@Injectable({
  providedIn: 'root',
})
export class IngredientService {
  /**
   * Constructor that initializes services
   * @param {HttpClient} http Http client to do http petitions
   */
  constructor(private http: HttpClient) {}

  /**
   * Get all ingredients from DB
   * @returns {Ingredient[]} All ingredients
   */
  public async getAllIngredients(): Promise<Ingredient[]> {
    try {
      return await firstValueFrom(
        this.http.get<Ingredient[]>(
          `${environment.API_URL}/your-chef/ingredients/getIngredients`,
          {
            withCredentials: true,
          }
        )
      );
    } catch (error) {
      throw error;
    }
  }
}
