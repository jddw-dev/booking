import { Action, createReducer, on } from '@ngrx/store';
import { XlsFile } from '../models/xls-file.model';
import { XlsReaderActions } from './xls-parser.actions';

export const XLS_PARSER_FEATURE_KEY = 'xlsParser';

export interface XlsParserState {
  file: File | null;
  decodedFile: XlsFile | null;
  isLoading: boolean;
}

export const initialXlsParserState: XlsParserState = {
  file: null,
  decodedFile: null,
  isLoading: false,
};

const reducer = createReducer(
  initialXlsParserState,
  on(XlsReaderActions.loadFile, (state, { file }) => ({
    ...state,
    file,
    isLoading: true,
  })),
  on(XlsReaderActions.decodedFile, (state, { decodedFile }) => ({
    ...state,
    decodedFile,
    isLoading: false,
  }))
);

export function xlsParserReducer(
  state: XlsParserState | undefined,
  action: Action
) {
  return reducer(state, action);
}
