import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ComercioService } from '../../services/comercio.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import {
  Provincia,
  Localidad,
  Municipio,
  Domicilio,
} from '../../models/domicilio.model';
import { ComercioAltaObject } from '../../models/comercio.model';
import { DatosGeograficosService } from '../../services/datos-geograficos.service';
import { DataService } from '../../services/data.service';
import { CredentialsService } from '../../services/credentials.service';

@Component({
  selector: 'app-new-comerce',
  templateUrl: './new-comerce.component.html',
  styleUrls: ['./new-comerce.component.scss'],
})
export class NewComerceComponent implements OnInit {
  userEdit = '';
  provincias: Provincia[] = [];
  provincia: number = 0;
  localidades: Localidad[] = [];
  municipios: Municipio[] = [];

  crearComercioForm = new FormGroup({
    nombreUsuario: new FormControl(''),
    password: new FormControl(''),
    nombre: new FormControl(''),
    nombreContacto: new FormControl(''),
    razonSocial: new FormControl(''),
    cuit: new FormControl(''),
    //imgLogo: new FormControl(''),
    //heading: new FormControl(''),
    email: new FormControl(''),
    telefono: new FormControl(''),
    domicilio: new FormGroup({
      provincia: new FormControl(''),
      localidad: new FormControl(''),
      municipio: new FormControl(''),
      altura: new FormControl(''),
      calle: new FormControl(''),
    }),
  });

  constructor(
    private comercioService: ComercioService,
    private router: Router,
    private toastr: ToastrService,
    private datosGeoService: DatosGeograficosService,
    private dataService: DataService,
    private credentialsService: CredentialsService
  ) {
    if (this.credentialsService.getSession('token') == null) {
      this.userEdit = 'Desconocido';
      this.dataService.logged.next(true);
      this.dataService.user.next({
        unique_name: 'Desconocido',
      });
    }
  }

  ngOnInit(): void {
    if (this.credentialsService.getSession('token') != null) {
      this.router.navigateByUrl('/listado');
    } else {
      this.datosGeoService.getProvincias().subscribe((x: any) => {
        for (var val of x) {
          this.provincias.push(val);
        }
      });
    }
  }

  crearComercio() {
    var nuevoComercio: ComercioAltaObject = {
      nombreUsuario: this.crearComercioForm.value.nombreUsuario,
      password: this.crearComercioForm.value.password,
      nombre: this.crearComercioForm.value.nombre,
      nombreContacto: this.crearComercioForm.value.nombreContacto,
      razonSocial: this.crearComercioForm.value.razonSocial,
      cuit: this.crearComercioForm.value.cuit,
      email: this.crearComercioForm.value.email,
      telefono: this.crearComercioForm.value.telefono,
      domicilio: {
        provincia: this.crearComercioForm.value.domicilio.provincia.nombre,
        localidad: this.crearComercioForm.value.domicilio.localidad.nombre,
        municipio: this.crearComercioForm.value.domicilio.municipio.nombre,
        altura: this.crearComercioForm.value.domicilio.altura,
        calle: this.crearComercioForm.value.domicilio.calle,
      },
    };

    console.log(nuevoComercio);

    this.comercioService.crearComercio(nuevoComercio).subscribe(
      (res) => {
        console.log(res);
        this.router.navigateByUrl('');
        this.toastr.success('Usuario creado');
      },
      (error) => {
        console.log(error);
        this.toastr.error('Se produjo un error');
      }
    );
  }

  getMunicipiosDepartamento(evento: any) {
    //reestablezco listas.
    this.localidades = [];
    this.municipios = [];

    if (evento.value != undefined) {
      this.provincia = evento.value.id;
      this.datosGeoService
        .getDepartamentos(this.provincia)
        .subscribe((x: any) => {
          this.municipios = x;
        });
    }
  }

  getLocalidades(evento: any) {
    this.localidades = [];
    if (evento.value != undefined) {
      this.datosGeoService
        .getMunicipios(evento.value.provincia.nombre, evento.value.nombre)
        .subscribe((x: any) => {
          this.localidades = x;
        });
    }
  }
}
