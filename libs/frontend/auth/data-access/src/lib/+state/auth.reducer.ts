import { Action, createReducer, on } from '@ngrx/store';

import { MeQuery } from '@booking/frontend-shared-graphql';
import {
  AuthActions,
  AuthLoginActions,
  AuthLogoutActions,
} from './auth.actions';

export const AUTH_FEATURE_KEY = 'auth';

export interface AuthState {
  user: MeQuery['me'] | null;
  error: any;
  isLoading: boolean;
  isLoggedIn: boolean;
}

export const initialAuthState: AuthState = {
  user: null,
  error: null,
  isLoading: false,
  isLoggedIn: false,
};

const reducer = createReducer(
  initialAuthState,
  on(AuthLoginActions.login, (state) => ({ ...state, isLoading: true })),
  on(AuthLoginActions.loginSuccess, (state) => ({
    ...state,
    isLoading: false,
    isLoggedIn: true,
  })),
  on(AuthLoginActions.loginFailure, (state, { error }) => ({
    ...state,
    error,
    isLoading: false,
    isLoggedIn: false,
  })),
  on(AuthActions.userLoaded, (state, { user }) => ({ ...state, user })),
  on(AuthLogoutActions.logoutSuccess, (state) => ({ ...initialAuthState }))
);

export function authReducer(state: AuthState | undefined, action: Action) {
  return reducer(state, action);
}
