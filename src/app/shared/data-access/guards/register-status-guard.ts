import { inject } from '@angular/core';
import { CanMatchFn, Router } from '@angular/router';
import { RegisterService } from '../../../register/data-access/services/register-service';
import { AlertService } from '../services/alert-service';
import { of, switchMap } from 'rxjs';
import { MessageType } from '../models/alert.model';

export const completeProfileGuard: CanMatchFn = (route, segments) => {
  const registerService = inject(RegisterService);
  const alertService = inject(AlertService);
  const router = inject(Router);

  return registerService.profileExists().pipe(
    switchMap(res => {
      if (res.profileExists) {
        alertService.addAlert(MessageType.WARNING, 'User profile exists. Login instead.')
        router.navigate(['/auth'])
        return of(false)
      }

      return of(true);
    })
  )
};

export const inCompleteProfileGuard: CanMatchFn = (route, segments) => {
  const registerService = inject(RegisterService);
  const alertService = inject(AlertService);
  const router = inject(Router);

  return registerService.profileExists().pipe(
    switchMap(res => {
      if (!res.profileExists) {
        alertService.addAlert(MessageType.WARNING, 'User profile incomplete. Please update your information.')
        router.navigate(['/profile/details'])
        return of(false)
      }

      return of(true);
    })
  )
};

