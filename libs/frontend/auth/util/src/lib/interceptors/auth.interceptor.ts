import { HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { Auth, idToken } from '@angular/fire/auth';
import { Observable, first, switchMap } from 'rxjs';

export function authInterceptor(
  request: HttpRequest<any>,
  next: HttpHandlerFn
) {
  const auth: Auth = inject(Auth);
  const idToken$: Observable<string | null> = idToken(auth);

  return idToken$.pipe(
    first(),
    switchMap((token) => {
      if (token) {
        request = request.clone({
          setHeaders: { Authorization: `Bearer ${token}` },
        });
      }

      return next(request);
    })
  );
}
