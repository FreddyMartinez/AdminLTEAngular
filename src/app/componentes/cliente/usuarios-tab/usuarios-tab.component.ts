import { Component, OnChanges, Input } from '@angular/core';
import { UsuariosServicios } from 'src/app/servicios/usuarios.servicio';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { Constantes } from 'src/app/util/constantes';
import { UsuarioModelo } from 'src/app/modelos/usuario.modelo';
import { ParametroConsulta } from 'src/app/modelos/parametro.consulta.modelo';
import { ClienteModelo } from 'src/app/modelos/cliente.modelo';
import { ClientesServicios } from 'src/app/servicios/clientes.servicio';
import { ServicioGlobal } from 'src/app/servicios/global.servicio';

@Component({
  selector: 'usuarios-tab',
  templateUrl: './usuarios-tab.component.html',
  styleUrls: ['./usuarios-tab.component.css']
})
export class UsuariosTabComponent implements OnChanges {

  @Input() cliente: ClienteModelo;
  public listaUsuario;

  constructor(public servicio: ClientesServicios,
    private servicioGlobal: ServicioGlobal,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService) { }

  ngOnChanges() {
    this.ConsultaListaUsuarios();
  }

  MuestraError(error: any) {
    this.spinner.hide();
    if (error[Constantes.statusError] == 0) {
      this.toastr.error(Constantes.connectionError, Constantes.tituloError);
    } else {
      this.toastr.error(error[Constantes.mensajeError][Constantes.mensajeRespuesta], Constantes.tituloError);
    }
  }

  ConsultaListaUsuarios(){
    this.spinner.show();
    let consulta: ParametroConsulta = new ParametroConsulta(this.cliente.idCliente, this.servicioGlobal.getUsuario().usuario);
    this.servicio.ConsultarUsuarios(consulta).subscribe(
      data=>{
        this.spinner.hide();
        if (data[Constantes.codigoRespuesta] == Constantes.respuestaCorrecta) {
          this.listaUsuario = data[Constantes.objetoRespuesta] as UsuarioModelo[];
        }
      },
      error=>{
        this.MuestraError(error);
      }
    );
  }
}
