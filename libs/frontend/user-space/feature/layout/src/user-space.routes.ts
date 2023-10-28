import { Routes } from '@angular/router';
import { BookingUserSpaceLayoutComponent } from './lib/layout.component';

const contactsRoutes = () =>
  import('@booking/frontend-contacts-feature-routing').then(
    (x) => x.CONTACTS_ROUTES
  );

export const USER_SPACE_ROUTES: Routes = [
  {
    path: '',
    component: BookingUserSpaceLayoutComponent,
    children: [
      {
        path: 'contacts',
        loadChildren: contactsRoutes,
      },
    ],
  },
];
