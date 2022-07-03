import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProductoService } from 'src/app/services/producto.service';
import { Unidad } from '../../models/unidad.model';
import { IproductoList } from '../listado-productos/dumpDataProducts';
import { IProduct } from '../../models/producto.model';
import { UnidadService } from 'src/app/services/unidad.service';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { CredentialsService } from '../../services/credentials.service';
import { StorageService } from 'src/app/services/storage.service';

export interface IDialogProductData {
  product?: IProduct;
  buttonLabel: string;
  id: number;
}

@Component({
  selector: 'app-editar-producto',
  templateUrl: './editar-producto.component.html',
  styleUrls: ['./editar-producto.component.scss'],
})
export class EditarProductoComponent implements OnInit {
  editarProducto: FormGroup;
  unidades: Unidad[] = [];
  unidadId: number = 0;
  image: any;
  loadimagen: any;

  constructor(
    private productoService: ProductoService,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private unidadService: UnidadService,
    public dialog: MatDialog,
    private credentialsService: CredentialsService,
    private storageService: StorageService,
    @Inject(MAT_DIALOG_DATA) public data: IDialogProductData
  ) {
    this.editarProducto = this.fb.group({
      nombre: [
        data.product?.nombre ? data.product.nombre : '',
        Validators.required,
      ],
      marca: [
        data.product?.marca ? data.product.marca : '',
        Validators.required,
      ],
      unidadDeMedida: [
        data.product?.unidadDeMedida ? data.product.unidadDeMedida : '',
        Validators.required,
      ],
      detalle: [
        data.product?.detalle ? data.product.detalle : '',
        Validators.required,
      ],
      cantidad: [data.product?.cantidad ? data.product.cantidad : ''],
      precio: [
        data.product?.precio ? data.product.precio : '',
        Validators.required,
      ],
      imagen:[data.product?.imagen]
      //imagen: 'sin imagen',
    });

    this.unidadService.getUnidades().subscribe((x: any) => {
      for (var val of x) {
        this.unidades.push(val);
      }
    });

    this.loadimagen = data.product?.imagen;
  }

  ngOnInit(): void {}

  async editProducto() {
    if (this.editarProducto.invalid) {
      return;
    }

    let img: any;

    if(this.image != undefined) {
      await this.storageService.subirImagen(
        this.credentialsService.getSession('CID') + '_' + this.editarProducto.value.nombre +
          '_' + Date.now(),
        this.image
      ).then(urlImagen => {
        console.log(urlImagen);
        img = urlImagen;
      });
    }else{
      img = this.editarProducto.value.imagen;
    }

    for (var i of this.unidades) {
      if (this.editarProducto.value.unidadDeMedida == i.abreviatura) {
        this.unidadId = i.id;
      }
    }

    var producto: IproductoList = {
      nombre: this.editarProducto.value.nombre,
      marca: this.editarProducto.value.marca,
      detalle: this.editarProducto.value.detalle,
      cantidad: this.editarProducto.value.cantidad,
      precio: this.editarProducto.value.precio,
      imagen: img,
      unidadMedidaId: this.unidadId,
    };

    console.log(producto);

    this.productoService
      .editarProducto(
        producto,
        this.data.id,
        this.credentialsService.getSession('CID'),
        this.credentialsService.getSession('token')
      )
      .subscribe(
        (x: any) => {
          this.dialog.closeAll();
          this.toastr.success('Producto editado');
        },
        (error) => {
          this.toastr.error('Error al Editar');
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
