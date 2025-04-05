import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MenuButtonComponent } from '../../../../shared/basic/buttons/menu-button/menu-button.component';
import { MenuSubButtonComponent } from '../../../../shared/basic/buttons/menu-sub-button/menu-sub-button.component';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { BasicDialogComponent } from '../../../../shared/ui/basic-dialog/basic-dialog.component';
import { IngredientService } from '../../services/ingredient.service';

/**
 * Component tha implements menu button of the ingredients
 */
@Component({
  selector: 'ingredient-menu-button',
  imports: [
    MenuButtonComponent,
    MenuSubButtonComponent,
    CommonModule,
    TranslateModule,
    BasicDialogComponent,
  ],
  templateUrl: './ingredient-menu-button.component.html',
  styleUrl: './ingredient-menu-button.component.scss',
})
export class IngredientMenuButtonComponent {
  /** Ingredient id of the current ingredient */
  @Input() public ingredientId?: string = '';
  /** Event to indicate whether the ingredient has been deleted or not */
  @Output() public deletedIngredient = new EventEmitter<boolean>();

  /** Indicates if delete dialog is opened or not */
  public deleteDialogOpened: boolean = false;

  /**
   * Constructor that import all dependencies
   *
   * @param {IngredientService} ingredientService Service that allows delete and edit an ingredient
   */
  constructor(private ingredientService: IngredientService) {}

  /**
   * Action when click edit button
   */
  public openEdit(): void {}

  /**
   * Open delete ingredient dialog
   */
  public toggleDeleteDialog(event: string | Event): void {
    if (event == 'close') {
      this.deleteDialogOpened = false;
    } else {
      this.deleteDialogOpened = !this.deleteDialogOpened;
    }
  }

  /** Delete an ingredient */
  public async deleteIngredient(): Promise<void> {
    try {
      await this.ingredientService.deleteIngredientById(this.ingredientId);
      this.deleteDialogOpened = false;
      this.deletedIngredient.emit(true);
    } catch (error: any) {
      throw error;
    }
  }
}
