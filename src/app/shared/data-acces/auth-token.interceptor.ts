import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Auth, authState } from '@angular/fire/auth';
import { from, switchMap } from 'rxjs';

export const authTokenInterceptor: HttpInterceptorFn = (req, next) => {

  return authState(inject(Auth)).pipe(
    switchMap(auth => {
      if (auth) {
        return from(auth.getIdToken()).pipe(
          switchMap(token => {
            const clonedRequest = req.clone({
              setHeaders: {
                Authorization: `Bearer ${token}`
              }
            });
            return next(clonedRequest);
          })
        )
      } else {
        return next(req);
      }
    })
  )
};
