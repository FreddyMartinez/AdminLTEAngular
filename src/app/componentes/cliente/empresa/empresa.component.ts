import { Component, OnInit, ViewChild } from '@angular/core';
import { trigger, transition, animate, style } from '@angular/animations';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { ModalDirective } from 'ngx-bootstrap';
import { Constantes } from 'src/app/util/constantes';
import { ServicioGlobal } from 'src/app/servicios/global.servicio';
import { ParametroConsulta } from 'src/app/modelos/parametro.consulta.modelo';
import { EmpresasServicios } from 'src/app/servicios/empresas.servicio';
import { ModeloGenerico } from 'src/app/modelos/modelo.generico';
import { EmpresaModelo } from 'src/app/modelos/empreesa.modelo';

@Component({
  selector: 'empresa-page',
  templateUrl: './empresa.component.html',
  styleUrls: ['./empresa.component.css']
})
export class EmpresaComponent implements OnInit {
  @ViewChild('modalEliminar') modalEliminar: ModalDirective;
  public listaEmpresa : EmpresaModelo[];

  constructor(
    public servicioGlobal: ServicioGlobal,
    public servicio: EmpresasServicios,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit() {
    this.ConsultaListaEmpresas();
  }

  MuestraError(error: any) {
    this.spinner.hide();
    if (error[Constantes.statusError] == 0) {
      this.toastr.error(Constantes.connectionError, Constantes.tituloError);
    } else {
      this.toastr.error(error[Constantes.mensajeError][Constantes.mensajeRespuesta], Constantes.tituloError);
    }
  }


  ConsultaListaEmpresas(){
    this.spinner.show();
    let buscardor: ModeloGenerico = new ModeloGenerico("id_cliente", this.servicioGlobal.getUsuario().usuario);
    this.servicio.ConsultarEmpresas(buscardor).subscribe(
      data=>{
        this.spinner.hide();
        if (data[Constantes.codigoRespuesta] == Constantes.respuestaCorrecta) {
          this.listaEmpresa = data[Constantes.objetoRespuesta] as EmpresaModelo[];
        }
      },  
      error=>{
        this.MuestraError(error);
      }
    );
  }
  
}
