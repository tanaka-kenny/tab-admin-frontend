import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { TextInput } from '../../../shared/ui/text-input/text-input';
import { TenantService } from '../services/tenant.service';
import { AlertService } from '../../../shared/data-access/services/alert-service';
import { MessageType } from '../../../shared/data-access/models/alert.model';
import { Router } from '@angular/router';
import { AuthService } from '../../../auth/data-access/services/auth-service';
import { switchMap } from 'rxjs';
import { SelectInput } from '../../../shared/ui/select-input/select-input';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import { Tenant } from '../models/tenant.model';

type CurrentStep = 'basic_info' | 'settings_preference' | 'tenant_settings';

@Component({
  selector: 'app-add-tenant',
  standalone: true,
  imports: [ReactiveFormsModule, TextInput, SelectInput, FaIconComponent],
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
  currentStep = signal<CurrentStep>('basic_info');

  faQuestion = faQuestionCircle;

  readonly form = this.#formBuilder.nonNullable.group({
    name: ['', Validators.required],
    useDefaultSettings: [true, [Validators.required]]
  });

  readonly financialSettingsForm = this.#formBuilder.nonNullable.group({
    currency: ['ZAR', [Validators.required]],
    defaultTipPercent: [15, [Validators.required, Validators.min(0)]],
    taxPercent: [15, [Validators.required, Validators.min(0)]],
    pricesIncludeTax: [true, [Validators.required]]
  });

  readonly customerSettingsForm = this.#formBuilder.nonNullable.group({
    waitingTimeWarningMinutes: [5, [Validators.required, Validators.min(0)]],
    waitingTimeCriticalMinutes: [10, [Validators.required, Validators.min(0)]],
    allowCloseWithUnpaidTabs: [false, [Validators.required]],
    qrSessionTimeoutHours: [2, [Validators.required, Validators.min(0)]]
  });

  readonly paymentSettingsForm = this.#formBuilder.nonNullable.group({
    enabledMethods: ['ALL', [Validators.required]]
  });

  yesNoOptions = yesNoOptions;
  currencyOptions = currencyOptions;
  waitingTimeWarningOptions = waitingTimeWarningOptions;
  waitingTimeCriticalOptions = waitingTimeCriticalOptions;
  qrSessionTimeoutOptions = qrSessionTimeoutOptions;
  paymentMethodOptions = paymentMethodOptions;
  defaultSettings = DEFAULT_SETTINGS;

  onSaveWithDefaultConfiguration() {

    if (this.form.invalid) {
      this.#alertService.addAlert(MessageType.WARNING, 'Please fix the errors in the form before saving.');
      this.currentStep.set('basic_info');
      return;
    }

    this.saving.set(true);

    this.#tenantService.createTenant(true, { name: this.form.getRawValue().name })
      .subscribe({
        next: () => {
          this.#alertService.addAlert(MessageType.SUCCESS, 'Tenant saved successfully');
          this.#router.navigate(['/landing/tenants']);
          this.saving.set(false);
        },
        error: () => this.saving.set(false),
      });

  }

  onSaveTenant() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.form.markAllAsDirty();
      return;
    }

    const payload: Pick<Tenant, 'name' | 'settings'> = {
      name: this.form.getRawValue().name,
      settings: {
        financialSettings: this.financialSettingsForm.getRawValue(),
        customerSettings: this.customerSettingsForm.getRawValue(),
        paymentSettings: { enabledMethods: [this.paymentSettingsForm.getRawValue().enabledMethods] },
      }
    }

    this.saving.set(true);
    this.#tenantService.createTenant(this.form.getRawValue().useDefaultSettings, payload)
      .pipe(
        switchMap(() => this.#authService.refreshToken())
      )
      .subscribe({
        next: () => {
          this.#alertService.addAlert(MessageType.SUCCESS, 'Tenant saved successfully');
          this.#router.navigate(['/landing/tenants']);
          this.saving.set(false);
        },
        error: () => this.saving.set(false),
      });
  }


}

const yesNoOptions = [
  { value: 'Yes', key: true },
  { value: 'No', key: false }
];

const DEFAULT_SETTINGS = {
  financial: {
    currency: 'ZAR',
    defaultTipPercent: 10,
    taxPercent: 15,
    pricesIncludeTax: true,
  },
  customer: {
    waitingTimeWarningMinutes: 5,
    waitingTimeCriticalMinutes: 10,
    allowCloseWithUnpaidTabs: false,
    qrSessionTimeoutHours: 2,
  },
  payment: {
    enabledMethods: ['ALL'],
  },
};

const currencyOptions = [
  { key: 'ZAR', value: 'South African Rand (ZAR)' },
]

const paymentMethodOptions = [
  { key: 'ALL', value: 'All' },
]

const waitingTimeWarningOptions = [
  { key: '2', value: '2 minutes' },
  { key: '5', value: '5 minutes' },
  { key: '10', value: '10 minutes' },
]

const waitingTimeCriticalOptions = [
  { key: '5', value: '5 minutes' },
  { key: '10', value: '10 minutes' },
  { key: '15', value: '15 minutes' },
]

const qrSessionTimeoutOptions = [
  { key: '1', value: '1 hour' },
  { key: '2', value: '2 hours' },
  { key: '4', value: '4 hours' },
  { key: '8', value: '8 hours' },
]