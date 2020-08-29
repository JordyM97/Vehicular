import { Component, OnInit,NgZone } from '@angular/core';
import { ViewChild, ElementRef } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder, NativeGeocoderResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';

declare var google;

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
  destlat: string;
  destlong : string;
  autocomplete: { input: string; };
  autocomplete2: { input: string;};
  autocompleteItems: any[];
  autocompleteItems2: any[];
  location: any;
  placeid: any;
  GoogleAutocomplete: any;
  geocoder: any;
  pagos: any[]=[];
  directionsService = new google.maps.DirectionsService();
  directionsDisplay = new google.maps.DirectionsRenderer();
// Ejemplo
  origin = { lat: -2.189327, lng: -79.889532 };
  destination = { lat: -2.14218, lng: -79.96161 };
  

  constructor(
    private geolocation: Geolocation,
    private nativeGeocoder: NativeGeocoder,    
    public zone: NgZone,
  ) {
    this.GoogleAutocomplete = new google.maps.places.AutocompleteService();
    this.autocomplete = { input: '' };
    this.autocomplete2 = { input: '' };
    this.autocompleteItems = [];
    this.autocompleteItems2 = [];
    this.pagos = [{id: 1, tipoPago:'Efectivo'},{id:2, tipoPago:'MasterCard XXX92'}]
    
  }
  pagoSeleccion(event){
    this.pagos = event.target.value;
  }
  ngOnInit(){
    this.loadMap()
  }
  loadMap() {
    
    this.geolocation.getCurrentPosition().then((resp) => {
      let latLng = new google.maps.LatLng(resp.coords.latitude, resp.coords.longitude);
      let mapOptions = {
        center: latLng,
        zoom: 18,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      } 
      this.getAddressFromCoords(resp.coords.latitude, resp.coords.longitude); 
      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions); 
      this.map.addListener('tilesloaded', () => {
        console.log('accuracy',this.map, this.map.center.lat());
        this.getAddressFromCoords(this.map.center.lat(), this.map.center.lng())
        this.lat = this.map.center.lat()
        this.long = this.map.center.lng()
      }); 
      this.geocoder = new google.maps.Geocoder();

    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }
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
  ShowCords(){
    console.log(
    this.map.center.lat(),this.map.center.lng());
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
  SelectSearchResult(item, number) {     
    this.placeid = item.place_id;
    this.getplaceById(this.placeid,this.map,number);
    
  }
  ClearAutocomplete(){
    this.autocompleteItems = []
    this.autocomplete.input = ''
    this.autocompleteItems2 =[]
    this.autocomplete2.input = ''
  }
  getplaceById(placeId, map,number){
    console.log(number);
    
    this.geocoder.geocode({ placeId: placeId}, (results, status) => {
      if (status === "OK") {
        if (results[0]) {
          map.setZoom(16);
          map.setCenter(results[0].geometry.location);
          const marker = new google.maps.Marker({
            map,
            position: results[0].geometry.location
          });
          console.log("Marcador puesto:",marker.getPosition().toString());
          console.log(results[0].formatted_address);
          this.ClearAutocomplete();
          if(number==1){ this.lat=marker.getPosition().lat(); this.long=marker.getPosition().lng();
            this.origin.lat=marker.getPosition().lat();
            this.origin.lng=marker.getPosition().lng();
          }
          else{ this.destlat=marker.getPosition().lat(); this.destlong=marker.getPosition().lng();
            this.destination.lat=marker.getPosition().lat();
            this.destination.lat=marker.getPosition().lng();
          }
        } else {
          window.alert("No results found");
        }
      } else {
        window.alert("Geocoder failed due to: " + status);
      }
     
      console.log("Inicio:"+this.lat+","+this.long+" Fin:"+this.destlat+","+this.destlong);
    });
  }
  GoTo(){

    //this.getAddressFromCoords()
    //return window.location.href = 'https://www.google.com/maps/search/?api=1&query=Google&query_place_id='+this.placeid;
  }
  showInfo(){
    this.calculateRoute();
  }
  loadMap2() {
    //Crear nuevo mapa
    const mapEle: HTMLElement = document.getElementById('map');
    // Crear el mapa y renderizarlo
    this.map = new google.maps.Map(mapEle, {
      center: {lat: -2.189327, lng: -79.889532},
      zoom: 30
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
