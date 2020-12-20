import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetalleServicioPageRoutingModule } from './detalle-servicio-routing.module';

import { DetalleServicioPage } from './detalle-servicio.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetalleServicioPageRoutingModule
  ],
  declarations: [DetalleServicioPage]
})
export class DetalleServicioPageModule {}
