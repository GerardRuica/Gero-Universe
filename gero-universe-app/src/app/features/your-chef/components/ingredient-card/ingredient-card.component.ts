import { Component, Input, OnInit } from '@angular/core';
import { Ingredient } from '../../types/yourChefBasicTypes';

/**
 * Component to make an ingredient card
 */
@Component({
  selector: 'ingredient-card',
  imports: [],
  templateUrl: './ingredient-card.component.html',
  styleUrl: './ingredient-card.component.scss',
})
export class IngredientCardComponent implements OnInit {
  /** Ingredient to show in card */
  @Input() ingredient: Ingredient = { name: '', type: '' };
  @Input() ingredientName: string = '';
  @Input() ingredientType: string = '';

  /** Background color of the card */
  public backgroundColor: string = '';

  /**
   * Initialize component
   */
  public ngOnInit(): void {
    this.setBackgroundColor();
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

    this.backgroundColor = colors[this.ingredientType] || 'gray';
  }
}
