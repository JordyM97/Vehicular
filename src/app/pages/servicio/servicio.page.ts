import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ServicioModalPage } from '../servicio-modal/servicio-modal.page';

@Component({
  selector: 'app-servicio',
  templateUrl: './servicio.page.html',
  styleUrls: ['./servicio.page.scss'],
})
export class ServicioPage implements OnInit {

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
  }

  async iniciarServicio(){

    const modalIniciarServicio = await this.modalCtrl.create({
      component: ServicioModalPage, //Importa desde el modal
      componentProps: {
          viaje: 'A veeer',
      }
    });
    
    await modalIniciarServicio.present();

    const { data } = await modalIniciarServicio.onDidDismiss();

    console.log('Retorno de los servicios', data)
  }


}
