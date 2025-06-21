import { Routes } from '@angular/router';

export default [
  {
    path: '',
    loadComponent: () => import('./standings/standings.component'),
  },
] as Routes;