import { Component, OnInit,NgZone } from '@angular/core';
import { ViewChild, ElementRef } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder, NativeGeocoderResult , NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';

import { Platform, PopoverController } from '@ionic/angular';
import { AceptarParametrosComponent } from '../components/aceptar-parametros/aceptar-parametros.component';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { PopoverComponent } from '../components/popover/popover.component';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';


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
  public vehiculos = [
    { id: 1, tipoCarro: 'Carro', isChecked: false },    { id: 2, tipoCarro: 'Camioneta', isChecked: false },    { id: 3, tipoCarro: 'Plataforma', isChecked: false },
    { id: 4, tipoCarro: 'Camión', isChecked: false },    { id: 5, tipoCarro: 'Furgón', isChecked: false },    { id: 6, tipoCarro: 'Remolque', isChecked: false }
  ];

  public tipoPago = [
    { id: 1, tipoPago: 'Tarjeta de Débito' , isChecked: false },    { id: 2, tipoPago: 'Tarjeta de Crédito', isChecked: false }
  ];

  public tipoServicio = [
    { id: 1, tipoServicio: 'Viajar ahora', isChecked: false },    { id: 2, tipoServicio: 'Reservar viaje', isChecked: false }
  ];
  map: any;
  addressInicial:string;
  addressFinal:string;
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
  servicios:any[];
  vehiculoSeleccionado: any;
  pagoSeleccionado: any;
  servicioSeleccionado: any;
  startMarker: any;
  EndMarker: any;

  resultInit: string;
  resultFini: string;
  //Capturar ubicaciones de markers
  latLngInicial: any;
  latLngFinal: any;

  //Listeners
  listenerInicio: any;
  listenerFin: any;
  listenerMoverInicio: any;
  listenerMoverFin: any;


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
  posicionInicial: any;
  Servicios: Observable<any[]>;
  constructor(
    private geolocation: Geolocation,private nativeGeocoder: NativeGeocoder, public zone: NgZone, public popovercontroller: PopoverController,
    public db: AngularFireDatabase,                       // no se si borrar todavia
    firestore: AngularFirestore,                           // conector a firestore
    public platform: Platform,
    public router: Router,
    public authService: AuthService
  ) {
    this.platform.backButton.subscribeWithPriority(10, () => {
      this.router.navigateByUrl('Home')
    });
   
    //GEt colllection from firestore                                                    //FIRESTORE
    this.Servicios = firestore.collection('Pruebas').valueChanges();
    this.Servicios.subscribe(value =>{console.log(value)});


    this.GoogleAutocomplete = new google.maps.places.AutocompleteService();
    this.autocomplete = { input: '' };
    this.autocomplete2 = { input: '' };
    this.autocompleteItems = [];
    this.autocompleteItems2 = [];
    this.geocoder = new google.maps.Geocoder();
  }
  async PopOverConductorEncontrado(){
    const popover= await this.popovercontroller.create({
      component: PopoverComponent,
      translucent: true,      cssClass: 'contact-popover',
      componentProps:{
        info: {
          locatini: this.latLngInicial,
          locatfin: this.latLngFinal,
          metodo: this.pagoSeleccionado,
          price: 4.23 
        }
      }
    }); 
    return await popover.present();
  }

  async aceptarParametros(){
    var date = new Date();
    var anio = date.getFullYear(); 
    var mes = String(date.getMonth() + 1).padStart(2, '0');
    var dia = String(date.getDate()).padStart(2, '0');
    var hora = String(date.getHours());
    var minuto =String(date.getMinutes());
    var segundo = String(date.getSeconds());
    const popover= await this.popovercontroller.create({
      component: AceptarParametrosComponent,
      translucent: true,
      cssClass: 'contact-popover',
      componentProps:{
        info: {
          ClientService: null,
          DriverService: null,
          startidLocation: JSON.stringify(this.latLngInicial),
          endidLocation: JSON.stringify(this.latLngFinal),
          startAddress: this.addressInicial,
          endAddress: this.addressFinal,
          idPaymentService: this.pagoSeleccionado,
          idTypeService: this.servicioSeleccionado,
          driverScore: 5,
          clientScore: 5,
          startDate: date,
          endDate: date,
          isReservationService: false,
          stateService: null,
          vehiculo: this.vehiculoSeleccionado,
          total: 4.23,
          anio: anio,
          mes: mes,
          dia: dia,
          hora: hora,
          minuto: minuto
        }
      }
    }); 
    return await popover.present();
    
  }

  pagoSeleccion(event){
    this.pagoSeleccionado = event.target.value;
  }
  servicioSeleccion(event){
    this.servicioSeleccionado = event.target.value;
  }
  ngOnInit(){
    this.loadMap();
    
  }
  
  async loadMap() {  
    const rta = await this.geolocation.getCurrentPosition();
    const myLatLng = {
      lat: rta.coords.latitude,
      lng: rta.coords.longitude
    };
    this.posicionInicial=myLatLng;

    var styledMapType = new google.maps.StyledMapType(
    [
        {
          "featureType": "administrative",          "elementType": "geometry",          "stylers": [            {
              "visibility": "off"            }          ]        },{          "featureType": "administrative.land_parcel",
          "elementType": "labels.text",          "stylers": [            {
              "visibility": "on"
            }
          ]
        },
        {
          "featureType": "administrative.neighborhood",
          "stylers": [
            {
              "visibility": "off"
            }
          ]
        },
        {
          "featureType": "poi",
          "stylers": [
            {
              "visibility": "off"
            }
          ]
        },
        {
          "featureType": "road",
          "elementType": "labels.icon",
          "stylers": [
            {
              "visibility": "off"
            }
          ]
        },
        {
          "featureType": "transit",
          "stylers": [
            {
              "visibility": "off"
            }
          ]
        },
        {
          "featureType": "transit.line",
          "elementType": "labels.text",
          "stylers": [
            {
              "visibility": "on"
            }
          ]
        }
    ],
    {name: 'Styled Map'});
    //Crear nuevo mapa
    const mapEle: HTMLElement = document.getElementById('map');
    // Crear el mapa y renderizarlo
    this.map = new google.maps.Map(mapEle, {
      center: myLatLng,
      zoom: 15,
      zoomControl:false,
      mapTypeControl:false,
      streetViewControl:false,
      fullscreenControl:false,
      mapTypeControlOptions: {
        mapTypeIds: ['styled_map']
      }
    });
    this.map.mapTypes.set('styled_map', styledMapType);
    this.map.setMapTypeId('styled_map');
    //Agregar marcador de ubicación actual
    this.map.mapTypes.set('styled_map', styledMapType);
    this.map.setMapTypeId('styled_map');
    this.latLngInicial = {lat: rta.coords.latitude, lng: rta.coords.longitude}
    console.log(this.latLngInicial);
    this.geocodeLatLng(this.latLngInicial.lat,this.latLngInicial.lng,1);
    this.addMarker(this.latLngInicial)

    this.directionsDisplay.setMap(this.map);
    this.directionsDisplay.setOptions( { suppressMarkers: true } );
    this.authService.Historial();
    

    this.listenerDrag();
  }

  //Elegir punto inicial
  seleccionarInicio(){
    this.puntoInicio.setOptions({draggable: true});
    var menuOp = document.getElementById("menuOp");
    var botonAceptar = document.getElementById("aceptarPuntos");
    menuOp.style.display="none";
    botonAceptar.style.display="block";
    this.listenerInicio = google.maps.event.addListener(this.map, 'click' , (event) => {
      //mapEle.classList.add('show-map');
      this.latLngInicial = {lat: event.latLng.lat(), lng: event.latLng.lng()}; //Necesito string para almacenar en bd
      this.geocodeLatLng(this.latLngInicial.lat,this.latLngInicial.lng,1);
      console.log(this.latLngInicial);
      this.addMarker(event.latLng);
    });
    this.listenerDrag();
  }
  
  //Elegir punto final
  seleccionarFin(){
    this.puntoInicio.setOptions({draggable: false});
    var menuOp = document.getElementById("menuOp");
    var botonAceptar = document.getElementById("aceptarPuntos");
    menuOp.style.display="none";
    botonAceptar.style.display="block";
    if(this.puntoFin){
      this.puntoFin.setOptions({draggable: true});
      google.maps.event.removeListener(this.listenerMoverFin);
      this.listenerDragF();
    }
    this.listenerFin = google.maps.event.addListener(this.map, 'click', (event) => {
      //mapEle.classList.add('show-map');
      this.latLngFinal = {lat: event.latLng.lat(), lng: event.latLng.lng()}; //Necesito string para almacenar en bd
      this.geocodeLatLng(this.latLngFinal.lat,this.latLngFinal.lng,0);
      console.log(this.latLngFinal);
      this.addMarkerF(event.latLng);
      google.maps.event.removeListener(this.listenerMoverFin);
      this.listenerDragF();
    });
  }

  //Agregar Marcador de inicio
  addMarker(marker: Marker) {
    if (this.puntoInicio) {
      this.puntoInicio.setPosition(marker);
    } else {
      this.puntoInicio = new google.maps.Marker({
        position: marker.position,
        map: this.map,
        icon: 'assets/icon/pin.png',
        draggable: true
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
        map: this.map,
        icon: 'assets/icon/pin.png',
        draggable: true
      });
      this.puntoFin.setPosition(marker);
    }
  }

  listenerDrag(){
    this.listenerMoverInicio = google.maps.event.addListener(this.puntoInicio, 'dragend', (evt) => {
      this.latLngInicial = {lat: evt.latLng.lat(), lng: evt.latLng.lng()}
      console.log(this.latLngInicial);
      this.geocodeLatLng(this.latLngInicial.lat,this.latLngInicial.lng,1);
      /*console.log(evt.latLng.lat().toFixed(6));
      console.log(evt.latLng.lng().toFixed(6))*/
      //this.map.panTo(evt.latLng);
    });
  }

  listenerDragF(){
    this.listenerMoverFin = google.maps.event.addListener(this.puntoFin, 'dragend', (evt) => {
      this.latLngFinal = {lat: evt.latLng.lat(), lng: evt.latLng.lng()}
      console.log(this.latLngFinal);
      this.geocodeLatLng(this.latLngFinal.lat,this.latLngFinal.lng,0);
     
    });
  }

  //Permite trazar la ruta una vez que haya elegido los puntos iniciales y finales
  calcularRuta(){
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
    this.googleAutocomplete.getPlacePredictions({ input: this.searchInit, location: new google.maps.LatLng(this.posicionInicial), radius: 50000}, predictions => {
      this.searchResultsInit = predictions;
    });
  }

  //Con el resultado que elijamos, se agrega el marcador
  SelectSearchResultInit(item) {
    this.resultInit = item.description;
    this.placeid = item.place_id;
    this.getplaceByIdInit(this.placeid);
    this.ClearAutocomplete();
    
  }

  getplaceByIdInit(placeId){
    this.puntoInicio.setOptions({draggable: true});
    var menuOp = document.getElementById("menuOp");
    var botonAceptar = document.getElementById("aceptarPuntos");
    menuOp.style.display="none";
    botonAceptar.style.display="block";
    this.geocoder.geocode({ placeId: placeId}, (results, status) => {
      if (status === "OK") {
          console.log(results[0]);
          //console.log(results[0].geometry.viewport.Za.j);
          this.latLngInicial = {lat: results[0].geometry.location.lat(), lng: results[0].geometry.location.lng()}
          this.map.setCenter(this.latLngInicial) //Centrar mapa en inicio
          this.geocodeLatLng(this.latLngInicial.lat,this.latLngInicial.lng,1);
          console.log(this.latLngInicial);
          this.addMarker(this.latLngInicial);
          this.listenerDrag(); //Listener para el dragg
          
      } else {
        window.alert("Geocoder failed due to: " + status);
      }
    });
  }

  //Ver resultados de busqueda final
  searchChangedEnd(){
    if(!this.searchEnd.trim().length) return;
    this.googleAutocomplete.getPlacePredictions({ input: this.searchEnd, location: new google.maps.LatLng(this.posicionInicial), radius: 50000}, predictions => {
      this.searchResultsEnd = predictions;
    });
  }

  //Con el resultado que elijamos, se agrega el marcador
  SelectSearchResultEnd(item) {     
    this.resultFini=item.description;
    this.placeid = item.place_id;
    this.getplaceByIdEnd(this.placeid);
    this.ClearAutocomplete();
    
  }

  getplaceByIdEnd(placeId){
    if(this.puntoFin){ //En caso que ya exista un punto final
      this.puntoFin.setOptions({draggable: true});
    }
    var menuOp = document.getElementById("menuOp");
    var botonAceptar = document.getElementById("aceptarPuntos");
    menuOp.style.display="none";
    botonAceptar.style.display="block";
    this.geocoder.geocode({ placeId: placeId}, (results, status) => {
      if (status === "OK") {
          console.log(results[0]);
          this.latLngFinal = {lat: results[0].geometry.location.lat(), lng: results[0].geometry.location.lng()}
          this.map.setCenter(this.latLngFinal) //Centrar mapa en destino
          this.geocodeLatLng(this.latLngFinal.lat,this.latLngFinal.lng,0);
          console.log(this.latLngFinal);
          this.addMarkerF(this.latLngFinal);
          this.listenerDragF(); //Listener para el dragg
          
      } else {
        window.alert("Geocoder failed due to: " + status);
      }
    });
  }

  ClearAutocomplete(){
    this.searchResultsEnd = []
   
    this.searchResultsInit =[]
    
  }

  //Seleccionar un tipo de transporte
  SelectTransport(item){
    if(item.isChecked==true){
      item.isChecked=true;
    }else{
      this.vehiculos.forEach(function (vehiculos) {
        vehiculos.isChecked=false;
    });
      item.isChecked=true;
      this.vehiculoSeleccionado=item.tipoCarro;
      console.log(this.vehiculoSeleccionado);
    }
  }

  //Seleccionar un tipo de servicio
  SelectService(item){
    if(item.isChecked==true){
      item.isChecked=true;
    }else{
      this.tipoServicio.forEach(function (tipoServicio) {
        tipoServicio.isChecked=false;
    });
      item.isChecked=true;
      this.servicioSeleccionado=item.tipoServicio;
      console.log(this.servicioSeleccionado);
    }
  }

  //Seleccionar un de pago
  SelectPayment(item){
    if(item.isChecked==true){
      item.isChecked=true;
    }else{
      this.tipoPago.forEach(function (tipoPago) {
        tipoPago.isChecked=false;
    });
      item.isChecked=true;
      this.pagoSeleccionado=item.tipoPago;
      console.log(this.pagoSeleccionado);
    }
  }

  aceptarBoton(){
    if(this.vehiculoSeleccionado==null || this.servicioSeleccionado==null || this.servicioSeleccionado==null || this.latLngInicial==null ||this.latLngFinal==null){
      console.log("Por favor elija todas las opciones");
    }else{
      this.aceptarParametros();
    }
  }

  aceptarPuntos(){
    var menuOp = document.getElementById("menuOp");
    var aceptarPuntos = document.getElementById("aceptarPuntos");
    menuOp.style.display="block";
    aceptarPuntos.style.display="none";
    google.maps.event.removeListener(this.listenerMoverInicio);
    google.maps.event.removeListener(this.listenerInicio);
    google.maps.event.removeListener(this.listenerMoverFin);
    google.maps.event.removeListener(this.listenerFin);
    this.puntoInicio.setOptions({draggable: false});
    if(this.puntoFin){
      this.puntoFin.setOptions({draggable: false});
    }
  }

  ocultarOpciones() {
    var parametros = document.getElementById("parametrosViaje");
    var opconesBuscar = document.getElementById("opcionesBuscar");
    var menuOp = document.getElementById("menuOp");
    var elegirPuntos = document.getElementById("OOI");
    var aceptarPuntos = document.getElementById("MOI");
    var aceptarParametros = document.getElementById("aceptar");
    parametros.style.display="none";
    opconesBuscar.style.display="block";
    elegirPuntos.style.display="none";
    aceptarParametros.style.display="none";
    aceptarPuntos.style.display="block";
    menuOp.style.height="100%";
    if(this.listenerMoverInicio){
      google.maps.event.removeListener(this.listenerMoverInicio);
    }
  }

  mostrarOpciones() {
    var parametros = document.getElementById("parametrosViaje");
    var opconesBuscar = document.getElementById("opcionesBuscar");
    var menuOp = document.getElementById("menuOp");
    var elegirPuntos = document.getElementById("OOI");
    var aceptarPuntos = document.getElementById("MOI");
    var aceptarParametros = document.getElementById("aceptar");
    parametros.style.display="block";
    opconesBuscar.style.display="none";
    elegirPuntos.style.display="block";
    aceptarParametros.style.display="block";
    aceptarPuntos.style.display="none";
    menuOp.style.height="60%";
    google.maps.event.removeListener(this.listenerInicio);
    google.maps.event.removeListener(this.listenerFin);
    google.maps.event.removeListener(this.listenerMoverInicio);
    google.maps.event.removeListener(this.listenerMoverFin);
    this.calcularRuta();
  }

  geocodeLatLng(latitude,longitude,identificador) {
    const latlng = {
      lat: parseFloat(latitude),
      lng: parseFloat(longitude)
    };
    this.geocoder.geocode({ location: latlng },
      (results,status) => {
        if (status === "OK") {
          if (results[0]) {
            if(identificador==1){
              this.addressInicial = results[0].formatted_address;
            }else{
              this.addressFinal = results[0].formatted_address;
            }
            console.log(results[0].formatted_address);
            
          } else {
            window.alert("No results found");
          }
        } else {
          window.alert("Geocoder failed due to: " + status);
        }
      }
    );
  }

 
}
