import { Component, OnInit } from '@angular/core';
import { ViewChild, ElementRef } from '@angular/core';
declare var google;

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  map = null; 

  constructor() {}

  ngOnInit(){
    this.loadMap()
  }

  loadMap() {
    //Crear nuevo mapa
    const mapEle: HTMLElement = document.getElementById('map');
    // Crear el mapa y renderizarlo
    this.map = new google.maps.Map(mapEle, {
      center: {lat: -2.189327, lng: -79.889532},
      zoom: 15
    });
  }
}
