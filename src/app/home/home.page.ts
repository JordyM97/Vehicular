import { Component, OnInit } from '@angular/core';
import { ViewChild, ElementRef } from '@angular/core';
declare var google;

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

map: any;
directionsService = new google.maps.DirectionsService();
directionsDisplay = new google.maps.DirectionsRenderer();
// Ejemplo
origin = { lat: -2.189327, lng: -79.889532 };
destination = { lat: -2.14218, lng: -79.96161 };


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

    //this.directionsDisplay.setMap(this.map);
    //google.maps.event.addListenerOnce(this.map, 'idle', () => {
    //  mapEle.classList.add('show-map');
    //  this.calculateRoute();
    //});
  }

  private calculateRoute() {
    this.directionsService.route({
      origin: this.origin,
      destination: this.destination,
      travelMode: google.maps.TravelMode.DRIVING,
    }, (response, status)  => {
      if (status === google.maps.DirectionsStatus.OK) {
        this.directionsDisplay.setDirections(response);
      } else {
        alert('Could not display directions due to: ' + status);
      }
    });
    }
}
