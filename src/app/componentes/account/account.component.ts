import { Component, OnInit } from '@angular/core';
import { UsuarioModelo } from 'src/app/modelos/usuario.modelo';
import { ServicioGlobal } from 'src/app/servicios/global.servicio';
import { AccesosServicios } from 'src/app/servicios/accesos.servicio';
import { Constantes } from 'src/app/util/constantes';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  public correo: string;
  public clave: string;
  constructor(
    public servicioGlobal: ServicioGlobal,
    public servicioAccesos: AccesosServicios,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit() {
  }

  Ingresar(){
    this.spinner.show();
    let usr : UsuarioModelo = new UsuarioModelo(this.correo, this.correo, this.clave);
    this.servicioAccesos.Login(usr).subscribe(
      data=>{
        if(data[Constantes.codigoRespuesta] == Constantes.respuestaCorrecta){
          this.spinner.hide();
          usr = data[Constantes.objetoRespuesta] as UsuarioModelo;
          
          this.servicioGlobal.setUsuario(usr);
          localStorage.setItem("Token", this.clave); //modificar esto cuándo tenga token
          this.servicioGlobal.NavegarRoot();          
        }
      },
      error=>{
        this.MuestraError(error);
      }
    );
  }

  MuestraError(error: any) {
    this.spinner.hide();
    if (error[Constantes.statusError] == 0) {
      this.toastr.error(Constantes.connectionError, Constantes.tituloError);
    } else {
      this.toastr.error(error[Constantes.mensajeError][Constantes.mensajeRespuesta], Constantes.tituloError);
    }
  }
}
