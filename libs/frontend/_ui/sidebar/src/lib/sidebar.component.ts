import { NgFor, NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SimplebarAngularModule } from 'simplebar-angular';

export class SidebarLink {
  icon?: any;
  text: string;
  href: string;
}

@Component({
  selector: 'booking-sidebar',
  standalone: true,
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  imports: [
    FontAwesomeModule,
    SimplebarAngularModule,
    RouterLink,
    RouterLinkActive,
    NgFor,
    NgIf,
  ],
})
export class SidebarComponent {
  @Input() brand: string;
  @Input() brandLink: string;
  @Input() links: SidebarLink[] = [];
}
