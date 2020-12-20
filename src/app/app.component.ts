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
import { FcmService } from './services/fcm.service';

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
  username="invitado"
  constructor(
    private router: Router,
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public authService: AuthService,
    private firestore: AngularFirestore,
    private alertCtrl: AlertController,
    public popovercontroller:PopoverController,
    private fcmService: FcmService,
  ) {
    this.tokensCollection=firestore.collection('tokens');
    this.tokens= this.tokensCollection.valueChanges();
    this.tokens.subscribe(value =>{console.log(value)});
    this.initializeApp();
  }

  ngOnInit(){}

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
}
