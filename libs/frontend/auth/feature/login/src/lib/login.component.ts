import { NgClass, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthFacade } from '@booking/frontend-auth-data-access';

@Component({
  standalone: true,
  selector: 'booking-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [NgClass, NgIf, ReactiveFormsModule],
})
export class BookingAuthFeatureLoginComponent implements OnInit {
  form!: FormGroup;
  loading = false;
  submitted = false;
  error?: string;

  constructor(
    private formBuilder: FormBuilder,
    private authFacade: AuthFacade
  ) {
    // Todo : redirect if user is logged in ?
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  get f() {
    return this.form.controls;
  }

  async onSubmit() {
    this.submitted = true;

    // Reset errors
    this.error = '';

    if (this.form.invalid) {
      return;
    }

    this.loading = true;

    // Log in
    this.authFacade.login(this.f.email.value, this.f.password.value);
  }

  async onGoogleLogin() {
    // try {
    //   const credentials = await this.authService.loginWithGoogle();
    //   this.authService
    //     .registerFromSocial(credentials.user.uid, credentials.user.email)
    //     .pipe(first())
    //     .subscribe((user) => {
    //       this.router.navigate(['']);
    //     });
    // } catch (err) {
    //   console.error(`${authConstants.errors.loginError}: ${err.code}`);
    //   return;
    // }
  }
}
