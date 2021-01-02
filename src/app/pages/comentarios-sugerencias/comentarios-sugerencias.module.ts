import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ComentariosSugerenciasPageRoutingModule } from './comentarios-sugerencias-routing.module';

import { ComentariosSugerenciasPage } from './comentarios-sugerencias.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComentariosSugerenciasPageRoutingModule
  ],
  declarations: [ComentariosSugerenciasPage]
})
export class ComentariosSugerenciasPageModule {}
