import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Ingredient } from '../../types/yourChefBasicTypes';
import { TranslateModule } from '@ngx-translate/core';
import { IngredientMenuButtonComponent } from '../ingredient-menu-button/ingredient-menu-button.component';
import { IngredientService } from '../../services/ingredient.service';

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
  /** Ingredient to show in card */
  @Input() ingredient: Ingredient = {};

  /** Event to indicate whether the ingredient has been deleted or not */
  @Output() public onUpdateIngredients = new EventEmitter<boolean>();

  /** Background color of the card */
  public backgroundColor: string = '';
  /** Ingredient name */
  public ingredientName: string = '';
  public isLoading: boolean = true;

  /**
   * Initializes all dependencies
   *
   * @param {IngredientService} ingredientService Service manage ingredients
   */
  constructor(private ingredientService: IngredientService) {}

  /**
   * Initialize component
   */
  public async ngOnInit(): Promise<void> {
    try {
      this.setBackgroundColor();
      this.ingredientName = await this.ingredientService.getIngredientName(
        this.ingredient.identifier || ''
      );
    } catch (error) {
      throw error;
    }
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
   * Function that emits update ingredients
   *
   * @param updateIngredients
   */
  public updateIngredients(updateIngredients: boolean): void {
    if (updateIngredients) this.onUpdateIngredients.emit(true);
  }
}
