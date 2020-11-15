import { getLocaleDateFormat } from '@angular/common';
import { Component, ComponentFactoryResolver, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { PopoverController,ToastController,NavParams } from '@ionic/angular';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-aceptar-parametros',
  templateUrl: './aceptar-parametros.component.html',
  styleUrls: ['./aceptar-parametros.component.scss'],
})
export class AceptarParametrosComponent implements OnInit {
  startMarker: any;
  serviciosCollection: AngularFirestoreCollection<any>;
  servicios: Observable<any[]>
  constructor(private navParams: NavParams, private popoverController: PopoverController,public toastController: ToastController,private firestore: AngularFirestore, public authService: AuthService ) {
    this.serviciosCollection=firestore.collection('Servicio');
    this.servicios= this.serviciosCollection.valueChanges();
   }

  ngOnInit() {
    this.startMarker= this.navParams.get('info');
    console.log(this.startMarker);
  }
  async DismissClick() {
    await this.popoverController.dismiss();
    const toast = await this.toastController.create({
      message: '¿Vas cambiar algo?',
      duration: 2500,
      position: 'top',
      color: 'danger'
      });
    toast.present();
  }
  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Buscando conductor',
      duration: 250,
      position: 'middle',
      color: 'success'
      });
    toast.present();
    this.authService.setNotification(JSON.stringify(this.startMarker));
    console.log("Enviando Info al API");
    this.postDataAPI(this.startMarker)
    console.log(JSON.stringify(this.startMarker))
    await this.popoverController.dismiss();
    }
    
  postDataAPI(any: any){
    this.serviciosCollection.add(any);
  }
}
