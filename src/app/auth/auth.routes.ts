import { Routes } from "@angular/router";

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch:'full'
  },
  {
    path: 'login',
    loadComponent: async () => (await import('./login/login')).Login
  },  {
    path: 'reset',
    loadComponent: async () => (await import('./reset-auth/reset-auth')).ResetAuth
  }
]