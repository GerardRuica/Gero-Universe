import { Component } from '@angular/core';
import { SidebarComponent } from '../../../../shared/layout/sidebar/sidebar.component';
import { SidebarItemContainerComponent } from '../../../../shared/layout/sidebar-item-container/sidebar-item-container.component';
import { TranslateModule } from '@ngx-translate/core';
import { SidebarItemComponent } from '../../../../shared/layout/sidebar-item/sidebar-item.component';

@Component({
  selector: 'sidebar-your-chef',
  imports: [
    SidebarComponent,
    SidebarItemContainerComponent,
    TranslateModule,
    SidebarItemComponent,
  ],
  templateUrl: './sidebar-your-chef.component.html',
  styleUrl: './sidebar-your-chef.component.scss',
})
export class SidebarYourChefComponent {}
