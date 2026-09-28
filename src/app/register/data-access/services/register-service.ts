import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Customer } from '../model/customer.model';
import { tap } from 'rxjs';
import { AuthService } from '../../../auth/data-access/services/auth-service';

@Injectable()
export class RegisterService {

  readonly #http = inject(HttpClient);
  readonly #authService = inject(AuthService);

  readonly #apiBaseUrl = environment.registrationService + '/customers';

  profileExists() {
    return this.#http.get<{ profileExists: boolean }>(`${this.#apiBaseUrl}/exists`);
  }

  getCustomerProfile() {
    return this.#http.get<Customer>(`${this.#apiBaseUrl}`);
  }

  createCustomerProfile(payload: { firstName: string; lastName: string; phoneNumber: string }) {
    return this.#http.post<Customer>(`${this.#apiBaseUrl}`, payload)
      .pipe(
        tap(async () => {
          // force token refresh for the new jwt token claims added by backend service to appear in the token, 
          // in this case i.e. the internal_user_id_claim
          await this.#authService.refreshToken()
        })
      )
  }

  updateCustomerProfile(payload: { firstName: string; lastName: string; phoneNumber: string }) {
    return this.#http.put<Customer>(`${this.#apiBaseUrl}`, payload);
  }

}
