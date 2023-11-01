import { canActivate } from '@angular/fire/auth-guard';
import { Route } from '@angular/router';
import { authPagesGuard, userSpaceGuard } from './app.guards';

export const appRoutes: Route[] = [
  {
    path: 'auth',
    loadChildren: () =>
      import('@booking/booking-frontend-auth-feature-shell').then(
        (m) => m.bookingFrontendAuthFeatureShellRoutes
      ),
    ...canActivate(authPagesGuard),
  },

  {
    path: '',
    loadChildren: () =>
      import('@booking/frontend-userspace-feature-shell').then(
        (m) => m.frontendUserspaceFeatureShellRoutes
      ),
    ...canActivate(userSpaceGuard),
  },
];
