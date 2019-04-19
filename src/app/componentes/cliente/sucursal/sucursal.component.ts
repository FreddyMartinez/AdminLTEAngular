import { Component, OnInit, Input } from '@angular/core';
import { ClienteModelo } from 'src/app/modelos/cliente.modelo';

@Component({
  selector: 'sucursal-page',
  templateUrl: './sucursal.component.html',
  styleUrls: ['./sucursal.component.css']
})
export class SucursalComponent implements OnInit {

  @Input() cliente : ClienteModelo;

  constructor() { }

  ngOnInit() {
    console.log(this.cliente);
  }

}
