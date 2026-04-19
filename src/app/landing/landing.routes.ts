import { Routes } from '@angular/router';
import { LandingComponent } from './landing.component';
import { EventsService } from './data-access/services/events-service';
import { TenantService } from './tenants/tenant.service';

export const routes: Routes = [
  {
    path: '',
    component: LandingComponent,
    providers: [
      EventsService],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      {
        path: 'dashboard',
        loadComponent: () => import('./dashboard/dashboard').then(m => m.Dashboard),
      },
      {
        path: 'events',
        loadComponent: () => import('./events/events').then(m => m.Events),
      },
      {
        path: 'events/add',
        loadComponent: () => import('./add-event/add-event').then(m => m.AddEvent),
      },
      {
        path: 'events/edit/:uuid',
        loadComponent: () => import('./add-event/add-event').then(m => m.AddEvent),
      },
      {
        path: 'billing',
        loadComponent: () => import('./billing/billing').then(m => m.Billing),
      },
      {
        path: 'waiters',
        loadComponent: () => import('./waiters/waiters').then(m => m.Waiters),
      },
      {
        path: 'tenants',
        loadChildren: () => import('./tenants/tenant.routes').then(m => m.routes),
        providers: [TenantService]
      },
    ],
  },
];