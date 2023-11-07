import { Action, createReducer, on } from '@ngrx/store';

import { PaginatedResults } from '@booking/frontend-pagination-data-access';
import { ContactsCrudActions } from './contacts.actions';
import { ContactsEntity } from './contacts.models';

export const CONTACTS_FEATURE_KEY = 'contacts';

export interface ContactsState {
  contacts: PaginatedResults<ContactsEntity> | null;
  error: any;
  isLoading: boolean;
}

export const initialContactsState: ContactsState = {
  contacts: null,
  error: null,
  isLoading: false,
};

// TODO : keep older requests back in contacts[]
const reducer = createReducer(
  initialContactsState,
  on(ContactsCrudActions.getContacts, (state, { page }) => ({
    ...state,
    isLoading: true,
  })),
  on(ContactsCrudActions.getContactsSuccess, (state, { datas }) => ({
    ...state,
    contacts: datas,
    isLoading: false,
  })),
  on(ContactsCrudActions.getContactsFailure, (state, { error }) => ({
    ...state,
    error,
    isLoading: false,
  }))
);

export function contactsReducer(
  state: ContactsState | undefined,
  action: Action
) {
  return reducer(state, action);
}
