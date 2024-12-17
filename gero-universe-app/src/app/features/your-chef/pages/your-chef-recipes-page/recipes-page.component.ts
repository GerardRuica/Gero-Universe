import { Component } from '@angular/core';
import { SearchInputComponent } from '../../../../shared/inputs/search-input/search-input.component';
import { BasicCardComponent } from '../../../../shared/cards/basic-card/basic-card.component';

@Component({
  selector: 'recipes-page',
  imports: [SearchInputComponent, BasicCardComponent],
  templateUrl: './recipes-page.component.html',
  styleUrl: './recipes-page.component.scss',
})
export class RecipesPageComponent {}
