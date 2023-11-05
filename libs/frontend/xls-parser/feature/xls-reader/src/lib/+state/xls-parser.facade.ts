import { Injectable, inject } from '@angular/core';
import { Store, select } from '@ngrx/store';

import { XlsFile } from '../models/xls-file.model';
import { XlsReaderActions } from './xls-parser.actions';
import * as XlsParserSelectors from './xls-parser.selectors';

@Injectable({ providedIn: 'root' })
export class XlsParserFacade {
  private readonly store = inject(Store);

  isLoading$ = this.store.pipe(select(XlsParserSelectors.selectIsLoading));
  file$ = this.store.pipe(select(XlsParserSelectors.selectFile));
  decodedFile$ = this.store.pipe(select(XlsParserSelectors.selectDecodedFile));

  loadFile(file: File) {
    this.store.dispatch(XlsReaderActions.loadFile({ file }));
  }

  decodedFile(decodedFile: XlsFile) {
    this.store.dispatch(XlsReaderActions.decodedFile({ decodedFile }));
  }
}
