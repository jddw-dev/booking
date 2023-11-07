import { AsyncPipe, NgClass, NgFor, NgIf } from '@angular/common';
import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ContactsFacade } from '@booking/frontend-contacts-data-access';
import { PAGINATION_CONSTANTS } from '@booking/frontend-pagination-data-access';
import { LetDirective } from '@ngrx/component';

@Component({
  standalone: true,
  selector: 'booking-contacts-list',
  templateUrl: './contacts-list.component.html',
  styleUrls: ['./contacts-list.component.scss'],
  imports: [
    NgIf,
    NgFor,
    NgClass,
    LetDirective,
    AsyncPipe,
    RouterLink,
    FormsModule,
  ],
})
export class BookingContactsListComponent implements OnInit {
  private readonly destroy: DestroyRef = inject(DestroyRef);

  contacts$ = this.contactsFacade.contacts$;
  pagination$ = this.contactsFacade.pagination$;
  currentPage$ = this.contactsFacade.currentPage$;
  total$ = this.contactsFacade.total$;

  pages: number[] = [];
  nbPages = 0;

  search = '';

  constructor(private contactsFacade: ContactsFacade) {}

  ngOnInit(): void {
    this.contactsFacade.init();

    this.pagination$
      .pipe(takeUntilDestroyed(this.destroy))
      .subscribe((pagination) => {
        this.pages = this.buildPages_(
          pagination.currentPage ?? 1,
          pagination.nbPages
        );
      });
  }

  // TODO : move pagination to dedicated LIB

  goToPage(page: number): void {
    console.log(`goToPage : ${page}`);

    if (page >= 1 && page <= this.nbPages) {
      this.contactsFacade.getContacts(page);
    }
  }

  private buildPages_(current: number, total: number): number[] {
    this.nbPages = total;

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

  // TODO : improve and move filters to dedicated LIB
  onSearchChanged(search: string) {
    this.search = search;

    // TODO : mettre dans le store !
    this.contactsFacade.getContacts(
      1,
      PAGINATION_CONSTANTS.DEFAULT_PER_PAGE,
      this.search
    );
  }
}
