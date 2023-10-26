import { Routes } from '@angular/router';
import { BookingContactsListComponent } from '@booking/frontend-contacts-feature-list';

export const CONTACTS_ROUTES: Routes = [
  {
    path: '',
    component: BookingContactsListComponent,
  },
];
