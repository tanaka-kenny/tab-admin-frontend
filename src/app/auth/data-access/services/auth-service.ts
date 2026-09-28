import { inject, Injectable } from "@angular/core";
import { Auth, authState, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from "@angular/fire/auth";
import { AlertService } from "../../../shared/data-access/services/alert-service";
import { MessageType } from "../../../shared/data-access/models/alert.model";
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  readonly #auth = inject(Auth);
  readonly #alertService = inject(AlertService);
  readonly #router = inject(Router);

  public currentUser$ = authState(this.#auth)

  signInWithGoogle() {
    signInWithPopup(this.#auth, new GoogleAuthProvider())
      .then(() => {
        this.#router.navigate(['landing'])
      })
      .catch((error) => {
        console.error('Error signing in with Google:', error);
        throw error;
      });
  }

  signInWithEmailAndPassword(payload: { email: string, password: string }) {
    const { email, password } = payload;
    return signInWithEmailAndPassword(this.#auth, email, password)
      .then(() => {
        this.#router.navigate(['landing'])
      })
      .catch((error) => {
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

  refreshToken() {
    return this.#auth.currentUser?.getIdToken(true) || Promise.resolve(null)

  }

  logout() {
    this.#auth.signOut();
  }
}