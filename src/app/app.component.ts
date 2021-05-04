import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController, Platform, PopoverController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { FcmService } from './services/fcm.service';
import { TerminosComponent } from './pages/terminos/terminos.component';
import { CalificarDriverComponent } from './components/calificar-driver/calificar-driver.component';
import { DetalleServicioPage } from './pages/detalle-servicio/detalle-servicio.page';
import { ComentariosSugerenciasPage } from './pages/comentarios-sugerencias/comentarios-sugerencias.page';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit{
  tokensCollection: AngularFirestoreCollection<any>;
  tokens: Observable<any[]>
  politicas: Observable<any>;
  isDetalleServicio;
  a: any;
  as:any;
  username="invitado"
  constructor(
    private router: Router,
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public authService: AuthService,
   // private firestore: AngularFirestore,
    public popovercontroller:PopoverController,
    private fcmService: FcmService,
    private modalCtrl:ModalController
  ) {
    //this.tokensCollection=firestore.collection('tokens');
    //this.tokens= this.tokensCollection.valueChanges();
    //this.tokens.subscribe(value =>{console.log(value)});
    this.initializeApp();
  }

  ngOnInit(){
    let isDetalleServicio: any = {}
    isDetalleServicio.isDetalle = false;

    this.isDetalleServicio = JSON.stringify(isDetalleServicio)
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.fcmService.initPush(); /* Inicializar notificaciones push*/
      this.router.navigateByUrl("login")
    });
  }

  on_logout(){
    this.authService.logout();
    this.router.navigateByUrl("login");
    localStorage.clear();
    
  }
  async comentarios(){
    const modal = await this.modalCtrl.create({
      component: ComentariosSugerenciasPage,
      cssClass: 'NewClass',
      componentProps: {
        
      },
      swipeToClose: false,
    });
    return await modal.present();
  }
  getPoliticas(){
    this.authService.getPoliticas();
  }
  async presentPopoverCalificacion() {
    //let idCliente = notification.data.idCliente;
    const popover = await this.popovercontroller.create({
      component: DetalleServicioPage,
      cssClass: 'servicioasignado',
      componentProps:{},
      mode:"md",
      translucent: true,
      backdropDismiss: false
    });
    return await popover.present();
  }
}
