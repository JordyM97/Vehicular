import { Component, OnInit } from '@angular/core';
import { PopoverController,ToastController,NavParams } from '@ionic/angular';

declare var google;

@Component({
  selector: 'app-historial-detalles',
  templateUrl: './historial-detalles.component.html',
  styleUrls: ['./historial-detalles.component.scss'],
})
export class HistorialDetallesComponent implements OnInit {
  
  historialViaje: any;

  constructor(
    private navParams: NavParams,
    private popoverController: PopoverController,
    public toastController: ToastController,
  ) { }

  ngOnInit() {
    this.historialViaje = this.navParams.get('detalles');
    console.log(google);
  }
  async presentToast() {
    await this.popoverController.dismiss();
  }
}
