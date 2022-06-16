import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IproductoList } from '../listado-productos/dumpDataProducts';
import { ProductoService } from 'src/app/services/producto.service';
import { UnidadService } from 'src/app/services/unidad.service';
import { Unidad } from '../../models/unidad.model';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { CredentialsService } from '../../services/credentials.service';

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

  constructor(
    private productoService: ProductoService,
    private unidadService: UnidadService,
    private fb: FormBuilder,
    private toastr: ToastrService,
    public dialog: MatDialog,
    private credentialsService: CredentialsService
  ) {
    this.crearProducto = this.fb.group({
      nombre: ['', Validators.required],
      marca: ['', Validators.required],
      unidadMedidaId: ['', Validators.required],
      detalle: ['', Validators.required],
      cantidad: [''],
      precio: ['', Validators.required],
      //imagen:[data.product?.imagen ? data.product.imagen : '']
      imagen: 'sin imagen',
    });

    this.unidadService.getUnidades().subscribe((x: any) => {
      for (var val of x) {
        this.unidades.push(val);
      }
    });
  }

  ngOnInit(): void {}

  agregarProducto() {
    this.submitted = true;

    if (this.crearProducto.invalid) {
      return;
    }
    var producto: IproductoList = {
      nombre: this.crearProducto.value.nombre,
      marca: this.crearProducto.value.marca,
      detalle: this.crearProducto.value.detalle,
      cantidad: this.crearProducto.value.cantidad,
      precio: this.crearProducto.value.precio,
      imagen: this.crearProducto.value.imagen,
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
          console.log(x);
          this.dialog.closeAll();
          this.toastr.success('Producto creado');
        },
        (error) => {
          this.toastr.error('Error al Crear');
          console.log(error);
        }
      );
  }
}
