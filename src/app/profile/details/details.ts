import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { TextInput } from '../../shared/ui/text-input/text-input';
import { SelectOption } from '../../shared/data-access/models/select-option.model';
import { ProfileService } from '../data-access/services/profile-service';
import { AlertService } from '../../shared/data-access/services/alert-service';
import { MessageType } from '../../shared/data-access/models/alert.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-details',
  imports: [ReactiveFormsModule, TextInput],
  templateUrl: './details.html',
  styleUrl: './details.scss',
})
export class Details {

  readonly #formBuilder = inject(FormBuilder);
  readonly #profileService = inject(ProfileService);
  readonly #alertService = inject(AlertService);
  readonly #router = inject(Router);

  isLoading = signal(false);

  detailsForm = this.#formBuilder.nonNullable.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    phoneNumber: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
  })

  provinces: SelectOption[] = provinces.map(key => ({ key, value: key }));

  onSaveDetails() {

    if (this.detailsForm.invalid) {
      this.detailsForm.markAllAsTouched();
      this.detailsForm.markAllAsDirty();
      return;
    }

    this.isLoading.set(true);

    this.#profileService.createCustomerProfile(this.detailsForm.getRawValue()).subscribe({
      next: () => {
        this.isLoading.set(false);
        this.#alertService.addAlert(MessageType.SUCCESS, 'Profile created successfully.');
      },
      error: (err) => {
        this.isLoading.set(false);
        const { error } = err;
        if (error.status === 400) {
          this.#alertService.addAlert(MessageType.DANGER, error.detail);
          this.#router.navigate(['/landing'])
        }
      },
    });
  }
}

const provinces = [
  'Gauteng',
  'Eastern Cape',
  'Western Cape',
  'Northern Cape',
  'Kwa-Zulu Natal',
  'Limpopo',
  'North-West',
  'Free State',
  'Mpumalanga'
]
