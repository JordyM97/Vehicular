import { NgModule, CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder } from '@ionic-native/native-geocoder/ngx';
import {HttpClientModule, HttpClient} from '@angular/common/http';
import { AngularFireModule } from '@angular/fire';
import { firebaseConfig } from '../environments/environment';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { PopoverComponent } from './components/popover/popover.component';
import { ShowNotifComponent } from './components/show-notif/show-notif.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CalificarDriverComponent } from './components/calificar-driver/calificar-driver.component';
import { AceptarParametrosComponent } from './components/aceptar-parametros/aceptar-parametros.component';

@NgModule({
  declarations: [AppComponent,PopoverComponent,CalificarDriverComponent,ShowNotifComponent,AceptarParametrosComponent],
  entryComponents: [PopoverComponent, CalificarDriverComponent,ShowNotifComponent,AceptarParametrosComponent],
  imports: [
  BrowserModule,IonicModule.forRoot({mode: 'ios', swipeBackEnabled:false  }),  
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule, // imports firebase/database, only needed for database features
    AngularFireAuthModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [
    StatusBar, HttpClient,
    SplashScreen,
    Geolocation,    
    NativeGeocoder,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule {}
