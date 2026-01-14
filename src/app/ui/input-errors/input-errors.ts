import { KeyValuePipe } from '@angular/common';
import { Component, input } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-input-errors',
  imports: [KeyValuePipe],
  templateUrl: './input-errors.html',
  styleUrl: './input-errors.scss',
})
export class InputErrors {
  control = input.required<AbstractControl>();

  errorMessages: Record<string, string> = {
    required: 'This field is required',
    email: 'This field must be a valid email'
  };

}
