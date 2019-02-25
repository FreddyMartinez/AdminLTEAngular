import { Component, OnInit } from '@angular/core';
import { SeguridadServicios } from 'src/app/servicios/seguridad.servicio';
import { Constantes } from 'src/app/util/constantes';

@Component({
  selector: 'app-main-frame',
  templateUrl: './main-frame.component.html',
  styleUrls: ['./main-frame.component.css']
})
export class MainFrameComponent implements OnInit {
  public versionApi : string;
  constructor(
    public servicio: SeguridadServicios
  ){
  }

  ngOnInit(){
    this.servicio.ConsultaVersionBack().subscribe(
      data=>{
        if (data[Constantes.codigoRespuesta] == Constantes.respuestaCorrecta) {
          this.versionApi = data[Constantes.objetoRespuesta] as string;
        }
      },
      error=>{
        console.log(error);
      }
    );
  }
}
