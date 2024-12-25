import { CommonModule } from '@angular/common';
import { Component, HostListener, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';

/**
 * Component that implements a simple sidebar
 */
@Component({
  selector: 'sidebar',
  imports: [CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  /** Background color of the sidebar */
  @Input() sidebarColor: string = '#171717';
  /** Logo of the sidebar */
  @Input() logo: string = '';
  /** Background color of the logo of the sidebar */
  @Input() logoBackgroundColor: string = '';
  /** Title of the sidebar */
  @Input() title: string = '';

  /** Width of the screen */
  public screenWidth: number = 0;
  /** Boolean that indicates if sidebar is opened or closed */
  public opened: boolean = false;
  /** Boolean that indicates if screen is small or big */
  public isSmallScreen: boolean = false;

  /** Initializes components elements */
  public ngOnInit(): void {
    this.onResize();
  }

  /**
   * Listener that listens screen width
   *
   * @param {Event} event Web event
   */
  @HostListener('window:resize', ['$event'])
  private onResize(event?: Event) {
    if (typeof window !== 'undefined') {
      this.screenWidth = window.innerWidth;
      this.checkScreenSize();
    }
  }

  /**
   * Listener that listens if user click outside navbar and not clicks toggle button
   *
   * @param {Event} event  Web event
   */
  @HostListener('document:click', ['$event'])
  private onClickOutside(event: MouseEvent) {
    if (this.isSmallScreen) {
      const sidebarElement = document.querySelector('.sidebar');
      const clickedInsideSidebar = sidebarElement?.contains(
        event.target as Node
      );

      const toggleButton = document.querySelector('.toggle-button');
      const clickedOnToggleButton = toggleButton?.contains(
        event.target as Node
      );

      if (!clickedInsideSidebar && !clickedOnToggleButton && this.opened) {
        this.opened = false;
      }
    }
  }

  /** Checks screen size */
  private checkScreenSize() {
    this.isSmallScreen = this.screenWidth < 900;
  }

  /** Change status of the sidebar to open or to closed */
  public toggleSidebar() {
    this.opened = !this.opened;
  }
}
