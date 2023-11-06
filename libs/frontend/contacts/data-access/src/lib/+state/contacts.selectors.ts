import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CONTACTS_FEATURE_KEY, ContactsState } from './contacts.reducer';

// Lookup the 'Contacts' feature state managed by NgRx
export const selectContactsState =
  createFeatureSelector<ContactsState>(CONTACTS_FEATURE_KEY);

export const selectContacts = createSelector(
  selectContactsState,
  (state) => state.contacts
);

export const selectTotal = createSelector(
  selectContactsState,
  (state) => state.total
);

export const selectNbPages = createSelector(selectContactsState, (state) =>
  Math.ceil(state.total / state.perPage)
);

export const selectPaginationDetails = createSelector(
  selectContactsState,
  (state) => ({
    nbPages: Math.ceil(state.total / state.perPage),
    currentPage: state.currentPage,
  })
);

export const selectCurrentPage = createSelector(
  selectContactsState,
  (state) => state.currentPage
);

export const selectPerPage = createSelector(
  selectContactsState,
  (state) => state.perPage
);

export const selectIsLoading = createSelector(
  selectContactsState,
  (state) => state.isLoading
);
