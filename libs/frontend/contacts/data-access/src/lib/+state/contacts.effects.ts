import { Injectable, inject } from '@angular/core';
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
      switchMap(({ page }) =>
        this.contactsService.getContacts(page).pipe(
          map((datas) =>
            ContactsCrudActions.getContactsSuccess({
              datas: {
                count: datas.count,
                contacts: datas.data,
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
