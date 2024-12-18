import { CommonModule } from '@angular/common';
import { Component, HostListener, Input } from '@angular/core';

@Component({
  selector: 'sidebar',
  imports: [CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  @Input() sidebarColor: string = '#171717';
  @Input() logo: string = '';
  @Input() logoBackgroundColor: string = '';
  @Input() title: string = '';

  public screenWidth: number = window.innerWidth;
  public opened: boolean = false;
  public isSmallScreen: boolean = false;

  constructor() {
    this.checkScreenSize();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.screenWidth = window.innerWidth;
    this.checkScreenSize();
  }

  public checkScreenSize() {
    this.isSmallScreen = this.screenWidth < 900;
  }

  public toggleSidebar() {
    this.opened = !this.opened;
  }
}
