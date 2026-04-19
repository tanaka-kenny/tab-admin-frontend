import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { TextInput } from '../../../shared/ui/text-input/text-input';
import { TenantService } from '../tenant.service';
import { AlertService } from '../../../shared/data-access/services/alert-service';
import { MessageType } from '../../../shared/data-access/models/alert.model';
import { Router } from '@angular/router';
import { AuthService } from '../../../auth/data-access/services/auth-service';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-add-tenant',
  standalone: true,
  imports: [ReactiveFormsModule, TextInput],
  templateUrl: './add-tenant.component.html',
  styleUrl: './add-tenant.component.scss'
})
export class AddTenantComponent {

  readonly #formBuilder = inject(FormBuilder);
  readonly #tenantService = inject(TenantService);
  readonly #alertService = inject(AlertService);
  readonly #authService = inject(AuthService);
  readonly #router = inject(Router);

  saving = signal(false);

  readonly form = this.#formBuilder.nonNullable.group({
    name: ['']
  });

  onSaveTenant() {
    console.log(this.form.value);

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.form.markAllAsDirty();
      return;
    }

    this.#tenantService.createTenant(this.form.getRawValue())
      .pipe(
        switchMap(() => this.#authService.refreshToken())
      )
      .subscribe({
        next: () => {
          this.#alertService.addAlert(MessageType.SUCCESS, 'Tenant saved successfully');
          this.#router.navigate(['/landing/tenants']);
        },
        error: () => this.saving.set(false),
      });
  }


}
