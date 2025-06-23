import { Routes } from '@angular/router';
import { privateGuard, publicGuard } from './guards/auth.guard';

export const routes: Routes = [
  // Auth
  {
    canActivateChild: [publicGuard()],
    path: 'auth',
    loadChildren: () => import('./auth/features/auth.routes'),
  },

  // Home
  {
    canActivateChild: [privateGuard()],
    path: 'home',
    loadComponent: () => import('./shared/ui/layout.component'),
    loadChildren: () => import('./views/features/views.routes'),
  },

  // Default route
  {
    path: '**',
    redirectTo: '/home/standings',
  },
];
