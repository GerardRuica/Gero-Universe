import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
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
  selector: 'ingredient-modal',
  imports: [
    TranslateModule,
    ModalComponent,
    FormInputComponent,
    ReactiveFormsModule,
    InputErrorComponent,
    FormSelectComponent,
  ],
  templateUrl: './ingredient-modal.component.html',
  styleUrl: './ingredient-modal.component.scss',
})
export class CreateIngredientModalComponent implements OnInit, OnChanges {
  /** Boolean indicating if create ingredient modal is opened or closed */
  @Input() public openedCreateModal: boolean = false;
  /** Ingredient info of the current ingredient */
  @Input() public ingredient?: Ingredient;
  /** Value changes */
  @Output() public updatedIngredient = new EventEmitter<boolean>();

  /** Form of create ingredient modal */
  public ingredientForm!: FormGroup;
  /** Options of the select of the modal */
  public ingredientTypes: SelectOption[] = INGREDIENT_TYPES;
  /** Indicates error name of an error */
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
      this.initializeCreateForm();
      if (this.ingredient) await this.initializeUpdateForm();
    } catch (error) {
      throw error;
    }
  }

  /**
   * Update update form when ingredient has a change
   *
   * @param {SimpleChanges} changes Change when ingredient change
   */
  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['ingredient']) {
      this.initializeUpdateForm();
    }
  }

  /**
   * Close create ingredient modal
   */
  public closeIngredientModal(createdOrUpdated: boolean) {
    this.openedCreateModal = false;
    this.ingredientNameError = '';

    if (this.ingredient) this.initializeUpdateForm();
    else this.initializeCreateForm();

    this.updatedIngredient.emit(createdOrUpdated);
  }

  /**
   * Create an ingredient with data of the form of the create ingredient modal
   */
  public async createIngredient(): Promise<void> {
    try {
      if (this.ingredientForm.valid) {
        const ingredient: Ingredient = {
          name: this.ingredientForm.get('ingredientName')?.value,
          description: this.ingredientForm.get('ingredientDesc')?.value,
          type: this.ingredientForm.get('ingredientType')?.value,
        };

        await this.ingredientService.createIngredient(ingredient);

        this.closeIngredientModal(true);
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

  /**
   * Update an existing ingredient
   */
  public async updateIngredient(): Promise<void> {
    try {
      if (this.ingredientForm.valid) {
        const ingredientData: Partial<Ingredient> = {
          name: this.ingredientForm.get('ingredientName')?.value,
          description: this.ingredientForm.get('ingredientDesc')?.value,
          type: this.ingredientForm.get('ingredientType')?.value,
        };

        await this.ingredientService.updateIngredientById(
          this.ingredient?._id || '',
          ingredientData
        );
        this.closeIngredientModal(true);
      }
    } catch (error) {
      throw error;
    }
  }

  /**
   * Initializes create ingredient form
   */
  private initializeCreateForm(): void {
    this.ingredientForm = this.formBuilder.group({
      ingredientName: ['', [Validators.required]],
      ingredientDesc: [''],
      ingredientType: ['', Validators.required],
    });
  }

  /**
   * Initializes update ingredient form
   */
  private async initializeUpdateForm(): Promise<void> {
    try {
      const ingredientName: string =
        await this.ingredientService.getIngredientName(
          this.ingredient?.identifier || ''
        );

      this.ingredientForm = this.formBuilder.group({
        ingredientName: [ingredientName],
        ingredientDesc: [this.ingredient?.description],
        ingredientType: [this.ingredient?.type, Validators.required],
      });

      this.ingredientForm.get('ingredientName')?.disable();
    } catch (error) {
      throw error;
    }
  }
}
