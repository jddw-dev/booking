import { Routes } from '@angular/router';

import * as fromContacts from '@booking/frontend-contacts-data-access';
import {
  ContactsEffects,
  ContactsFacade,
} from '@booking/frontend-contacts-data-access';
import { BookingContactsListComponent } from '@booking/frontend-contacts-feature-list';
import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';

export const frontendContactsFeatureShellRoutes: Routes = [
  {
    path: '',
    component: BookingContactsListComponent,
    providers: [
      ContactsFacade,
      provideState(
        fromContacts.CONTACTS_FEATURE_KEY,
        fromContacts.contactsReducer
      ),
      provideEffects(ContactsEffects),
    ],
  },
];
