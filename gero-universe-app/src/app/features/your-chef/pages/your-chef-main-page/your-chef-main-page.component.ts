import { Component } from '@angular/core';
import { SidebarYourChefComponent } from '../../components/sidebar-your-chef/sidebar-your-chef.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'your-chef-main-page',
  imports: [SidebarYourChefComponent, RouterOutlet],
  templateUrl: './your-chef-main-page.component.html',
  styleUrl: './your-chef-main-page.component.scss',
})
export class YourChefMainPageComponent {}
