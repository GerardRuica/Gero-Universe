import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Ingredient } from '../types/yourChefBasicTypes';
import { firstValueFrom, lastValueFrom } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { INGREDIENT_I18_PATH } from '../constants/ingredientsConstants';
import { TranslateService } from '@ngx-translate/core';
import { error } from 'console';

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
  constructor(
    private http: HttpClient,
    private translateService: TranslateService
  ) {}

  /**
   * Get all ingredients from DB
   *
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

  /**
   * Create ingredient on app
   *
   * @param {Ingredient} ingredientData Ingredient data to create an ingredient
   */
  public async createIngredient(ingredientData: Ingredient): Promise<void> {
    try {
      await firstValueFrom(
        this.http.post(
          `${environment.API_URL}/your-chef/ingredients/addIngredient`,
          ingredientData,
          {
            withCredentials: true,
          }
        )
      );
    } catch (error) {
      throw error;
    }
  }

  /**
   * Update ingredient by id
   *
   * @param {string} ingredientId Ingredient id
   * @param {Partial<Ingredient>} ingredientData Ingredient data to update
   */
  public async updateIngredientById(
    ingredientId: string,
    ingredientData: Partial<Ingredient>
  ) {
    try {
      await firstValueFrom(
        this.http.put(
          `${environment.API_URL}/your-chef/ingredients/${ingredientId}`,
          ingredientData,
          {
            withCredentials: true,
          }
        )
      );
    } catch (error) {
      throw error;
    }
  }

  /**
   * Delete an ingredient by id
   *
   * @param {string} ingredientId Ingredient id
   */
  public async deleteIngredientById(ingredientId: string) {
    try {
      await firstValueFrom(
        this.http.delete(
          `${environment.API_URL}/your-chef/ingredients/${ingredientId}`,
          {
            withCredentials: true,
          }
        )
      );
    } catch (error) {
      throw error;
    }
  }

  /**
   * Function to get translated ingredient name with their ingredient identifier
   *
   * @param ingredientIdentifier
   * @returns
   */
  public async getIngredientName(
    ingredientIdentifier: string
  ): Promise<string> {
    try {
      const ingredientKey: string = INGREDIENT_I18_PATH + ingredientIdentifier;
      const translatedValue = await lastValueFrom(
        this.translateService.get(ingredientKey)
      );

      let ingredientName: string = '';
      if (translatedValue !== ingredientKey) {
        ingredientName = translatedValue;
      } else {
        ingredientName = ingredientIdentifier || '';
      }

      return ingredientName;
    } catch (error) {
      throw error;
    }
  }
}
