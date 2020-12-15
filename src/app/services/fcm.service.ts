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
import { PopoverController } from '@ionic/angular';
import { AuthService } from './auth.service';

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
    private authService:AuthService
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
        console.error('Error on registration: ' + JSON.stringify(error));
      }
    );

    /*En share data se almacena la data para la nueva ventana */
    PushNotifications.addListener('pushNotificationReceived',
    async (notification:  PushNotification) => {

        let notObjeto = {
          'title':notification.body,
          'nombre:':notification.data.nombreConductor,
          'apellido':notification.data.apellidoConductor,
          'calificacion':notification.data.calificacionConductor,
          'telefono':notification.data.telefonoConductor,
          'vehiculo':notification.data.vehiculoConductor,
          'modelo':notification.data.modeloVehiculo,
          'placa':notification.data.placaVehiculo
        }

        this.shareData.nombreNot$.emit(JSON.stringify(notification));

        this.shareData.notObj$.emit(notObjeto);

        this.shareData.notificacion = notification;
        this.shareData.detallesDriver=notification;
        //this.presentAlertConfirm(notification);


        this.presentPopoverDetalle(notification);
      }
    );
/*
    PushNotifications.addListener('pushNotificationActionPerformed',
      async (notification: PushNotificationActionPerformed) => {
        //alert('Push action performed: ' + JSON.stringify(notification));
        
        if (notification.notification.data) {
          console.log('ActionPerformed, notification: '+ JSON.stringify(notification.notification))
          console.log('ActionPerformed, data: '+ JSON.stringify(notification.notification.data))
          let isCompleteRouter = await this.router.navigateByUrl(`/tabs/${notification.notification.data}`)
          if(isCompleteRouter){
            console.log('LLEGO A LA TABS')
          //   let origin=JSON.parse(notification.notification.data.inicio);
          //   console.log('Inicio> ',typeof(origin))//object
          //   console.log('Inicio> ',typeof(origin.lat))
          //   let destiny=JSON.parse(notification.notification.data.fin);
          //   console.log('Fin> ',typeof(destiny.lng))
  
          // let notObjeto = {
          //   'title':notification.notification.title,
          //   'inicio':origin,
          //   'fin':destiny,
          //   'hora':notification.notification.data.hora,
          //   'metodoPago':notification.notification.data.metodoPago,
          //   'valor':notification.notification.data.valor,
          // }
  
         
          // this.shareData.notificacion=notification;
          // this.shareData.detalleServicio=notification;
          // this.presentPopoverDetalle(notification);
          }
          
        }
        else{

        }
      }
    );*/

  }

  async presentPopoverDetalle(notification) {
    let title = notification.title;
    let body = notification.body;
    let apellido = notification.data.apellidoConductor;
    //let idCliente = notification.data.idCliente;

    const popover = await this.popoverController.create({
      component: NotificationDriverComponent,
      cssClass: 'my-custom-class',
      componentProps:{
         title: title,
         body: body,
         apellido: apellido
         //idCliente: idCliente
      },
      mode:"md",
      translucent: true
    });
    return await popover.present();
  }


}
