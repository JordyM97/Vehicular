import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ComentariosSugerenciasPage } from './comentarios-sugerencias.page';

const routes: Routes = [
  {
    path: '',
    component: ComentariosSugerenciasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ComentariosSugerenciasPageRoutingModule {}
