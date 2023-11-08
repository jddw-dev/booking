import { Injectable } from '@angular/core';
import {
  ContactGQL,
  ContactQuery,
  ContactsGQL,
  ContactsQuery,
  CreateContactsGQL,
} from '@booking/frontend-shared-graphql';
import { Observable, map } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ContactsService {
  constructor(
    private contactsGQL: ContactsGQL,
    private contactGQL: ContactGQL,
    private createContactsGQL: CreateContactsGQL
  ) {}

  getContacts(
    page = 1,
    perPage = 25,
    search?: string
  ): Observable<{
    contacts: ContactsQuery['contacts'];
    count: ContactsQuery['contactsCount'];
  }> {
    return this.contactsGQL
      .watch({
        skip: (page - 1) * perPage,
        take: perPage,
        search: search,
      })
      .valueChanges.pipe(
        map((result) => ({
          contacts: result.data.contacts,
          count: result.data.contactsCount,
        }))
      );
  }

  getContact(id: string): Observable<ContactQuery['contact']> {
    return this.contactGQL
      .watch({ id })
      .valueChanges.pipe(map((result) => result.data.contact));
  }

  // TODO : replace any with good type !
  saveFromImport(importRows: any[], mapping: any): Observable<any> {
    const contacts = importRows.map((row) => {
      return {
        firstname: row[mapping.firstname],
        name: row[mapping.name],
        email: row[mapping.email],
        phone: row[mapping.phone],
        type: row[mapping.type],
        jobName: row[mapping.jobName],
        zipcode: row[mapping.zipcode],
        city: row[mapping.city],
        bookingPeriod: row[mapping.bookingPeriod],
        eventPeriod: row[mapping.eventPeriod],
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
