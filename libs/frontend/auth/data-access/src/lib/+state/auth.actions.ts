import { MeQuery } from '@booking/frontend-shared-graphql';
import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const AuthLoginActions = createActionGroup({
  source: 'Auth/Login',
  events: {
    Login: props<{ email: string; password: string }>(),
    'Login Success': emptyProps(),
    'Login Failure': props<{ error: any }>(),
  },
});

export const AuthActions = createActionGroup({
  source: 'Auth',
  events: {
    Init: emptyProps(),
    'Load user': emptyProps(),
    'User loaded': props<{ user: MeQuery['me'] }>(),
    Error: props<{ error: any }>(),
  },
});

export const AuthLogoutActions = createActionGroup({
  source: 'Auth/Logout',
  events: {
    Logout: emptyProps(),
    'Logout Success': emptyProps(),
  },
});
