import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { TenantUser } from '../models/tenant-user.model';


@Injectable()
export class TenantUserService {

  readonly #http = inject(HttpClient);

  readonly #baseUrl = environment.tenantService + '/tenantUsers';

  getAllTenantUsers() {
    return this.#http.get<TenantUser[]>(this.#baseUrl);
  }

  getTenantUser(id: string) {
    return this.#http.get<TenantUser>(`${this.#baseUrl}/${id}`);
  }

  deleteTenantUser(id: string) {
    return this.#http.delete(`${this.#baseUrl}/${id}`);
  }


}
