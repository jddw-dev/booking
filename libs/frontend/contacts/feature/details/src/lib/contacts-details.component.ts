import { AsyncPipe, NgIf } from '@angular/common';
import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import {
  ContactEntity,
  ContactsFacade,
} from '@booking/frontend-contacts-data-access';
import { Observable } from 'rxjs';

@Component({
  standalone: true,
  selector: 'booking-contacts-details',
  templateUrl: './contacts-details.component.html',
  styleUrls: ['./contacts-details.component.scss'],
  imports: [NgIf, AsyncPipe],
})
export class BookingContactsDetailsComponent implements OnInit {
  private readonly destroy: DestroyRef = inject(DestroyRef);

  contact$: Observable<ContactEntity | undefined>;

  constructor(
    private contactsFacade: ContactsFacade,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap
      .pipe(takeUntilDestroyed(this.destroy))
      .subscribe((params) => {
        const id = params.get('id');
        if (id) {
          this.contact$ = this.contactsFacade.contact$(id);
          this.contactsFacade.getContact(id);
        }
      });
  }
}
