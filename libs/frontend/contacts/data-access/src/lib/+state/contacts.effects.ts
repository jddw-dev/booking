import { Injectable, inject } from '@angular/core';
import { PAGINATION_CONSTANTS } from '@booking/frontend-pagination-data-access';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import { ContactsService } from '../services/contacts.service';
import { ContactsCrudActions } from './contacts.actions';

@Injectable()
export class ContactsEffects {
  private actions$ = inject(Actions);

  constructor(private contactsService: ContactsService) {}

  init$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ContactsCrudActions.getContacts),
      switchMap(({ page, perPage }) =>
        this.contactsService.getContacts(page).pipe(
          map((datas) =>
            ContactsCrudActions.getContactsSuccess({
              datas: {
                pagination: {
                  page: page,
                  perPage: perPage ?? PAGINATION_CONSTANTS.DEFAULT_PER_PAGE,
                  total: datas.count,
                },
                items: datas.contacts,
              },
            })
          ),
          catchError((error) =>
            of(ContactsCrudActions.getContactsFailure({ error }))
          )
        )
      )
    )
  );
}
