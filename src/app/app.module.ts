import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';

import { ToastrModule } from 'ngx-toastr';
import { ModalModule } from 'ngx-bootstrap';
import { NgxPaginationModule} from 'ngx-pagination';
import { FilterPipeModule } from 'ngx-filter-pipe';

import { AppComponent } from './app.component';
import { AppRoutesModule } from './app.routes';
import { AccesosServicios } from './servicios/accesos.servicio';
import { UsuariosServicios } from './servicios/usuarios.servicio';
import { ServicioGlobal } from './servicios/global.servicio';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutesModule,
    HttpModule,
    HttpClientModule,
    NgxPaginationModule,
    FilterPipeModule,
    ModalModule.forRoot(),
    ToastrModule.forRoot()
  ],
  providers: [
    ServicioGlobal,
    AccesosServicios,
    UsuariosServicios
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
