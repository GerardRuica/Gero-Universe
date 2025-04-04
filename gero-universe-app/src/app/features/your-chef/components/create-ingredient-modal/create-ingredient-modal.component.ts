import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ModalComponent } from '../../../../shared/ui/modal/modal.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { SelectOption } from '../../../../types/componentsTypes';
import { INGREDIENT_TYPES } from '../../constants/ingredientsConstants';
import { IngredientService } from '../../services/ingredient.service';
import { Ingredient } from '../../types/yourChefBasicTypes';
import { FormInputComponent } from '../../../../shared/inputs/form-input/form-input.component';
import { FormSelectComponent } from '../../../../shared/basic/selects/form-select/form-select.component';
import { InputErrorComponent } from '../../../../shared/inputs/input-error/input-error.component';

@Component({
  selector: 'create-ingredient-modal',
  imports: [
    TranslateModule,
    ModalComponent,
    FormInputComponent,
    ReactiveFormsModule,
    InputErrorComponent,
    FormSelectComponent,
    TranslateModule,
  ],
  templateUrl: './create-ingredient-modal.component.html',
  styleUrl: './create-ingredient-modal.component.scss',
})
export class CreateIngredientModalComponent implements OnInit {
  /** Boolean indicating if create ingredient modal is opened or closed */
  @Input() public openedCreateModal: boolean = false;

  /** Value changes */
  @Output() public createdIngredient = new EventEmitter<boolean>();

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
    } catch (error) {
      throw error;
    }
  }

  /**
   * Close create ingredient modal
   */
  public closeCreateIngredient() {
    this.openedCreateModal = false;
    this.ingredientNameError = '';
    this.initializeForm();
    this.createdIngredient.emit(false);
  }

  /**
   * Create an ingredient with data of the form of the create ingredient modal
   */
  public async createIngredient(): Promise<void> {
    try {
      if (this.createIngredientForm.valid) {
        const ingredient: Ingredient = {
          name: this.createIngredientForm.get('ingredientName')?.value,
          description: this.createIngredientForm.get('ingredientDesc')?.value,
          type: this.createIngredientForm.get('ingredientType')?.value,
        };

        await this.ingredientService.createIngredient(ingredient);
        this.createdIngredient.emit(true);

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
