import { Component, OnInit } from '@angular/core';
import { SearchInputComponent } from '../../../../shared/inputs/search-input/search-input.component';
import { TranslateModule } from '@ngx-translate/core';
import { IngredientCardComponent } from '../../components/ingredient-card/ingredient-card.component';
import { Ingredient } from '../../types/yourChefBasicTypes';
import { IngredientService } from '../../services/ingredient.service';
import { BasicButtonComponent } from '../../../../shared/basic/buttons/basic-button/basic-button.component';
import { ModalService } from '../../../../services/modal-service/modal-service.service';

@Component({
  selector: 'ingredients-page',
  imports: [
    SearchInputComponent,
    TranslateModule,
    IngredientCardComponent,
    BasicButtonComponent,
  ],
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
    private modalService: ModalService
  ) {}

  public async ngOnInit(): Promise<void> {
    try {
      this.ingredients = await this.ingredientService.getAllIngredients();
    } catch (error) {
      throw error;
    }
  }

  public openCreateIngredient() {}
}
