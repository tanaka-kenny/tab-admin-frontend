import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { TextInput } from '../../../ui/text-input/text-input';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  imports: [ReactiveFormsModule, TextInput, RouterLink],
  templateUrl: './sign-up.html',
  styleUrl: './sign-up.scss',
})
export class SignUp {
  readonly #formBuilder = inject(FormBuilder);

  credentialsForm = this.#formBuilder.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]]
  })

  signInWithMicrosoft() {
    throw new Error('Method not implemented.');
  }
  signInWithGoogle() {
    throw new Error('Method not implemented.');
  }

}
