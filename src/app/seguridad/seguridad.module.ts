import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu/menu.component';
import { PermisoComponent } from './permiso/permiso.component';
import { GrupoComponent } from './grupo/grupo.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [MenuComponent, PermisoComponent, GrupoComponent]
})
export class SeguridadModule { }
