import { Routes } from '@angular/router';

export default [
  // Sign-in
  {
    path: 'sign-in',
    loadComponent: () => import('./sign-in/sign-in.component'),
  },
] as Routes;
