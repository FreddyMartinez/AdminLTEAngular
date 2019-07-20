import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { CargueMasivoService } from 'src/app/servicios/cargue-masivo.service';
import { Constantes } from 'src/app/util/constantes';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { CargueMasivoGetComponent } from './cargue-masivo-get/cargue-masivo-get.component';
import { CargueMasivoDetalleComponent } from './cargue-masivo-detalle/cargue-masivo-detalle.component';
import { ServicioGlobal } from 'src/app/servicios/global.servicio';

@Component({
  selector: 'app-cargue-masivo',
  templateUrl: './cargue-masivo.component.html',
  styleUrls: ['./cargue-masivo.component.css']
})
export class CargueMasivoComponent implements OnInit {

  id: number;
  nombre_pagina: string;
  nombre_pagina_titulo: string;
  listaCargues: any[] = [];
  transaccion: string = 'T';
  msgSpinner: string = 'Cargando...';

  pDet: number[] = [];
  itemsPerPageDet: number = 10;

  private sub: any;
  constructor(
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    public servicio: CargueMasivoService,
    public servicioGlobal: ServicioGlobal,
    public dialog: MatDialog) {
    this.servicioGlobal.obtenerUsuario();
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id_interno'];
      this.nombre_pagina = params['nombre_pagina'];
      this.nombre_pagina_titulo = params['nombre_pagina'].toString().replace('CM ', 'Cargue Masivo de ');
      this.msgSpinner = 'Inicializando ' + params['nombre_pagina'].toString().replace('CM ', 'Cargue Masivo de ');
    });
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      console.log(this.id, 'id_interno');

      this.ObtenerCarguesMasivos();
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }


  ObtenerCarguesMasivos() {
    this.msgSpinner = 'Buscando los cargues masivos registrados...';
    this.spinner.show();
    this.servicio.obtenerCarguesMasivos({
      transaccion: this.transaccion, id_cm_cargue_masivo: -1, id_tipo_cm: this.id, usuario: this.servicioGlobal.getUsuario().usuario
    }).subscribe(
      data => {
        this.spinner.hide();
        this.msgSpinner = 'Cargando...';
        if (data[Constantes.codigoRespuesta] == Constantes.respuestaCorrecta) {
          this.listaCargues = data[Constantes.objetoRespuesta] as any[];
          console.log(data);
        }
      },
      error => {
        this.MuestraError(error);
      }
    );
  }

  getCargueMasivo(): void {

    const dialogRef = this.dialog.open(CargueMasivoGetComponent, {
      width: '750px',
      height: '650px',
      disableClose: true,
      autoFocus: true,
      data: { id_cm_tipo_cargue: this.id }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.recargar) {
        this.ObtenerCarguesMasivos();
      }
      console.log(result.recargar, 'The dialog was closed');
    });
  }


  verCargueMasivoDet(transac: string, cargue: any): void {


    this.msgSpinner = 'Buscando las líneas registradas del cargue masivo...';
    this.spinner.show();
    this.servicio.obtenerCarguesMasivosDet({
      transaccion: transac, id_cm_cargue_masivo: cargue.id , id_tipo_cm: this.id, usuario: this.servicioGlobal.getUsuario().usuario
    }).subscribe(
      data => {
        this.spinner.hide();
        this.msgSpinner = 'Cargando...';
        if (data[Constantes.codigoRespuesta] == Constantes.respuestaCorrecta) {

          console.log(data, 'detalle');

          const dialogConfig = new MatDialogConfig();
          dialogConfig.width = '1050px';
          dialogConfig.height = '735px';
          dialogConfig.disableClose = true;
          dialogConfig.autoFocus = true;
          dialogConfig.data = {
            id_cm_tipo_cargue: this.id,
            transac: transac,
            cargue: cargue
            , lista: data[Constantes.objetoRespuesta] as any[]
          };
          dialogConfig.position = { top: '60px' };

          const dialogRef = this.dialog.open(CargueMasivoDetalleComponent, dialogConfig);



          dialogRef.afterClosed().subscribe(result => {

          });
        }
      },
      error => {
        this.MuestraError(error);
      }
    );



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
