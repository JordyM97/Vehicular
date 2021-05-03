import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import {  Router } from '@angular/router'

@Component({
  selector: 'app-historial',
  templateUrl: './historial.page.html',
  styleUrls: ['./historial.page.scss'],
})
export class HistorialPage implements OnInit {
  
  historialViajes: Array<any>;
  historialFinal: Array<any>;
  detallesViaje: Array<any>;
  estadoViaje: any;

  constructor(
    private authService: AuthService,
    private router: Router
  ){
    this.historialFinal = []
    this.authService.getRecordService();
    this.historialViajes = this.authService.getHistorial();
    console.log("Historial ",this.historialViajes);
    this.historialViajes=this.historialViajes.map(el=>{
      return el.idDriverService_id!=null;
    })
    this.historialViajes.forEach(element => {
      console.log(element)
      if (element.idDriverService_id!=null) {
        this.historialFinal.push(element);
      }else{
        console.log("No hay carreras");
        
      }
    });
  }

  ngOnInit() {
    
  }

  botonDetalles(element: any){
    this.detallesViaje = element;
    this.router.navigate(['historial-detalle/'+JSON.stringify(this.detallesViaje)])
  }

  public getDetallesViaje(){
    return this.detallesViaje;
  }

  getColor(estado) {
    switch (estado) {
      case 1:
        return 'red';
      case 0:
        return 'green';
    }
  }
}
