import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ResetpssPage } from './resetpss.page';

const routes: Routes = [
  {
    path: '',
    component: ResetpssPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ResetpssPageRoutingModule {}
