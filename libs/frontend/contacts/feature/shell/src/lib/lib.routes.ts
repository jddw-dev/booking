import { Routes } from '@angular/router';

import * as fromContacts from '@booking/frontend-contacts-data-access';
import {
  ContactsEffects,
  ContactsFacade,
} from '@booking/frontend-contacts-data-access';
import { BookingContactsDetailsComponent } from '@booking/frontend-contacts-feature-details';
import {
  BookingContactsImportComponent,
  BookingContactsMapPropertiesComponent,
} from '@booking/frontend-contacts-feature-import';
import { BookingContactsListComponent } from '@booking/frontend-contacts-feature-list';
import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';

export const frontendContactsFeatureShellRoutes: Routes = [
  {
    path: '',

    providers: [
      ContactsFacade,
      provideState(
        fromContacts.CONTACTS_FEATURE_KEY,
        fromContacts.contactsReducer
      ),
      provideEffects(ContactsEffects),
    ],

    children: [
      {
        path: '',
        component: BookingContactsListComponent,
      },

      {
        path: 'import',
        component: BookingContactsImportComponent,
      },

      {
        path: 'map-properties',
        component: BookingContactsMapPropertiesComponent,
      },

      {
        path: ':id',
        component: BookingContactsDetailsComponent,
      },
    ],
  },
];
