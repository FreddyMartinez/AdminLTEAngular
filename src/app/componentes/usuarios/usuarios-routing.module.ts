import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PerfilComponent } from './perfil/perfil.component';
import { RolComponent } from './rol/rol.component';
import { CambioClaveComponent } from './cambio-clave/cambio-clave.component';
import { UsuariosComponent } from './usuarios/usuarios.component';

const routes: Routes = [
  { path: 'perfil-form', component: PerfilComponent },
  { path: 'rol-form', component: RolComponent },
  { path: 'cambio-clave', component: CambioClaveComponent },
  { path: 'usuario-form', component: UsuariosComponent },
  {
    path: '',
    redirectTo: 'perfil-form',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'perfil-form',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuariosRoutingModule { }
