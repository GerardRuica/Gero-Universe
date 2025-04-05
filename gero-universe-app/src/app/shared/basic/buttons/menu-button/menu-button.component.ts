import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';

import { Subscription } from 'rxjs';
import { MenuService } from '../../../../services/menu.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'menu-button',
  templateUrl: './menu-button.component.html',
  styleUrls: ['./menu-button.component.scss'],
  imports: [CommonModule],
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

  @HostListener('document:click', ['$event'])
  public onClickOutside(event: Event): void {
    const target = event.target as HTMLElement;
    if (!target.closest('.menu-wrapper')) {
      this.isMenuOpen = false;
    }
  }

  public ngOnDestroy(): void {
    this.closeSub.unsubscribe();
  }

  public toggleMenu(event: Event): void {
    if (!this.isMenuOpen) {
      this.menuService.closeAllMenus();
    }
    this.isMenuOpen = !this.isMenuOpen;
  }
}
