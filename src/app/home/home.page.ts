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
  autocomplete: { input: string; };
  autocomplete2: { input: string;};
  autocompleteItems: any[];
  autocompleteItems2: any[];
  location: any;
  placeid: any;
  GoogleAutocomplete: any;
  geocoder: any;
  pagos: any[]=[];
  startMarker: any;
  EndMarker: any;


  directionsService : any;
  directionsDisplay : any;
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
    this.directionsService = new google.maps.DirectionsService();
    
    
    this.geolocation.getCurrentPosition().then((resp) => {
      let latLng = new google.maps.LatLng(resp.coords.latitude, resp.coords.longitude);
      let mapOptions = {
        center: latLng,
        zoom: 18,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      } 
      this.getAddressFromCoords(resp.coords.latitude, resp.coords.longitude); 
      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions); 
      this.directionsDisplay = new google.maps.DirectionsRenderer({map: this.map});
      this.map.addListener('tilesloaded', () => {
        //console.log('accuracy',this.map, this.map.center.lat());
        this.getAddressFromCoords(this.map.center.lat(), this.map.center.lng())
        this.lat = this.map.center.lat()
        this.long = this.map.center.lng()
      }); 
      this.geocoder = new google.maps.Geocoder();
      this.startMarker= new google.maps.Marker({
        map: this.map,
        draggable: true,
        position: latLng,
        title:"Inicio"
      });
      this.startMarker.addListener('dragend',()=>{
        this.startMarker.setPosition(this.startMarker.getPosition());
      });
      this.EndMarker = new google.maps.Marker({
        map: this.map,
        draggable: true,
      });
      this.EndMarker.addListener('dragend',()=>{
        this.EndMarker.setPosition(this.EndMarker.getPosition());
      });
      this.directionsDisplay.setMap(this.map);
      

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
    
          this.ClearAutocomplete();
          if(number==1){ 
            this.startMarker.setTitle(results[0].formatted_address);
            this.startMarker.setPosition(results[0].geometry.location);
            this.origin.lat=this.startMarker.getPosition().lat();
            this.origin.lng=this.startMarker.getPosition().lng();
          }
          else{ 
            this.EndMarker.setTitle(results[0].formatted_address);
            this.EndMarker.setPosition(results[0].geometry.location);
            this.destination.lat=this.EndMarker.getPosition().lat();
            this.destination.lat=this.EndMarker.getPosition().lng();
          }
        } else {
          window.alert("No results found");
        }
      } else {
        window.alert("Geocoder failed due to: " + status);
      }
     
      console.log("Inicio:"+this.startMarker.getPosition().toString()+" Fin:"+this.EndMarker.getPosition().toString());
    });
  }
  GoTo(){

    //this.getAddressFromCoords()
    //return window.location.href = 'https://www.google.com/maps/search/?api=1&query=Google&query_place_id='+this.placeid;
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

  async calculateRoute() {
    
    this.directionsDisplay.setMap(this.map);
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
          width: 2
        });
        this.map.moveCamera({target: points});
      
    });
    }
    calculateRoute2() {
      
      var request={
        origin: this.startMarker.getPosition(),
        destination: this.EndMarker.getPosition(),
        travelMode: 'DRIVING'
      }
      this.directionsService.route(request, function(result, status) {
        if (status == 'OK') {
          this.directionsDisplay.setDirections(result);
        }
        
      });
     
      }
}
