import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainFrameRoutingModule } from './main-frame-routing.module';
import { MainFrameComponent } from './main-frame.component';

@NgModule({
  imports: [
    CommonModule,
    MainFrameRoutingModule
  ],
  declarations: [MainFrameComponent]
})
export class MainFrameModule { }
