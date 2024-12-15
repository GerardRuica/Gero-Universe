import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'sidebar-item',
  imports: [CommonModule],
  templateUrl: './sidebar-item.component.html',
  styleUrl: './sidebar-item.component.scss',
})
export class SidebarItemComponent {
  @Input() opened: boolean = false;

  public toggleOpened() {
    this.opened = !this.opened;
  }
}
