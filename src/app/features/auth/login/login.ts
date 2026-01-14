import { Component, inject } from '@angular/core';
import { TextInput } from "../../../ui/text-input/text-input";
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-login',
  imports: [TextInput, ReactiveFormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {

    readonly #formBuilder = inject(FormBuilder);

  loginForm = this.#formBuilder.nonNullable.group({
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
