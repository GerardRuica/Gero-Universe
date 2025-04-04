import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Ingredient } from '../../types/yourChefBasicTypes';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { MenuButtonComponent } from '../../../../shared/basic/buttons/menu-button/menu-button.component';
import { IngredientMenuButtonComponent } from '../ingredient-menu-button/ingredient-menu-button.component';

/**
 * Component to make an ingredient card
 */
@Component({
  selector: 'ingredient-card',
  imports: [TranslateModule, IngredientMenuButtonComponent],
  templateUrl: './ingredient-card.component.html',
  styleUrl: './ingredient-card.component.scss',
})
export class IngredientCardComponent implements OnInit {
  /** Path of the translations of ingredients */
  private readonly INGREDIENT_I18_PATH = 'APPS.YOUR_CHEF.INGREDIENTS.';

  /** Ingredient to show in card */
  @Input() ingredient: Ingredient = {};

  /** Event to indicate whether the ingredient has been deleted or not */
  @Output() public onUpdateIngredients = new EventEmitter<boolean>();

  /** Background color of the card */
  public backgroundColor: string = '';
  /** Ingredient name */
  public ingredientName: string = '';

  /**
   * Initializes all dependencies
   *
   * @param {TranslateService} translateService Service to translate
   */
  constructor(private translateService: TranslateService) {}

  /**
   * Initialize component
   */
  public ngOnInit(): void {
    this.setBackgroundColor();
    this.getIngredientName();
  }

  /**
   * Set background color of the cad depends of ingredient type
   */
  private setBackgroundColor() {
    const colors: { [key: string]: string } = {
      meat: '#FF5730',
      fish: '#B2F0FF',
      vegetable: '#5F851B',
      specie: '#7B857F',
      legume: '#F2A815',
      oil: '#FED070',
      fat: '#FED070',
      mushroom: '#D8CEB8',
      fruit: '#F88D36',
      cereal: '#FED070',
      seafood: '#1B98B9',
      liquid: '#A8CEF8',
    };

    this.backgroundColor =
      colors[this.ingredient.type?.toLocaleLowerCase() ?? 'default'] || 'gray';
  }

  /**
   * Get ingredient name
   */
  private getIngredientName() {
    const ingredientKey: string =
      this.INGREDIENT_I18_PATH + this.ingredient.identifier;
    this.translateService.get(ingredientKey).subscribe((translatedValue) => {
      if (translatedValue !== ingredientKey) {
        this.ingredientName = translatedValue;
      } else {
        this.ingredientName = this.ingredient.name || '';
      }
    });
  }

  /**
   * Function that emits update ingredients
   *
   * @param updateIngredients
   */
  public updateIngredients(updateIngredients: boolean): void {
    if (updateIngredients) this.onUpdateIngredients.emit(true);
  }
}
