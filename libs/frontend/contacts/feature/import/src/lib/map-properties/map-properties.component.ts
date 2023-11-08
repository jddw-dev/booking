import { AsyncPipe, KeyValuePipe, NgFor, NgIf } from '@angular/common';
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
  imports: [
    NgIf,
    NgFor,
    KeyValuePipe,
    AsyncPipe,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class BookingContactsMapPropertiesComponent implements OnInit {
  decodedFile$ = this.xlsParserFacade.decodedFile$;

  form: FormGroup;

  readonly propertiesToMap = [
    { name: 'firstname', displayName: 'Prénom', value: null },
    { name: 'name', displayName: 'Nom', value: null },
    { name: 'email', displayName: 'Email', value: null },
    { name: 'phone', displayName: 'Téléphone', value: null },
    { name: 'type', displayName: 'Type', value: null },
    { name: 'jobName', displayName: 'Intitulé du poste', value: null },
    { name: 'zipcode', displayName: 'Code postal', value: null },
    { name: 'city', displayName: 'Ville', value: null },
    {
      name: 'bookingPeriod',
      displayName: 'Période de programmation',
      value: null,
    },
    { name: 'eventPeriod', displayName: "Période d'événement", value: null },
    { name: 'comments', displayName: 'Commentaires', value: null },
  ];

  constructor(
    private xlsParserFacade: XlsParserFacade,
    private formBuilder: FormBuilder,
    private contactsService: ContactsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const formFields: any = {};
    for (const property of this.propertiesToMap) {
      formFields[property.name] = null;
    }
    this.form = this.formBuilder.group(formFields);
  }

  get f() {
    return this.form.controls;
  }

  validatePropertiesMapping() {
    const mapping: any = {};
    for (const property of this.propertiesToMap) {
      mapping[property.name] = this.f[property.name].value;
    }

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
