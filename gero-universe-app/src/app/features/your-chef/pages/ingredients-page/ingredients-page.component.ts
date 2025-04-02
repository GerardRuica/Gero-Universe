import { Component, OnInit } from '@angular/core';
import { SearchInputComponent } from '../../../../shared/inputs/search-input/search-input.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { IngredientCardComponent } from '../../components/ingredient-card/ingredient-card.component';
import { Ingredient } from '../../types/yourChefBasicTypes';
import { IngredientService } from '../../services/ingredient.service';
import { BasicButtonComponent } from '../../../../shared/basic/buttons/basic-button/basic-button.component';
import { ModalComponent } from '../../../../shared/ui/modal/modal.component';
import { FormInputComponent } from '../../../../shared/inputs/form-input/form-input.component';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { InputErrorComponent } from '../../../../shared/inputs/input-error/input-error.component';
import { FormSelectComponent } from '../../../../shared/basic/selects/form-select/form-select.component';
import { SelectOption } from '../../../../types/componentsTypes';
import { INGREDIENT_TYPES } from '../../constants/ingredientsConstants';

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
    ReactiveFormsModule,
    InputErrorComponent,
    FormSelectComponent,
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
  /** Options of the select of the modal */
  public ingredientTypes: SelectOption[] = INGREDIENT_TYPES;

  public ingredientNameError: string = '';

  /**
   * Constructor to import all dependencies
   *
   * @param {IngredientService} ingredientService Service to get and create ingredients
   * @param {FormBuilder} formBuilder Service to manage form
   * @param {TranslateService} translateService Service to translate
   */
  constructor(
    private ingredientService: IngredientService,
    private formBuilder: FormBuilder,
    private translateService: TranslateService
  ) {}

  /**
   * Initializes component
   */
  public async ngOnInit(): Promise<void> {
    try {
      this.initializeForm();

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
    this.ingredientNameError = '';
    this.initializeForm();
  }

  /**
   * Create an ingredient with data of the form of the create ingredient modal
   */
  public async createIngredient(): Promise<void> {
    try {
      console.log(
        Object.keys(this.createIngredientForm.controls).filter(
          (key) =>
            this.createIngredientForm.controls[key].value === '' ||
            this.createIngredientForm.controls[key].value === null
        )
      );

      console.log(this.createIngredientForm.get('ingredientType')?.value);

      if (this.createIngredientForm.valid) {
        const ingredient: Ingredient = {
          name: this.createIngredientForm.get('ingredientName')?.value,
          description: this.createIngredientForm.get('ingredientDesc')?.value,
          type: this.createIngredientForm.get('ingredientType')?.value,
        };

        await this.ingredientService.createIngredient(ingredient);
        this.ingredients = await this.ingredientService.getAllIngredients();

        this.closeCreateIngredient();
      } else {
      }
    } catch (error: any) {
      if (error.error.code === 'DUPLICATE_KEY') {
        this.ingredientNameError = this.translateService.instant(
          'APPS.YOUR_CHEF.INGREDIENT.error_existing_ingredient'
        );
      }
      throw error;
    }
  }

  private initializeForm(): void {
    this.createIngredientForm = this.formBuilder.group({
      ingredientName: ['', [Validators.required]],
      ingredientDesc: [''],
      ingredientType: ['', Validators.required],
    });
  }
}
