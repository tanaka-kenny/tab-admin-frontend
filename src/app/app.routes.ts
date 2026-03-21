import { Routes } from '@angular/router';
import { AuthService } from './auth/data-access/services/auth-service';
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
    providers: [AuthService]
  }
];
