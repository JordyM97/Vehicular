import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { HistorialDetallesComponent } from 'src/app/components/historial-detalles/historial-detalles.component'
import { Platform, PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-historial',
  templateUrl: './historial.page.html',
  styleUrls: ['./historial.page.scss'],
})
export class HistorialPage implements OnInit {
  
  historialViajes: Array<any>;
  historialFinal: Array<any>;

  constructor(
    private authService: AuthService,
    private popovercontroller: PopoverController,
  ){
    this.historialFinal = []
  }

  ngOnInit() {
    this.historialViajes = this.authService.getHistorial();
    console.log(this.historialViajes);
    this.historialViajes.forEach(element => {
      if (element.startidLocation!=null) {
        this.historialFinal.push(element);
      }
    });
  }

  botonDetalles(element: any){
    console.log("ss");
    this.detallesHistorial(element);
  }

  async detallesHistorial(element: any){
    var date = new Date(element.startDate);
    var anio = date.getFullYear(); 
    var mes = String(date.getMonth() + 1).padStart(2, '0');
    var dia = String(date.getDate()).padStart(2, '0');
    var hora = String(date.getHours());
    var minuto =String(date.getMinutes());
    var segundo = String(date.getSeconds());
    const popover= await this.popovercontroller.create({
      component: HistorialDetallesComponent,
      translucent: true,
      cssClass: 'contact-popover',
      componentProps:{
        detalles: {
          direccionInicio: element.startAddress,
          direccionFin: element.endAddress,
          coordenadasInicio: JSON.stringify(element.startidLocation),
          coordenadasFin: JSON.stringify(element.startidLocation),
          dia: dia,
          mes: mes,
          anio: anio,
          hora: hora,
          minuto: minuto,
          segundo: segundo,
          servicio: element.idTypeService,
          formaPago: element.idPaymentService,
          estado: element.stateService
        }
      }
    }); 
    return await popover.present();
    
  }
}
