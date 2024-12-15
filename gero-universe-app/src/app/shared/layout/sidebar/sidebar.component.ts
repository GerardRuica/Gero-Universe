import { Component, Input } from '@angular/core';
import { SidebarItemComponent } from '../sidebar-item/sidebar-item.component';

@Component({
  selector: 'sidebar',
  imports: [SidebarItemComponent],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  @Input() sidebarColor: string = '#171717';
  @Input() logo: string = '';
  @Input() logoBackgroundColor: string = '';
  @Input() title: string = '';
}
