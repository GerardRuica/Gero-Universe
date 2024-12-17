import { Component, Input } from '@angular/core';
import { BasicCardComponent } from '../../../../shared/cards/basic-card/basic-card.component';
import { TagComponent } from '../../../../shared/ui/tag/tag.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'recipe-card',
  imports: [BasicCardComponent, TagComponent, CommonModule],
  templateUrl: './recipe-card.component.html',
  styleUrl: './recipe-card.component.scss',
})
export class RecipeCardComponent {
  @Input() imageSrc: string = '';
  @Input() title: string = '';
  @Input() principalIngredients: string[] = [];
  @Input() time: string = '';
  @Input() difficulty: string = '';
  @Input() people!: number;
}
