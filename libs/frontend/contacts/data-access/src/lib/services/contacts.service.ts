import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ContactsGQL, ContactsQuery } from '../../graphql';

@Injectable({ providedIn: 'root' })
export class ContactsService {
  constructor(private contactsGQL: ContactsGQL) {}

  getContacts(): Observable<ContactsQuery['contacts']> {
    return this.contactsGQL
      .watch()
      .valueChanges.pipe(map((result) => result.data.contacts));
  }
}
