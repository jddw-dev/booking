import { Injectable } from '@angular/core';
import { ContactsGQL, ContactsQuery } from '@booking/frontend-shared-graphql';
import { Observable, map } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ContactsService {
  constructor(private contactsGQL: ContactsGQL) {}

  getContacts(): Observable<ContactsQuery['contacts']> {
    return this.contactsGQL
      .watch()
      .valueChanges.pipe(map((result) => result.data.contacts));
  }
}
