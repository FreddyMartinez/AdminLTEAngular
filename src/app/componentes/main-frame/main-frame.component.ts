import { Component, OnInit } from '@angular/core';
import { AccesosServicios } from 'src/app/servicios/accesos.servicio';
import { Constantes } from 'src/app/util/constantes';
import { ItemMenuLateral } from 'src/app/modelos/item.menu.lateral.model';
import { UsuarioModelo } from 'src/app/modelos/usuario.modelo';
import { ServicioGlobal } from 'src/app/servicios/global.servicio';

@Component({
  selector: 'app-main-frame',
  templateUrl: './main-frame.component.html',
  styleUrls: ['./main-frame.component.css']
})
export class MainFrameComponent implements OnInit {
  public versionApi : string;
  public listaMenu : ItemMenuLateral[];
  public usuario : UsuarioModelo;

  constructor(
    public servicioAccesos: AccesosServicios,
    public servicioGlobal: ServicioGlobal
  ){
    this.usuario=servicioGlobal.getUsuario();
  }

  ngOnInit(){
    this.servicioAccesos.ConsultaVersionBack().subscribe(
      data=>{
        if (data[Constantes.codigoRespuesta] == Constantes.respuestaCorrecta) {
          this.versionApi = data[Constantes.objetoRespuesta] as string;
        }
      },
      error=>{
        console.log(error);
      }
    );
    this.ConsultaMenuLateral();
  }

  ConsultaMenuLateral(){
    this.servicioAccesos.ConsultarMenuLateral().subscribe(
      data=>{
        if (data[Constantes.codigoRespuesta] == Constantes.respuestaCorrecta) {
          this.listaMenu = data[Constantes.objetoRespuesta] as ItemMenuLateral[];
        }
      },
      error=>{
        console.log(error);
      }
    );
  }

  LogOut(){
    localStorage.removeItem("Token");
    localStorage.removeItem("Usuario");
    this.servicioGlobal.InicioSesion();
  }
}
