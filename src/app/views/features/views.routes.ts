import { Routes } from '@angular/router';

export default [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'standings',
  },

  {
    path: 'standings',
    loadComponent: () => import('./standings/standings.component'),
  },

  {
    path: 'matches',
    loadComponent: () => import('./matches/matches.component'),
  },
] as Routes;
