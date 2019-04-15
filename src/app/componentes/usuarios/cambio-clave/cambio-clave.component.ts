import { Component, OnInit } from '@angular/core';
import { ServicioGlobal } from 'src/app/servicios/global.servicio';
import { UsuarioModelo } from 'src/app/modelos/usuario.modelo';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { UsuariosServicios } from 'src/app/servicios/usuarios.servicio';
import { Constantes } from 'src/app/util/constantes';

@Component({
  selector: 'cambio-clave',
  templateUrl: './cambio-clave.component.html',
  styleUrls: ['./cambio-clave.component.css']
})
export class CambioClaveComponent implements OnInit {
  public claveO: string;
  public claveN: string;
  public claveR: string;
  public usuario: UsuarioModelo;
  constructor(
    public servicioGlobal: ServicioGlobal,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    public servicio: UsuariosServicios
  ) { 
    this.usuario = this.servicioGlobal.getUsuario();
  }

  ngOnInit() {
  }

  CambioClave() {
    if (this.claveN === this.claveR) {
      this.spinner.show();
      let usr: UsuarioModelo = new UsuarioModelo(this.usuario.usuario, this.claveO, this.claveR);
      this.servicio.CambioClave(usr).subscribe(
        data => {
          if (data[Constantes.codigoRespuesta] == Constantes.respuestaCorrecta) {
            this.spinner.hide();
            this.toastr.success(data[Constantes.objetoRespuesta] as string);
            this.LimpiarCampos();
          }
        },
        error => {
          this.MuestraError(error);
        }
      );
    } else {
      this.toastr.error(Constantes.claveError, Constantes.tituloError);
    }
  }

  LimpiarCampos() {
    this.claveO = undefined;
    this.claveN = undefined;
    this.claveR = undefined;
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
