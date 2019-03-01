import { Component, OnInit, ViewChild } from '@angular/core';
import { trigger, style, animate, transition} from '@angular/animations';
import { SeguridadServicios } from 'src/app/servicios/seguridad.servicio';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ModalDirective } from 'ngx-bootstrap';
import { Constantes } from 'src/app/util/constantes';
import { GrupoModelo } from 'src/app/modelos/grupo.modelo';

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

  constructor(
    public servicio: SeguridadServicios,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService
  ){ }

  ngOnInit() {
    this.ConsultarGrupos();
  }

  ConsultarGrupos(){
    this.servicio.ConsultarGrupo().subscribe(
      data=>{
        if (data[Constantes.codigoRespuesta] == Constantes.respuestaCorrecta) {
          this.listaGrupo = data[Constantes.objetoRespuesta] as GrupoModelo[];
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

  MuestraError(error: any) {
    this.spinner.hide();
    if (error[Constantes.statusError] == 0) {
      this.toastr.error(Constantes.connectionError, Constantes.tituloError);
    } else {
      this.toastr.error(error[Constantes.mensajeError][Constantes.mensajeRespuesta], Constantes.tituloError);
    }
  }
}
