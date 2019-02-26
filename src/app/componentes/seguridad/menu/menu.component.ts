import { Component, OnInit } from '@angular/core';
import { trigger, style, animate, transition} from '@angular/animations';
import { SeguridadServicios } from 'src/app/servicios/seguridad.servicio';
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

  public tipoForm : string;
  public listaMenu : MenuModelo[];
  public itemMenu : MenuModelo;
  public editarItem : boolean;
  constructor(
    public servicio: SeguridadServicios
  ) { 
  }

  ngOnInit() {
    this.servicio.ConsultarMenu().subscribe(
      data=>{
        if (data[Constantes.codigoRespuesta] == Constantes.respuestaCorrecta) {
          this.listaMenu = data[Constantes.objetoRespuesta] as MenuModelo[];
        }
      },
      error=>{
        console.log(error);
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

  GuardarMenu(){
    if(this.editarItem){
      this.servicio.ModificarMenu(this.itemMenu).subscribe(
        data=>{
          this.itemMenu = undefined;
        },
        error=>{}
      );
    }else{
      this.servicio.CrearMenu(this.itemMenu).subscribe(
        data=>{
          this.itemMenu = undefined;
        },
        error=>{}
      );
    }
  }
}
