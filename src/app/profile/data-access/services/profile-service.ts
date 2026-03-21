import { inject, Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from '@angular/fire/auth';
import { AlertService } from '../../../shared/data-access/services/alert-service';
import { MessageType } from '../../../shared/data-access/models/alert.model';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Customer } from '../model/customer.model';
import { Router } from '@angular/router';

@Injectable()
export class ProfileService {

  readonly #auth = inject(Auth);
  readonly #alertService = inject(AlertService);
  readonly #http = inject(HttpClient);
  readonly #router = inject(Router);

  readonly #apiBaseUrl = environment.registrationService + '/customers';

  async registerWithGoogle() {
    await signInWithPopup(this.#auth, new GoogleAuthProvider());

    this.profileExists().subscribe({
      next: (response) => {
        if (response.profileExists) {
          this.#alertService.addAlert(MessageType.WARNING,
            'Customer already registered, login instead.'
          );
          this.#router.navigate(['/auth']);
        } else {
          this.#alertService.addAlert(MessageType.SUCCESS,
            'Google authentication successful, please complete your profile details.'
          );
          this.#router.navigate(['/profile/details']);
        }
      }
    })
  }

  async registerWithEmailAndPassword(payload: { email: string; password: string }) {
    await createUserWithEmailAndPassword(this.#auth, payload.email, payload.password);
    this.#router.navigate(['/profile']);

  }

  profileExists() {
    return this.#http.get<{ profileExists: boolean }>(`${this.#apiBaseUrl}/exists`);
  }

  getCustomerProfile() {
    return this.#http.get<Customer>(`${this.#apiBaseUrl}`);
  }

  createCustomerProfile(payload: { firstName: string; lastName: string; phoneNumber: string }) {
    return this.#http.post<Customer>(`${this.#apiBaseUrl}`, payload);
  }
  
  updateCustomerProfile(payload: { firstName: string; lastName: string; phoneNumber: string }) {
    return this.#http.put<Customer>(`${this.#apiBaseUrl}`, payload);
  }


}
