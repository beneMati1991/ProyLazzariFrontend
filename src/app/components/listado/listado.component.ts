import {
  AfterViewInit,
  Component,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { EditarProductoComponent } from '../../pages/editar-producto/editar-producto.component';
import { MatDialog } from '@angular/material/dialog';
import { ProductoService } from '../../services/producto.service';
import { AgregarProductoComponent } from '../../pages/agregar-producto/agregar-producto.component';
import { ToastrService } from 'ngx-toastr';
import { DataService } from '../../services/data.service';
import { CredentialsService } from '../../services/credentials.service';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.scss'],
})
export class ListadoComponent implements OnInit {
  logged: boolean = false;
  displayedColumns: string[] = [
    'nombre',
    'marca',
    'detalle',
    'precio',
    'imagen',
    'accion',
  ];
  dataSource: any;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    public dialog: MatDialog,
    private toastr: ToastrService,
    public productoService: ProductoService,
    private credentialsService: CredentialsService //private dataService: DataService
  ) {
    //this.dataService.logged.subscribe((x) => (this.logged = x));
  }

  ngOnInit(): void {
    console.log(this.credentialsService.getSession('CID'));
    this.getAllProducts();
  }

  agregarProducto() {
    const dialogRef = this.dialog.open(AgregarProductoComponent, {
      width: '500px',
      data: { buttonLabel: 'Agregar' },
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe(() => {
      this.getAllProducts();
    });
    //dialogRef.afterClosed().subscribe(nuevoProducto => {
    //  this.productoService.agregarProducto(nuevoProducto)
    // });
  }

  editProduct(product: any, productId: any) {
    //"editProduct(element, i)"

    //console.log(product)
    const dialogRef = this.dialog.open(EditarProductoComponent, {
      width: '500px',
      data: { product: product, id: productId, buttonLabel: 'Editar' },
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe(() => {
      this.getAllProducts();
    });
    /*dialogRef.afterClosed().subscribe(editedProduct => {
      console.log(editedProduct)
      var id = this.dataSource.filteredData[productPosition].id;
     this.productoService.editarProducto(editedProduct, id)
    });*/
  }

  deleteProduct(productId: any) {
    this.productoService
      .eliminarProducto(
        productId,
        this.credentialsService.getSession('CID'),
        this.credentialsService.getSession('token')
      )
      .subscribe(
        (x: any) => {
          console.log(x);
          this.toastr.success('Producto eliminado');
          this.getAllProducts();
        },
        () => {
          this.toastr.error('Se produjo un error');
        }
      );
  }

  //Trae todos los productos.
  getAllProducts() {
    this.productoService
      .listarProductos(
        this.credentialsService.getSession('CID'),
        this.credentialsService.getSession('token')
      )
      .subscribe((x: any) => {
        //await console.log(x.data);
        this.dataSource = new MatTableDataSource(x.data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.paginator = this.paginator;
      });
  }
}
