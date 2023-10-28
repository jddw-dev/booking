import { Injectable, inject } from '@angular/core';
import { Store, select } from '@ngrx/store';

import {
  AuthActions,
  AuthLoginActions,
  AuthLogoutActions,
} from './auth.actions';
import * as AuthSelectors from './auth.selectors';

@Injectable({ providedIn: 'root' })
export class AuthFacade {
  private readonly store = inject(Store);

  isLoading$ = this.store.pipe(select(AuthSelectors.selectAuthLoading));
  error$ = this.store.pipe(select(AuthSelectors.selectAuthError));
  user$ = this.store.pipe(select(AuthSelectors.selectAuthUser));

  init() {
    this.store.dispatch(AuthActions.init());
  }

  login(email: string, password: string) {
    this.store.dispatch(AuthLoginActions.login({ email, password }));
  }

  logout() {
    this.store.dispatch(AuthLogoutActions.logout());
  }
}
