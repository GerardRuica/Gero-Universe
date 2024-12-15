import { Component } from '@angular/core';
import { SidebarComponent } from '../../../../shared/layout/sidebar/sidebar.component';
import { SidebarItemComponent } from '../../../../shared/layout/sidebar-item/sidebar-item.component';

@Component({
  selector: 'sidebar-your-chef',
  imports: [SidebarComponent, SidebarItemComponent],
  templateUrl: './sidebar-your-chef.component.html',
  styleUrl: './sidebar-your-chef.component.scss',
})
export class SidebarYourChefComponent {}
