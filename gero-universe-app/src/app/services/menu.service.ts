import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  private closeAllMenusSubject = new Subject<void>();
  closeAllMenus$ = this.closeAllMenusSubject.asObservable();

  public closeAllMenus() {
    this.closeAllMenusSubject.next();
  }
}
