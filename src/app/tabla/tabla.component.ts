import { Component, OnInit } from '@angular/core';
import { DictamenService } from '../service/dictamen.service';
import { Dictamen } from '../model/dictamen.model';

import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from '../../assets/vfs_fonts.js';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import { fonts } from '../config/pdfFonts';
import { styles, defaultStyle } from '../config/customStyle';
import { fondo } from '../files/fondo';

pdfMake.fonts = fonts;

@Component({
  selector: 'app-tabla',
  templateUrl: './tabla.component.html',
  styleUrls: ['./tabla.component.css'],
})
export class TablaComponent implements OnInit {
  dictamenes_: Dictamen[] = [];

  constructor(private DictamenService_: DictamenService) {}

  ngOnInit() {
    this.obtenerDatosDictamen();
  }

  obtenerDatosDictamen() {
    this.DictamenService_.obtenerDictamenes().subscribe(
      (data) => {
        this.dictamenes_ = data;
        console.log(data);
      },
      (error) => {
        console.error('Error al obtener los datos de Dictamenes', error);
      }
    );
  }

  generateTable() {
    const body = [
      [
        { text: 'RIVM', style: 'gerencia' },
        { text: 'REGIONAL', style: 'gerencia' },
        { text: 'ESTADO', style: 'gerencia' },
        { text: 'N° DICTAMEN', style: 'gerencia' },
        { text: 'FECHA DICTAMEN', style: 'gerencia' },
        { text: 'GRADO INVALIDEZ', style: 'gerencia' },
        { text: 'RIESGO PROFESIONAL', style: 'gerencia' },
        { text: 'ACCIDENTE DE TRABAJO', style: 'gerencia' },
        { text: 'ENFERMEDAD PROFESIONAL', style: 'gerencia' },
        { text: 'RIESGO COMUN', style: 'gerencia' },
        { text: 'ACCIDENTE COMUN', style: 'gerencia' },
        { text: 'ENFERMEDAD COMUN', style: 'gerencia' },
      ],
    ];

    this.dictamenes_.forEach((dictamen) => {
      body.push([
        { text: dictamen.rivm, style: 'gerencia' },
        { text: dictamen.regional.toString(), style: 'gerencia' },
        { text: dictamen.estado, style: 'gerencia' },
        { text: dictamen.numero_dictamen, style: 'gerencia' },
        {
          text: new Date(dictamen.fecha_dictamen).toLocaleDateString(),
          style: 'gerencia',
        },
        { text: dictamen.grado_invalidez.toString(), style: 'gerencia' },
        { text: dictamen.riesgo_profesional.toString(), style: 'gerencia' },
        { text: dictamen.accidente_trabajo.toString(), style: 'gerencia' },
        { text: dictamen.enfermedad_profesional.toString(), style: 'gerencia' },
        { text: dictamen.riesgo_comun.toString(), style: 'gerencia' },
        { text: dictamen.accidente_comun.toString(), style: 'gerencia' },
        { text: dictamen.enfermedad_comun.toString(), style: 'gerencia' },
      ]);
    });

    const docDefinition = {
      pageSize: 'legal',
      pageOrientation: 'landscape',
      styles,
      defaultStyle,
      background: [
        {
          image: fondo,
          width: 1008, // tamaño legal en landscape
          height: 612,
        },
      ],
      content: [
        { text: '\n', style: 'gerencia' },
        {
          layout: 'lightHorizontalLines',
          table: {
            headerRows: 1,
            widths: [
              '*',
              'auto',
              'auto',
              '*',
              'auto',
              'auto',
              'auto',
              'auto',
              'auto',
              'auto',
              'auto',
              'auto',
            ],
            body: body,
          },
        },
      ],
    };

    pdfMake.createPdf(docDefinition).open();
  }
}
