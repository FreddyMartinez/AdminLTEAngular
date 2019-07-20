import { Component, OnInit, Inject } from '@angular/core';
import { CargueMasivoService } from 'src/app/servicios/cargue-masivo.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Constantes } from 'src/app/util/constantes';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-cargue-masivo-detalle',
  templateUrl: './cargue-masivo-detalle.component.html',
  styleUrls: ['./cargue-masivo-detalle.component.css']
})
export class CargueMasivoDetalleComponent implements OnInit {

  
  cargue: any = {
    id:0,
    nombre_archivo : '',
    fecha_creacion: null
  };
  transaccion: string;
  msgSpinner:string;
  lista: any[] = [];

  pDet: number[] = [];
  itemsPerPageDet: number = 10;

  constructor(public servicio: CargueMasivoService,
    @Inject(MAT_DIALOG_DATA) data, private dialog: MatDialog
    , private dialogRef: MatDialogRef<CargueMasivoDetalleComponent>,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService) { 
      this.transaccion = data.transac;
      this.lista = data.lista;
      this.cargue = data.cargue;
    }

  ngOnInit() {
    console.log(this.lista ,'lista');
  }

  close() {
    this.dialogRef.close();
  }

}
