import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { YourChefMainPageComponent } from './features/your-chef/pages/your-chef-main-page/your-chef-main-page.component';
import { RecipesPageComponent } from './features/your-chef/pages/your-chef-recipes-page/recipes-page.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'your-chef',
    component: YourChefMainPageComponent,
    children: [
      {
        path: 'recipes',
        component: RecipesPageComponent,
      },
    ],
  },
];
