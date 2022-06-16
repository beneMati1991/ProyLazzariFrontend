import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UnidadService {
  constructor(private http: HttpClient) {}

  readonly unidadUrl = environment.baseUrl + '/api/unidades';

  getUnidades() {
    return this.http.get(this.unidadUrl);
  }
}
