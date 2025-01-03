import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { YourChefMainPageComponent } from './features/your-chef/pages/your-chef-main-page/your-chef-main-page.component';
import { RecipesPageComponent } from './features/your-chef/pages/your-chef-recipes-page/recipes-page.component';
import { LoginPageComponent } from './features/authentication/pages/login-page/login-page.component';
import { RegisterPageComponent } from './features/authentication/pages/register-page/register-page.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'authentication',
    children: [
      {
        path: 'login',
        component: LoginPageComponent,
      },
      {
        path: 'register',
        component: RegisterPageComponent,
      },
    ],
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
