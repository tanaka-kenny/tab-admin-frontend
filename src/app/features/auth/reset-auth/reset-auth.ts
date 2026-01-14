import { Component, inject } from '@angular/core';
import { TextInput } from "../../../ui/text-input/text-input";
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-reset-auth',
  imports: [TextInput, ReactiveFormsModule, RouterLink],
  templateUrl: './reset-auth.html',
  styleUrl: './reset-auth.scss',
})
export class ResetAuth {
  readonly #formBuilder = inject(FormBuilder)

  credentialsForm = this.#formBuilder.nonNullable.group({
    email: ['', [Validators.email, Validators.required]]
  })

}
