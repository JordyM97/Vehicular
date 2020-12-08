import { Component, OnInit } from '@angular/core';

import { AlertController, Platform, PopoverController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import {
  Plugins,
  PushNotification,
  PushNotificationToken,
  PushNotificationActionPerformed,
} from '@capacitor/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Token } from '@angular/compiler/src/ml_parser/lexer';
import { ShowNotifComponent } from './components/show-notif/show-notif.component';

const { PushNotifications } = Plugins;

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit{
  tokensCollection: AngularFirestoreCollection<any>;
  tokens: Observable<any[]>
  a: any;
  as:any;
  constructor(
    private router: Router,
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public authService: AuthService,
    private firestore: AngularFirestore,
    private alertCtrl: AlertController,
    public popovercontroller:PopoverController
  ) {
    this.tokensCollection=firestore.collection('tokens');
    this.tokens= this.tokensCollection.valueChanges();
    this.tokens.subscribe(value =>{console.log(value)});
    this.initializeApp();
  }
  
  ngOnInit(): void {
    PushNotifications.requestPermission().then( result => {
      if (result.granted) {
        //  Regístrese en Apple / Google para recibir push a través de APNS/FCM
        PushNotifications.register();
      } else {
        // Manejo de errores
        console.error("ERROR> Linea 42 home.page.ts")
      }
    });
    PushNotifications.addListener('registrationError',
    (error: any) => {
      alert('Error on registration: ' + JSON.stringify(error));
    }
  );
   // On success, we should be able to receive notifications
  PushNotifications.addListener('registration',
      (token: PushNotificationToken) => {
        this.a= token.value.toString();
        this.as={
          token : this.a
        }
        this.authService.deviceToken=this.as;
        //alert('Push registration success, token: ' + token.value);
        //console.log(token)
        this.postDataAPI(this.as);
      }
    );
    // Some issue with our setup and push will not work
    PushNotifications.addListener('registrationError',
      (error: any) => {
        alert('Error on registration: ' + JSON.stringify(error));
      }
    );
    // Show us the notification payload if the app is open on our device
    PushNotifications.addListener('pushNotificationReceived',
      (notification: PushNotification) => {
        console.log(notification);
        //alert(JSON.stringify(notification));
        this.presentarNotificacion(notification);
        //this.presentAlert(notification);
      }
    );
     // Method called when tapping on a notification
     PushNotifications.addListener('pushNotificationActionPerformed',
     (notification: PushNotificationActionPerformed) => {
       //alert('Push action performed: ' + JSON.stringify(notification));
       this.router.navigateByUrl("Home")
     }
   );
  }
  on_logout(){
    this.authService.logout();
    this.router.navigateByUrl("login");
    localStorage.clear();
    
  }
  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.router.navigateByUrl("login")
    });
  }
  postDataAPI(any: any){
    this.tokensCollection.add(any);
  }
  async presentAlert(any:any) {
    const alert = this.alertCtrl.create({
      header: any.title,
      message: any.message,
      buttons: ['Ok']
    });
    (await alert).present;
  }
  async presentarNotificacion(any:any) {
    let title=any.title;
    
    let body=any.body;

    const popover = await this.popovercontroller.create({
      component: ShowNotifComponent,
      cssClass: 'my-custom-class',
      componentProps:{
         title:title,
         body:body,
      },
      mode:"md",
      translucent: true
    });
    return await popover.present();
  }
}
