import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ResetpssPageRoutingModule } from './resetpss-routing.module';

import { ResetpssPage } from './resetpss.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ResetpssPageRoutingModule
  ],
  declarations: [ResetpssPage]
})
export class ResetpssPageModule {}
