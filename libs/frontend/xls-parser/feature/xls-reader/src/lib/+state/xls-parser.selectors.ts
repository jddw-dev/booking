import { createFeatureSelector, createSelector } from '@ngrx/store';
import { XLS_PARSER_FEATURE_KEY, XlsParserState } from './xls-parser.reducer';

export const selectXlsParserState = createFeatureSelector<XlsParserState>(
  XLS_PARSER_FEATURE_KEY
);

export const selectIsLoading = createSelector(
  selectXlsParserState,
  (state: XlsParserState) => state.isLoading
);

export const selectDecodedFile = createSelector(
  selectXlsParserState,
  (state: XlsParserState) => state.decodedFile
);

export const selectFile = createSelector(
  selectXlsParserState,
  (state: XlsParserState) => state.file
);
