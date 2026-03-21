import { inject, Injectable } from "@angular/core";
import { Auth, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from "@angular/fire/auth";
import { AlertService } from "../../../shared/data-access/services/alert-service";
import { MessageType } from "../../../shared/data-access/models/alert.model";

@Injectable()
export class AuthService {
  readonly #auth = inject(Auth);
  readonly #alertService = inject(AlertService);


  signInWithGoogle() {
    signInWithPopup(this.#auth, new GoogleAuthProvider())
      .then((result) => {

      })
      .catch((error) => {
        console.error('Error signing in with Google:', error);
        throw error;
      });
  }

  signInWithEmailAndPassword(payload: { email: string, password: string }) {
    const { email, password } = payload;
    return signInWithEmailAndPassword(this.#auth, email, password).catch((error) => {
      let message;

      switch (error.code) {
        case 'auth/invalid-credential':
          message = 'Invalid credentials provided. Please check your email and password and try again.';
          break;
        default:
          message = 'An error occurred while signing in. If issue persists, please contact support.';
          break
      }

      this.#alertService.addAlert(
        MessageType.DANGER,
        message
      )
    });
  }

  logout() {
    this.#auth.signOut();
  }
}