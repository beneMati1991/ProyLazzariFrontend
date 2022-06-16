import { Component, OnInit } from '@angular/core';
import { ComercioService } from '../../services/comercio.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ComercioObject } from '../../models/comercio.model';
import { ToastrService } from 'ngx-toastr';
import { DataService } from '../../services/data.service';
import { CredentialsService } from '../../services/credentials.service';
import {
  Domicilio,
  Localidad,
  Municipio,
  Provincia,
} from '../../models/domicilio.model';
import { DatosGeograficosService } from '../../services/datos-geograficos.service';

@Component({
  selector: 'app-editar-comerce',
  templateUrl: './editar-comerce.component.html',
  styleUrls: ['./editar-comerce.component.scss'],
})
export class EditarComerceComponent implements OnInit {
  provincias: any;
  provinciaId: number = 0;
  localidades: Localidad[] = [];
  localidadId: number = 0;
  municipios: Municipio[] = [];
  municipioId: number = 0;
  logged: boolean = false;
  //CID: any;
  //Id: any;
  comercio: ComercioObject = {
    nombreDeUsuario: '',
    nombre: '',
    razonSocial: '',
    cuit: '',
    nombreContacto: '',
    email: '',
    telefono: 0,
    domicilio: new Domicilio(),
  };

  editarComercioForm = new FormGroup({
    nombreDeUsuario: new FormControl(''),
    //password: new FormControl(''),
    nombre: new FormControl(''),
    razonSocial: new FormControl(''),
    cuit: new FormControl(''),
    nombreContacto: new FormControl(''),
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
    private fb: FormBuilder,
    private toastr: ToastrService,
    private dataService: DataService,
    public credentialsService: CredentialsService,
    private datosGeoService: DatosGeograficosService
  ) {
    this.dataService.logged.subscribe((x) => (this.logged = x));
  }

  ngOnInit(): void {
    this.datosGeoService.getProvincias2().subscribe((x: Provincia) => {
      this.provincias = x;
      var provinciaLoad = this.provincias.filter((p: Provincia) => p.nombre == this.comercio.domicilio.provincia)
      this.provinciaId = provinciaLoad[0].id
      
      this.datosGeoService.getLocalidades(this.provinciaId).subscribe((l: any) => {
        this.localidades = l;
        var localidadLoad = this.localidades.filter((lo: Localidad) => lo.nombre == this.comercio.domicilio.localidad);
        this.localidadId = localidadLoad[0].id

        this.datosGeoService.getMunicipios(this.provinciaId, this.localidadId).subscribe((u:any) => {
          this.municipios = u;
          var municipioLoad = this.municipios.filter((mu: any) => mu.nombre == this.comercio.domicilio.municipio)
          this.municipioId = municipioLoad[0].id;
        })
      })
    });


    this.comercioService
      .getComercio(
        this.credentialsService.getSession('Id'),
        this.credentialsService.getSession('CID'),
        this.credentialsService.getSession('token')
      )
      .subscribe(
        (x: any) => {
          this.comercio = x;

          this.editarComercioForm = this.fb.group({
            nombreDeUsuario: [
              this.comercio.nombreDeUsuario,
              Validators.required,
            ],
            nombre: [this.comercio.nombre, Validators.required],
            razonSocial: [this.comercio.razonSocial, Validators.required],
            cuit: [this.comercio.cuit, Validators.required],
            nombreContacto: [this.comercio.nombreContacto, Validators.required],
            email: [this.comercio.email, Validators.required],
            telefono: [this.comercio.telefono, Validators.required],
            domicilio: this.fb.group({
              provincia: [
                this.comercio.domicilio.provincia,
                Validators.required,
              ],
              localidad: [
                this.comercio.domicilio.localidad,
                Validators.required,
              ],
              municipio: [
                this.comercio.domicilio.municipio,
                Validators.required,
              ],
              altura: [this.comercio.domicilio.altura, Validators.required],
              calle: [this.comercio.domicilio.calle, Validators.required],
            }),
          });
        },
        (error) => {
          console.log(error);
        }
      );
  }

  cancelarComercio() {
    this.dataService.logged.next(true);
    this.router.navigateByUrl('/listado');
  }

  editarComercio() {
    console.log(this.editarComercioForm.value);
    this.comercioService
      .editarComercio(
        this.editarComercioForm.value,
        this.credentialsService.getSession('Id'),
        this.credentialsService.getSession('CID'),
        this.credentialsService.getSession('token')
      )
      .subscribe(
        () => {
          this.router.navigateByUrl('/listado');
          this.toastr.success('Comercio editado con éxito');
        },
        (error) => {
          console.log(error);
          this.toastr.error('Ocurrió un error en la edición');
        }
      );
  }

 

  getLocalidades(evento: any) {
    var prov = this.provincias.filter((p: Provincia) => p.nombre == evento.value);
    this.provinciaId = prov[0].id
    this.localidades = [];
    this.municipios = [];
    this.datosGeoService.getLocalidades(this.provinciaId).subscribe((x: any) => {
      for (var val of x) {
        this.localidades.push(val);
      }
    });
  }

  getMunicipios(evento: any) {
    var loc = this.localidades.filter((loc: Localidad) => loc.nombre == evento.value);
    this.localidadId = loc[0].id
    this.municipios = [];
    this.datosGeoService
      .getMunicipios(this.provinciaId, this.localidadId)
      .subscribe((x: any) => {
        for (var val of x) {
          this.municipios.push(val);
        }
      });
  }
}
