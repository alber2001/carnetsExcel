import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Dictamen } from '../model/dictamen.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DictamenService {
  private url = 'assets/tabla.json'; // Ruta relativa al archivo JSON

  constructor(private http: HttpClient) {}
  obtenerDictamenes(): Observable<Dictamen[]> {
    return this.http.get<Dictamen[]>(this.url);
  }
}
