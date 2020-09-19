import { Component, OnInit } from '@angular/core';
import { PopoverController,ToastController,NavParams } from '@ionic/angular';

@Component({
  selector: 'app-aceptar-parametros',
  templateUrl: './aceptar-parametros.component.html',
  styleUrls: ['./aceptar-parametros.component.scss'],
})
export class AceptarParametrosComponent implements OnInit {
  startMarker: any;
  constructor(private navParams: NavParams, private popoverController: PopoverController,public toastController: ToastController) { }

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
    await this.popoverController.dismiss();
    }
}
