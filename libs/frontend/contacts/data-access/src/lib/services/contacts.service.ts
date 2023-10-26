import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { map } from 'rxjs';
import { GET_CONTACTS } from './contacts.operations';

@Injectable({ providedIn: 'root' })
export class ContactsService {
  constructor(private apollo: Apollo) {}

  getContacts() {
    return this.apollo
      .watchQuery<any>({
        query: GET_CONTACTS,
      })
      .valueChanges.pipe(map((result) => result.data.contacts));
  }
}
