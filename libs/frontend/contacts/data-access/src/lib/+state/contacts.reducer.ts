import { createReducer, on } from '@ngrx/store';

import { Pagination } from '@booking/frontend-pagination-data-access';
import { ContactsCrudActions } from './contacts.actions';
import { ContactEntity } from './contacts.models';

import { EntityAdapter, EntityState, createEntityAdapter } from '@ngrx/entity';

export const CONTACTS_FEATURE_KEY = 'contacts';

export interface ContactsState extends EntityState<ContactEntity> {
  pagination: Pagination | null;
  error: any;
  isLoading: boolean;
  loaded: boolean;
}

export const contactsAdapter: EntityAdapter<ContactEntity> =
  createEntityAdapter<ContactEntity>();

export const initialContactsState: ContactsState =
  contactsAdapter.getInitialState({
    pagination: null,
    error: null,
    isLoading: false,
    loaded: false,
  });

// TODO : keep older requests back in contacts[]
export const contactsReducer = createReducer(
  initialContactsState,
  on(ContactsCrudActions.getContacts, (state, { page }) => ({
    ...state,
    isLoading: true,
  })),
  on(ContactsCrudActions.getContactsSuccess, (state, { datas }) => {
    return contactsAdapter.setAll(datas.items, {
      ...state,
      pagination: datas.pagination,
      isLoading: false,
      loaded: true,
    });
  }),
  on(ContactsCrudActions.getContactsFailure, (state, { error }) => ({
    ...state,
    error,
    isLoading: false,
    loaded: false,
  }))
);
