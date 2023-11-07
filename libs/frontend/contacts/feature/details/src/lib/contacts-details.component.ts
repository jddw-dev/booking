import { Component } from '@angular/core';
import { ContactsFacade } from '@booking/frontend-contacts-data-access';

@Component({
  standalone: true,
  selector: 'booking-contacts-details',
  templateUrl: './contacts-details.component.html',
  styleUrls: ['./contacts-details.component.scss'],
  imports: [],
})
export class BookingContactsDetailsComponent {
  constructor(private contactsFacade: ContactsFacade) {}
}
