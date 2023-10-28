import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthFacade, AuthService } from '@booking/frontend-auth-data-access';
import { Apollo } from 'apollo-angular';

@Component({
  standalone: true,
  imports: [RouterModule, CommonModule],
  selector: 'booking-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(
    private authFacade: AuthFacade,
    private apollo: Apollo,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.authFacade.init();
  }
}
