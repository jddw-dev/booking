import { Injectable } from '@angular/core';
import {
  ContactsGQL,
  ContactsQuery,
  CreateContactsGQL,
} from '@booking/frontend-shared-graphql';
import { Observable, map } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ContactsService {
  constructor(
    private contactsGQL: ContactsGQL,
    private createContactsGQL: CreateContactsGQL
  ) {}

  getContacts(): Observable<ContactsQuery['contacts']> {
    return this.contactsGQL
      .watch()
      .valueChanges.pipe(map((result) => result.data.contacts));
  }

  // TODO : replace any with good type !
  saveFromImport(importRows: any[], mapping: any): Observable<any> {
    const contacts = importRows.map((row) => {
      return {
        firstname: row[mapping.firstname],
        name: row[mapping.name],
        email: row[mapping.email],
        phone: row[mapping.phone],
        jobName: row[mapping.jobName],
        comments: row[mapping.comments],
      };
    });

    return this.createContactsGQL
      .mutate({
        contactCreateDtos: contacts,
      })
      .pipe(map((result) => result?.data?.createContacts));
  }
}
