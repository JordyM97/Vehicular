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
  }

  ngOnInit() {
    this.historialViajes = this.authService.getHistorial();
    console.log(this.historialViajes);
    this.historialViajes.slice().reverse().forEach(element => {
      if (element.startidLocation!=null) {
        this.historialFinal.push(element);
      }
    });
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
