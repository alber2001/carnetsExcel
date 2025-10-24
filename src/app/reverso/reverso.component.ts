import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';
import { PlanillaPensionadosService } from '../service/planilla.service';
import { Pensionado } from '../model/planilla.model';
import { firmaGerencia } from '../files/firmaGerencia';
import { selloGerencia } from '../files/selloGerencia';

import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from '../../assets/vfs_fonts.js';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
pdfMake.fonts = fonts;
import { fonts } from '../config/pdfFonts';
import { styles, defaultStyle } from '../config/customStyle';

@Component({
  selector: 'app-reverso',
  templateUrl: './reverso.component.html',
  styleUrls: ['./reverso.component.css'],
})
export class ReversoComponent implements OnInit {
  @Input() pensionados: Pensionado[] = [];

  // ngOnInit() {
  //   this.obtenerDatosPensionados();
  // }

  ngOnInit() {
    this.planillaService.pensionados$.subscribe((data) => {
      this.pensionados = data;
      console.log('Datos recibidos en reverso:', this.pensionados);
    });
  }

  //pensionados: Pensionado[] = [];

  constructor(private planillaService: PlanillaPensionadosService) {}

  obtenerDatosPensionados() {
    this.planillaService.obtenerPensionados().subscribe(
      (data) => {
        this.pensionados = data;
      },
      (error) => {
        console.error('Error al obtener los datos de pensionados', error);
      }
    );
  }

  generatePDF() {
    if (this.pensionados.length === 0) {
      alert('No hay datos cargados.');
      return;
    }

    //console.log('Datos recibidos en reverso:', this.pensionados);
    const chunks = this.chunkArray(this.pensionados, 8);

    const documentDefinition = {
      pageSize: 'letter',
      pageOrientation: 'portrait',
      pageMargins: [70, 56.693, 70, 83],
      styles,
      defaultStyle,
      content: chunks.map((chunk) => this.createTable(chunk)),
      footer: function (currentPage, pageCount) {
        return {
          text: currentPage.toString() + ' de ' + pageCount,
          alignment: 'center',
          style: 'normal',
          margin: [0, 30, 0, 0], // Ajusta el margen como desees
        };
      },
    };

    pdfMake.createPdf(documentDefinition).open();
  }

  createTable(data) {
    const body = [];
    for (let i = 0; i < data.length; i += 2) {
      const row = [];
      const record1 = data[i];
      const record2 = i + 1 < data.length ? data[i + 1] : null;
      row.push({
        stack: [
          {
            text: 'PENSIONADO(A) POR:',
            style: 'reversoTitulo',
          },
          {
            text: `${record1.causa}`,
            style: 'causa',
            margin:
              `${record1.causa}` === `Vejez Complementaria`
                ? [95, -12, 0, 0]
                : [107, -12, 0, 0],
          },
          {
            canvas: [
              {
                type: 'line',
                x1: 0,
                y1: 0,
                x2: 120,
                y2: 0,
                lineWidth: 1,
                lineColor: 'black',
              },
            ],
            margin: [100, 1, 0, 0],
          },
          {
            text: 'Este Carnet es exclusivo para usarse en el cobro de la pensión correspondiente',
            style: 'mensaje',
            margin: [0, 18, 0, 0],
          },
          {
            image: firmaGerencia,
            width: 135.5,
            height: 62.36,
            absolutePosition: { x: 255, y: 55 },
          },
          {
            image: selloGerencia,
            width: 76.9706,
            height: 78.0316,
            absolutePosition: { x: 355, y: 44.8599 },
          },
          {
            canvas: [
              {
                type: 'line',
                x1: 0,
                y1: 0,
                x2: 200,
                y2: 0,
                lineWidth: 1,
                lineColor: 'black',
              },
            ],
            alignment: 'center',
            margin: [0, 40, 0, 0],
          },
          {
            text: 'Gerencia del Régimen RSPS - IHSS',
            style: 'gerencia',
          },
        ],
      });

      row.push(
        record2
          ? {
              stack: [
                {
                  text: ' PENSIONADO(A) POR:',
                  style: 'reversoTitulo',
                },
                {
                  text: `${record2.causa}`,
                  style: 'causa',
                  margin:
                    `${record2.causa}` === `Vejez Complementaria`
                      ? [96, -12, 0, 0]
                      : [107, -12, 0, 0],
                },
                {
                  canvas: [
                    {
                      type: 'line',
                      x1: 0,
                      y1: 0,
                      x2: 120,
                      y2: 0,
                      lineWidth: 1,
                      lineColor: 'black',
                    },
                  ],
                  margin: [100, 1, 0, 0],
                },
                {
                  text: 'Este Carnet es exclusivo para usarse en el cobro de la pensión correspondiente',
                  style: 'mensaje',
                  margin: [0, 18, 0, 0],
                },
                {
                  image: firmaGerencia,
                  width: 135.5,
                  height: 62.36,
                  absolutePosition: { x: 28, y: 55 },
                },
                {
                  image: selloGerencia,
                  width: 76.9706,
                  height: 78.0316,
                  absolutePosition: { x: 128, y: 44.8599 },
                },
                {
                  canvas: [
                    {
                      type: 'line',
                      x1: 0,
                      y1: 0,
                      x2: 200,
                      y2: 0,
                      lineWidth: 1,
                      lineColor: 'black',
                    },
                  ],
                  alignment: 'center',
                  margin: [0, 40, 0, 0],
                },
                {
                  text: 'Gerencia del Régimen RSPS - IHSS',
                  style: 'gerencia2',
                },
              ],
            }
          : { text: '', alignment: 'center' }
      );
      row.reverse();
      body.push(row);
    }

    return {
      layout: {
        hLineWidth: (i, node) =>
          i === 0 || i === node.table.body.length ? 0.0 : 0.0,
        vLineWidth: (i, node) =>
          i === 0 || i === node.table.widths.length ? 0.0 : 0.0,
      },
      table: {
        headerRows: 1,
        widths: ['*', '*'],
        body,
        dontBreakRows: true,
        heights: () => 150,
      },
    };
  }

  chunkArray(array, size) {
    const result = [];
    for (let i = 0; i < array.length; i += size) {
      result.push(array.slice(i, i + size));
    }
    return result;
  }
}
