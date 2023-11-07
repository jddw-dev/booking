import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CONTACTS_FEATURE_KEY, ContactsState } from './contacts.reducer';

export const selectContactsState =
  createFeatureSelector<ContactsState>(CONTACTS_FEATURE_KEY);

export const selectContacts = createSelector(
  selectContactsState,
  (state) => state.contacts?.items
);

export const selectTotal = createSelector(
  selectContactsState,
  (state) => state.contacts?.total
);

const getNbPages = (state: ContactsState) => {
  if (!state.contacts) {
    return 0;
  }

  return Math.ceil(state.contacts.total / state.contacts.perPage);
};

export const selectNbPages = createSelector(selectContactsState, (state) =>
  getNbPages(state)
);

export const selectPagination = createSelector(
  selectContactsState,
  (state) => ({
    nbPages: getNbPages(state),
    currentPage: state.contacts?.page,
  })
);

export const selectCurrentPage = createSelector(
  selectContactsState,
  (state) => state.contacts?.page
);

export const selectPerPage = createSelector(
  selectContactsState,
  (state) => state.contacts?.perPage
);

export const selectIsLoading = createSelector(
  selectContactsState,
  (state) => state.isLoading
);

export const selectLoaded = createSelector(
  selectContactsState,
  (state) => state.loaded
);
