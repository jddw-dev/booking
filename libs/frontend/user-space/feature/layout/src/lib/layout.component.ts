import { AsyncPipe } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthFacade } from '@booking/frontend-auth-data-access';
import { BookingFrontendUiNavbarComponent } from '@booking/frontend-ui-navbar';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  standalone: true,
  selector: 'booking-user-space-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  imports: [
    RouterModule,
    FontAwesomeModule,
    BookingFrontendUiNavbarComponent,
    AsyncPipe,
  ],
})
export class BookingUserSpaceLayoutComponent {
  user$ = this.authFacade.user$;

  constructor(private authFacade: AuthFacade) {}

  logout() {
    this.authFacade.logout();
  }
}
