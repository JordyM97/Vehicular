import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder } from '@ionic-native/native-geocoder/ngx';
import { HTTP } from '@ionic-native/http/ngx';
import {HttpClientModule, HttpClient} from '@angular/common/http';
import {PopoverComponent} from './popover/popover.component'
import { AngularFireModule } from '@angular/fire';
import { firebaseConfig } from '../environments/environment';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';
@NgModule({
  declarations: [AppComponent,PopoverComponent],
  entryComponents: [PopoverComponent],
  imports: [
  BrowserModule,IonicModule.forRoot({mode: 'ios' }),  
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule, // imports firebase/database, only needed for database features
    AngularFireAuthModule,
    AppRoutingModule,HttpClientModule],
  providers: [
    StatusBar, HttpClient,
    SplashScreen,
    Geolocation,    
    NativeGeocoder,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
