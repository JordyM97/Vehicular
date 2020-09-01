import { Component, OnInit,NgZone } from '@angular/core';
import { ViewChild, ElementRef } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder, NativeGeocoderResult , NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';

import { PopoverController } from '@ionic/angular';
import { PopoverComponent } from '../popover/popover.component';

declare var google;

interface Marker {
  position: {
    lat: number,
    lng: number,
  };
}

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  @ViewChild('map',  {static: false}) mapElement: ElementRef;
  map: any;
  address:string;
  lat: string;
  long: string; 
  autocomplete: { input: string; };
  autocomplete2: { input: string;};
  autocompleteItems: any[];
  autocompleteItems2: any[];
  location: any;
  placeid: any;
  GoogleAutocomplete: any;
  geocoder: any;
  pagos: any[];
  pagoSeleccionado: any;
  startMarker: any;
  EndMarker: any;

  //Capturar ubicaciones de markers
  latLngInicial: any;
  latLngFinal: any;

  listenerInicio: any;
  listenerFin: any;


  directionsService = new google.maps.DirectionsService();
  directionsDisplay = new google.maps.DirectionsRenderer();

  //Marcadores de inicio y fin
  puntoInicio;
  puntoFin;

  
  googleAutocomplete = new google.maps.places.AutocompleteService();
  searchInit: string = " ";
  searchResultsInit = Array<any>();
  searchEnd: string = " ";
  searchResultsEnd = Array<any>();

  constructor(
    private geolocation: Geolocation,    
    private nativeGeocoder: NativeGeocoder,    
    public zone: NgZone,
    public popovercontroller: PopoverController
  ) {
    this.GoogleAutocomplete = new google.maps.places.AutocompleteService();
    this.autocomplete = { input: '' };
    this.autocomplete2 = { input: '' };
    this.autocompleteItems = [];
    this.autocompleteItems2 = [];
    this.pagos = [{id: 1, tipoPago:'Efectivo'},{id:2, tipoPago:'MasterCard XXX92'}]
    this.geocoder = new google.maps.Geocoder();
  }
  async conductorEncontrado(ev: any){
    const popover= await this.popovercontroller.create({
      component: PopoverComponent,
      event: ev,
      translucent: true,
      cssClass: 'contact-popover',
      
    }); 
    return await popover.present();

  }
  pagoSeleccion(event){
    this.pagoSeleccionado = event.target.value;
  }
  ngOnInit(){
    this.loadMap()
  }
  
  async loadMap() {       
    const rta = await this.geolocation.getCurrentPosition();
    const myLatLng = {
      lat: rta.coords.latitude,
      lng: rta.coords.longitude
    };
    //Crear nuevo mapa
    const mapEle: HTMLElement = document.getElementById('map');
    // Crear el mapa y renderizarlo
    this.map = new google.maps.Map(mapEle, {
      center: myLatLng,
      zoom: 15
    });

    //Agregar marcador de ubicación actual
    this.latLngInicial = {lat: rta.coords.latitude, lng: rta.coords.longitude}
    this.addMarker(this.latLngInicial)

    this.directionsDisplay.setMap(this.map);
  }

  //Elegir punto inicial GG
  seleccionarInicio(){
    google.maps.event.removeListener(this.listenerFin);
    google.maps.event.removeListener(this.listenerInicio);
    this.listenerInicio = google.maps.event.addListener(this.map, 'click', (event) => {
      //mapEle.classList.add('show-map');
      this.latLngInicial = event.latLng; //Necesito string para almacenar en bd
      console.log("Inicio:"+this.latLngInicial);
      this.addMarker(event.latLng);
    });
  }

  //Elegir punto final
  seleccionarFin(){
    google.maps.event.removeListener(this.listenerInicio);
    google.maps.event.removeListener(this.listenerFin);
    this.listenerFin = google.maps.event.addListener(this.map, 'click', (event) => {
      //mapEle.classList.add('show-map');
      this.latLngFinal = event.latLng; //Necesito string para almacenar en bd
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

  //Permite trazar la ruta una vez que haya elegido los puntos iniciales y finales
  calcularRuta(){
    this.puntoFin.setPosition();
    this.puntoInicio.setPosition();
    this.directionsService.route({
      origin: this.latLngInicial,
      destination: this.latLngFinal,
      travelMode: google.maps.TravelMode.DRIVING,
    }, (response, status)  => {
      if (status === google.maps.DirectionsStatus.OK) {
        this.directionsDisplay.setDirections(response);
      } else {
        alert('Could not display directions due to: ' + status);
      }
    });
  }

  //Ver resultados de busqueda inicial
  searchChangedInit(){
    if(!this.searchInit.trim().length) return;
    this.googleAutocomplete.getPlacePredictions({ input: this.searchInit}, predictions => {
      this.searchResultsInit = predictions;
    });
  }

  //Con el resultado que elijamos, se agrega el marcador
  SelectSearchResultInit(item) {     
    this.placeid = item.place_id;
    this.getplaceByIdInit(this.placeid);
    
  }

  getplaceByIdInit(placeId){
    this.geocoder.geocode({ placeId: placeId}, (results, status) => {
      if (status === "OK") {
          //console.log(results[0].geometry.viewport.Va.i);
          //console.log(results[0].geometry.viewport.Za.j);
          this.latLngInicial = {lat: results[0].geometry.viewport.Za.j, lng: results[0].geometry.viewport.Va.i}
          this.map.setCenter(this.latLngInicial) //Centrar mapa en destino
          console.log(this.latLngInicial);
          this.addMarker(this.latLngInicial);
          
      } else {
        window.alert("Geocoder failed due to: " + status);
      }
    });
  }

  //Ver resultados de busqueda final
  searchChangedEnd(){
    if(!this.searchEnd.trim().length) return;
    this.googleAutocomplete.getPlacePredictions({ input: this.searchEnd}, predictions => {
      this.searchResultsEnd = predictions;
    });
  }

  //Con el resultado que elijamos, se agrega el marcador
  SelectSearchResultEnd(item) {     
    this.placeid = item.place_id;
    this.getplaceByIdEnd(this.placeid);
    
  }

  getplaceByIdEnd(placeId){
    this.geocoder.geocode({ placeId: placeId}, (results, status) => {
      if (status === "OK") {
          //console.log(results[0].geometry.viewport.Va.i);
          //console.log(results[0].geometry.viewport.Za.j);
          this.latLngFinal = {lat: results[0].geometry.viewport.Za.j, lng: results[0].geometry.viewport.Va.i}
          this.map.setCenter(this.latLngFinal) //Centrar mapa en destino
          console.log(this.latLngFinal);
          this.addMarkerF(this.latLngFinal);
          
      } else {
        window.alert("Geocoder failed due to: " + status);
      }
    });
  }

  ClearAutocomplete(){
    this.searchResultsEnd = []
    this.searchEnd = ''
    this.searchResultsInit =[]
    this.searchInit = ''
  }


  /*
  getAddressFromCoords(lattitude, longitude) {
    console.log("getAddressFromCoords "+lattitude+" "+longitude);
    let options: NativeGeocoderOptions = {
      useLocale: true,
      maxResults: 5    
    }; 
    this.nativeGeocoder.reverseGeocode(lattitude, longitude, options)
      .then((result: NativeGeocoderResult[]) => {
        this.address = "";
        let responseAddress = [];
        for (let [key, value] of Object.entries(result[0])) {
          if(value.length>0)
          responseAddress.push(value); 
        }
        responseAddress.reverse();
        for (let value of responseAddress) {
          this.address += value+", ";
        }
        this.address = this.address.slice(0, -2);
      })
      .catch((error: any) =>{ 
        this.address = "Address Not Available!";
      }); 
  }
  
  UpdateSearchResults(){
    if (this.autocomplete.input == '') {
      this.autocompleteItems = [];
      return;
    }
    this.GoogleAutocomplete.getPlacePredictions({ input: this.autocomplete.input },
    (predictions, status) => {
      this.autocompleteItems = [];
      this.zone.run(() => {
                predictions.forEach((prediction) => {
          this.autocompleteItems.push(prediction);
          
        });
      });
    });
  }
  UpdateSearchResults2(){
    if (this.autocomplete2.input == '') {
      this.autocompleteItems2 = [];
      return;
    }
    this.GoogleAutocomplete.getPlacePredictions({ input: this.autocomplete2.input },
    (predictions, status) => {
      this.autocompleteItems2 = [];
      this.zone.run(() => {
                predictions.forEach((prediction) => {
          this.autocompleteItems2.push(prediction);
          
        });
      });
    });
  }

  SelectSearchResult(item) {     
    this.placeid = item.place_id;
    this.getplaceById(this.placeid);
    
  }
  
  ClearAutocomplete(){
    this.autocompleteItems = []
    this.autocomplete.input = ''
    this.autocompleteItems2 =[]
    this.autocomplete2.input = ''
  }
  getplaceById(placeId){
    this.geocoder.geocode({ placeId: placeId}, (results, status) => {
      if (status === "OK") {
          console.log(results[0].geometry.location)
      } else {
        window.alert("Geocoder failed due to: " + status);
      }
     
      console.log("Inicio:"+this.startMarker.getPosition()+" Fin:"+this.EndMarker.getPosition());
    });
  }
  


  async calculateRoute() {
    
    
    this.directionsService.route({
      origin: this.startMarker.getPosition(),
      destination: this.EndMarker.getPosition(),
      travelMode: google.maps.TravelMode.DRIVING,
    },async response  => {
      
        console.log(response);
        const points = new Array<any>();
        const routes= response.routes[0].overview_path;
        for (let i = 0; i < routes.length; i++) {
          points[i]={
            lat:routes[i].lat(),
            lng:routes[i].lng(),
          }
        }
        await this.map.addPolyline({
          points: points,
          color: '#000',
          width: 4,
        });
        this.map.moveCamera({target: points});
      
    });
    }*/
}
