import { Component, OnInit, ViewChild, Input, OnChanges } from '@angular/core';
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
import { ClienteModelo } from 'src/app/modelos/cliente.modelo';
import { debug } from 'util';

@Component({
  selector: 'empresa-page',
  templateUrl: './empresa.component.html',
  styleUrls: ['./empresa.component.css']
})
export class EmpresaComponent implements OnInit, OnChanges {
  @Input() cliente : ClienteModelo;
  @ViewChild('modalEliminar') modalEliminar: ModalDirective;
  @ViewChild('modalCreaModifica') modalCreaModifica: ModalDirective;
  public listaEmpresa : EmpresaModelo[];
  public editarItem : boolean;
  public tipoForm : string;
  public itemEmpresa: EmpresaModelo;
  public empresaSelect: EmpresaModelo;
  public itemEliminar : EmpresaModelo;

  constructor(
    public servicioGlobal: ServicioGlobal,
    public servicio: EmpresasServicios,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit() {
    this.ConsultaListaEmpresas();
  }

  ngOnChanges() {
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
    let buscardor: ModeloGenerico = new ModeloGenerico(this.cliente.idCliente, this.servicioGlobal.getUsuario().usuario);
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

  NuevoItem(){
    this.editarItem = false;
    this.modalCreaModifica.show();
    this.tipoForm = "creación de empresa";
    this.itemEmpresa = new EmpresaModelo();
    this.itemEmpresa.idCliente = this.cliente.idCliente;
  }

  CargarItem(){
    this.editarItem = true;
    this.modalCreaModifica.show();
    this.tipoForm = "modificación de empresa";
    debugger;
    this.itemEmpresa = this.empresaSelect;
  }
  
  VerDetalle(empresa : EmpresaModelo){
    this.empresaSelect = empresa;
  }

  CancelaItem(){
    this.modalCreaModifica.hide();
    this.itemEmpresa = undefined;
  }

  AbreModalEliiminar(){
    this.modalEliminar.show();
    this.itemEliminar = this.empresaSelect;
  }

  EliminarEmpresa(){
    this.spinner.show();
    this.servicio.EliminarEmpresa(this.itemEliminar).subscribe(
      data=>{
        this.spinner.hide();
        this.modalEliminar.hide();
        if (data[Constantes.codigoRespuesta] == Constantes.respuestaCorrecta) {
          this.itemEliminar = undefined;
          this.itemEmpresa = undefined;
          this.toastr.success(data[Constantes.objetoRespuesta] as string);
          this.ConsultaListaEmpresas();
        }
      },
      error=>{
        this.MuestraError(error);
      }
    );
  }

  GuardarEmpresa(){
    this.spinner.show();
    debugger;
    this.itemEmpresa.usuario = this.servicioGlobal.getUsuario().usuario;
    if(this.editarItem){
      this.servicio.ModificarEmpresa(this.itemEmpresa).subscribe(
        data=>{
          this.spinner.hide();
          if (data[Constantes.codigoRespuesta] == Constantes.respuestaCorrecta) {
            this.itemEmpresa = undefined;
            this.toastr.success(data[Constantes.objetoRespuesta] as string);
            this.modalCreaModifica.hide();
            this.ConsultaListaEmpresas();
          }
        },
        error=>{
          this.MuestraError(error);
        }
      );
    }else{
      
      this.servicio.CrearEmpresa(this.itemEmpresa).subscribe(
        data=>{
          this.spinner.hide();
          if (data[Constantes.codigoRespuesta] == Constantes.respuestaCorrecta) {
            this.itemEmpresa = undefined;
            this.toastr.success(data[Constantes.objetoRespuesta] as string);
            this.modalCreaModifica.hide();
            this.ConsultaListaEmpresas();
          }
        },
        error=>{
          this.MuestraError(error);
        }
      );
    }
  }
}
