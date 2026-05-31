import { Component, input } from '@angular/core';
import { FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputErrors } from "../input-errors/input-errors";

@Component({
  selector: 'app-select-input',
  imports: [ReactiveFormsModule, InputErrors],
  templateUrl: './select-input.html',
  styleUrl: './select-input.scss',
})
export class SelectInput {
  formGroup = input.required<FormGroup>()
  control = input.required<string>()
  label = input.required<string>()
  options = input.required<{ key: any; value: any }[]>()
  hint = input<string>()

  isRequired() {
    return this.formGroup().get(this.control())?.hasValidator(Validators.required)
  }

}
