import { Component, Input } from '@angular/core';

@Component({
  selector: 'sidebar',
  imports: [],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  @Input() sidebarColor: string = '#171717';
  @Input() logo: string = '';
  @Input() logoBackgroundColor: string = '';
  @Input() title: string = '';
}
