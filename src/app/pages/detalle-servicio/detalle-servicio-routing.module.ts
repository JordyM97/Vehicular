import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetalleServicioPage } from './detalle-servicio.page';

const routes: Routes = [
  {
    path: '',
    component: DetalleServicioPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetalleServicioPageRoutingModule {}
