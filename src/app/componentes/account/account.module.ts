import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule} from '@angular/forms'

import { AccountRoutingModule } from './account-routing.module';
import { AccountComponent } from './account.component';
import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgxSpinnerModule,
    AccountRoutingModule
  ],
  declarations: [AccountComponent]
})
export class AccountModule { }
