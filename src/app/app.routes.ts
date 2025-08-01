import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'pokemons/page/:page',
    loadComponent: () => import('./pages/pokemons-page/pokemons-page'),
  },
  {
    path: 'pokemons/:id',
    loadComponent: () => import('./pages/pokemon-page/pokemon-page'),
  },
  {
    path: 'about',
    loadComponent: () => import('./pages/about-page/about-page'),
  },
  {
    path: 'pricing',
    loadComponent: () => import('./pages/pricing-page/pricing-page'),
  },
  {
    path: 'contact',
    loadComponent: () => import('./pages/contact-page/contact-page'),
  },

  {
    path: '**',
    redirectTo: () => {
      // const authService = inject(AuthService)

      return 'about';
    },
  },
];
