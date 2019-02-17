import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainFrameComponent } from './main-frame.component';

const routes: Routes = [
  { path: '', component: MainFrameComponent, loadChildren: '../seguridad/seguridad.module#SeguridadModule'},  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainFrameRoutingModule { }
