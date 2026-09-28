import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { TextInput } from '../../shared/ui/text-input/text-input';
import { FirebaseRegisterService } from '../data-access/services/firebase-register.service';

@Component({
  selector: 'app-sign-up',
  imports: [ReactiveFormsModule, TextInput, RouterLink],
  templateUrl: './sign-up.html',
  styleUrl: './sign-up.scss',
})
export class SignUp {
  readonly #formBuilder = inject(FormBuilder);
  readonly #profileService = inject(FirebaseRegisterService);

  credentialsForm = this.#formBuilder.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]]
  })

  signInWithGoogle() {
    this.#profileService.registerWithGoogle();
  }

}
