import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { PopoverController,ToastController,NavParams} from '@ionic/angular';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { PopoverComponent } from '../popover/popover.component';
import { FormBuilder, FormGroup  } from '@angular/forms';
import { LoadingService } from 'src/app/services/loading.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-aceptar-parametros',
  templateUrl: './aceptar-parametros.component.html',
  styleUrls: ['./aceptar-parametros.component.scss'],
})
export class AceptarParametrosComponent implements OnInit {

  servicio: any;
  notificacionTransporter: any;
  serviciosCollection: AngularFirestoreCollection<any>;
  servicios: Observable<any[]>;
  uploadForm: FormGroup; 
  esReserva = false;
  typeServices:any[];
  formaPago:any;
  tipovehiculo:any;
  typePayment:any[];
  public tipoServicio = [
    { id: 1, tipoServicio: 'Viajar ahora', isChecked: false },    { id: 2, tipoServicio: 'Reservar viaje', isChecked: false }
  ];
  constructor(
    private navParams: NavParams, 
    private popoverController: PopoverController,
    public toastController: ToastController,
    private firestore: AngularFirestore, 
    public authService: AuthService,
    private formBuilder: FormBuilder,private loadingservice:LoadingService) {
      this.serviciosCollection=firestore.collection('Servicio');
      this.servicios= this.serviciosCollection.valueChanges();
   } 

  ngOnInit() {
    this.typeServices=this.authService.typeServices;
    this.typePayment=this.authService.typePayment;
    this.servicio= this.navParams.get('info');
    this.formaPago=this.typePayment.find(e=>{ return e.idPayment==this.servicio.idTypePayment   });
    this.tipovehiculo=this.typeServices.find(e=>{ return e.idTypeService==this.servicio.idTypeService   });
    console.log(this.servicio);
    if(this.servicio.isReservationService==1){
      this.esReserva=true;
    }
    console.log(this.servicio.isReservationService);
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
      duration: 3000,
      position: 'top',
      color: 'danger'
      });
    await toast.present();
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Buscando conductor',
      duration: 3000,
      position: 'top',
      color: 'success'
      });
    toast.present();
    this.authService.sendService(JSON.stringify(this.servicio))

    this.notificacionTransporter = {
      inicio: this.servicio.startidLocation,
      fin: this.servicio.endidLocation,
      hora: this.servicio.hora+":"+this.servicio.minuto,
      fecha: this.servicio.anio+"/"+this.servicio.mes+"/"+this.servicio.dia,
      metodoPago: this.servicio.idPaymentService,
      valor: this.servicio.total,
      cliente: this.authService.getNombre()+" "+this.authService.getApellido(),
      idCliente: 6//this.authService.getId() /*Necesito ID de la tabla cliente*/
    }
   
    //this.enviarNotificacion(this.notificacionTransporter); //No es necesaria
    //console.log("Enviando Info al API");
    //this.postDataAPI(this.servicio);
    await this.popoverController.dismiss();
    if(this.servicio.isReservationService==0){ //Para controlar que si es reserva, no se quede esperando
      //this.loadingservice.showLoader();
    }
    //this.PopOverConductorEncontrado();

    }
    enviarNotificacion(data){
      console.log(data)
      this.uploadForm.get('user').setValue(0);
      this.uploadForm.get('body').setValue("Peticion de viaje");
      this.uploadForm.get('title').setValue("Detalle del servicio");
      this.uploadForm.get('data').setValue(JSON.stringify(data));

      var formData: any = new FormData();
      formData.append("user", this.uploadForm.get('user').value);
      formData.append("body", this.uploadForm.get('body').value);
      formData.append("title", this.uploadForm.get('title').value);
      formData.append("data", this.uploadForm.get('data').value);
      this.authService.sendNotification(formData);
      //this.loadingservice.showLoader();
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
