import { getLocaleDateFormat } from '@angular/common';
import { Component, ComponentFactoryResolver, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { PopoverController,ToastController,NavParams } from '@ionic/angular';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { PopoverComponent } from '../popover/popover.component';
import { FormBuilder, FormGroup  } from '@angular/forms';

@Component({
  selector: 'app-aceptar-parametros',
  templateUrl: './aceptar-parametros.component.html',
  styleUrls: ['./aceptar-parametros.component.scss'],
})
export class AceptarParametrosComponent implements OnInit {

  startMarker: any;
  serviciosCollection: AngularFirestoreCollection<any>;
  servicios: Observable<any[]>;
  uploadForm: FormGroup; 

  constructor(private navParams: NavParams, 
    private popoverController: PopoverController,
    public toastController: ToastController,
    private firestore: AngularFirestore, 
    public authService: AuthService,
    private formBuilder: FormBuilder) {
    this.serviciosCollection=firestore.collection('Servicio');
    this.servicios= this.serviciosCollection.valueChanges();
   }

  ngOnInit() {
    this.startMarker= this.navParams.get('info');
    console.log(this.startMarker);
    this.uploadForm = this.formBuilder.group({
      user: [''],
      body: [''],
      title: [''],
      data: ['']
    });
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
   
    //this.authService.sendNotification(JSON.stringify(this.startMarker));
    this.enviarNotificacion(this.startMarker);
    console.log("Enviando Info al API");
    this.postDataAPI(this.startMarker)
    //console.log(JSON.stringify(this.startMarker))
    await this.popoverController.dismiss();
    this.PopOverConductorEncontrado();

    }
    enviarNotificacion(data){
      this.uploadForm.get('user').setValue(0);
      this.uploadForm.get('body').setValue("Peticion de viaje");
      this.uploadForm.get('title').setValue("Enviado desde celular");
      this.uploadForm.get('data').setValue(JSON.stringify(data));

      var formData: any = new FormData();
      formData.append("user", this.uploadForm.get('user').value);
      formData.append("body", this.uploadForm.get('body').value);
      formData.append("title", this.uploadForm.get('title').value);
      formData.append("data", this.uploadForm.get('data').value);
      this.authService.sendNotification(formData);
    }
    async PopOverConductorEncontrado(){
      const popover= await this.popoverController.create({
        component: PopoverComponent,
        translucent: true,      cssClass: 'contact-popover',
        componentProps:{
          info: {
            price: 4.23 
          }
        }
      }); 
      return await popover.present();
    }
  postDataAPI(any: any){
    this.serviciosCollection.add(any);
  }
}
