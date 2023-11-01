import { Route } from '@angular/router';
import { BookingUserSpaceLayoutComponent } from '@booking/frontend-user-space-feature-layout';

export const frontendUserspaceFeatureShellRoutes: Route[] = [
  {
    path: '',
    component: BookingUserSpaceLayoutComponent,
    children: [
      {
        path: 'contacts',
        loadChildren: () =>
          import('@booking/frontend-contacts-feature-shell').then(
            (m) => m.frontendContactsFeatureShellRoutes
          ),
      },
    ],
  },
];
