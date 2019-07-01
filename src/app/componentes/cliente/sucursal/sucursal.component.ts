import { Component, OnInit, ViewChild } from '@angular/core';
import { trigger, transition, animate, style } from '@angular/animations';
import { ClienteModelo } from 'src/app/modelos/cliente.modelo';
import { SucursalEmpresaModelo } from 'src/app/modelos/sucursal.empresa.modelo';
import { EmpresaModelo } from 'src/app/modelos/empresa.modelo';
import { ModalDirective } from 'ngx-bootstrap';
import { ServicioGlobal } from 'src/app/servicios/global.servicio';
import { EmpresasServicios } from 'src/app/servicios/empresas.servicio';
import { ClientesServicios } from 'src/app/servicios/clientes.servicio';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { Constantes } from 'src/app/util/constantes';
import { ParametroConsulta } from 'src/app/modelos/parametro.consulta.modelo';
import { ModeloGenerico } from 'src/app/modelos/modelo.generico';

@Component({
  selector: 'sucursal-page',
  templateUrl: './sucursal.component.html',
  styleUrls: ['./sucursal.component.css'],
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
export class SucursalComponent implements OnInit {

  @ViewChild('modalEliminar') modalEliminar: ModalDirective;
  public cliente : string;
  public empresa : string;
  public ps: number = 1;
  public listaClientes: ClienteModelo[];
  public listaEmpresas : EmpresaModelo[];
  public listaSucursal : SucursalEmpresaModelo[];
  public tiposSucursal : ModeloGenerico[];
  public editarItem : boolean;
  public tipoForm : string;
  public itemSucursal: SucursalEmpresaModelo;
  public itemEliminar : SucursalEmpresaModelo;
  public nombreEmpresa: string;

  constructor(
    public servicioGlobal: ServicioGlobal,
    public servicio: EmpresasServicios,
    private servicioCliente: ClientesServicios,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit() {
    this.ConsultaListaClientes();
    this.ConsultaTipoSucursales();
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
    let parametro : ModeloGenerico = new ModeloGenerico(this.cliente,this.servicioGlobal.getUsuario().usuario)
    this.servicio.ConsultarEmpresas(parametro).subscribe(
      data=>{
        this.spinner.hide();
        if (data[Constantes.codigoRespuesta] == Constantes.respuestaCorrecta) {
          this.listaEmpresas = data[Constantes.objetoRespuesta] as EmpresaModelo[];
        }
      },  
      error=>{
        this.MuestraError(error);
      }
    );
  }

  ConsultaListaSucursales(){
    this.spinner.show();
    let buscardor: ModeloGenerico = new ModeloGenerico(this.empresa, this.servicioGlobal.getUsuario().usuario);
    this.servicio.ConsultarSucursales(buscardor).subscribe(
      data=>{
        this.spinner.hide();
        if (data[Constantes.codigoRespuesta] == Constantes.respuestaCorrecta) {
          this.listaSucursal = data[Constantes.objetoRespuesta] as SucursalEmpresaModelo[];
        }
      },  
      error=>{
        this.MuestraError(error);
      }
    );
  }

  ConsultaTipoSucursales(){
    this.servicio.ConsultarTipoSucursal().subscribe(
      tipos=>{
        if (tipos[Constantes.codigoRespuesta] == Constantes.respuestaCorrecta) {
          this.tiposSucursal = tipos[Constantes.objetoRespuesta] as ModeloGenerico[];
        }
      },
      error=>{
        this.MuestraError(error);
      }
    );
  }

  NuevoItem(){
    this.editarItem = false;
    this.tipoForm = "creación de sucursal";
    this.itemSucursal = new SucursalEmpresaModelo();
    this.itemSucursal.idEmpresa = this.empresa;
  }

  CargarItem(sucursal : SucursalEmpresaModelo){
    this.editarItem = true;
    this.tipoForm = "modificación de sucursal";
    this.itemSucursal = sucursal;
  }
  
  CancelaItem(){
    this.itemSucursal = undefined;
  }

  AbreModalEliminar(sucursal : SucursalEmpresaModelo){
    this.modalEliminar.show();
    this.itemEliminar = sucursal;
  }

  EliminarSucursal(){
    this.spinner.show();
    this.servicio.EliminarSucursal(this.itemEliminar).subscribe(
      data=>{
        this.spinner.hide();
        if (data[Constantes.codigoRespuesta] == Constantes.respuestaCorrecta) {
          this.itemEliminar = undefined;
          this.itemSucursal = undefined;
          this.toastr.success(data[Constantes.objetoRespuesta] as string);
          this.ConsultaListaSucursales();
        }
      },
      error=>{
        this.MuestraError(error);
      }
    );
  }

  GuardarSucursal(){
    this.spinner.show();
    this.itemSucursal.usuario = this.servicioGlobal.getUsuario().usuario;
    if(this.editarItem){
      this.servicio.ModificarSucursal(this.itemSucursal).subscribe(
        data=>{
          this.spinner.hide();
          if (data[Constantes.codigoRespuesta] == Constantes.respuestaCorrecta) {
            this.itemSucursal = undefined;
            this.toastr.success(data[Constantes.objetoRespuesta] as string);
            this.ConsultaListaSucursales();
          }
        },
        error=>{
          this.MuestraError(error);
        }
      );
    }else{  
      this.servicio.CrearSucursal(this.itemSucursal).subscribe(
        data=>{
          this.spinner.hide();
          if (data[Constantes.codigoRespuesta] == Constantes.respuestaCorrecta) {
            this.itemSucursal = undefined;
            this.toastr.success(data[Constantes.objetoRespuesta] as string);
            this.ConsultaListaSucursales();
          }
        },
        error=>{
          this.MuestraError(error);
        }
      );
    }
  }
}
