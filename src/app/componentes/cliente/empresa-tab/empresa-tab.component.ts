import { Component, ViewChild, Input, OnChanges } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { ModalDirective } from 'ngx-bootstrap';
import { Constantes } from 'src/app/util/constantes';
import { ServicioGlobal } from 'src/app/servicios/global.servicio';
import { EmpresasServicios } from 'src/app/servicios/empresas.servicio';
import { ModeloGenerico } from 'src/app/modelos/modelo.generico';
import { EmpresaModelo } from 'src/app/modelos/empresa.modelo';
import { ClienteModelo } from 'src/app/modelos/cliente.modelo';
import { SucursalEmpresaModelo } from 'src/app/modelos/sucursal.empresa.modelo';

@Component({
  selector: 'empresa-tab-page',
  templateUrl: './empresa-tab.component.html',
  styleUrls: ['./empresa-tab.component.css']
})
export class EmpresaTabComponent implements OnChanges {
  @Input() cliente : ClienteModelo;
  @ViewChild('modalEliminar') modalEliminar: ModalDirective;
  @ViewChild('modalCreaModifica') modalCreaModifica: ModalDirective;
  @ViewChild('modalSucursal') modalSucursal: ModalDirective;
  
  public pe: number = 1;
  public q: number = 1;
  public listaEmpresa : EmpresaModelo[];
  public listaSucursal : SucursalEmpresaModelo[];
  public editarItem : boolean;
  public tipoForm : string;
  public itemEmpresa: EmpresaModelo;
  public itemSucursal: SucursalEmpresaModelo;
  public itemEliminar : EmpresaModelo;
  public empresaDetalle : EmpresaModelo;
  public nombreEmpresa: string;
  public idEmpresa: string;
  public itemEliminarSucursal: SucursalEmpresaModelo;

  constructor(
    public servicioGlobal: ServicioGlobal,
    public servicio: EmpresasServicios,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService
  ) {}

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

  VerDetalle(empresa : EmpresaModelo){
    this.empresaDetalle = empresa;
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

  ConsultaListaSucursales(empresa : EmpresaModelo){
    this.spinner.show();
    let buscardor: ModeloGenerico = new ModeloGenerico(empresa.idEmpresa, this.servicioGlobal.getUsuario().usuario);
    this.servicio.ConsultarSucursales(buscardor).subscribe(
      data=>{
        this.spinner.hide();
        if (data[Constantes.codigoRespuesta] == Constantes.respuestaCorrecta) {
          this.listaSucursal = data[Constantes.objetoRespuesta] as SucursalEmpresaModelo[];
          this.nombreEmpresa = empresa.nombre;
          this.idEmpresa = empresa.idEmpresa;
          this.itemEmpresa = empresa;
            this.modalSucursal.show();
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

  CargarItem(empresa : EmpresaModelo){
    this.editarItem = true;
    this.modalCreaModifica.show();
    this.tipoForm = "modificación de empresa";
    this.itemEmpresa = empresa;
  }
  
  CancelaItem(){
    this.modalCreaModifica.hide();
    this.itemEmpresa = undefined;
  }

  AbreModalEliminar(empresa : EmpresaModelo){
    this.modalEliminar.show();
    this.itemEliminar = empresa;
  }

  GuardarEmpresa(){
    this.spinner.show();
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
