import { Component, OnInit } from '@angular/core';
import { SearchInputComponent } from '../../../../shared/inputs/search-input/search-input.component';
import { TranslateModule } from '@ngx-translate/core';
import { IngredientCardComponent } from '../../components/ingredient-card/ingredient-card.component';
import { Ingredient } from '../../types/yourChefBasicTypes';
import { IngredientService } from '../../services/ingredient.service';
import { BasicButtonComponent } from '../../../../shared/basic/buttons/basic-button/basic-button.component';
import { ModalComponent } from '../../../../shared/ui/modal/modal.component';
import { FormInputComponent } from '../../../../shared/inputs/form-input/form-input.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
    ModalComponent,
    FormInputComponent,
  ],
  templateUrl: './ingredients-page.component.html',
  styleUrl: './ingredients-page.component.scss',
})
export class IngredientsPageComponent implements OnInit {
  /** All ingredients from DB */
  public ingredients: Ingredient[] = [];
  /** Boolean indicating if create ingredient modal is opened or closed */
  public openedCreateModal: boolean = false;
  /** Form of create ingredient modal */
  public createIngredientForm!: FormGroup;

  /**
   * Constructor to import all dependencies
   *
   * @param {IngredientService} ingredientService
   */
  constructor(
    private ingredientService: IngredientService,
    private formBuilder: FormBuilder
  ) {}

  /**
   * Initializes component
   */
  public async ngOnInit(): Promise<void> {
    try {
      this.createIngredientForm = this.formBuilder.group({
        ingredientName: ['', [Validators.required]],
        ingredientDesc: [''],
        ingredientType: ['', Validators.required],
      });

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

  /**
   * Close create ingredient modal
   */
  public closeCreateIngredient() {
    this.openedCreateModal = false;
  }

  /**
   * Create an ingredient with data of the form of the create ingredient modal
   */
  public createIngredient() {
    if (this.createIngredientForm.valid) {
      this.closeCreateIngredient();
    }
  }
}
