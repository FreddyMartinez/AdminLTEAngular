import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MenuComponent } from './menu/menu.component';
import { PermisoComponent } from './permiso/permiso.component';
import { GrupoComponent } from './grupo/grupo.component';

const routes: Routes = [
  { path: 'menu-form', component: MenuComponent },
  { path: 'permiso-form', component: PermisoComponent },
  { path: 'grupo-form', component: GrupoComponent },
  {
    path: '',
    redirectTo: '/menu-form',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SeguridadRoutingModule { }