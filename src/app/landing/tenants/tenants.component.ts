import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { TenantService } from './tenant.service';
import { RouterLink } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { filter, switchMap } from 'rxjs';
import { Tenant } from './tenant.model';

@Component({
  selector: 'app-tenants',
  standalone: true,
  imports: [RouterLink, DatePipe],
  templateUrl: './tenants.component.html',
  styleUrl: './tenants.component.scss'
})
export class TenantsComponent implements OnInit {

  readonly #tenantService = inject(TenantService);
  readonly #destroyRef = inject(DestroyRef);

  tenantId$ = this.#tenantService.tenantId;
  tenants = signal<Tenant[]>([]);

  ngOnInit(): void {
    this.#loadTenants();
  }


  #loadTenants() {
    this.tenantId$.pipe(
      takeUntilDestroyed(this.#destroyRef),
      filter((tenantId) => !!tenantId),
      switchMap(() => {
        return this.#tenantService.getUserTenants();
      })
    ).subscribe((tenants) => {
      this.tenants.set(tenants);
    });
  }

}
