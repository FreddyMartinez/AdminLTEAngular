import { Component, OnInit, ViewChild } from '@angular/core';
import { trigger, style, animate, transition} from '@angular/animations';
import { ToastrService } from 'ngx-toastr';
import { ModalDirective } from 'ngx-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { AccesosServicios } from 'src/app/servicios/accesos.servicio';
import { MenuModelo } from 'src/app/modelos/menu.modelo';
import { Constantes } from 'src/app/util/constantes';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
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
export class MenuComponent implements OnInit {

  @ViewChild('modalEliminar') modalEliminar: ModalDirective;
  public tipoForm : string;
  public listaMenu : MenuModelo[];
  public itemMenu : MenuModelo;
  public itemEliminar : MenuModelo;
  public editarItem : boolean;
  constructor(
    public servicio: AccesosServicios,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService
  ) { 
  }

  ngOnInit() {
    this.ConsultaListaItems();
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
    this.servicio.ConsultarMenu().subscribe(
      data=>{
        this.spinner.hide();
        if (data[Constantes.codigoRespuesta] == Constantes.respuestaCorrecta) {
          this.listaMenu = data[Constantes.objetoRespuesta] as MenuModelo[];
        }
      },
      error=>{
        this.MuestraError(error);
      }
    );
  }

  NuevoItem(){
    this.editarItem = false;
    this.tipoForm = "creación de ítems del menú";
    this.itemMenu = new MenuModelo();
  }

  CargarItem(item: MenuModelo){
    this.editarItem = true;
    this.tipoForm = "modificación del menú";
    this.itemMenu = item;
  }

  CancelaItem(){
    this.itemMenu = undefined;
  }

  AbreModal(item: MenuModelo){
    this.modalEliminar.show();
    this.itemEliminar = item;
  }

  EliminarMenu(){
    this.spinner.show();
    this.servicio.EliminarMenu(this.itemEliminar).subscribe(
      data=>{
        this.spinner.hide();
        this.modalEliminar.hide();
        if (data[Constantes.codigoRespuesta] == Constantes.respuestaCorrecta) {
          this.itemMenu = undefined;
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
    if(this.itemMenu.nombre != undefined && this.itemMenu.nombre != ""
    && this.itemMenu.descripcion != undefined && this.itemMenu.descripcion != "" 
    && this.itemMenu.tag != undefined && this.itemMenu.tag != ""
    && this.itemMenu.icono != undefined && this.itemMenu.icono != ""){
      return true;
    }else{
      return false;
    }
  }

  GuardarMenu(){
    this.spinner.show();
    if(this.editarItem){
      this.servicio.ModificarMenu(this.itemMenu).subscribe(
        data=>{
          this.spinner.hide();
          if (data[Constantes.codigoRespuesta] == Constantes.respuestaCorrecta) {
            this.itemMenu = undefined;
            this.toastr.success(data[Constantes.objetoRespuesta] as string);
            this.ConsultaListaItems();
          }
        },
        error=>{
          this.MuestraError(error);
        }
      );
    }else{
      this.servicio.CrearMenu(this.itemMenu).subscribe(
        data=>{
          this.spinner.hide();
          if (data[Constantes.codigoRespuesta] == Constantes.respuestaCorrecta) {
            this.itemMenu = undefined;
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
