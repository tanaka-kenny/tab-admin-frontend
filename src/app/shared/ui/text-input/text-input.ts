import { Component, input } from '@angular/core';
import { FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputErrors } from "../input-errors/input-errors";

@Component({
  selector: 'app-text-input',
  imports: [ReactiveFormsModule, InputErrors],
  templateUrl: './text-input.html',
  styleUrl: './text-input.scss',
})
export class TextInput {
  formGroup = input.required<FormGroup>()
  control = input.required<string>()
  label = input.required<string>()
  type = input('text')
  placeholder = input('')

  isRequired() {
    return this.formGroup().get(this.control())?.hasValidator(Validators.required)
  }

}
