import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { PagoPage } from './pago.page';

import { PagoPageRoutingModule } from './pago-routing.module';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PagoPageRoutingModule
  ],
  declarations: [PagoPage]
})
export class PagoPageModule {}
