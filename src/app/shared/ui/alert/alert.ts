import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AlertService } from '../../data-access/services/alert-service';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-alert',
  imports: [FaIconComponent],
  templateUrl: './alert.html',
  styleUrl: './alert.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Alert {
  readonly #alertService = inject(AlertService);

  readonly alert = this.#alertService.alertSignal;

  dismiss() {
    this.#alertService.clearAlert();
  }
}
