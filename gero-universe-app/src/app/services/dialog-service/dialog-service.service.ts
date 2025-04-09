import { Injectable, Injector } from '@angular/core';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { BasicDialogComponent } from '../../shared/ui/basic-dialog/basic-dialog.component';
import { ComponentPortal } from '@angular/cdk/portal';

export interface BasicDialogData {
  type?: string;
  title?: string;
  description?: string;
}

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  private overlayRef?: OverlayRef;

  /**
   * Constructor that import all dependencies
   *
   * @param {Overlay} overlay
   * @param {Injector} injector
   */
  constructor(private overlay: Overlay, private injector: Injector) {}

  /**
   * Function to open dialog
   *
   * @param {BasicDialogData} options Options with inputs of the dialog
   * @returns {Promise<'submit' | 'close'>}
   */
  public openDialog(options: BasicDialogData): Promise<'submit' | 'close'> {
    return new Promise((resolve) => {
      this.overlayRef = this.overlay.create({
        hasBackdrop: true,
        backdropClass: 'cdk-overlay-dark-backdrop',
        positionStrategy: this.overlay
          .position()
          .global()
          .centerHorizontally()
          .centerVertically(),
      });

      const dialogPortal = new ComponentPortal(BasicDialogComponent);
      const componentRef = this.overlayRef.attach(dialogPortal);

      const instance = componentRef.instance;
      instance.opened = true;
      instance.title = options.title;
      instance.description = options.description;
      instance.type = options.type || 'info';

      const cleanup = () => {
        this.overlayRef?.dispose();
        this.overlayRef = undefined;
      };

      // Functionality of submit
      instance.submitEvent.subscribe(() => {
        resolve('submit');
        cleanup();
      });

      // Functionality of close
      instance.closeEvent.subscribe(() => {
        resolve('close');
        cleanup();
      });

      // Functionality when click out of dialog
      this.overlayRef.backdropClick().subscribe(() => {
        resolve('close');
        cleanup();
      });
    });
  }
}
