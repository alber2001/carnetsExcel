import { Component, OnInit } from '@angular/core';
import { PlanillaPensionadosService } from './service/planilla.service';
import { Pensionado } from './model/planilla.model';

import * as XLSX from 'xlsx';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from '../assets/vfs_fonts.js';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
pdfMake.fonts = fonts;
import { fonts } from './config/pdfFonts';
import { styles, defaultStyle } from './config/customStyle';
import { BASE64DATA } from './files/base64Data';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'pruebasFont';

  ngOnInit() {
    this.obtenerDatosPensionados();
  }

  archivoCargado: boolean = false; // ✅ Nuevo
  pensionados: Pensionado[] = [];

  constructor(private planillaService: PlanillaPensionadosService) {}

  obtenerDatosPensionados() {
    this.planillaService.obtenerPensionados().subscribe(
      (data) => {
        this.pensionados = data;
        const cantidadRegistros = this.pensionados.length;
        console.log(cantidadRegistros);
      },
      (error) => {
        console.error('Error al obtener los datos de pensionados', error);
      }
    );
  }

  // Dentro de tu AppComponent
  onFileChange(event: any) {
    const target: DataTransfer = <DataTransfer>event.target;
    if (target.files.length !== 1) {
      console.error('No se puede cargar más de un archivo');
      return;
    }

    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {
      const bstr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });
      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];

      const data = XLSX.utils.sheet_to_json<Pensionado>(ws, { header: 1 });
      const [header, ...rows] = data;

      this.pensionados = rows.map((row: any) => ({
        nombre: row[1],
        area: row[2],
        numero_pago: row[3],
        causa: row[0] ?? '',
      }));

      // ✅ Aquí sí, después de cargar los datos
      this.archivoCargado = this.pensionados.length > 0;
      this.planillaService.setPensionados(this.pensionados);

      console.log(this.pensionados);
    };

    reader.readAsBinaryString(target.files[0]);
  }

  generatePDF() {
    const chunks = this.chunkArray(this.pensionados, 8);

    const documentDefinition = {
      pageSize: 'letter',
      pageOrientation: 'portrait',
      pageMargins: [73.5, 56.693, 73.5, 83],
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

      // Agrega la imagen a la par del primer registro
      row.push({
        stack: [
          {
            image: BASE64DATA,
            width: 66.24, // Ancho en píxeles
            height: 45.36, // Alto en píxeles
            margin: [-1.9, -1.9, 0, 0], // Margen
          },
          {
            text: 'INSTITUTO HONDUREÑO DE ',
            margin: [80, -30, 0, 0],
            style: 'negrita',
          },
          {
            text: 'SEGURIDAD SOCIAL ',
            margin: [95, 0, 0, 0],
            style: 'negrita',
          },
          {
            text: 'RÉGIMEN DEL SEGURO DE PREVISIÓN SOCIAL',
            style: 'negritaLil',
            margin: [61, 5, 0, 0],
          },
          {
            text: '(RSPS)',
            style: 'negritaLil',
            margin: [120, -0.1, 0, 0],
          },
          {
            text: 'CARNET DE CONTROL DE PAGO DE PENSIONES',
            style: 'negritaLil',
            margin: [56, 4.5, 0, 0],
          },
          {
            text: `${record1.nombre}`,
            style: 'nombres',
            margin: [0, 14.5, 0, 0],
          },
          {
            canvas: [
              {
                type: 'line',
                x1: 0,
                y1: 0,
                x2: 224,
                y2: 0,
                lineWidth: 1,
                lineColor: 'black',
              },
            ],
            alignment: 'center',
            margin: [0, 1, 0, 0],
          },
          {
            text: `${record1.area}`,
            style: 'area1',
            margin: [-63, 1, 0, 0],
          },
          {
            text: 'Nombre del pensionado',
            style: 'subtitulo',
            margin: [0, -7, 0, 0],
          },

          {
            text: `${record1.numero_pago}`,
            style: 'pago',
          },
          {
            canvas: [
              {
                type: 'line',
                x1: 0,
                y1: 0,
                x2: 224,
                y2: 0,
                lineWidth: 1,
                lineColor: 'black',
              },
            ],
            alignment: 'center',
            margin: [0, 1, 0, 0],
          },
          {
            text: 'Número de control',
            style: 'control',
          },
        ],
      });

      // Agrega la imagen a la par del segundo registro
      row.push(
        record2
          ? {
              stack: [
                {
                  image: BASE64DATA,
                  width: 66.24, // Ancho en píxeles
                  height: 45.36, // Alto en píxeles
                  margin: [-1.9, -1.9, 0, 0], // Margen
                },
                {
                  text: 'INSTITUTO HONDUREÑO DE ',
                  margin: [80, -30, 0, 0],
                  style: 'negrita',
                },
                {
                  text: 'SEGURIDAD SOCIAL ',
                  margin: [95, 0, 0, 0],
                  style: 'negrita',
                },
                {
                  text: 'RÉGIMEN DEL SEGURO DE PREVISIÓN SOCIAL',
                  style: 'negritaLil',
                  margin: [61, 5, 0, 0],
                },
                {
                  text: '(RSPS)',
                  style: 'negritaLil',
                  margin: [120, -0.1, 0, 0],
                },
                {
                  text: 'CARNET DE CONTROL DE PAGO DE PENSIONES',
                  style: 'negritaLil',
                  margin: [56, 4.5, 0, 0],
                },
                {
                  text: `${record2.nombre}`,
                  style: 'nombres',
                  margin: [0, 14.5, 0, 0],
                },
                {
                  canvas: [
                    {
                      type: 'line',
                      x1: 0,
                      y1: 0,
                      x2: 224,
                      y2: 0,
                      lineWidth: 1,
                      lineColor: 'black',
                    },
                  ],
                  alignment: 'center',
                  margin: [0, 1, 0, 0],
                },

                {
                  text: 'Nombre del pensionado',
                  style: 'subtitulo',
                  margin: [0, 1, 0, 0],
                },
                {
                  text: `${record2.area}`,
                  style: 'area1',
                  absolutePosition: { x: 520, y: 12 },
                },
                {
                  text: `${record2.numero_pago}`,
                  style: 'pago',
                },
                {
                  canvas: [
                    {
                      type: 'line',
                      x1: 0,
                      y1: 0,
                      x2: 224,
                      y2: 0,
                      lineWidth: 1,
                      lineColor: 'black',
                    },
                  ],
                  alignment: 'center',
                  margin: [0, 1, 0, 0],
                },
                {
                  text: 'Número de control',
                  style: 'control',
                },
              ],
            }
          : { text: '' }
      );
      body.push(row);
    }

    return {
      layout: {
        hLineWidth: (i, node) =>
          i === 0 || i === node.table.body.length ? 0.5 : 0.5,
        vLineWidth: (i, node) =>
          i === 0 || i === node.table.widths.length ? 0.5 : 0.5,
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

  // Función para dividir el array en chunks
  chunkArray(array, size) {
    const result = [];
    for (let i = 0; i < array.length; i += size) {
      result.push(array.slice(i, i + size));
    }
    return result;
  }
}
