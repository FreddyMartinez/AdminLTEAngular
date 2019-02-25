import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutesModule } from './app.routes';
import { SeguridadServicios } from './servicios/seguridad.servicio';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutesModule,
    HttpModule,
    HttpClientModule
  ],
  providers: [
    SeguridadServicios
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
