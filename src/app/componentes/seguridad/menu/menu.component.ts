import { Component, OnInit } from '@angular/core';
import { SeguridadServicios } from 'src/app/servicios/seguridad.servicio';
import { MenuModelo } from 'src/app/modelos/menu.modelo';
import { Constantes } from 'src/app/util/constantes';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  public pruebas = ['1', '2','3', '4'];
  public idMenu : string;
  public listaMenu : MenuModelo[];
  constructor(
    public servicio: SeguridadServicios
  ) { }

  ngOnInit() {
    this.servicio.ConsultarMenu().subscribe(
      data=>{
        if (data[Constantes.codigoRespuesta] == Constantes.respuestaCorrecta) {
          this.listaMenu = data[Constantes.objetoRespuesta] as MenuModelo[];
        }
      },
      error=>{
        console.log(error);
      }
    );
  }
}
