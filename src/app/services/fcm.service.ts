import { Injectable } from '@angular/core';

import { Router } from '@angular/router';

//Para las push notifications
import {
  Plugins,
  PushNotification,
  PushNotificationToken,
  PushNotificationActionPerformed,
  Capacitor

} from '@capacitor/core';

const { PushNotifications } = Plugins;

//Compartir la data a traves de un service
import { ShareDataService } from './share-data.service';
import { NotificationDriverComponent } from '../components/notification-driver/notification-driver.component';
import { AngularDelegate, PopoverController } from '@ionic/angular';
import { AuthService } from './auth.service';
import { CloneVisitor } from '@angular/compiler/src/i18n/i18n_ast';
import { CalificarDriverComponent } from '../components/calificar-driver/calificar-driver.component';
import { ResourceLoader } from '@angular/compiler';
import { LoadingService } from './loading.service';
import { ShowNotifComponent } from '../components/show-notif/show-notif.component';

@Injectable({
  providedIn: 'root'
})
export class FcmService {
  as:any;
  a:any;
  constructor(
    private router: Router,
    private shareData: ShareDataService,
    private popoverController: PopoverController,
    private authService:AuthService,
    private loadingservice: LoadingService
  ) {

  }

  initPush() {
    if (Capacitor.platform !== 'web') {
      this.registerPush();
    }
  }

  private registerPush() {
    /*
    * Solicitar permiso para usar notificaciones push
    * iOS solicitará al usuario y regresará si les concedió permiso o no
    * Android sólo concederá sin preguntar
    */
    PushNotifications.requestPermission().then(permission => {
      if (permission.granted) {
        //  Regístrese en Apple / Google para recibir push a través de APNS/FCM
        PushNotifications.register();
      } else {
        // Manejo de errores
        console.error("ERROR> Linea 42 home.page.ts")
      }
    });

    PushNotifications.addListener('registration',
      (token: PushNotificationToken) => {
        //alert('Push registration success, token: ' + token.value);
        console.log('My token: ' + JSON.stringify(token))
        //Enviar post con el token
        this.a= token.value.toString();
        this.as={
          token : this.a
        }
        this.authService.deviceToken=this.as;
        //alert('Push registration success, token: ' + token.value);
        //console.log(token)
        this.authService.postDataAPI(this.as);
        
      }
    );
      
    PushNotifications.addListener('registrationError',
      (error: any) => {
        alert('Error on registration: ' + JSON.stringify(error));
      }
    );

    /*En share data se almacena la data para la nueva ventana */
    PushNotifications.addListener('pushNotificationReceived',
    async (notification:  PushNotification) => {
      if(parseInt(notification.data.tipoNotificacion)==0){
      console.log('ActionPerformed, data: '+ JSON.stringify(notification.notification))
        let notObjeto = {
          'title':notification.body,
          'nombre:':notification.data.nombreConductor,
          'apellido':notification.data.apellidoConductor,
          'calificacion':notification.data.calificacionConductor,
          'telefono':notification.data.telefonoConductor,
          'modelo':notification.data.modeloVehiculo,
          'placa':notification.data.placaVehiculo,
          'color':notification.data.colorVehiculo,
          'inicioCoords':notification.data.inicioCoords,
          'finCoords':notification.data.finCoords,
          'idConductor':notification.data.idConductor,
          'iddriver':notification.data.iddriver
        }
        localStorage.setItem('idConductor',notification.data.iddriver);
        localStorage.setItem('idUsuarioConductor',notification.data.idConductor);
        this.shareData.nombreNot$.emit(JSON.stringify(notification));
        console.log(notObjeto)
        this.shareData.notObj$.emit(notObjeto);

        this.shareData.notificacion = notification;
        this.shareData.detallesDriver=notification;
        //this.presentAlertConfirm(notification);
        this.loadingservice.hideLoader();
        this.router.navigate(['/detalle-servicio']);
        //this.presentPopoverDetalle(notification);
        } else if(parseInt(notification.data.tipoNotificacion)==1){
          console.log(notification.data)
          this.presentPopoverCalificacion();
        } else if(parseInt(notification.data.tipoNotificacion)==2){
          console.log(notification.data)
          this.presentarPopoverNotificacion(notification);
        }
      }
    );

    PushNotifications.addListener('pushNotificationActionPerformed',
      async (notification: PushNotificationActionPerformed) => {
        if(parseInt(notification.notification.data.tipoNotificacion)==0){
        console.log('ActionPerformed, data: '+ JSON.stringify(notification.notification))
        this.router.navigateByUrl("/acerca");
        let notObjeto = {
          'title':notification.notification.body,
          'nombre:':notification.notification.data.nombreConductor,
          'apellido':notification.notification.data.apellidoConductor,
          'calificacion':notification.notification.data.calificacionConductor,
          'telefono':notification.notification.data.telefonoConductor,
          'vehiculo':notification.notification.data.vehiculoConductor,
          'modelo':notification.notification.data.modeloVehiculo,
          'placa':notification.notification.data.placaVehiculo,
          'color':notification.notification.data.colorVehiculo,
          'inicioCoords':notification.notification.data.inicioCoords,
          'finCoords':notification.notification.data.finCoords,
          'idConductor':notification.notification.data.idConductor
        }
        localStorage.setItem('idConductor',notification.notification.data.idConductor);
        this.shareData.nombreNot$.emit(JSON.stringify(notification.notification));

        this.shareData.notObj$.emit(notObjeto);

        this.shareData.notificacion = notification.notification;
        this.shareData.detallesDriver=notification.notification;
        this.shareData.idConductor=notification.notification.data.idConductor;
        //this.presentAlertConfirm(notification);
        this.loadingservice.hideLoader();
        this.router.navigate(['/detalle-servicio']);
        //this.presentPopoverDetalle(notification);
        } else if(parseInt(notification.notification.data.tipoNotificacion)==1){
          
          this.presentPopoverCalificacion();
        }
      }
    );

  }

  async presentPopoverDetalle(notification) {
    let title = notification.title;
    let body = notification.body;
    let apellido = notification.data.apellidoConductor;
    //let idCliente = notification.data.idCliente;

    const popover = await this.popoverController.create({
      component: NotificationDriverComponent,
      cssClass: 'servicioasignado',
      componentProps:{
         title: title,
         body: body,
         apellido: apellido
         //idCliente: idCliente
      },
      mode:"md",
      translucent: true,
      backdropDismiss: false
    });
    return await popover.present();
  }


  async presentPopoverCalificacion() {
    //let idCliente = notification.data.idCliente;
    const popover = await this.popoverController.create({
      component: CalificarDriverComponent,
      cssClass: 'servicioasignado',
      componentProps:{},
      mode:"md",
      translucent: true,
      backdropDismiss: false
    });
    return await popover.present();
  }

  async presentarPopoverNotificacion(notification){
    let title = notification.title;
    let body = notification.body;
    const popover = await this.popoverController.create({
      component: ShowNotifComponent,
      cssClass: 'servicioasignado',
      componentProps:{
        title: title,
        body: body

      },
      mode:"md",
      translucent: true,
      backdropDismiss: false
    });
    return await popover.present();
  }


}
