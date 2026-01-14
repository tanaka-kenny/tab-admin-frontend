import { Routes } from "@angular/router";

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'sign-up',
    pathMatch: 'full'
  },
  {
    path: 'sign-up',
    loadComponent: () => import('./sign-up/sign-up').then(m => m.SignUp)
  },
  {
    path: 'details',
    loadComponent: () => import('./details/details').then(m => m.Details)
  }
]