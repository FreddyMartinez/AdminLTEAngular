import { Component, OnInit } from '@angular/core';
import { SeguridadServicios } from 'src/app/servicios/seguridad.servicio';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  public pruebas = ['1', '2','3', '4'];
  public idMenu : string;
  constructor(
    public servicio: SeguridadServicios
  ) { }

  ngOnInit() {
    this.servicio.ConsultarMenu().subscribe(
      data=>{
        console.log({data});
      },
      error=>{
        console.log(error);
      }
    );
  }
}
