import { Routes } from '@angular/router';

export default [
  // Default route
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'standings',
  },

  // Standings
  {
    path: 'standings',
    loadComponent: () => import('./standings/standings.component'),
  },

  // Matches
  {
    path: 'matches',
    loadComponent: () => import('./matches/matches.component'),
  },
] as Routes;
