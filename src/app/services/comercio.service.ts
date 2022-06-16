import { Injectable } from '@angular/core';
import { AltaComercio } from '../models/comercio.model';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { CredentialsService } from 'src/app/services/credentials.service';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root',
})
export class ComercioService {
  readonly comercioAltaUrl =
    environment.baseUrl + '/api/usuarios/comercios/registro';
  readonly comercioUrl =
    environment.baseUrl +
    `/api/usuarios/${this.credentialsService.getSession(
      'Id'
    )}/comercios/${this.credentialsService.getSession('CID')}`;
  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: `Bearer ${this.credentialsService.getSession('token')}`,
  });

  constructor(
    private http: HttpClient,
    private dataService: DataService,
    public credentialsService: CredentialsService
  ) {}

  getComercio(userId: any, comercioId: any, token: any) {
    var comercioUrl = environment.baseUrl +
    `/api/usuarios/${userId}/comercios/${comercioId}`;
  var headers = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  });
    return this.http.get(comercioUrl, { headers: headers });
  }

  crearComercio(comercio: any): Observable<any> {
    return this.http.post<string>(this.comercioAltaUrl, comercio);
  }

  editarComercio(editadoComercio: any,userId: any, comercioId: any, token: any) {
    var comercioUrl = environment.baseUrl +
    `/api/usuarios/${userId}/comercios/${comercioId}`;
  var headers = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  });
    return this.http.put(comercioUrl, JSON.stringify(editadoComercio), {
      headers: headers,
    });
  }
}
