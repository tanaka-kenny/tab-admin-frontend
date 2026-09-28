import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { TenantUser } from '../../../landing/tenants/models/tenant-user.model';

@Injectable()
export class TenantUserService {

  readonly #http = inject(HttpClient);

  readonly #baseUrl = environment.tenantService + '/tenantUsers';

  validateInvitation(token: string) {
    return this.#http.get<{
      email: string,
      role: string,
      tenantName: string,
      expiration: string
    }>(`${this.#baseUrl}/invitations/validate?token=${token}`);
  }


  acceptInvite(payload: {
    token: string,
    firebaseUid: string,
    name: string,
    email: string
  }) {
    return this.#http.post<TenantUser>(`${this.#baseUrl}/invitations/accept`, payload);
  }
}
