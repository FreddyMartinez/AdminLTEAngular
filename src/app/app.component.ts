import { Component } from '@angular/core';
import { ServicioGlobal } from './servicios/global.servicio';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  
  constructor(
    private servicioGlobal : ServicioGlobal
  ){
    if(this.servicioGlobal.token == null || this.servicioGlobal.token == 'null'){
      this.servicioGlobal.InicioSesion();
    }
  }  
}
