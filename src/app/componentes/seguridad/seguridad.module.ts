import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu/menu.component';
import { PermisoComponent } from './permiso/permiso.component';
import { GrupoComponent } from './grupo/grupo.component';
import { SeguridadRoutingModule } from './seguridad-routing.module';
import { FormsModule} from '@angular/forms'

import { NgxSpinnerModule } from 'ngx-spinner';
import { ModalModule } from 'ngx-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgxSpinnerModule,
    SeguridadRoutingModule,    
    ModalModule.forRoot()
  ],
  declarations: [MenuComponent, PermisoComponent, GrupoComponent]
})
export class SeguridadModule { }
