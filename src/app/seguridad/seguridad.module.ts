import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu/menu.component';
import { PermisoComponent } from './permiso/permiso.component';
import { GrupoComponent } from './grupo/grupo.component';
import { SeguridadRoutingModule } from './seguridad-routing.module';
import { FormsModule} from '@angular/forms'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SeguridadRoutingModule
  ],
  declarations: [MenuComponent, PermisoComponent, GrupoComponent]
})
export class SeguridadModule { }
