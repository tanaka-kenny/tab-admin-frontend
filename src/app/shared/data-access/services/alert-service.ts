import { Injectable, signal } from '@angular/core';
import { Alert, MessageType } from '../models/alert.model';
import { faCheck, faExclamationTriangle, faInfo, faTimes } from '@fortawesome/free-solid-svg-icons';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  readonly #alert = signal<Alert | null>(null);
  #dismissTimer: ReturnType<typeof setTimeout> | null = null;

  readonly alertSignal = this.#alert.asReadonly();

  addAlert(type: MessageType, message: string, durationMs = 5000) {
    if (this.#dismissTimer) {
      clearTimeout(this.#dismissTimer);
    }

    const alert: Alert = { type, message, };

    this.#alert.set(this.configureAlert(alert));
    this.#dismissTimer = setTimeout(() => this.clearAlert(), durationMs);
  }

  clearAlert() {
    if (this.#dismissTimer) {
      clearTimeout(this.#dismissTimer);
      this.#dismissTimer = null;
    }
    this.#alert.set(null);
  }

  configureAlert(alert: Alert) {
    switch (alert.type) {
      case MessageType.SUCCESS:
        alert.fontIcon = faCheck;
        alert.alertType = 'success';
        break;
      case MessageType.DANGER:
        alert.fontIcon = faTimes;
        alert.alertType = 'danger';
        break;
      case MessageType.WARNING:
        alert.fontIcon = faExclamationTriangle;
        alert.alertType = 'warning';
        break;
      default:
        alert.fontIcon = faInfo;
        alert.alertType = 'info';
    }
    return alert;
  }

}
