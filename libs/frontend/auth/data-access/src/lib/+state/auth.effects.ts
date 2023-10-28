import { Injectable, inject } from '@angular/core';
import { User, UserCredential } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { MeQuery } from '@booking/frontend-shared-graphql';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, from, map, of, switchMap, tap } from 'rxjs';
import { AuthService } from '../services/auth.service';
import {
  AuthActions,
  AuthLoginActions,
  AuthLogoutActions,
} from './auth.actions';

@Injectable({ providedIn: 'root' })
export class AuthEffects {
  private actions$ = inject(Actions);

  constructor(private authService: AuthService, private router: Router) {}

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthLoginActions.login),
      switchMap(({ email, password }) =>
        from(this.authService.login(email, password)).pipe(
          map((credentials: UserCredential) => AuthLoginActions.loginSuccess()),
          catchError((error) => of(AuthLoginActions.loginFailure({ error })))
        )
      )
    )
  );

  loginSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthLoginActions.loginSuccess),
      switchMap(() =>
        this.authService.me().pipe(
          map((user: MeQuery['me']) => AuthActions.userLoaded({ user })),
          catchError((error) => {
            return of(AuthActions.error({ error }));
          })
        )
      ),
      tap(() => this.router.navigate(['/']))
    )
  );

  logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthLogoutActions.logout),
      switchMap(() =>
        from(this.authService.logout()).pipe(
          map(() => AuthLogoutActions.logoutSuccess()),
          catchError((error) => of(AuthActions.error({ error })))
        )
      )
    )
  );

  logoutSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthLogoutActions.logoutSuccess),
        tap(() => this.router.navigate(['/auth/login']))
      ),
    { dispatch: false }
  );

  init$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.init),
      switchMap(() =>
        from(this.authService.getCurrentUser()).pipe(
          map((user: User | null) => {
            if (!user) {
              return AuthLogoutActions.logout();
            }

            return AuthActions.loadUser();
          })
        )
      )
    )
  );

  loadUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.loadUser),
      switchMap(() =>
        this.authService.me().pipe(
          map((user: MeQuery['me']) => AuthActions.userLoaded({ user })),
          catchError((error) => of(AuthActions.error({ error })))
        )
      )
    )
  );
}
