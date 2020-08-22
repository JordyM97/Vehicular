import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ServicioPageRoutingModule } from './servicio-routing.module';

import { ServicioPage } from './servicio.page';
import { ServicioModalPage } from '../servicio-modal/servicio-modal.page';
import { ServicioModalPageRoutingModule } from '../servicio-modal/servicio-modal-routing.module';
import { ServicioModalPageModule } from '../servicio-modal/servicio-modal.module';

@NgModule({
  entryComponents: [
    ServicioModalPage //Modal que quiero abrir
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ServicioPageRoutingModule,
    ServicioModalPageModule //Cargar configuraciones y opciones
  ],
  declarations: [ServicioPage]
})
export class ServicioPageModule {}
