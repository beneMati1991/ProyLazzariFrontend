import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Producto } from '../models/producto.model';
import { environment } from '../../environments/environment';
import { DataService } from './data.service';
import { CredentialsService } from 'src/app/services/credentials.service';
import { IproductoList } from 'src/app/pages/listado-productos/dumpDataProducts';

@Injectable({
  providedIn: 'root',
})
export class ProductoService {
  //comercioId:any;
  //token:any;
  /*readonly productsUrl =
    environment.baseUrl +
    //`/api/comercios/${this.credentialsService.getCookies('CID')}/productos`;
    `/api/comercios/${sessionStorage.getItem('CID')}/productos`;
  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    //Authorization: `Bearer ${this.credentialsService.getCookies('token')}`,
    Authorization: `Bearer ${this.credentialsService.getSession('token')}`,
  });*/

  constructor(
    private http: HttpClient //private credentialsService: CredentialsService
  ) {
    //this.comercioId = credentialsService.getSession('CID');
    //this.token = credentialsService.getSession('token');
  }

  listarProductos(comercioId: any, token: any) {
    //console.log(this.comercioId)
    //console.log(this.productsUrl)
    var productsUrl =
      environment.baseUrl + `/api/comercios/${comercioId}/productos`;
    console.log(productsUrl);
    var headers = new HttpHeaders({
      'Content-Type': 'application/json',
      //Authorization: `Bearer ${this.credentialsService.getCookies('token')}`,
      Authorization: `Bearer ${token}`,
    });
    return this.http.get(productsUrl, { headers: headers });
  }

  agregarProducto(
    producto: IproductoList,
    comercioId: any,
    token: any
  ): Observable<any> {
    var productsUrl =
      environment.baseUrl + `/api/comercios/${comercioId}/productos`;
    console.log(productsUrl);
    var headers = new HttpHeaders({
      'Content-Type': 'application/json',
      //Authorization: `Bearer ${this.credentialsService.getCookies('token')}`,
      Authorization: `Bearer ${token}`,
    });
    return this.http.post<string>(productsUrl, producto, {
      headers: headers,
    });
  }

  editarProducto(
    editedProduct: any,
    productoId: number,
    comercioId: any,
    token: any
  ) {
    var productsUrl =
      environment.baseUrl + `/api/comercios/${comercioId}/productos`;
    console.log(productsUrl);
    var headers = new HttpHeaders({
      'Content-Type': 'application/json',
      //Authorization: `Bearer ${this.credentialsService.getCookies('token')}`,
      Authorization: `Bearer ${token}`,
    });
    return this.http.put(
      productsUrl + `/${productoId}`,
      JSON.stringify(editedProduct),
      { headers: headers }
    );
  }

  eliminarProducto(productoId: number, comercioId: any, token: any) {
    var productsUrl =
      environment.baseUrl + `/api/comercios/${comercioId}/productos`;
    console.log(productsUrl);
    var headers = new HttpHeaders({
      'Content-Type': 'application/json',
      //Authorization: `Bearer ${this.credentialsService.getCookies('token')}`,
      Authorization: `Bearer ${token}`,
    });
    return this.http.delete(productsUrl + `/${productoId}`, {
      headers: headers,
    });
  }
}
