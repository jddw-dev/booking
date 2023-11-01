import { AsyncPipe } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthFacade } from '@booking/frontend-auth-data-access';
import { BookingFrontendUiNavbarComponent } from '@booking/frontend-ui-navbar';
import { SidebarComponent, SidebarLink } from '@booking/frontend-ui-sidebar';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faAddressBook,
  faCog,
  faDashboard,
  faSheetPlastic,
  faTasks,
} from '@fortawesome/free-solid-svg-icons';

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
    SidebarComponent,
  ],
})
export class BookingUserSpaceLayoutComponent {
  user$ = this.authFacade.user$;

  navigationLinks: SidebarLink[] = [
    {
      icon: faDashboard,
      text: 'Tableau de bord',
      href: '/',
    },

    {
      icon: faAddressBook,
      text: 'Contacts',
      href: '/contacts',
    },

    {
      icon: faSheetPlastic,
      text: 'Modèles',
      href: '/templates',
    },

    {
      icon: faTasks,
      text: 'Tâches',
      href: '/tasks',
    },

    {
      icon: faCog,
      text: 'Paramètres',
      href: '/settings',
    },
  ];

  constructor(private authFacade: AuthFacade) {}

  logout() {
    this.authFacade.logout();
  }
}
