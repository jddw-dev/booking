import { AsyncPipe, NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ContactsFacade } from '@booking/frontend-contacts-data-access';

@Component({
  standalone: true,
  selector: 'booking-contacts-list',
  templateUrl: './contacts-list.component.html',
  styleUrls: ['./contacts-list.component.scss'],
  imports: [NgFor, AsyncPipe, RouterLink],
})
export class BookingContactsListComponent implements OnInit {
  contacts$ = this.contactsFacade.allContacts$;

  constructor(private contactsFacade: ContactsFacade) {}

  ngOnInit(): void {
    this.contactsFacade.init();
  }
}
