import { Component, OnInit } from '@angular/core';
import { SearchInputComponent } from '../../../../shared/inputs/search-input/search-input.component';
import { TranslateModule } from '@ngx-translate/core';
import { IngredientCardComponent } from '../../components/ingredient-card/ingredient-card.component';
import { Ingredient } from '../../types/yourChefBasicTypes';
import { HttpClient } from '@angular/common/http';
import { IngredientService } from '../../services/ingredient.service';

@Component({
  selector: 'ingredients-page',
  imports: [SearchInputComponent, TranslateModule, IngredientCardComponent],
  templateUrl: './ingredients-page.component.html',
  styleUrl: './ingredients-page.component.scss',
})
export class IngredientsPageComponent implements OnInit {
  public ingredients: Ingredient[] = [];

  /**
   * Constructor to import all dependencies
   *
   * @param {IngredientService} ingredientService
   */
  constructor(
    private ingredientService: IngredientService,
    private http: HttpClient
  ) {}

  public async ngOnInit(): Promise<void> {
    try {
      this.ingredients = await this.ingredientService.getAllIngredients();
    } catch (error) {
      console.log;
      console.log('AAAAadasdss');
      throw error;
    }
  }
}
