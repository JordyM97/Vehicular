import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ServicioModalPageRoutingModule } from './servicio-modal-routing.module';

import { ServicioModalPage } from './servicio-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ServicioModalPageRoutingModule
  ],
  declarations: [ServicioModalPage]
})
export class ServicioModalPageModule {}
