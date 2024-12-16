import { Component } from '@angular/core';
import { SearchInputComponent } from '../../../../shared/inputs/search-input/search-input.component';

@Component({
  selector: 'recipes-page',
  imports: [SearchInputComponent],
  templateUrl: './recipes-page.component.html',
  styleUrl: './recipes-page.component.scss',
})
export class RecipesPageComponent {}
