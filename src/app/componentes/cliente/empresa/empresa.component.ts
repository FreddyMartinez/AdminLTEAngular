import { Component, OnInit, ViewChild, Input, OnChanges } from '@angular/core';
import { trigger, transition, animate, style } from '@angular/animations';
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
import { ParametroConsulta } from 'src/app/modelos/parametro.consulta.modelo';
import { ClientesServicios } from 'src/app/servicios/clientes.servicio';

@Component({
  selector: 'empresa-page',
  templateUrl: './empresa.component.html',
  styleUrls: ['./empresa.component.css'],
  animations: [
    trigger('myInsertRemoveTrigger', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('0.5s', style({ opacity: 1, height: '*' })),
      ]),
      transition(':leave', [
        animate('0.5s', style({ opacity: 0, height: '0px' }))
      ])
    ])
  ]
})
export class EmpresaComponent implements OnInit {
  @ViewChild('modalEliminar') modalEliminar: ModalDirective;
  @ViewChild('modalSucursal') modalSucursal: ModalDirective;
  @ViewChild('modalCreaModificaSucursal') modalCreaModificaSucursal: ModalDirective;
  @ViewChild('modalEliminarSucursal') modalEliminarSucursal: ModalDirective;
  
  public p: number = 1;
  public q: number = 1;
  public cliente: ModeloGenerico = new ModeloGenerico(undefined,undefined);
  public listaClientes: ClienteModelo[];
  public listaEmpresa : EmpresaModelo[];
  public listaSucursal : SucursalEmpresaModelo[];
  public editarItem : boolean;
  public tipoForm : string;
  public itemEmpresa: EmpresaModelo;
  public itemSucursal: SucursalEmpresaModelo;
  public itemEliminar : EmpresaModelo;
  public nombreEmpresa: string;
  public idEmpresa: string;
  public itemEliminarSucursal: SucursalEmpresaModelo;

  constructor(
    public servicioGlobal: ServicioGlobal,
    public servicio: EmpresasServicios,
    private servicioCliente: ClientesServicios,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit() {
    this.ConsultaListaClientes();
  }

  MuestraError(error: any) {
    this.spinner.hide();
    if (error[Constantes.statusError] == 0) {
      this.toastr.error(Constantes.connectionError, Constantes.tituloError);
    } else {
      this.toastr.error(error[Constantes.mensajeError][Constantes.mensajeRespuesta], Constantes.tituloError);
    }
  }

  ConsultaListaClientes(){
    this.spinner.show();
    let usuario: ParametroConsulta = new ParametroConsulta(this.servicioGlobal.getUsuario().usuario);
    this.servicioCliente.ConsultarClientes(usuario).subscribe(
      data=>{
        this.spinner.hide();
        if (data[Constantes.codigoRespuesta] == Constantes.respuestaCorrecta) {
          this.listaClientes = data[Constantes.objetoRespuesta] as ClienteModelo[];
        }
      },
      error=>{
        this.MuestraError(error);
      }
    );
  }

  ConsultaListaEmpresas(){
    this.spinner.show();
    this.cliente.valor = this.servicioGlobal.getUsuario().usuario;
    this.servicio.ConsultarEmpresas(this.cliente).subscribe(
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
    this.tipoForm = "creación de empresa";
    this.itemEmpresa = new EmpresaModelo();
    this.itemEmpresa.idCliente = this.cliente.llave;
  }

  NuevoItemSucursal(){
    this.editarItem = false;
    this.modalCreaModificaSucursal.show();
    this.tipoForm = "creación de sucursal";
    this.itemSucursal = new SucursalEmpresaModelo();
    this.itemSucursal.idEmpresa = this.idEmpresa;
  }

  CargarItem(empresa : EmpresaModelo){
    this.editarItem = true;
    this.tipoForm = "modificación de empresa";
    this.itemEmpresa = empresa;
  }

  CargarItemSucursal(sucursal : SucursalEmpresaModelo){
    this.editarItem = true;
    this.modalCreaModificaSucursal.show();
    this.tipoForm = "modificación de sucursal";
    this.itemSucursal = sucursal;
  }
  
  CancelaItem(){
    this.itemEmpresa = undefined;
  }

  AbreModalEliminar(empresa : EmpresaModelo){
    this.modalEliminar.show();
    this.itemEliminar = empresa;
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
    this.itemEmpresa.usuario = this.servicioGlobal.getUsuario().usuario;
    if(this.editarItem){
      this.servicio.ModificarEmpresa(this.itemEmpresa).subscribe(
        data=>{
          this.spinner.hide();
          if (data[Constantes.codigoRespuesta] == Constantes.respuestaCorrecta) {
            this.itemEmpresa = undefined;
            this.toastr.success(data[Constantes.objetoRespuesta] as string);
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
