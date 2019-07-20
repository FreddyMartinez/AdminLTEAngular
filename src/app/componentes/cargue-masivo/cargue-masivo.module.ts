import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule} from '@angular/forms'
import { NgxSpinnerModule } from 'ngx-spinner';
import {MatDialogModule} from '@angular/material';
import { NgxUploaderModule } from 'ngx-uploader';
import { FlexLayoutModule } from '@angular/flex-layout';
import {NgxPaginationModule} from 'ngx-pagination';
import { FileDropModule } from 'ngx-file-drop';

import { CargueMasivoRoutingModule } from './cargue-masivo-routing.module';

import { CargueMasivoComponent } from './cargue-masivo.component';
import { CargueMasivoGetComponent } from './cargue-masivo-get/cargue-masivo-get.component';
import { CargueMasivoDetalleComponent } from './cargue-masivo-detalle/cargue-masivo-detalle.component';

@NgModule({
    imports: [
        CommonModule,
        CargueMasivoRoutingModule,
        FormsModule,
        NgxSpinnerModule,
        MatDialogModule,
        FileDropModule,
        NgxUploaderModule,
        FlexLayoutModule,
        NgxPaginationModule
    ],
    declarations: [CargueMasivoComponent, CargueMasivoGetComponent, CargueMasivoDetalleComponent],
    entryComponents: [ CargueMasivoGetComponent, CargueMasivoDetalleComponent]
  })
  export class CargueMasivoModule { }
  