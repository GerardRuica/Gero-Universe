import { Component, Input, OnInit } from '@angular/core';
import { Ingredient } from '../../types/yourChefBasicTypes';
import { TranslateModule } from '@ngx-translate/core';

/**
 * Component to make an ingredient card
 */
@Component({
  selector: 'ingredient-card',
  imports: [TranslateModule],
  templateUrl: './ingredient-card.component.html',
  styleUrl: './ingredient-card.component.scss',
})
export class IngredientCardComponent implements OnInit {
  private readonly INGREDIENT_I18_PATH = 'APPS.YOUR_CHEF.INGREDIENTS.';

  /** Ingredient to show in card */
  @Input() ingredient: Ingredient = {};

  /** Background color of the card */
  public backgroundColor: string = '';
  /** Ingredient name */
  public ingredientName: string = '';

  /**
   * Initialize component
   */
  public ngOnInit(): void {
    this.setBackgroundColor();
    this.ingredientName = this.INGREDIENT_I18_PATH + this.ingredient.identifier;
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
    this.ingredientName =
      this.INGREDIENT_I18_PATH +
      (this.ingredient?.identifier ?? 'default_ingredient_id');
  }
}
