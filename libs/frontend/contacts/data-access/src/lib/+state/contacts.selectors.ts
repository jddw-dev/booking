import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  CONTACTS_FEATURE_KEY,
  ContactsState,
  contactsAdapter,
} from './contacts.reducer';

export const selectContactsState =
  createFeatureSelector<ContactsState>(CONTACTS_FEATURE_KEY);

const { selectAll } = contactsAdapter.getSelectors();

export const selectContacts = createSelector(selectContactsState, selectAll);

export const selectTotal = createSelector(
  selectContactsState,
  (state) => state.pagination?.total
);

const getNbPages = (state: ContactsState) => {
  if (!state.pagination) {
    return 0;
  }

  return Math.ceil(state.pagination.total / state.pagination.perPage);
};

export const selectNbPages = createSelector(selectContactsState, (state) =>
  getNbPages(state)
);

export const selectPagination = createSelector(
  selectContactsState,
  (state) => ({
    nbPages: getNbPages(state),
    currentPage: state.pagination?.page,
  })
);

export const selectCurrentPage = createSelector(
  selectContactsState,
  (state) => state.pagination?.page
);

export const selectPerPage = createSelector(
  selectContactsState,
  (state) => state.pagination?.perPage
);

export const selectIsLoading = createSelector(
  selectContactsState,
  (state) => state.isLoading
);

export const selectLoaded = createSelector(
  selectContactsState,
  (state) => state.loaded
);
