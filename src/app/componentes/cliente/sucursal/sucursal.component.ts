import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { ClienteModelo } from 'src/app/modelos/cliente.modelo';
import { SucursalEmpresaModelo } from 'src/app/modelos/sucursal.empresa.modelo';
import { EmpresaModelo } from 'src/app/modelos/empresa.modelo';
@Component({
  selector: 'sucursal-page',
  templateUrl: './sucursal.component.html',
  styleUrls: ['./sucursal.component.css']
})
export class SucursalComponent implements OnInit, OnChanges {

  @Input() cliente : ClienteModelo;
  @Input() empresa : EmpresaModelo;
  constructor() { }

  ngOnInit() {
  }

  ngOnChanges() {
    console.log(this.cliente);

  }

}
