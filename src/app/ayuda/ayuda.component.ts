import { Component, OnInit } from '@angular/core';

import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from '../../assets/vfs_fonts.js';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import { fonts } from '../config/pdfFonts';
import { styles, defaultStyle } from '../config/customStyle';
import { fondo } from '../files/fondo';
import { box } from '../files/box';
import { checked } from '../files/checked';
import { QR } from '../files/quErre';

pdfMake.fonts = fonts;

@Component({
  selector: 'app-ayuda',
  templateUrl: './ayuda.component.html',
  styleUrls: ['./ayuda.component.css'],
})
export class AyudaComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  data: any = {
    solicitud: '',
    fecha_solicitud: '2023-03-02',
    departamento_solicitud: '08',
    municipio_solicitud: '01',
    regional: '4',

    tipo_identidad_fallecido: '1',
    identidad_fallecido: '0801198713352',
    fecha_nacimiento_fallecido: '1987-05-21',
    numero_pago: '',
    numero_patronal: '10119610001B',
    nombres_fallecido: 'LESTER EDUARDO',
    apellidos_fallecido: 'HERNANDEZ ARGEÑAL',
    fecha_fallecimiento: '2023-02-10',
    causa_fallecimiento: '1',
    sexo_fallecido: 'M',
    parentesco: 2,

    tipo_identidad_solicitante: '1',
    identidad_solicitante: '0801200718997',
    nombres_solicitante: 'FANCONY MOISES',
    apellidos_solicitante: 'BUSTILLO DURON',
    sexo_solicitante: 'M',
    fecha_nacimiento_solicitante: '2007-10-21',

