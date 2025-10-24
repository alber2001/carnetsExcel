import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Pensionado } from '../model/planilla.model';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PlanillaPensionadosService {
  private url = 'assets/data.json'; // Ruta relativa al archivo JSON

  // ✅ BehaviorSubject para guardar los datos cargados
  private pensionadosSubject = new BehaviorSubject<Pensionado[]>([]);
  pensionados$ = this.pensionadosSubject.asObservable();

  constructor(private http: HttpClient) {}

  // Obtener los datos desde JSON (lo que ya tenías)
  obtenerPensionados(): Observable<Pensionado[]> {
    return this.http.get<Pensionado[]>(this.url);
  }

  obtenerPensionadosPaginados(page: number, pageSize: number): Observable<any> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('pageSize', pageSize.toString());

    return this.http.get<Pensionado[]>(this.url, { params });
  }

  // ✅ Guardar datos cargados desde Excel
  setPensionados(pensionados: Pensionado[]) {
    this.pensionadosSubject.next(pensionados);
  }

  // ✅ Obtener los datos actuales sin suscribirse
  getPensionados(): Pensionado[] {
    return this.pensionadosSubject.getValue();
  }
}
