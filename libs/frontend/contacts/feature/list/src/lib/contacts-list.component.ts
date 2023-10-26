import { NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ContactsService } from '@booking/frontend-contacts-data-access';

@Component({
  standalone: true,
  selector: 'booking-contacts-list',
  templateUrl: './contacts-list.component.html',
  styleUrls: ['./contacts-list.component.scss'],
  imports: [NgFor],
})
export class BookingContactsListComponent implements OnInit {
  contacts: any[] = [];

  constructor(private contactsService: ContactsService) {}

  ngOnInit(): void {
    this.contactsService.getContacts().subscribe((contacts) => {
      this.contacts = contacts;
    });
  }
}
