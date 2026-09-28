import { Component, inject, OnInit, signal } from '@angular/core';
import { FirebaseRegisterService } from '../data-access/services/firebase-register.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MessageType } from '../../shared/data-access/models/alert.model';
import { AlertService } from '../../shared/data-access/services/alert-service';
import { TextInput } from '../../shared/ui/text-input/text-input';
import { TenantUserService } from '../data-access/services/tenant-user-service';
import { switchMap } from 'rxjs';
import { RegisterService } from '../data-access/services/register-service';

type UiView = 'verifying' | 'invalid' | 'create_account';

interface InvitationDetails {
  email: string;
  role: string;
  tenantName: string;
  expiration: string;
}

@Component({
  selector: 'app-invitaion-sign-up',
  imports: [ReactiveFormsModule, RouterLink, TextInput],
  templateUrl: './invitaion-sign-up.html',
  styleUrl: './invitaion-sign-up.scss',
  providers: [TenantUserService,]
})
export class InvitaionSignUp implements OnInit {

  readonly #tenantUserService = inject(TenantUserService);
  readonly #alertService = inject(AlertService);
  readonly #formBuilder = inject(FormBuilder);
  readonly #router = inject(Router);
  readonly #registerService = inject(RegisterService);
  readonly #firebaseAuthService = inject(FirebaseRegisterService);
  readonly #route = inject(ActivatedRoute);

  readonly #token = this.#route.snapshot.queryParamMap.get('token');

  uiView = signal<UiView>('verifying');
  invitation = signal<InvitationDetails | null>(null);
  isSubmitting = signal(false);

  credentialsForm = this.#formBuilder.nonNullable.group({
    firstName: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
    phoneNumber: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
    email: [{ value: '', disabled: true }],
    password: ['', [Validators.required, Validators.minLength(8)]],
  })

  ngOnInit() {

    this.#validateInvitation();
  }

  async createAccount() {
    const invitation = this.invitation();
    const token = this.#token;
    if (!invitation || !token || this.isSubmitting()) {
      return;
    }

    if (this.credentialsForm.invalid) {
      this.credentialsForm.markAllAsTouched();
      return;
    }

    this.isSubmitting.set(true);
    const formValue = this.credentialsForm.getRawValue();

    try {
      const credential = await this.#firebaseAuthService.registerWithEmailAndPassword({
        email: invitation.email,
        password: formValue.password
      });

      this.#registerService.createCustomerProfile(formValue)
        .pipe(
          switchMap(() => {
            const payload = {
              token,
              firebaseUid: credential.user.uid,
              name: `${formValue.firstName} ${formValue.lastName}`,
              email: invitation.email
            }
            return this.#tenantUserService.acceptInvite(payload);
          })
        ).subscribe({
          next: () => {
            this.#alertService.addAlert(
              MessageType.SUCCESS,
              `Welcome to ${invitation.tenantName}! Your account is ready.`
            );
            this.#router.navigate(['/landing']);
          },
          error: () => {
            this.isSubmitting.set(false);
            this.#alertService.addAlert(
              MessageType.DANGER,
              'Could not complete your invitation. Please try again or contact support.'
            );
          }
        });
    } catch (error) {
      this.isSubmitting.set(false);
      const code = (error as { code?: string }).code;
      const message = code === 'auth/email-already-in-use'
        ? 'An account already exists for this email. Try signing in instead.'
        : 'Could not create your account. Please try again.';
      this.#alertService.addAlert(MessageType.DANGER, message);
    }
  }

  #validateInvitation() {
    if (!this.#token) {
      this.uiView.set('invalid');
      return;
    }

    this.#tenantUserService.validateInvitation(this.#token).subscribe({
      next: (invitation) => {
        this.invitation.set(invitation);
        this.credentialsForm.controls.email.setValue(invitation.email);
        this.uiView.set('create_account');
      },
      error: () => this.uiView.set('invalid')
    });
  }
}
