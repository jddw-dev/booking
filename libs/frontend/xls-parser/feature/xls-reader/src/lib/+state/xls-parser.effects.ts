import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map } from 'rxjs';
import { XlsReaderService } from '../services/xls-reader.service';
import { XlsReaderActions } from './xls-parser.actions';

@Injectable({ providedIn: 'root' })
export class XlsParserEffects {
  private actions$ = inject(Actions);

  constructor(private xlsReaderService: XlsReaderService) {}

  loadFile$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(XlsReaderActions.loadFile),
        map(({ file }) => {
          this.xlsReaderService.readFile(file);
        })
      ),
    { dispatch: false }
  );
}
