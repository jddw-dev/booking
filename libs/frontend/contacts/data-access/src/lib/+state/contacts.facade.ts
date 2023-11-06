import { Injectable, inject } from '@angular/core';
import { Store, select } from '@ngrx/store';

import { ContactsCrudActions } from './contacts.actions';
import * as ContactsSelectors from './contacts.selectors';

@Injectable()
export class ContactsFacade {
  private readonly store = inject(Store);

  /**
   * Combine pieces of state using createSelector,
   * and expose them as observables through the facade.
   */
  isLoading$ = this.store.pipe(select(ContactsSelectors.selectIsLoading));
  contacts$ = this.store.pipe(select(ContactsSelectors.selectContacts));
  paginationDetails$ = this.store.pipe(
    select(ContactsSelectors.selectPaginationDetails)
  );
  currentPage$ = this.store.pipe(select(ContactsSelectors.selectCurrentPage));

  /**
   * Use the initialization action to perform one
   * or more tasks in your Effects.
   */
  init() {
    this.store.dispatch(ContactsCrudActions.getContacts({ page: 1 }));
  }

  getContacts(page = 1) {
    this.store.dispatch(ContactsCrudActions.getContacts({ page }));
  }
}
