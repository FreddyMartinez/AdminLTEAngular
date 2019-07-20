import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CargueMasivoComponent } from './cargue-masivo.component';

const routes: Routes = [
  { path: 'cargue-masivo/:id_interno/:nombre_pagina', component: CargueMasivoComponent },
  {
    path: '',
    redirectTo: '/cargue-masivo/:id_interno',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CargueMasivoRoutingModule { }