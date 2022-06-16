import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { CredentialsService } from 'src/app/services/credentials.service';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario.model';
import { DataService } from '../../services/data.service';
import jwt_decode from 'jwt-decode';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    nombre: new FormControl(''),
    contrasenia: new FormControl(''),
  });

  constructor(
    public credentialsService: CredentialsService,
    private router: Router,
    private dataService: DataService,
    private toastr: ToastrService
  ) {
    if (this.credentialsService.getSession('token') == null) {
      this.dataService.logged.next(false);
      this.dataService.user.next({
        unique_name: '',
      });
    }
  }

  ngOnInit(): void {
    if (this.credentialsService.getSession('token') != null) {
      this.router.navigateByUrl('/listado');
    }
  }

  newCommerce() {
    //todo modificar esto para que no se confunda con usuario logeado
    this.dataService.logged.next(true);
    this.dataService.user.next({
      unique_name: 'Desconocido',
    });
    this.router.navigateByUrl('/nuevocomercio');
  }

  login() {
    var usuario: Usuario = {
      nombreUsuario: this.loginForm.controls['nombre'].value,
      password: this.loginForm.controls['contrasenia'].value,
    };
    this.credentialsService.login(usuario).subscribe(
      (x: any) => {
        if (x?.token != null) {
          const tokenInfo = this.getDecodedAccessToken(x.token); // decode token
          //this.dataService.expireDate = tokenInfo.exp; // get token expiration dateTime
          this.dataService.user.next(tokenInfo);
          this.dataService.logged.next(true);
          this.credentialsService.setSession('CID', tokenInfo.CID);
          this.credentialsService.setSession('Id', tokenInfo.nameid);
          this.credentialsService.setSession('token', x.token);
          this.router.navigateByUrl('/listado');
        } else {
          this.toastr.error('Usuario o contraseña incorrecta');
        }
      },
      (err) => {
        this.toastr.error(err.error);
      }
    );
  }

  getDecodedAccessToken(token: string): any {
    try {
      return jwt_decode(token);
    } catch (Error) {
      return null;
    }
  }
}
