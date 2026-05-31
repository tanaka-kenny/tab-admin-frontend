import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { BehaviorSubject, Observable, switchMap } from 'rxjs';
import { Tenant } from '../models/tenant.model';
import { AuthService } from '../../../auth/data-access/services/auth-service';

@Injectable()
export class TenantService {

  readonly #http = inject(HttpClient);
  readonly #authService = inject(AuthService);

  readonly #baseUrl = environment.tenantService + '/tenants';

  readonly #tenantId = new BehaviorSubject<string | null>(null);
  readonly tenantId = this.#tenantId.asObservable();

  constructor() {
    this.#authService.currentUser$.subscribe({
      next: user => {
        user?.getIdTokenResult().then(idTokenResult => {
          this.#tenantId.next(idTokenResult.claims['tenantId'] as string || null);
        })
      }
    })
  }

  public getTenant(): Observable<Tenant> {
    return this.tenantId.pipe(
      switchMap(id => {
        if (!id) throw new Error('No tenant ID found for current user');

        return this.#http.get<Tenant>(`${this.#baseUrl}/${id}`);
      })
    )
  }

  public getUserTenants(): Observable<Tenant[]> {
    return this.#http.get<Tenant[]>(this.#baseUrl);
  }

  createTenant(
    useDefaultSettings: boolean,
    payload?: Pick<Tenant, 'name' | 'settings'>) {
    return this.#http.post<Tenant>(this.#baseUrl, { ...payload, useDefaultSettings });
  }

  updateTenant(
    id: string,
    useDefaultSettings: boolean,
    payload: Pick<Tenant, 'name' | 'settings'>) {
    return this.#http.put<Tenant>(`${this.#baseUrl}/${id}`, { ...payload, useDefaultSettings });
  }

}
