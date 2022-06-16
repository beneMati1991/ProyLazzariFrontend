import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DatosGeograficosService {
  constructor(private http: HttpClient) {}

  readonly datosGeoUrl = environment.baseUrl + '/provincias';

  getProvincias() {
    return this.http.get(this.datosGeoUrl);
  }

  getProvincias2(): Observable<any> {
    return this.http.get(this.datosGeoUrl);
  }

  getLocalidades(provinciaId: number) {
    return this.http.get(this.datosGeoUrl + `/${provinciaId}/departamentos`);
  }

  getLocalidades2(provinciaId: number): Observable<any> {
    return this.http.get(this.datosGeoUrl + `/${provinciaId}/departamentos`);
  }

  getMunicipios(provinciaId: number, localidadId: number) {
    return this.http.get(this.datosGeoUrl + `/${provinciaId}/departamentos/${localidadId}/localidades`);
  }
}
