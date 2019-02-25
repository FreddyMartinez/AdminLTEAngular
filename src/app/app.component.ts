import { Component } from '@angular/core';
import { SeguridadServicios } from './servicios/seguridad.servicio';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  
  constructor(
    public servicio: SeguridadServicios
  ){
    servicio.ConsultaVersionBack().subscribe(
      data=>{
        console.log(data);
      },
      error=>{
        console.log(error);
      }
    );
  }
}
