import { canActivate } from '@angular/fire/auth-guard';
import { Route } from '@angular/router';
import { userSpaceGuard } from './app.guards';

const userSpaceRoutes = () =>
  import('@booking/frontend-user-space-feature-layout').then(
    (x) => x.USER_SPACE_ROUTES
  );

export const appRoutes: Route[] = [
  {
    path: 'auth',
    loadChildren: () =>
      import('@booking/booking-frontend-auth-feature-shell').then(
        (m) => m.bookingFrontendAuthFeatureShellRoutes
      ),
  },

  {
    path: '',
    loadChildren: userSpaceRoutes,
    ...canActivate(userSpaceGuard),
  },
];
