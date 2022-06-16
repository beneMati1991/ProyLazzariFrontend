import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../models/usuario.model';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CredentialsService {
  readonly baseUrl = environment.baseUrl + '/api/usuarios/comercios/login';
  constructor(private http: HttpClient, private cookies: CookieService) {}

  login(user: Usuario): Observable<any> {
    return this.http.post(this.baseUrl, user);
  }

  setCookies(id: string, value: string) {
    this.cookies.set(id, value);
  }

  getCookies(id: string) {
    return this.cookies.get(id);
  }

  setSession(id: string, value: string) {
    sessionStorage.setItem(id, value);
  }

  getSession(id: string) {
    return sessionStorage.getItem(id);
  }

  removeAllSession() {
    sessionStorage.clear();
  }
}
