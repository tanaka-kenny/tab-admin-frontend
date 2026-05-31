import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { TenantService } from './services/tenant.service';
import { RouterLink } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { combineLatest, filter, switchMap } from 'rxjs';
import { Tenant } from './models/tenant.model';
import { TenantUserService } from './services/tenant-user.service';
import { TenantUser } from './models/tenant-user.model';
import { AlertService } from '../../shared/data-access/services/alert-service';
import { MessageType } from '../../shared/data-access/models/alert.model';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faPencil, faPlus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-tenants',
  standalone: true,
  imports: [RouterLink, DatePipe, FaIconComponent],
  templateUrl: './tenants.component.html',
  styleUrl: './tenants.component.scss'
})
export class TenantsComponent implements OnInit {

  readonly #tenantService = inject(TenantService);
  readonly #tenantUserService = inject(TenantUserService);
  readonly #alertService = inject(AlertService);
  readonly #destroyRef = inject(DestroyRef);

  tenantId$ = this.#tenantService.tenantId;
  tenantSignal = signal<Tenant | null>(null);
  tenantUsers = signal<TenantUser[]>([]);

  faPlus = faPlus
  faPencil = faPencil

  ngOnInit(): void {
    this.#loadTenant();
  }

  #loadTenant() {
    this.tenantId$.pipe(
      takeUntilDestroyed(this.#destroyRef),
      filter((tenantId) => !!tenantId),
      switchMap(() => {
        return combineLatest({
          tenants: this.#tenantService.getTenant(),
          tenantUsers: this.#tenantUserService.getAllTenantUsers()
        });
      })
    ).subscribe(({ tenants, tenantUsers }) => {
      this.tenantSignal.set(tenants);
      this.tenantUsers.set(tenantUsers);
    });
  }

  onDeleteUser(userId: string) {

    this.#tenantUserService.deleteTenantUser(userId).subscribe({
      next: () => {
        this.tenantUsers.update(users => users.filter(u => u.id !== userId));
        this.#alertService.addAlert(MessageType.SUCCESS, 'User removed from tenant successfully');
      },
      error: (err) => {
        this.#alertService.addAlert(MessageType.DANGER, 'Could not delete user')
      }
    });
  }
}
