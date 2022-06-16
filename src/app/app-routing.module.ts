import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListadoProductosComponent } from './pages/listado-productos/listado-productos.component';
import { LoginComponent } from './pages/login/login.component';
import { NewComerceComponent } from './pages/new-comerce/new-comerce.component';
import { EditarComerceComponent } from './pages/editar-comerce/editar-comerce.component';
import { MiguardianGuard } from './guardianes/miguardian.guard';
import { ListadoComponent } from './components/listado/listado.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  {
    path: 'nuevocomercio',
    component: NewComerceComponent,
  },
  {
    path: 'editarcomercio',
    component: EditarComerceComponent,
    canActivate: [MiguardianGuard],
  },
  {
    path: 'listado',
    //component: ListadoProductosComponent,
    component: ListadoComponent,
    canActivate: [MiguardianGuard],
  },
  //{path: 'agregar-producto', component: AgregarProductoComponent},
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
