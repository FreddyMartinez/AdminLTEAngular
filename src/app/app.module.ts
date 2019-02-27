import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';

import { ToastrModule } from 'ngx-toastr';
import { ModalModule } from 'ngx-bootstrap';

import { AppComponent } from './app.component';
import { AppRoutesModule } from './app.routes';
import { SeguridadServicios } from './servicios/seguridad.servicio';

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
    ModalModule.forRoot(),
    ToastrModule.forRoot()
  ],
  providers: [
    SeguridadServicios
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
