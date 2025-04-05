import { Component, OnInit } from '@angular/core';
import { SearchInputComponent } from '../../../../shared/inputs/search-input/search-input.component';
import { TranslateModule } from '@ngx-translate/core';
import { IngredientCardComponent } from '../../components/ingredient-card/ingredient-card.component';
import { Ingredient } from '../../types/yourChefBasicTypes';
import { IngredientService } from '../../services/ingredient.service';
import { BasicButtonComponent } from '../../../../shared/basic/buttons/basic-button/basic-button.component';
import { CreateIngredientModalComponent } from '../../components/create-ingredient-modal/create-ingredient-modal.component';
import { BasicDialogComponent } from '../../../../shared/ui/basic-dialog/basic-dialog.component';
import { MenuButtonComponent } from '../../../../shared/basic/buttons/menu-button/menu-button.component';

/**
 * Ingredients page where all ingredients are showed
 */
@Component({
  selector: 'ingredients-page',
  imports: [
    SearchInputComponent,
    TranslateModule,
    IngredientCardComponent,
    BasicButtonComponent,
    CreateIngredientModalComponent,
    BasicDialogComponent,
  ],
  templateUrl: './ingredients-page.component.html',
  styleUrl: './ingredients-page.component.scss',
})
export class IngredientsPageComponent implements OnInit {
  /** All ingredients from DB */
  public ingredients: Ingredient[] = [];
  /** Boolean indicating if create ingredient modal is opened or closed */
  public openedCreateModal: boolean = false;

  /**
   * Constructor to import all dependencies
   *
   * @param {IngredientService} ingredientService Service to get all ingredients
   */
  constructor(private ingredientService: IngredientService) {}

  /**
   * Initializes component
   */
  public async ngOnInit(): Promise<void> {
    try {
      this.ingredients = await this.ingredientService.getAllIngredients();
    } catch (error) {
      throw error;
    }
  }

  /**
   * Open create ingredient modal
   */
  public openCreateIngredient() {
    this.openedCreateModal = !this.openedCreateModal;
  }

  /** Update ingredients */
  public async updateIngredients(createdIngredient: boolean): Promise<void> {
    try {
      if (createdIngredient)
        this.ingredients = await this.ingredientService.getAllIngredients();

      this.openedCreateModal = false;
    } catch (error) {
      throw error;
    }
  }
}
