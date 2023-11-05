import { Injectable } from '@angular/core';

import * as exceljs from 'exceljs';
import { XlsParserFacade } from '../+state/xls-parser.facade';
import { XlsFile } from '../models/xls-file.model';

@Injectable({ providedIn: 'root' })
export class XlsReaderService {
  constructor(private xlsParserFacade: XlsParserFacade) {}

  readFile(file: File) {
    const fileReader = new FileReader();
    fileReader.onload = (e: any) => {
      const arrayBuffer = e.target.result;
      this.parseExcel(arrayBuffer);
    };

    fileReader.readAsArrayBuffer(file);
  }

  protected async parseExcel(arrayBuffer: any) {
    const workbook = new exceljs.Workbook();
    await workbook.xlsx.load(arrayBuffer);

    const worksheet = workbook.getWorksheet(1);
    if (!worksheet) {
      throw new Error('No worksheet found');
    }

    let properties:
      | exceljs.CellValue[]
      | {
          [key: string]: exceljs.CellValue;
        } = [];
    const rows: any[] = [];

    worksheet.eachRow({ includeEmpty: false }, (row, rowNumber) => {
      if (rowNumber === 1) {
        properties = row.values;
      } else {
        rows.push(row.values);
      }
    });

    const decodedFile: XlsFile = {
      properties,
      rows,
    };

    this.xlsParserFacade.decodedFile(decodedFile);
  }
}
