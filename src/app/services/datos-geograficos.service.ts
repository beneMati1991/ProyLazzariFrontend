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

  getDepartamentos(provincia: any) {
    return this.http.get(this.datosGeoUrl + `/${provincia}/departamentos`);
  }

  getLocalidades2(provincia: any): Observable<any> {
    return this.http.get(this.datosGeoUrl + `/${provincia}/departamentos`);
  }

  getMunicipios(provincia: any, departamento: any) {
    return this.http.get(this.datosGeoUrl + `/${provincia}/departamentos/${departamento}/localidades`);
  }
}
