import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule} from '@angular/forms'

import { NgxSpinnerModule } from 'ngx-spinner';
import { ModalModule } from 'ngx-bootstrap';
import { UsuariosRoutingModule } from './usuarios-routing.module';
import { PerfilComponent } from './perfil/perfil.component';
import { RolComponent } from './rol/rol.component';
import { CambioClaveComponent } from './cambio-clave/cambio-clave.component';
import { UsuariosComponent } from './usuarios/usuarios.component';

@NgModule({
  imports: [
    CommonModule,
    UsuariosRoutingModule,
    FormsModule,
    NgxSpinnerModule,
    ModalModule.forRoot()
  ],
  declarations: [PerfilComponent, RolComponent, CambioClaveComponent, UsuariosComponent]
})
export class UsuariosModule { }