    requisitos_gastos_funebres: [
      {
        codigo_requisito: 'ACDEF',
        requisito: 'Acta de Defunción Original o Copia.',
        codigo_tipo_solicitud: 'SGFTA',
        estado: 1,
        usuario: 'LEHA',
      },
      {
        codigo_requisito: 'FACOR',
        requisito:
          'Factura Original de Gastos Mortuorios con la Reglamentación del SAR.',
        codigo_tipo_solicitud: 'SGFTA',
        estado: 1,
        usuario: 'LEHA',
      },
      {
        codigo_requisito: 'DNIFA',
        requisito:
          'Documento de DNI o Partida de Nacimiento del Fallecido.(2 Copias)',
        codigo_tipo_solicitud: 'SGFTA',
        estado: 1,
        usuario: 'LEHA',
      },
      {
        codigo_requisito: 'DNISO',
        requisito:
          'Documento de DNI del Solicitante que Hizo los Gastos Según Factura.(2 Copias)',
        codigo_tipo_solicitud: 'SGFTA',
        estado: 1,
        usuario: 'LEHA',
      },
    ],
    usuario: 'LEHA',
  };

  generarAyuda() {
    console.log('ayuda');
    const documentDefinition = {
      pageSize: 'letter',
      pageOrientation: 'portrait',
      styles,
      defaultStyle,
      background: [
        {
          image: fondo,
          width: 612, //tamaño carta
          height: 792,
        },
      ],
      content: [
        { text: 'SOLICITUD DE AYUDA FUNERARIA', style: 'header1' },        
        { text: '\n', style: 'test' },
        { text: '\n', style: 'test' },
        { text: '\n', style: 'test' },
        { text: '\n', style: 'test' },
        { text: '\n', style: 'test' },
        { text: '\n', style: 'test' },
        { text: '\n', style: 'test' },
        { text: '\n', style: 'test' },
        {
          image: QR,
          width: 70,
          height: 70,
          absolutePosition: { x: 500, y: 120 },
        },
        { text: 'DATOS GENERALES', style: 'paragraph' },
        {
          table: {
            headerRows: 1,
            widths: ['*', '*', '*', '*'], // Ajuste para 4 columnas
            body: [
              [
                { text: `FECHA SOLICITUD`, style: 'negrita' },
                { text: `${this.data.fecha_solicitud}`, style: 'normal' },
                { text: 'DEPARTAMENTO SOLICITUD', style: 'negrita' }, // Nueva columna
                {
                  text: `${this.data.departamento_solicitud}`,
                  style: 'normal',
                }, // Nueva columna
              ],
              [
                { text: 'MUNICIPIO SOLICITUD', style: 'negrita' },
                { text: `${this.data.municipio_solicitud}`, style: 'normal' },
                { text: 'REGIONAL', style: 'negrita' }, // Nueva columna
                { text: `${this.data.regional}`, style: 'normal' }, // Nueva columna
              ],
            ],
          },
        },
        { text: '\n', style: 'normal' },
        { text: 'DATOS DEL FALLECIDO', style: 'paragraph' },
        {
          table: {
            headerRows: 1,
            widths: ['*', '*', '*', '*'], // Ajuste para 4 columnas
            body: [
              [
                { text: `TIPO IDENTIDAD FALLECIDO`, style: 'negrita' },
                {
                  text: `${this.data.tipo_identidad_fallecido}`,
                  style: 'normal',
                },
                { text: 'IDENTIDAD FALLECIDO', style: 'negrita' }, // Nueva columna
                { text: `${this.data.identidad_fallecido}`, style: 'normal' }, // Nueva columna
              ],
              [
                { text: 'FECHA NACIMIENTO ', style: 'negrita' },
                {
                  text: `${this.data.fecha_nacimiento_fallecido}`,
                  style: 'normal',
                },
                { text: 'NÚMERO PAGO', style: 'negrita' }, // Nueva columna
                { text: `${this.data.numero_pago}`, style: 'normal' }, // Nueva columna
              ],
              [
                { text: 'NÚMERO PATRONAL', style: 'negrita' },
                { text: `${this.data.numero_patronal}`, style: 'normal' },
                { text: 'NOMBRES FALLECIDO', style: 'negrita' }, // Nueva columna
                { text: `${this.data.nombres_fallecido}`, style: 'normal' }, // Nueva columna
              ],
              [
                { text: 'APELLIDOS FALLECIDO', style: 'negrita' },
                { text: `${this.data.apellidos_fallecido}`, style: 'normal' },
                { text: 'FECHA FALLECIMIENTO', style: 'negrita' }, // Nueva columna
                { text: `${this.data.fecha_fallecimiento}`, style: 'normal' }, // Nueva columna
              ],
              [
                { text: 'CAUSA FALLECIMIENTO', style: 'negrita' },
                { text: `${this.data.causa_fallecimiento}`, style: 'normal' },
                { text: 'SEXO FALLECIDO', style: 'negrita' }, // Nueva columna
                { text: `${this.data.sexo_fallecido}`, style: 'normal' }, // Nueva columna
              ],
              [
                { text: 'PARENTESCO', style: 'negrita' },
                { text: `${this.data.parentesco}`, style: 'normal' },
                { text: '', style: 'negrita' }, // Nueva columna
                { text: '', style: 'normal' }, // Nueva columna
              ],
            ],
          },
        },
        { text: '\n', style: 'normal' },
        { text: 'DATOS DEL SOLICITANTE', style: 'paragraph' },
        {
          table: {
            headerRows: 1,
            widths: ['*', '*', '*', '*'], // Ajuste para 4 columnas
            body: [
              [
                { text: `TIPO IDENTIDAD`, style: 'negrita' },
                {
                  text: `${this.data.tipo_identidad_solicitante}`,
                  style: 'normal',
                },
                { text: 'IDENTIDAD SOLICITANTE', style: 'negrita' }, // Nueva columna
                { text: `${this.data.identidad_solicitante}`, style: 'normal' }, // Nueva columna
              ],
              [
                { text: 'NOMBRES SOLICITANTE', style: 'negrita' },
                { text: `${this.data.nombres_solicitante}`, style: 'normal' },
                { text: 'APELLIDOS SOLICITANTE', style: 'negrita' }, // Nueva columna
                { text: `${this.data.apellidos_solicitante}`, style: 'normal' }, // Nueva columna
              ],
              [
                { text: 'SEXO SOLICITANTE', style: 'negrita' },
                { text: `${this.data.sexo_solicitante}`, style: 'normal' },
                { text: 'FECHA NACIMIENTO', style: 'negrita' }, // Nueva columna
                {
                  text: `${this.data.fecha_nacimiento_solicitante}`,
                  style: 'normal',
                }, // Nueva columna
              ],
            ],
          },
        },
        { text: '\n', style: 'normal' },
        { text: 'REQUISITOS DE AYUDA FUNERARIA', style: 'paragraph' },
        {
          table: {
            headerRows: 1,
            widths: ['*', 'auto'], // Ajuste para 2 columnas
            body: [
              // Encabezado de la tabla
              [
                { text: 'Requisito', style: 'negrita' },
                { text: 'Estado', style: 'negrita' },
              ],
              // Filas dinámicas
              ...this.data.requisitos_gastos_funebres.map((requisito: any) => [
                { text: requisito.requisito, style: 'test' },
                {
                  image: requisito.estado === 1 ? checked : box, // Usar imágenes de checkboxes
                  width: 10,
                  height: 10,
                  alignment: 'center',
                },
              ]),
            ],
          },
        },
        {text: `${this.data.usuario}`, style: 'normal'}
      ],      
    };
    pdfMake.createPdf(documentDefinition).open();
  }
}
