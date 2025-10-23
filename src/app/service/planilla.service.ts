import { Injectable } from '@angular/core';
import { HttpClient , HttpParams } from '@angular/common/http';
import { Pensionado } from '../model/planilla.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PlanillaPensionadosService {
  private url = 'assets/data.json'; // Ruta relativa al archivo JSON
    
  constructor(private http: HttpClient) {}

  obtenerPensionados(): Observable<Pensionado[]> {
    return this.http.get<Pensionado[]>(this.url);
  }

  obtenerPensionadosPaginados(page: number, pageSize: number): Observable<any> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('pageSize', pageSize.toString());

    return this.http.get<Pensionado[]>(this.url, { params });
  }
}
