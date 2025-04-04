import { Component, HostListener, OnDestroy } from '@angular/core';

import { Subscription } from 'rxjs';
import { MenuService } from '../../../../services/menu.service';

@Component({
  selector: 'menu-button',
  templateUrl: './menu-button.component.html',
  styleUrls: ['./menu-button.component.scss'],
})
export class MenuButtonComponent implements OnDestroy {
  public isMenuOpen: boolean = false;
  private closeSub: Subscription;

  /**
   * Constructor that import all dependencies
   *
   * @param {MenuService} menuService Service to manage opened menus
   */
  public constructor(private menuService: MenuService) {
    this.closeSub = this.menuService.closeAllMenus$.subscribe(() => {
      this.isMenuOpen = false;
    });
  }

  public toggleMenu(): void {
    if (!this.isMenuOpen) {
      this.menuService.closeAllMenus(); // Cierra otros menús antes de abrir este
    }
    this.isMenuOpen = !this.isMenuOpen;
  }

  @HostListener('document:click', ['$event'])
  public onClickOutside(event: Event): void {
    const target = event.target as HTMLElement;
    if (!target.closest('.menu-wrapper')) {
      this.isMenuOpen = false;
    }
  }

  public onEdit(): void {
    this.isMenuOpen = false;
  }

  public onDelete(): void {
    this.isMenuOpen = false;
  }

  public ngOnDestroy(): void {
    this.closeSub.unsubscribe();
  }
}
