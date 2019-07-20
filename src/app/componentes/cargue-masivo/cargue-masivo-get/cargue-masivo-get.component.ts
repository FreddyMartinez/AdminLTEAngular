import { Component, OnInit, EventEmitter, Inject } from '@angular/core';
import { CargueMasivoService } from 'src/app/servicios/cargue-masivo.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Constantes } from 'src/app/util/constantes';
import { ServicioGlobal } from 'src/app/servicios/global.servicio';



@Component({
  selector: 'app-cargue-masivo-get',
  templateUrl: './cargue-masivo-get.component.html',
  styleUrls: ['./cargue-masivo-get.component.css']
})
export class CargueMasivoGetComponent implements OnInit {


  id_cm_cargue_masivo: number;
  id_cargue: number = 0;
  fileContent: any = '';
  registros: string[] = [];
  msgSpinner: string = 'Cargando...';
  nombreArchivo: string = '';
  usr: string = 'PRUEBA';

  constructor(public servicio: CargueMasivoService,
    @Inject(MAT_DIALOG_DATA) data, private dialog: MatDialog
    , private dialogRef: MatDialogRef<CargueMasivoGetComponent>,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    public servicioGlobal: ServicioGlobal, ) {
    this.id_cm_cargue_masivo = data.id_cm_tipo_cargue;
    this.usr = this.servicioGlobal.getUsuario().usuario;
  }

  ngOnInit() {
  }

  realizarCargueMasivo() {

    this.spinner.show();
    this.msgSpinner = 'Realizando cargue masivo...';
    var resultado = this.crearNuevoCargueMasivo(() => {
    });

  }


  crearNuevoCargueMasivo(callback): number {
    this.spinner.show();
    this.msgSpinner = 'Creando nuevo cargue masivo...';
    this.servicio.crearNuevoCargueMasivo({
      transaccion: this.nombreArchivo, id_cm_cargue_masivo: this.id_cm_cargue_masivo, usuario: this.usr,
      lineas: this.registros
    }).subscribe(
      data => {
        this.spinner.hide();
        if (data[Constantes.codigoRespuesta] == Constantes.respuestaCorrecta) {
          console.log(data, 'data/crearNuevoCargueMasivo');
          console.log((data[Constantes.objetoRespuesta] as any).id, 'id/data/crearNuevoCargueMasivo');

          if ((data[Constantes.objetoRespuesta] as any).id > 0) {
            this.toastr.success('Cargue realizado satisfactoriamente.', 'POS');
            this.dialogRef.close({ recargar: true });
          }
        }
      },
      error => {
        this.MuestraError(error);
        return 0;
      }
    );
    callback();
    return 0;
  }

  close() {
    this.dialogRef.close();
  }



  public onChange(fileList: FileList): void {
    this.id_cargue = 0;
    let file = fileList[0];
    let fileReader: FileReader = new FileReader();
    this.registros = [];
    let self = this;
    fileReader.onloadend = function (x) {
      console.log(file, 'file');
      console.log(fileReader.result, 'fileReader.result');
      console.log(fileReader.result.toString().split(/[\r\n]+/g), 'registros');
      self.registros = fileReader.result.toString().split(/[\r\n]+/g);
      self.fileContent = fileReader.result;
      self.nombreArchivo = file.name;
    }
    fileReader.readAsText(file);
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
