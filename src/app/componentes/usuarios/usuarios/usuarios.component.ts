import { Component, OnInit, ViewChild } from '@angular/core';
import { trigger, style, animate, transition} from '@angular/animations';
import { ModalDirective } from 'ngx-bootstrap';
import { UsuarioModelo } from 'src/app/modelos/usuario.modelo';
import { UsuariosServicios } from 'src/app/servicios/usuarios.servicio';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { Constantes } from 'src/app/util/constantes';
import { forkJoin } from 'rxjs';
import { ModeloGenerico } from 'src/app/modelos/modelo.generico';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css'],
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
export class UsuariosComponent implements OnInit {

  @ViewChild('modalEliminar') modalEliminar: ModalDirective;
  public tipoForm : string;
  public listaUsuario : UsuarioModelo[];
  public itemUsuario : UsuarioModelo;
  public itemEliminar : UsuarioModelo;
  public editarItem : boolean;
  public listaRoles: ModeloGenerico[];
  public listaTipoDocu: ModeloGenerico[];
  public listaClientes: ModeloGenerico[];

  constructor(
    public servicio: UsuariosServicios,
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
    this.servicio.ConsultarUsuarios().subscribe(
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

  ConsultarListasSeleccion(){
    forkJoin([
      this.servicio.ConsultarTiposRol(),
      this.servicio.ConsultarTiposDocumento(),
      this.servicio.ConsultaClientes()
    ]).subscribe(
      ([roles, documentos, clientes])=>{
        if (roles[Constantes.codigoRespuesta] == Constantes.respuestaCorrecta) {
          this.listaRoles = roles[Constantes.objetoRespuesta] as ModeloGenerico[];
        }
        if (documentos[Constantes.codigoRespuesta] == Constantes.respuestaCorrecta) {
          this.listaTipoDocu = documentos[Constantes.objetoRespuesta] as ModeloGenerico[];
        }
        if (clientes[Constantes.codigoRespuesta] == Constantes.respuestaCorrecta) {
          this.listaClientes = clientes[Constantes.objetoRespuesta] as ModeloGenerico[];
        }
      },
      error=>{
        this.MuestraError(error);
      }
    );
    
  }

  NuevoItem(){
    this.editarItem = false;
    this.tipoForm = "creación de usuarios";
    this.itemUsuario = new UsuarioModelo();
  }

  CargarItem(item: UsuarioModelo){
    this.editarItem = true;
    this.tipoForm = "modificación de usuario";
    this.itemUsuario = item;
  }

  CancelaItem(){
    this.itemUsuario = undefined;
  }

  AbreModal(item: UsuarioModelo){
    this.modalEliminar.show();
    this.itemEliminar = item;
  }

  EliminarUsuario(){
    this.spinner.show();
    this.servicio.EliminarUsuario(this.itemEliminar).subscribe(
      data=>{
        this.spinner.hide();
        this.modalEliminar.hide();
        if (data[Constantes.codigoRespuesta] == Constantes.respuestaCorrecta) {
          this.itemUsuario = undefined;
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
    if(this.itemUsuario.nombre != undefined && this.itemUsuario.nombre != ""
    && this.itemUsuario.usuario != undefined && this.itemUsuario.usuario != "" 
    && this.itemUsuario.apellidos != undefined && this.itemUsuario.apellidos != "" 
    && this.itemUsuario.email != undefined && this.itemUsuario.email != ""
    && this.itemUsuario.clave != undefined && this.itemUsuario.clave != ""){
      return true;
    }else{
      return false;
    }
  }

  GuardarUsuario(){
    this.spinner.show();
    if(this.editarItem){
      this.servicio.ModificarUsuario(this.itemUsuario).subscribe(
        data=>{
          this.spinner.hide();
          if (data[Constantes.codigoRespuesta] == Constantes.respuestaCorrecta) {
            this.itemUsuario = undefined;
            this.toastr.success(data[Constantes.objetoRespuesta] as string);
            this.ConsultaListaItems();
          }
        },
        error=>{
          this.MuestraError(error);
        }
      );
    }else{
      this.servicio.CrearUsuario(this.itemUsuario).subscribe(
        data=>{
          this.spinner.hide();
          if (data[Constantes.codigoRespuesta] == Constantes.respuestaCorrecta) {
            this.itemUsuario = undefined;
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
