import * as exceljs from 'exceljs';

export interface XlsFile {
  properties: exceljs.CellValue[];
  rows: exceljs.CellValue[][];
}
