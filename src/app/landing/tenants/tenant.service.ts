import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../../environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { Tenant } from './tenant.model';
import { AuthService } from '../../auth/data-access/services/auth-service';

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

  public getTenant(id: string): Observable<Tenant> {
    return this.#http.get<Tenant>(`${this.#baseUrl}/${id}`);
  }

  public getUserTenants(): Observable<Tenant[]> {
    return this.#http.get<Tenant[]>(this.#baseUrl);
  }

  public createTenant(payload: { name: string }): Observable<Tenant> {
    return this.#http.post<Tenant>(this.#baseUrl, payload);
  }

}
