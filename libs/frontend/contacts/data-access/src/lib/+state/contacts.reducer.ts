import { Action, createReducer, on } from '@ngrx/store';

import { ContactsCrudActions } from './contacts.actions';
import { ContactsEntity } from './contacts.models';

export const CONTACTS_FEATURE_KEY = 'contacts';

export interface ContactsState {
  contacts: ContactsEntity[];
  error: any;
  isLoading: boolean;
  total: number;
  currentPage: number;
  perPage: number;
}

export const initialContactsState: ContactsState = {
  contacts: [],
  error: null,
  isLoading: false,
  total: 0,
  currentPage: 1,
  perPage: 50,
};

const reducer = createReducer(
  initialContactsState,
  on(ContactsCrudActions.getContacts, (state, { page }) => ({
    ...state,
    isLoading: true,
    currentPage: page,
  })),
  on(ContactsCrudActions.getContactsSuccess, (state, { datas }) => ({
    ...state,
    contacts: datas.contacts,
    total: datas.count,
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
