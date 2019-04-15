import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClienteComponent } from './cliente/cliente.component';
import { EmpresaComponent } from './empresa/empresa.component';
import { SucursalComponent } from './sucursal/sucursal.component';

const routes: Routes = [
  { path: 'cliente-form', component: ClienteComponent },
  { path: 'empresa-form', component: EmpresaComponent },
  { path: 'sucursal-form', component: SucursalComponent },
  {
    path: '',
    redirectTo: 'cliente-form',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'cliente-form',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClienteRoutingModule { }
