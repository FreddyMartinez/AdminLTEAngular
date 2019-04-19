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
import { ProductosComponent } from './productos/productos.component';
import { FilterPipeModule } from 'ngx-filter-pipe';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  imports: [
    CommonModule,
    ClienteRoutingModule,
    FormsModule,
    NgxSpinnerModule,
    NgxPaginationModule,
    FilterPipeModule,
    ModalModule.forRoot()
  ],
  providers: [
    ClientesServicios
  ],
  declarations: [ClienteComponent, EmpresaComponent, SucursalComponent, ProductosComponent]
})
export class ClienteModule { }
