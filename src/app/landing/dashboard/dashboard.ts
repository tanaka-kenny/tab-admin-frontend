import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../auth/data-access/services/auth-service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

type UiView = 'dashboard' | 'prompt_tenant_creation';

@Component({
  selector: 'app-dashboard',
  imports: [RouterLink],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard implements OnInit {

  readonly #authService = inject(AuthService);
  readonly #destroyRef = inject(DestroyRef);

  currentUiView = signal<UiView | null>('prompt_tenant_creation');

  ngOnInit(): void {
    this.#checkForTenatId();
  }

  #checkForTenatId() {
    this.#authService.currentUser$.pipe(
      takeUntilDestroyed(this.#destroyRef)
    ).subscribe({
      next: user => {
        user?.getIdTokenResult().then(idTokenResult => {
          const tenantId = idTokenResult.claims['tenantId'];
          if (tenantId) this.currentUiView.set('dashboard');
          else this.currentUiView.set('prompt_tenant_creation');
        })
      }
    })
  }

}
