import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { YourChefMainPageComponent } from './features/your-chef/pages/your-chef-main-page/your-chef-main-page.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'your-chef',
    component: YourChefMainPageComponent,
  },
];
