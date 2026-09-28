import { Routes } from "@angular/router";
import { completeProfileGuard } from "../shared/data-access/guards/register-status-guard";

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
    path: 'invitation',
    loadComponent: () => import('./invitaion-sign-up/invitaion-sign-up').then(m => m.InvitaionSignUp),
    canMatch: [completeProfileGuard]
  },
  {
    path: 'details',
    loadComponent: () => import('./details/details').then(m => m.Details),
    canMatch: [completeProfileGuard]
  }
]