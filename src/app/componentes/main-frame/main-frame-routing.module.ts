import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainFrameComponent } from './main-frame.component';

const routes: Routes = [
  { path: '', component: MainFrameComponent, children: [ 
    { path: '', loadChildren: '../accesos/seguridad.module#SeguridadModule'},
    { path: 'accesos',  loadChildren: '../accesos/seguridad.module#SeguridadModule'}, 
    { path: 'usuarios', loadChildren: '../usuarios/usuarios.module#UsuariosModule'}, 
    { path: 'clientes', loadChildren: '../cliente/cliente.module#ClienteModule'}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainFrameRoutingModule { }
