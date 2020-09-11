import { Component, OnInit } from '@angular/core';
import { PopoverController,ToastController,NavParams } from '@ionic/angular';

@Component({
  selector: 'app-popover',
  templateUrl: './popover.component.html',
  styleUrls: ['./popover.component.scss'],
})
export class PopoverComponent implements OnInit {
  startMarker: any;
  constructor(private navParams: NavParams, private popoverController: PopoverController,public toastController: ToastController) { }

  ngOnInit() {
    this.startMarker= this.navParams.get('info');
  }
  async DismissClick() {
    await this.popoverController.dismiss();
    const toast = await this.toastController.create({
      message: 'Has cancelado la carrera!',
      duration: 2500,
      position: 'top',
      color: 'danger'
      });
    toast.present();
  }
  async presentToast() {
    const toast = await this.toastController.create({
      message: 'El conductor estara llegando pronto!',
      duration: 2500,
      position: 'top',
      color: 'success'
      });
    toast.present();
    await this.popoverController.dismiss();
    }
}
