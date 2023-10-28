import { Route } from '@angular/router';
import { BookingAuthFeatureLoginComponent } from '@booking/frontend-auth-feature-login';
import { BookingAuthFeatureRegisterComponent } from '@booking/frontend-auth-feature-register';
import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';

import {
  AUTH_FEATURE_KEY,
  AuthEffects,
  AuthFacade,
  authReducer,
} from '@booking/frontend-auth-data-access';

export const bookingFrontendAuthFeatureShellRoutes: Route[] = [
  {
    path: '',
    children: [
      {
        path: 'login',
        component: BookingAuthFeatureLoginComponent,
      },

      {
        path: 'register',
        component: BookingAuthFeatureRegisterComponent,
      },
    ],
    providers: [
      AuthFacade,
      provideState(AUTH_FEATURE_KEY, authReducer),
      provideEffects(AuthEffects),
    ],
  },
];
