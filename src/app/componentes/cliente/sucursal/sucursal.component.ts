import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { ClienteModelo } from 'src/app/modelos/cliente.modelo';

@Component({
  selector: 'sucursal-page',
  templateUrl: './sucursal.component.html',
  styleUrls: ['./sucursal.component.css']
})
export class SucursalComponent implements OnInit, OnChanges {

  @Input() cliente : ClienteModelo;

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges() {
    console.log(this.cliente);
  }

}
