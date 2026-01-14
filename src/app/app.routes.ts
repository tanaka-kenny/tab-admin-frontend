import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full'
  },
  {
    path: 'profile',
    loadChildren: async () => (await import('./features/profile/profile.routes')).routes
  },
  {
    path: 'auth',
    loadChildren: async () => (await import('./features/auth/auth.routes')).routes
  }
];
