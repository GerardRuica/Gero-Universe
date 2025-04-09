import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MenuButtonComponent } from '../../../../shared/basic/buttons/menu-button/menu-button.component';
import { MenuSubButtonComponent } from '../../../../shared/basic/buttons/menu-sub-button/menu-sub-button.component';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { BasicDialogComponent } from '../../../../shared/ui/basic-dialog/basic-dialog.component';
import { IngredientService } from '../../services/ingredient.service';
import { CreateIngredientModalComponent } from '../ingredient-modal/ingredient-modal.component';
import { Ingredient } from '../../types/yourChefBasicTypes';
import { DialogService } from '../../../../services/dialog-service/dialog-service.service';

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
    CreateIngredientModalComponent,
  ],
  templateUrl: './ingredient-menu-button.component.html',
  styleUrl: './ingredient-menu-button.component.scss',
})
export class IngredientMenuButtonComponent {
  /** Ingredient info of the current ingredient */
  @Input() public ingredient?: Ingredient;
  /** Event to indicate whether the ingredient has been deleted or not */
  @Output() public updateIngredients = new EventEmitter<boolean>();

  /** Indicates if delete dialog is opened or not */
  public deleteDialogOpened: boolean = false;
  /** Indicates if edit modal is opened or not */
  public editModalOpened: boolean = false;

  /**
   * Constructor that import all dependencies
   *
   * @param {IngredientService} ingredientService Service that allows delete and edit an ingredient
   * @param {DialogService} dialogService Service to open a dialog
   */
  constructor(
    private ingredientService: IngredientService,
    dialogService: DialogService
  ) {}

  /**
   * Open and close delete ingredient dialog
   */
  public toggleDeleteDialog(event: string | Event): void {
    if (event == 'close') {
      this.deleteDialogOpened = false;
    } else {
      this.deleteDialogOpened = !this.deleteDialogOpened;
    }
  }

  /**
   * Open and close edit modal
   */
  public toggleEditModal(updateIngredient: boolean | Event): void {
    if (updateIngredient == false) {
      this.editModalOpened = false;
    } else {
      this.editModalOpened = !this.editModalOpened;
    }
  }

  /** Delete an ingredient */
  public async deleteIngredient(): Promise<void> {
    try {
      await this.ingredientService.deleteIngredientById(
        this.ingredient?._id || ''
      );
      this.deleteDialogOpened = false;
      this.updateIngredients.emit(true);
    } catch (error: any) {
      throw error;
    }
  }

  /**
   * Emits an event indicating that ingredient has been updated
   *
   * @param {boolean} event Boolean event indicating ingredient updating
   */
  public updateIngredient(event: boolean): void {
    this.updateIngredients.emit(true);
    this.editModalOpened = !this.editModalOpened;
  }
}
