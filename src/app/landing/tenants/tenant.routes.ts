import { Routes } from "@angular/router";

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./tenants.component').then(m => m.TenantsComponent)
  },
  {
    path: 'add',
    loadComponent: () => import('./add-tenant/add-tenant.component').then(m => m.AddTenantComponent)
  },
  {
    path: 'edit',
    loadComponent: () => import('./add-tenant/add-tenant.component').then(m => m.AddTenantComponent)
  }
]