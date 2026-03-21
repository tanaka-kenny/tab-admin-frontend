import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from "@angular/router";
import { TextInput } from '../../shared/ui/text-input/text-input';
import { AuthService } from '../data-access/services/auth-service';

@Component({
  selector: 'app-login',
  imports: [TextInput, ReactiveFormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {

  readonly #formBuilder = inject(FormBuilder);
  readonly #authService = inject(AuthService);

  loginForm = this.#formBuilder.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]]
  })

  signInWithGoogle() {
    this.#authService.signInWithGoogle();
  }

  onLoginWithEmailAndPassword() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsDirty();
      this.loginForm.markAllAsTouched();
      return;
    }

    this.#authService.signInWithEmailAndPassword(this.loginForm.getRawValue());
  }
}
