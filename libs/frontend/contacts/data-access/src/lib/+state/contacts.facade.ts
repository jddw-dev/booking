import { Injectable, inject } from '@angular/core';
import { Store, select } from '@ngrx/store';

import { take } from 'rxjs';
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
  loaded$ = this.store.pipe(select(ContactsSelectors.selectLoaded));
  contacts$ = this.store.pipe(select(ContactsSelectors.selectContacts));
  pagination$ = this.store.pipe(select(ContactsSelectors.selectPagination));
  currentPage$ = this.store.pipe(select(ContactsSelectors.selectCurrentPage));
  total$ = this.store.pipe(select(ContactsSelectors.selectTotal));

  /**
   * Use the initialization action to perform one
   * or more tasks in your Effects.
   */
  init() {
    this.loaded$
      .pipe(take(1))
      .subscribe((loaded) => !loaded && this.getContacts());
  }

  getContacts(page = 1) {
    this.store.dispatch(ContactsCrudActions.getContacts({ page }));
  }
}
