import { AsyncPipe } from '@angular/common';
import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router } from '@angular/router';
import { XlsParserFacade } from '@booking/frontend-xls-parser-feature-xls-reader';

@Component({
  standalone: true,
  selector: 'booking-contacts-import',
  templateUrl: './import.component.html',
  styleUrls: ['./import.component.scss'],
  imports: [FormsModule, ReactiveFormsModule, AsyncPipe],
})
export class BookingContactsImportComponent implements OnInit {
  private readonly destroy: DestroyRef = inject(DestroyRef);

  form: FormGroup;
  currentFile?: File;

  private isWaitingForFileLoad = false;
  decodedFile$ = this.xlsParserFacade.decodedFile$;

  constructor(
    private formBuilder: FormBuilder,
    private xlsParserFacade: XlsParserFacade,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      importFile: [null],
    });

    this.decodedFile$
      .pipe(takeUntilDestroyed(this.destroy))
      .subscribe((decodedFile) => {
        if (!this.isWaitingForFileLoad) {
          return;
        }

        if (decodedFile) {
          this.router.navigate(['/contacts/map-properties']);
        }
      });
  }

  selectFile(event: any) {
    this.currentFile = event.target.files[0];
  }

  submitForm() {
    if (this.currentFile) {
      this.isWaitingForFileLoad = true;
      this.xlsParserFacade.loadFile(this.currentFile);
    }
  }
}
