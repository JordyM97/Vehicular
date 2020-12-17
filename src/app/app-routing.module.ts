import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { PublicGuard } from './guards/public.guard';
import { AuthService } from './services/auth.service';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule), canActivate: [AuthGuard]
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'news',
    loadChildren: () => import('./pages/news/news.module').then( m => m.NewsPageModule), canActivate: [ PublicGuard]
  },
  {
    path: 'viajes',
    loadChildren: () => import('./pages/viajes/viajes.module').then( m => m.ViajesPageModule), canActivate: [ AuthGuard]
  },
  {
    path: 'acerca',
    loadChildren: () => import('./pages/acerca/acerca.module').then( m => m.AcercaPageModule), canActivate: [AuthGuard]
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule), 
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/register/register.module').then( m => m.RegisterPageModule), canActivate: [PublicGuard]
  },
  {
    path: 'perfil',
    loadChildren: () => import('./pages/perfil/perfil.module').then( m => m.PerfilPageModule), canActivate: [AuthGuard]
  },
  {
    path: 'servicio',
    loadChildren: () => import('./pages/servicio/servicio.module').then( m => m.ServicioPageModule)//, canActivate: [AuthGuard, PublicGuard]
  },
  {
    path: 'resetpss',
    loadChildren: () => import('./pages/resetpss/resetpss.module').then( m => m.ResetpssPageModule), //canActivate: [AuthGuard]
  },
  {
    path: 'historial',
    loadChildren: () => import('./pages/historial/historial.module').then( m => m.HistorialPageModule)
  },
  {
    path: 'historial-detalle/:datos',
    loadChildren: () => import('./pages/historial-detalle/historial-detalle.module').then( m => m.HistorialDetallePageModule)
  },  {
    path: 'detalle-servicio',
    loadChildren: () => import('./pages/detalle-servicio/detalle-servicio.module').then( m => m.DetalleServicioPageModule)
  },







];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
