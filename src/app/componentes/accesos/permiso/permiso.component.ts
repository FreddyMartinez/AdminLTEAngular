import { Component, OnInit, ViewChild } from '@angular/core';
import { trigger, style, animate, transition} from '@angular/animations';
import { ToastrService } from 'ngx-toastr';
import { ModalDirective } from 'ngx-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { AccesosServicios } from 'src/app/servicios/accesos.servicio';
import { PermisoModelo } from 'src/app/modelos/permiso.modelo';
import { Constantes } from 'src/app/util/constantes';
import { ModeloGenerico } from 'src/app/modelos/modelo.generico';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-permiso',
  templateUrl: './permiso.component.html',
  styleUrls: ['./permiso.component.css'],
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
export class PermisoComponent implements OnInit {

  @ViewChild('modalEliminar') modalEliminar: ModalDirective;
  public tipoForm : string;
  public listaPermiso : PermisoModelo[];
  public itemPermiso : PermisoModelo;
  public itemEliminar : PermisoModelo;
  public listaTipoGrupo : ModeloGenerico[];
  public listaTipoPermiso : ModeloGenerico[];
  public editarItem : boolean;
  constructor(
    public servicio: AccesosServicios,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService
  ) { 
  }

  ngOnInit() {
    this.ConsultaListaPermisos();
    this.ConsultaTiposGrupo();
  }

  ConsultaListaPermisos(){
    this.spinner.show();
    this.servicio.ConsultarPermiso().subscribe(
      data=>{
        this.spinner.hide();
        if (data[Constantes.codigoRespuesta] == Constantes.respuestaCorrecta) {
          this.listaPermiso = data[Constantes.objetoRespuesta] as PermisoModelo[];
        }
      },
      error=>{
        this.MuestraError(error);
      }
    );
  }

  ConsultaTiposGrupo(){
    forkJoin([
      this.servicio.ConsultaTiposGrupo(),
      this.servicio.ConsultaTiposPermiso()
    ])
    .subscribe(
      ([grupos,permisos])=>{
        if (grupos[Constantes.codigoRespuesta] == Constantes.respuestaCorrecta) {
          this.listaTipoGrupo = grupos[Constantes.objetoRespuesta] as ModeloGenerico[];
        }
        if (permisos[Constantes.codigoRespuesta] == Constantes.respuestaCorrecta) {
          this.listaTipoPermiso = permisos[Constantes.objetoRespuesta] as ModeloGenerico[];
        }
      },
      error=>{
        this.MuestraError(error);
      }
    );
  }

  NuevoItem(){
    this.editarItem = false;
    this.tipoForm = "creación de permiso";
    this.itemPermiso = new PermisoModelo();
  }

  CargarItem(item: PermisoModelo){
    this.editarItem = true;
    this.tipoForm = "modificación del permiso";
    this.itemPermiso = item;
  }

  CancelaItem(){
    this.itemPermiso = undefined;
  }

  AbreModal(item: PermisoModelo){
    this.modalEliminar.show();
    this.itemEliminar = item;
  }

  EliminarPermiso(){
    this.spinner.show();
    this.servicio.EliminarPermiso(this.itemEliminar).subscribe(
      data=>{
        this.spinner.hide();
        this.modalEliminar.hide();
        if (data[Constantes.codigoRespuesta] == Constantes.respuestaCorrecta) {
          this.itemPermiso = undefined;
          this.toastr.success(data[Constantes.objetoRespuesta] as string);
          this.ConsultaListaPermisos();
        }
      },
      error=>{
        this.MuestraError(error);
      }
    );
  }

  HabilitaGuardar(){
    if(this.itemPermiso.nombre != undefined && this.itemPermiso.nombre != ""
    && this.itemPermiso.descripcion != undefined && this.itemPermiso.descripcion != "" 
    && this.itemPermiso.tag != undefined && this.itemPermiso.tag != ""
    && this.itemPermiso.icono != undefined && this.itemPermiso.icono != ""){
      return true;
    }else{
      return false;
    }
  }

  GuardarPermiso(){
    this.spinner.show();
    if(this.editarItem){
      this.servicio.ModificarPermiso(this.itemPermiso).subscribe(
        data=>{
          this.spinner.hide();
          if (data[Constantes.codigoRespuesta] == Constantes.respuestaCorrecta) {
            this.itemPermiso = undefined;
            this.toastr.success(data[Constantes.objetoRespuesta] as string);
            this.ConsultaListaPermisos();
          }
        },
        error=>{
          this.MuestraError(error);
        }
      );
    }else{
      this.servicio.CrearPermiso(this.itemPermiso).subscribe(
        data=>{
          this.spinner.hide();
          if (data[Constantes.codigoRespuesta] == Constantes.respuestaCorrecta) {
            this.itemPermiso = undefined;
            this.toastr.success(data[Constantes.objetoRespuesta] as string);
            this.ConsultaListaPermisos();
          }
        },
        error=>{
          this.MuestraError(error);
        }
      );
    }
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
