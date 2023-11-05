import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ContactsService } from '@booking/frontend-contacts-data-access';
import { XlsParserFacade } from '@booking/frontend-xls-parser-feature-xls-reader';
import { take } from 'rxjs';

@Component({
  standalone: true,
  selector: 'booking-contacts-map-properties',
  templateUrl: './map-properties.component.html',
  styleUrls: ['./map-properties.component.scss'],
  imports: [NgIf, NgFor, AsyncPipe, FormsModule, ReactiveFormsModule],
})
export class BookingContactsMapPropertiesComponent implements OnInit {
  decodedFile$ = this.xlsParserFacade.decodedFile$;

  form: FormGroup;

  constructor(
    private xlsParserFacade: XlsParserFacade,
    private formBuilder: FormBuilder,
    private contactsService: ContactsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      firstname: null,
      name: null,
      email: null,
      phone: null,
      jobName: null,
      comments: null,
    });
  }

  get f() {
    return this.form.controls;
  }

  validatePropertiesMapping() {
    const mapping = {
      firstname: this.f.firstname.value,
      name: this.f.name.value,
      email: this.f.email.value,
      phone: this.f.phone.value,
      jobName: this.f.jobName.value,
      comments: this.f.comments.value,
    };

    this.decodedFile$.pipe(take(1)).subscribe((decodedFile) => {
      if (decodedFile) {
        this.contactsService
          .saveFromImport(decodedFile.rows, mapping)
          .subscribe((result) => {
            // TODO : if error ?
            // TODO : alert success
            this.router.navigate(['/contacts']);
          });
      }
    });
  }
}
