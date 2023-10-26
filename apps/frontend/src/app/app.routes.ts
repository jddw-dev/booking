import { Route } from '@angular/router';

const contactsRoutes = () =>
  import('@booking/frontend-contacts-feature-routing').then(
    (x) => x.CONTACTS_ROUTES
  );

export const appRoutes: Route[] = [
  {
    path: '',
    loadChildren: contactsRoutes,
  },
];
