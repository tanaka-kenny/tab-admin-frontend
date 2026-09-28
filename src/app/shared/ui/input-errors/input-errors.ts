import { Component, input } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-input-errors',
  templateUrl: './input-errors.html',
  styleUrl: './input-errors.scss',
})
export class InputErrors {
  control = input.required<AbstractControl>();

  getErrorMessages(): string[] {
    const control = this.control();

    if (!control?.errors) return [];

    return Object.keys(control.errors).map((key) => {
      let message = '';

      switch (key) {
        case 'required':
          message = 'This field is required.';
          break;
        case 'email':
          message = 'Please enter a valid email address.';
          break;
        case 'pattern':
          message = 'The input format is invalid.';
          break;
        case 'minlength':
          message = 'This field is too short.';
          break;
        default:
          message = 'Invalid input.';
      }
      return message;
    })
  }

}
