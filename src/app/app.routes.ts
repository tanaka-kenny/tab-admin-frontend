import { Routes } from '@angular/router';
import { ProfileService } from './profile/data-access/services/profile-service';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full'
  },
  {
    path: 'profile',
    loadChildren: async () => (await import('./profile/profile.routes')).routes,
    providers: [ProfileService]
  },
  {
    path: 'auth',
    loadChildren: async () => (await import('./auth/auth.routes')).routes,
  },
  {
    path: 'landing',
    loadChildren: async () => (await import('./landing/landing.routes')).routes,
    providers: [ProfileService]
  }
];
