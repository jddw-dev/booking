import { AsyncPipe, NgClass, NgFor, NgIf } from '@angular/common';
import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { ContactsFacade } from '@booking/frontend-contacts-data-access';
import { LetDirective } from '@ngrx/component';

@Component({
  standalone: true,
  selector: 'booking-contacts-list',
  templateUrl: './contacts-list.component.html',
  styleUrls: ['./contacts-list.component.scss'],
  imports: [NgIf, NgFor, NgClass, LetDirective, AsyncPipe, RouterLink],
})
export class BookingContactsListComponent implements OnInit {
  private readonly destroy: DestroyRef = inject(DestroyRef);

  contacts$ = this.contactsFacade.contacts$;
  pagination$ = this.contactsFacade.paginationDetails$;
  currentPage$ = this.contactsFacade.currentPage$;

  pages: number[] = [];

  constructor(private contactsFacade: ContactsFacade) {}

  ngOnInit(): void {
    this.contactsFacade.init();

    this.pagination$
      .pipe(takeUntilDestroyed(this.destroy))
      .subscribe((pagination) => {
        this.pages = this.buildPages_(
          pagination.currentPage,
          pagination.nbPages
        );
      });
  }

  goToPage(page: number): void {
    console.log(`goToPage : ${page}`);
    this.contactsFacade.getContacts(page);
  }

  private buildPages_(current: number, total: number): number[] {
    if (total <= 7) {
      return [...Array(total).keys()].map((x) => ++x);
    }

    if (current > 5) {
      if (current >= total - 4) {
        return [1, -1, total - 4, total - 3, total - 2, total - 1, total];
      } else {
        return [1, -1, current - 1, current, current + 1, -1, total];
      }
    }

    return [1, 2, 3, 4, 5, -1, total];
  }
}
