import { Component, OnInit, ViewChild } from '@angular/core';
import { trigger, style, animate, transition} from '@angular/animations';
import { ModalDirective } from 'ngx-bootstrap';
import { PerfilModelo } from 'src/app/modelos/perfil.modelo';
import { UsuariosServicios } from 'src/app/servicios/usuarios.servicio';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { Constantes } from 'src/app/util/constantes';
import { ModeloGenerico } from 'src/app/modelos/modelo.generico';
import { ParametroConsulta } from 'src/app/modelos/parametro.consulta.modelo';
import { PermisoPerfilModelo } from 'src/app/modelos/permiso.perfil.modelo';

@Component({
  selector: 'perfil-form',
  templateUrl: './perfil.component.html',
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
export class PerfilComponent implements OnInit {
  
  @ViewChild('modalPermisos') modalPermisos: ModalDirective;
  @ViewChild('modalEliminar') modalEliminar: ModalDirective;
  public tipoForm : string;
  public listaPerfil : PerfilModelo[];
  public itemPerfil : PerfilModelo;
  public itemEliminar : PerfilModelo;
  public listaClientes : ModeloGenerico[];
  public listaPermisosPerfil : PermisoPerfilModelo[];
  public editarItem : boolean;
  constructor(
    public servicio: UsuariosServicios,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService
  ) { 
  }

  ngOnInit() {
    this.ConsultaListaPerfiles();
    this.ConsultaIdClientes();
  }

  ConsultaListaPerfiles(){
    this.spinner.show();
    this.servicio.ConsultarPerfiles().subscribe(
      data=>{
        this.spinner.hide();
        if (data[Constantes.codigoRespuesta] == Constantes.respuestaCorrecta) {
          this.listaPerfil = data[Constantes.objetoRespuesta] as PerfilModelo[];
        }
      },
      error=>{
        this.MuestraError(error);
      }
    );
  }

  ConsultaIdClientes(){
    this.servicio.ConsultaClientes().subscribe(
      data=>{
        if (data[Constantes.codigoRespuesta] == Constantes.respuestaCorrecta) {
          this.listaClientes = data[Constantes.objetoRespuesta] as ModeloGenerico[];
        }
      },
      error=>{
        this.MuestraError(error);
      }
    );
  }

  NuevoItem(){
    this.editarItem = false;
    this.tipoForm = "creación de perfil";
    this.itemPerfil = new PerfilModelo();
  }

  CargarItem(item: PerfilModelo){
    this.editarItem = true;
    this.tipoForm = "modificación del perfil";
    this.itemPerfil = item;
  }

  CancelaItem(){
    this.itemPerfil = undefined;
  }

  AbreModal(item: PerfilModelo){
    this.modalEliminar.show();
    this.itemEliminar = item;
  }

  EliminarPerfil(){
    this.spinner.show();
    this.servicio.EliminarPerfil(this.itemEliminar).subscribe(
      data=>{
        this.spinner.hide();
        this.modalEliminar.hide();
        if (data[Constantes.codigoRespuesta] == Constantes.respuestaCorrecta) {
          this.itemPerfil = undefined;
          this.toastr.success(data[Constantes.objetoRespuesta] as string);
          this.ConsultaListaPerfiles();
        }
      },
      error=>{
        this.MuestraError(error);
      }
    );
  }

  HabilitaGuardar(){
    if(this.itemPerfil.nombre != undefined && this.itemPerfil.nombre != ""
    && this.itemPerfil.descripcion != undefined && this.itemPerfil.descripcion != ""){
      return true;
    }else{
      return false;
    }
  }

  GuardarPerfil(){
    this.spinner.show();
    if(this.editarItem){
      this.servicio.ModificarPerfil(this.itemPerfil).subscribe(
        data=>{
          this.spinner.hide();
          if (data[Constantes.codigoRespuesta] == Constantes.respuestaCorrecta) {
            this.itemPerfil = undefined;
            this.toastr.success(data[Constantes.objetoRespuesta] as string);
            this.ConsultaListaPerfiles();
          }
        },
        error=>{
          this.MuestraError(error);
        }
      );
    }else{
      this.servicio.CrearPerfil(this.itemPerfil).subscribe(
        data=>{
          this.spinner.hide();
          if (data[Constantes.codigoRespuesta] == Constantes.respuestaCorrecta) {
            this.itemPerfil = undefined;
            this.toastr.success(data[Constantes.objetoRespuesta] as string);
            this.ConsultaListaPerfiles();
          }
        },
        error=>{
          this.MuestraError(error);
        }
      );
    }
  }

  MuestraPermisos(idPerfil: string){
    this.spinner.show();
    let perfil : ParametroConsulta = new ParametroConsulta(idPerfil);
    this.servicio.ConsultarPermisosPerfil(perfil).subscribe(
      data=>{
        this.spinner.hide();
        if(data[Constantes.codigoRespuesta] == Constantes.respuestaCorrecta){
          this.modalPermisos.show();
          this.listaPermisosPerfil = data[Constantes.objetoRespuesta] as PermisoPerfilModelo[];
        }
      },
      error=>{
        this.MuestraError(error);
      }
    );
  }

  GuardaPermisos(){
    this.listaPermisosPerfil.forEach(permiso => {
      this.servicio.ModificarPermisoPerfil(permiso).subscribe(
        data=>{},
        error=>{
          this.MuestraError(error);
        }
      );
    });
    this.modalPermisos.hide();
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
