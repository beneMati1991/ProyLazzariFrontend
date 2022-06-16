import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './pages/login/login.component';
import { NewComerceComponent } from './pages/new-comerce/new-comerce.component';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule} from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatSelectModule } from '@angular/material/select';
import { ListadoProductosComponent } from './pages/listado-productos/listado-productos.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ListadoComponent } from './components/listado/listado.component';
import { AgregarProductoComponent } from './pages/agregar-producto/agregar-producto.component';
import { CookieService } from 'ngx-cookie-service';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import {MatTableModule} from '@angular/material/table';
import {MatMenuModule} from '@angular/material/menu';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatDialogModule} from '@angular/material/dialog';
import { FooterComponent } from './components/footer/footer.component';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { EditarProductoComponent } from './pages/editar-producto/editar-producto.component';
import { ToastrModule } from 'ngx-toastr';
import { EditarComerceComponent } from './pages/editar-comerce/editar-comerce.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NewComerceComponent,
    ListadoProductosComponent,
    NavbarComponent,
    ListadoComponent,
    AgregarProductoComponent,
    FooterComponent,
    EditarProductoComponent,
    EditarComerceComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatSelectModule,
    HttpClientModule,
    MatSnackBarModule,
    MatTableModule,
    MatMenuModule,
    MatPaginatorModule,
    MatDialogModule,
    ToastrModule.forRoot({timeOut: 3000,
      progressBar: true,
      progressAnimation: 'increasing',
      positionClass: 'toast-bottom-right',
      preventDuplicates: true
    }),
    DragDropModule
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
