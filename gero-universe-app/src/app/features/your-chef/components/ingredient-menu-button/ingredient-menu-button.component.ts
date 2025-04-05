import { Component } from '@angular/core';
import { MenuButtonComponent } from '../../../../shared/basic/buttons/menu-button/menu-button.component';
import { MenuSubButtonComponent } from '../../../../shared/basic/buttons/menu-sub-button/menu-sub-button.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ingredient-menu-button',
  imports: [MenuButtonComponent, MenuSubButtonComponent, CommonModule],
  templateUrl: './ingredient-menu-button.component.html',
  styleUrl: './ingredient-menu-button.component.scss',
})
export class IngredientMenuButtonComponent {
  public onEdit(): void {
    //this.isMenuOpen = false;
  }

  public onDelete(): void {
    //this.isMenuOpen = false;
  }
}
