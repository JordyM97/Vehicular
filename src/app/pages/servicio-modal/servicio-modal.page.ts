import { Component, OnInit } from '@angular/core';
import { ModalController, Platform } from '@ionic/angular';
declare var google;

interface Marker {
  position: {
    lat: number,
    lng: number,
  };
}

@Component({
  selector: 'app-servicio-modal',
  templateUrl: './servicio-modal.page.html',
  styleUrls: ['./servicio-modal.page.scss'],
})
export class ServicioModalPage implements OnInit {

  //Marcadores de inicio y fin
  puntoInicio;
  puntoFin;

  //Listeners de eventos en Mapa
  listenerInicio;
  listenerFin;

  //Datos quemados para el select list
  servicios: any[]=[];
  vehiculos: any[]=[];
  servicioSeleccionado: any;
  vehiculoSeleccionado: any;

  //Mapa
  map: any;

  //Pruebas para calcular ruta
  directionsService = new google.maps.DirectionsService();
  directionsDisplay = new google.maps.DirectionsRenderer();

  // Ejemplo
  origin = { lat: -2.189327, lng: -79.889532 };
  destination = { lat: -2.14218, lng: -79.96161 };

  //Capturar ubicaciones de markers
  latLngInicial: any;
  latLngFinal: any;

  constructor(
    private modalCtlr: ModalController,
    private platform: Platform
    ){ 
      this.servicios = [{id: 1, tipoServicio:'Viaje ahora'},{id:2, tipoServicio:'Reservar viaje'}]
      this.vehiculos = [{id: 1, tipoVehiculo:'Vehiculo'},{id: 2, tipoVehiculo:'Tricimoto'}]
    }

  ngOnInit() {
    this.loadMap()
  }

  //Informacion seleccionada de los boxs
  servicioSeleccion(event){
    this.servicioSeleccionado = event.target.value;
  }

  vehiculoSeleccion(event){
    this.vehiculoSeleccionado = event.target.value;
  }

  salirConInformacion(){
    this.modalCtlr.dismiss({
      servicio: this.servicioSeleccionado,
      vehiculo: this.vehiculoSeleccionado,
      ubicacionInicial: this.latLngInicial,
      ubicacionFinal: this.latLngFinal
    });
  }

  loadMap() {
    //Crear nuevo mapa
    const mapEle: HTMLElement = document.getElementById('map');
    // Crear el mapa y renderizarlo
    this.map = new google.maps.Map(mapEle, {
      center: {lat: -2.189327, lng: -79.889532},
      zoom: 15
    });

    this.directionsDisplay.setMap(this.map);

    //Agregar punto de Inicial, aun en reparaciones
    this.listenerInicio = google.maps.event.addListener(this.map, 'click', (event) => {
      //mapEle.classList.add('show-map');
      this.latLngInicial = event.latLng.toString();
      console.log("Inicio:"+this.latLngInicial);
      this.addMarker(event.latLng);
    });

    //Experimento para capturar la ruta más corta (falta tener al API habilitada)
    google.maps.event.addListenerOnce(this.map, 'idle', () => {
      mapEle.classList.add('show-map');
      this.calculateRoute();
    });

  }

  //No le pares bola, que es como trazar ruta, pero no funca por la API
  calculateRoute() {
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

    //Cuando acepta el punto inicial, empieza a elegir el final, falta consolidar los puntos
    seleccionarFin(){
      google.maps.event.removeListener(this.listenerInicio);
      google.maps.event.addListener(this.map, 'click', (event) => {
        //mapEle.classList.add('show-map');
        this.latLngFinal = event.latLng.toString();
        console.log("Fin:"+this.latLngFinal);
        this.addMarkerF(event.latLng);
      });
    }

    //Agregar Marcador de inicio
    addMarker(marker: Marker) {
      if (this.puntoInicio) {
        this.puntoInicio.setPosition(marker);
      } else {
        this.puntoInicio = new google.maps.Marker({
          position: marker.position,
          map: this.map
        });
        this.puntoInicio.setPosition(marker);
      }
    }

    //Agregar Marcador de fin
    addMarkerF(marker: Marker) {
      if (this.puntoFin) {
        this.puntoFin.setPosition(marker);
      } else {
        this.puntoFin = new google.maps.Marker({
          position: marker.position,
          map: this.map
        });
        this.puntoFin.setPosition(marker);
      }
    }
}
