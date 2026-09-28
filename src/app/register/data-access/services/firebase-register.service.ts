import { inject, Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from '@angular/fire/auth';
import { AlertService } from '../../../shared/data-access/services/alert-service';
import { MessageType } from '../../../shared/data-access/models/alert.model';

import { Router } from '@angular/router';

@Injectable()
export class FirebaseRegisterService {

  readonly #auth = inject(Auth);
  readonly #alertService = inject(AlertService);

  readonly #router = inject(Router);


  async registerWithGoogle() {
    try {
      await signInWithPopup(this.#auth, new GoogleAuthProvider());
      this.#onFirebaseAccountCreated();
    } catch (error: any) {
      this.#handleRegistrationError(error);
      throw error;
    }
  }

  async registerWithEmailAndPassword(payload: { email: string; password: string }) {
    try {
      const userCredential = await createUserWithEmailAndPassword(this.#auth, payload.email, payload.password);
      this.#onFirebaseAccountCreated();
      return userCredential;
    } catch (error: any) {
      this.#handleRegistrationError(error);
      throw error;
    }
  }

  #onFirebaseAccountCreated() {
    this.#alertService.addAlert(MessageType.SUCCESS,
      'Authentication successful, please complete your profile details.'
    );
    this.#router.navigate(['/profile/details']);
  }


  #handleRegistrationError(error: any) {
    if (error?.code === 'auth/email-already-exists' || error?.code === 'auth/email-already-in-use') {
      this.#alertService.addAlert(MessageType.WARNING,
        'Customer already registered, login instead.'
      );
      this.#router.navigate(['/auth']);
    }
  }


}
