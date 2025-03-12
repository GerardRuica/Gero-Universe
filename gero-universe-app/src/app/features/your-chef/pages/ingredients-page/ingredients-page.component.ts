import { Component } from '@angular/core';
import { SearchInputComponent } from '../../../../shared/inputs/search-input/search-input.component';
import { TranslateModule } from '@ngx-translate/core';
import { IngredientCardComponent } from '../../components/ingredient-card/ingredient-card.component';

@Component({
  selector: 'ingredients-page',
  imports: [SearchInputComponent, TranslateModule, IngredientCardComponent],
  templateUrl: './ingredients-page.component.html',
  styleUrl: './ingredients-page.component.scss',
})
export class IngredientsPageComponent {}
