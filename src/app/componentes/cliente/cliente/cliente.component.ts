import { Component, OnInit, ViewChild } from '@angular/core';
import { trigger, transition, animate, style } from '@angular/animations';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { ModalDirective } from 'ngx-bootstrap';
import { Constantes } from 'src/app/util/constantes';
import { ClienteModelo } from 'src/app/modelos/cliente.modelo';
import { ModeloGenerico } from 'src/app/modelos/modelo.generico';
import { ClientesServicios } from 'src/app/servicios/clientes.servicio';
import { ParametroConsulta } from 'src/app/modelos/parametro.consulta.modelo';
import { ServicioGlobal } from 'src/app/servicios/global.servicio';

@Component({
  selector: 'cliente-form',
  templateUrl: './cliente.component.html',
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
export class ClienteComponent implements OnInit {
  @ViewChild('modalEliminar') modalEliminar: ModalDirective;
  public tipoForm : string;
  public listaCliente : ClienteModelo[];
  public itemCliente : ClienteModelo;
  public itemEliminar : ClienteModelo;
  public editarItem : boolean;
  public listaRoles: ModeloGenerico[];
  public listaTipoDocu: ModeloGenerico[];
  public listaClientes: ModeloGenerico[];

  constructor(
    public servicioGlobal: ServicioGlobal,
    public servicio: ClientesServicios,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService
  ) { 
  }

  ngOnInit() {
    this.ConsultaListaItems();
    this.ConsultarListasSeleccion();
  }

  MuestraError(error: any) {
    this.spinner.hide();
    if (error[Constantes.statusError] == 0) {
      this.toastr.error(Constantes.connectionError, Constantes.tituloError);
    } else {
      this.toastr.error(error[Constantes.mensajeError][Constantes.mensajeRespuesta], Constantes.tituloError);
    }
  }

  ConsultaListaItems(){
    this.spinner.show();
    let usuario: ParametroConsulta = new ParametroConsulta(this.servicioGlobal.getUsuario().usuario);
    this.servicio.ConsultarClientes(usuario).subscribe(
      data=>{
        this.spinner.hide();
        if (data[Constantes.codigoRespuesta] == Constantes.respuestaCorrecta) {
          this.listaCliente = data[Constantes.objetoRespuesta] as ClienteModelo[];
        }
      },
      error=>{
        this.MuestraError(error);
      }
    );
  }

  ConsultarListasSeleccion(){
    // forkJoin([
    //   this.servicio.ConsultarTiposRol(),
    //   this.servicio.ConsultarTiposDocumento(),
    //   this.servicio.ConsultaClientes()
    // ]).subscribe(
    //   ([roles, documentos, clientes])=>{
    //     if (roles[Constantes.codigoRespuesta] == Constantes.respuestaCorrecta) {
    //       this.listaRoles = roles[Constantes.objetoRespuesta] as ModeloGenerico[];
    //     }
    //     if (documentos[Constantes.codigoRespuesta] == Constantes.respuestaCorrecta) {
    //       this.listaTipoDocu = documentos[Constantes.objetoRespuesta] as ModeloGenerico[];
    //     }
    //     if (clientes[Constantes.codigoRespuesta] == Constantes.respuestaCorrecta) {
    //       this.listaClientes = clientes[Constantes.objetoRespuesta] as ModeloGenerico[];
    //     }
    //   },
    //   error=>{
    //     this.MuestraError(error);
    //   }
    // );
    
  }

  NuevoItem(){
    this.editarItem = false;
    this.tipoForm = "creación de Clientes";
    this.itemCliente = new ClienteModelo();
  }

  CargarItem(item: ClienteModelo){
    this.editarItem = true;
    this.tipoForm = "modificación de Cliente";
    this.itemCliente = item;
  }

  CancelaItem(){
    this.itemCliente = undefined;
  }

  AbreModal(item: ClienteModelo){
    this.modalEliminar.show();
    this.itemEliminar = item;
  }

  EliminarCliente(){
    this.spinner.show();
    this.servicio.EliminarCliente(this.itemEliminar).subscribe(
      data=>{
        this.spinner.hide();
        this.modalEliminar.hide();
        if (data[Constantes.codigoRespuesta] == Constantes.respuestaCorrecta) {
          this.itemCliente = undefined;
          this.toastr.success(data[Constantes.objetoRespuesta] as string);
          this.ConsultaListaItems();
        }
      },
      error=>{
        this.MuestraError(error);
      }
    );
  }

  HabilitaGuardar(){
    // if(this.itemCliente.nombre != undefined && this.itemCliente.nombre != ""
    // && this.itemCliente.Cliente != undefined && this.itemCliente.Cliente != "" 
    // && this.itemCliente.apellidos != undefined && this.itemCliente.apellidos != "" 
    // && this.itemCliente.email != undefined && this.itemCliente.email != ""
    // && this.itemCliente.clave != undefined && this.itemCliente.clave != ""){
    //   return true;
    // }else{
    //   return false;
    // }
  }

  GuardarCliente(){
    this.spinner.show();
    if(this.editarItem){
      this.servicio.ModificarCliente(this.itemCliente).subscribe(
        data=>{
          this.spinner.hide();
          if (data[Constantes.codigoRespuesta] == Constantes.respuestaCorrecta) {
            this.itemCliente = undefined;
            this.toastr.success(data[Constantes.objetoRespuesta] as string);
            this.ConsultaListaItems();
          }
        },
        error=>{
          this.MuestraError(error);
        }
      );
    }else{
      this.servicio.CrearCliente(this.itemCliente).subscribe(
        data=>{
          this.spinner.hide();
          if (data[Constantes.codigoRespuesta] == Constantes.respuestaCorrecta) {
            this.itemCliente = undefined;
            this.toastr.success(data[Constantes.objetoRespuesta] as string);
            this.ConsultaListaItems();
          }
        },
        error=>{
          this.MuestraError(error);
        }
      );
    }
  }
}
