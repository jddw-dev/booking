import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import { ContactsService } from '../services/contacts.service';
import * as ContactsActions from './contacts.actions';

@Injectable()
export class ContactsEffects {
  private actions$ = inject(Actions);

  constructor(private contactsService: ContactsService) {}

  init$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ContactsActions.initContacts),
      switchMap(() =>
        this.contactsService.getContacts().pipe(
          map((contacts) => ContactsActions.loadContactsSuccess({ contacts })),
          catchError((error) =>
            of(ContactsActions.loadContactsFailure({ error }))
          )
        )
      )
    )
  );
}
