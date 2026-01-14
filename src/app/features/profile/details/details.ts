import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { TextInput } from '../../../ui/text-input/text-input';
import { SelectInput } from '../../../ui/select-input/select-input';
import { SelectOption } from '../../../data-access/models/select-option.model';

@Component({
  selector: 'app-details',
  imports: [ReactiveFormsModule, TextInput, SelectInput],
  templateUrl: './details.html',
  styleUrl: './details.scss',
})
export class Details {

  readonly #formBuilder = inject(FormBuilder);

  detailsForm = this.#formBuilder.nonNullable.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    street1: ['', Validators.required],
    street2: ['',],
    suburb: ['', Validators.required],
    city: ['', Validators.required],
    postalCode: ['', Validators.required],
    province: ['', Validators.required],
    companyName: ['', Validators.required],
  })

  provinces: SelectOption[] = provinces.map(key => ({ key, value: key }));
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
