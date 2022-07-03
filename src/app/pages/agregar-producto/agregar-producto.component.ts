import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IproductoList } from '../listado-productos/dumpDataProducts';
import { ProductoService } from 'src/app/services/producto.service';
import { UnidadService } from 'src/app/services/unidad.service';
import { Unidad } from '../../models/unidad.model';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { CredentialsService } from '../../services/credentials.service';
import { StorageService } from '../../services/storage.service';

export interface IDialogProductData {
  product?: IproductoList;
  buttonLabel: string;
}

@Component({
  selector: 'app-agregar-producto',
  templateUrl: './agregar-producto.component.html',
  styleUrls: ['./agregar-producto.component.scss'],
})
export class AgregarProductoComponent implements OnInit {
  crearProducto: FormGroup;
  submitted = false;
  unidades: Unidad[] = [];
  image: any;

  constructor(
    private productoService: ProductoService,
    private unidadService: UnidadService,
    private fb: FormBuilder,
    private toastr: ToastrService,
    public dialog: MatDialog,
    private credentialsService: CredentialsService,
    private storageService: StorageService
  ) {
    this.crearProducto = this.fb.group({
      nombre: ['', Validators.required],
      marca: ['', Validators.required],
      unidadMedidaId: ['', Validators.required],
      detalle: ['', Validators.required],
      cantidad: [''],
      precio: ['', Validators.required],
      //imagen:[data.product?.imagen ? data.product.imagen : '']
      //imagen: 'sin imagen',
    });

    this.unidadService.getUnidades().subscribe((x: any) => {
      for (var val of x) {
        this.unidades.push(val);
      }
    });
  }

  ngOnInit(): void {}

  async agregarProducto() {
    this.submitted = true;
    let img: any;

    if(this.image != undefined) {
      await this.storageService.subirImagen(
        this.credentialsService.getSession('CID') + '_' + this.crearProducto.value.nombre +
          '_' + Date.now(),
        this.image
      ).then(urlImagen => {
        console.log(urlImagen);
        img = urlImagen;
      });
    }

    if (this.crearProducto.invalid) {
      return;
    }

    var producto: IproductoList = {
      nombre: this.crearProducto.value.nombre,
      marca: this.crearProducto.value.marca,
      detalle: this.crearProducto.value.detalle,
      cantidad: this.crearProducto.value.cantidad,
      precio: this.crearProducto.value.precio,
      imagen: img,
      unidadMedidaId: this.crearProducto.value.unidadMedidaId,
    };

    this.productoService
      .agregarProducto(
        producto,
        this.credentialsService.getSession('CID'),
        this.credentialsService.getSession('token')
      )
      .subscribe(
        (x: any) => {
          this.dialog.closeAll();
          this.toastr.success('Producto creado');
        },
        (error) => {
          this.toastr.error('Error al Crear');
          console.log(error);
        }
      );
  }

  onFileSelected(event: any) {
    let archivos = event.target.files;
    let reader = new FileReader();

    reader.readAsDataURL(archivos[0]);
    reader.onloadend = () => {
      console.log(reader.result);
      this.image = reader.result;
    };

  }
}
