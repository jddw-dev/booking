import { createActionGroup, props } from '@ngrx/store';
import { XlsFile } from '../models/xls-file.model';

export const XlsReaderActions = createActionGroup({
  source: 'Xls/Reader',
  events: {
    'Load File': props<{ file: File }>(),
    'Decoded File': props<{ decodedFile: XlsFile }>(),
  },
});
