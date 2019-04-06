import { Component, OnInit, ViewChild } from '@angular/core';
import { trigger, style, animate, transition} from '@angular/animations';
import { AccesosServicios } from 'src/app/servicios/accesos.servicio';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ModalDirective } from 'ngx-bootstrap';
import { Constantes } from 'src/app/util/constantes';
import { GrupoModelo } from 'src/app/modelos/grupo.modelo';
import { ModeloGenerico } from 'src/app/modelos/modelo.generico';

@Component({
  selector: 'app-grupo',
  templateUrl: './grupo.component.html',
  styleUrls: ['./grupo.component.css'],
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
export class GrupoComponent implements OnInit {

  @ViewChild('modalEliminar') modalEliminar: ModalDirective;
  public tipoForm : string;
  public listaGrupo : GrupoModelo[];
  public itemGrupo : GrupoModelo;
  public itemEliminar : GrupoModelo;
  public editarItem : boolean;
  public listaTipoMenu : ModeloGenerico[];

  constructor(
    public servicio: AccesosServicios,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService
  ){ }

  ngOnInit() {
    this.ConsultarGrupos();
    this.ConsultaTiposMenu();
  }

  ConsultarGrupos(){
    this.spinner.show();
    this.servicio.ConsultarGrupo().subscribe(
      data=>{
        this.spinner.hide();
        if (data[Constantes.codigoRespuesta] == Constantes.respuestaCorrecta) {
          this.listaGrupo = data[Constantes.objetoRespuesta] as GrupoModelo[];
        }
      },
      error=>{
        this.MuestraError(error);
      }
    );
  }

  ConsultaTiposMenu(){
    this.servicio.ConsultaTiposMenu().subscribe(
      data=>{
        if (data[Constantes.codigoRespuesta] == Constantes.respuestaCorrecta) {
          this.listaTipoMenu = data[Constantes.objetoRespuesta] as ModeloGenerico[];
        }
      },
      error=>{
        this.MuestraError(error);
      }
    );
  }

  NuevoItem(){
    this.editarItem = false;
    this.tipoForm = "creación de ítems del grupo";
    this.itemGrupo = new GrupoModelo();
  }

  CargarItem(item: GrupoModelo){
    this.editarItem = true;
    this.tipoForm = "modificación del grupo";
    this.itemGrupo = item;
  }

  CancelaItem(){
    this.itemGrupo = undefined;
  }

  AbreModal(item: GrupoModelo){
    this.modalEliminar.show();
    this.itemEliminar = item;
  }

  EliminarGrupo(){
    this.spinner.show();
    this.servicio.EliminarGrupo(this.itemEliminar).subscribe(
      data=>{
        this.spinner.hide();
        this.modalEliminar.hide();
        if (data[Constantes.codigoRespuesta] == Constantes.respuestaCorrecta) {
          this.itemGrupo = undefined;
          this.toastr.success(data[Constantes.objetoRespuesta] as string);
          this.ConsultarGrupos();
        }
      },
      error=>{
        this.MuestraError(error);
      }
    );
  }

  HabilitaGuardar(){
    if(this.itemGrupo.nombre != undefined && this.itemGrupo.nombre != ""
    && this.itemGrupo.descripcion != undefined && this.itemGrupo.descripcion != "" 
    && this.itemGrupo.tag != undefined && this.itemGrupo.tag != ""
    && this.itemGrupo.icono != undefined && this.itemGrupo.icono != ""){
      return true;
    }else{
      return false;
    }
  }

  GuardarGrupo(){
    this.spinner.show();
    if(this.editarItem){
      this.servicio.ModificarGrupo(this.itemGrupo).subscribe(
        data=>{
          this.spinner.hide();
          if (data[Constantes.codigoRespuesta] == Constantes.respuestaCorrecta) {
            this.itemGrupo = undefined;
            this.toastr.success(data[Constantes.objetoRespuesta] as string);
            this.ConsultarGrupos();
          }
        },
        error=>{
          this.MuestraError(error);
        }
      );
    }else{
      this.servicio.CrearGrupo(this.itemGrupo).subscribe(
        data=>{
          this.spinner.hide();
          if (data[Constantes.codigoRespuesta] == Constantes.respuestaCorrecta) {
            this.itemGrupo = undefined;
            this.toastr.success(data[Constantes.objetoRespuesta] as string);
            this.ConsultarGrupos();
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
