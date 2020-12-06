import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AcercaPageModule } from '../pages/acerca/acerca.module';
import { LoginPageModule } from '../pages/login/login.module';
import { NewsPageModule } from '../pages/news/news.module';
import { PerfilPageModule } from '../pages/perfil/perfil.module';
import { RegisterPageModule } from '../pages/register/register.module';
import { ServicioPageModule } from '../pages/servicio/servicio.module';
import { ViajesPageModule } from '../pages/viajes/viajes.module';
import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
    
  },
  {
    path: 'news',
    component: NewsPageModule
  },
  {
    path: 'viajes',
    component: ViajesPageModule
  },
  {
    path: 'acerca',
    component: AcercaPageModule
  },
  {
    path: 'login',
    component: LoginPageModule
  },
  {
    component: RegisterPageModule
  },
  {
    path: 'perfil',
    component: PerfilPageModule
  },
  {
    path: 'servicio',
    component: ServicioPageModule
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}
