import { Component } from '@angular/core';
import { SearchInputComponent } from '../../../../shared/inputs/search-input/search-input.component';
import { BasicCardComponent } from '../../../../shared/cards/basic-card/basic-card.component';
import { TagComponent } from '../../../../shared/ui/tag/tag.component';
import { RecipeCardComponent } from '../../components/recipe-card/recipe-card.component';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'recipes-page',
  imports: [SearchInputComponent, RecipeCardComponent, TranslateModule],
  templateUrl: './recipes-page.component.html',
  styleUrl: './recipes-page.component.scss',
})
export class RecipesPageComponent {}
