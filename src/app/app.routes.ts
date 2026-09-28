import { Routes } from '@angular/router';
import { FirebaseRegisterService } from './register/data-access/services/firebase-register.service';
import { RegisterService } from './register/data-access/services/register-service';
import { completeProfileGuard, inCompleteProfileGuard } from './shared/data-access/guards/register-status-guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full'
  },
  {
    path: 'profile',
    loadChildren: async () => (await import('./register/register.routes')).routes,
    providers: [FirebaseRegisterService, RegisterService]
  },
  {
    path: 'auth',
    loadChildren: async () => (await import('./auth/auth.routes')).routes,
  },
  {
    path: 'landing',
    loadChildren: async () => (await import('./landing/landing.routes')).routes,
    providers: [FirebaseRegisterService, RegisterService],
    canMatch: [inCompleteProfileGuard]
  }
];
