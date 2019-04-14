import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { NgxSpinnerModule } from 'ngx-spinner';
import { ModalModule } from 'ngx-bootstrap';

import { ClienteRoutingModule } from './cliente-routing.module';
import { ClienteComponent } from './cliente/cliente.component';
import { EmpresaComponent } from './empresa/empresa.component';
import { SucursalComponent } from './sucursal/sucursal.component';
import { ClientesServicios } from 'src/app/servicios/clientes.servicio';

@NgModule({
  imports: [
    CommonModule,
    ClienteRoutingModule,
    FormsModule,
    NgxSpinnerModule,
    ModalModule.forRoot()
  ],
  providers: [
    ClientesServicios
  ],
  declarations: [ClienteComponent, EmpresaComponent, SucursalComponent]
})
export class ClienteModule { }
