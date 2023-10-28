import { NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MeQuery } from '@booking/frontend-shared-graphql';

@Component({
  selector: 'booking-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  standalone: true,
  imports: [RouterLink, NgIf],
})
export class BookingFrontendUiNavbarComponent {
  @Input() title = '';
  @Input() user?: MeQuery['me'] | null;
  @Input() loginRoute = '/auth/login';

  @Output() logout = new EventEmitter<void>();

  onLogout() {
    this.logout.emit();
  }
}
