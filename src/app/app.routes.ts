import { Routes } from '@angular/router';
import { provideRouter } from '@angular/router';

export const routes: Routes = [
    {
        path: 'home', // Ruta para Home
        loadComponent: () => import('./components/home/home.component').then(m => m.HomeComponent)
      },
    {
        path: 'about', // La ruta para About Us
        loadComponent: () => import('./components/about-us/about-us.component').then(m => m.AboutUsComponent)
      },
      {
        path: 'user',
        loadComponent: () => import('./components/user/user.component').then(m => m.UserComponent)
      },
      {
        path:'foods',
        loadComponent: () => import ('./components/food/food.component').then(m=>m.FoodsComponent)
      },
      {
        path:'meals',
        loadComponent: () => import ('./components/meals/meals.component').then(m=>m.MealsComponent)
      },
      {
        path: '', // Ruta por defecto que redirige a 'home'
        pathMatch: 'full',
        redirectTo: 'home'
      },
      {
        path: '**',
        pathMatch: 'full',
        redirectTo: 'home'
      }
];


export const appConfig = {
    providers: [
      provideRouter(routes)
    ]
  };