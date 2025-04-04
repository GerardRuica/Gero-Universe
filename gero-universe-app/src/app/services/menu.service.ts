import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

/**
 * Service to know if a menu is opened
 */
@Injectable({
  providedIn: 'root',
})
export class MenuService {
  private closeAllMenusSubject = new Subject<void>();
  closeAllMenus$ = this.closeAllMenusSubject.asObservable();

  /**
   * Function to close all menus
   */
  public closeAllMenus(): void {
    this.closeAllMenusSubject.next();
  }
}
