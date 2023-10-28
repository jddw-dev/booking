import { Action } from '@ngrx/store';

import { UserCredential } from '@angular/fire/auth';
import * as AuthActions from './auth.actions';
import { AuthState, authReducer, initialAuthState } from './auth.reducer';

describe('Auth Reducer', () => {
  describe('valid Auth actions', () => {
    it('login should set isLoading to true', () => {
      const action = AuthActions.login({
        email: 'test@jddw.dev',
        password: 'test',
      });

      const result: AuthState = authReducer(initialAuthState, action);

      expect(result.isLoading).toBe(true);
    });

    it('loginSuccess should set isLoading to false, and save credentials', () => {
      const action = AuthActions.loginSuccess({
        credentials: {} as UserCredential,
      });

      const result: AuthState = authReducer(initialAuthState, action);

      expect(result.isLoading).toBe(false);
      expect(result.credentials).not.toBeNull();
    });

    it('loginFailure should set isLoading to false, and set error', () => {
      const action = AuthActions.loginFailure({ error: 'error' });

      const result: AuthState = authReducer(initialAuthState, action);

      expect(result.isLoading).toBe(false);
      expect(result.error).not.toBeNull();
    });
  });

  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as Action;

      const result = authReducer(initialAuthState, action);

      expect(result).toBe(initialAuthState);
    });
  });
});
