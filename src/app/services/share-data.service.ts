import { Injectable, EventEmitter } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class ShareDataService {

  //notificacion:{}=null;
  notificacion: any={};

  //datos presentar detalleMapa
  detallesDriver: Object={};
  
  //Direcciones en String
  inicio:Object={};
  fin: Object={};
  
  //Es un Observable
  nombreNot$=new EventEmitter<string>();
  

  //Es un observable
  notObj$=new EventEmitter<object>();

  idConductor: any
  constructor() { }
}
