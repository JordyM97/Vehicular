import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';


@Component({
  selector: 'app-select-date',
  templateUrl: './select-date.component.html',
  styleUrls: ['./select-date.component.scss'],
})
export class SelectDateComponent implements OnInit {

  fechaViaje: Date = new Date();
  fechaControl: Date = new Date();

  constructor(
    private popover:PopoverController
    ) {
   }

  ngOnInit() {

  }

  cambioFecha(event){
    //console.log('ionChange', event);
    //console.log('Date', new Date(event.detail.value));
    this.fechaControl = new Date(event.detail.value);
    this.fechaViaje.setFullYear(this.fechaControl.getFullYear());
    this.fechaViaje.setMonth(this.fechaControl.getMonth());
    this.fechaViaje.setDate(this.fechaControl.getDate());
    console.log(this.fechaViaje);
  }

  cambioHora(event){
    //console.log('ionChange', event);
    //console.log('Date', new Date(event.detail.value));
    this.fechaControl = new Date(event.detail.value);
    this.fechaViaje.setHours(this.fechaControl.getHours());
    this.fechaViaje.setMinutes(this.fechaControl.getMinutes());
    console.log(this.fechaViaje);
  }

  async btnOk(){
    await this.popover.dismiss({
      fechaViaje: this.fechaViaje
    })
  }
    //CalificarServicio
    //DetallesProveedor
    //Historial
}
