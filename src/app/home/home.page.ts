import { Component, OnInit,NgZone } from '@angular/core';
import { ViewChild, ElementRef } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder } from '@ionic-native/native-geocoder/ngx';
import { IonIcon, Platform, PopoverController, ToastController } from '@ionic/angular';
import { AceptarParametrosComponent } from '../components/aceptar-parametros/aceptar-parametros.component';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { observable, Observable } from 'rxjs';
import { PopoverComponent } from '../components/popover/popover.component';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { SelectDateComponent } from '../components/select-date/select-date.component';
import { interval } from 'rxjs';
import * as firebase from 'firebase';
declare var google;

interface Marker {
  position: {
    lat: number,
    lng: number,
  };
}

@Component({  selector: 'app-home',  templateUrl: 'home.page.html',  styleUrls: ['home.page.scss'],})

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
  public hours = [ { hora: '00', ischecked: false}]
  map: any;
  addressInicial:string;  addressFinal:string;
  marker:any; markerD:any;
  autocomplete: { input: string; };
  autocomplete2: { input: string;};
  autocompleteItems: any[];  autocompleteItems2: any[];
  placeid: any;  GoogleAutocomplete: any;  geocoder: any;
  pagos: any[];  servicios:any[];
  vehiculoSeleccionado: any;  pagoSeleccionado: any;  servicioSeleccionado: any;
  startMarker: any;  EndMarker: any;
  resultInit: string;  resultFini: string;
  latLngInicial: any;  latLngFinal: any;
  listenerInicio: any;  listenerFin: any;
  listenerMoverInicio: any;  listenerMoverFin: any;
  showList=false;
  directionsService = new google.maps.DirectionsService();  directionsDisplay = new google.maps.DirectionsRenderer();
  puntoInicio;  puntoFin;

  
  googleAutocomplete = new google.maps.places.AutocompleteService();
  searchInit: string = " "; searchEnd: string = " ";
  searchResultsInit = Array<any>();  searchResultsEnd = Array<any>();
  posicionInicial: any;
  //Servicios: Observable<any[]>;
  distanciaInicioFin: any;
  inter:any;
  now= new Date().getUTCSeconds();
  locationCollection: AngularFirestoreCollection<any>;
  location: Observable<any[]>
  constructor(
    private geolocation: Geolocation,    private nativeGeocoder: NativeGeocoder,    public zone: NgZone,
    public popovercontroller: PopoverController,    public db: AngularFireDatabase,                       // no se si borrar todavia
    public firestore: AngularFirestore,                           // conector a firestore
    public platform: Platform,    public router: Router,    public authService: AuthService,private toastController: ToastController
  ) {
    
    //GEt colllection from firestore                                            
    //this.Servicios = firestore.collection('Pruebas').valueChanges();    //this.Servicios.subscribe(value =>{console.log(value)});
    this.locationCollection=firestore.collection(`/posicion`);//.collection('hist')doc('1')

    this.location= this.locationCollection.valueChanges();
    
    this.GoogleAutocomplete = new google.maps.places.AutocompleteService();
    this.autocomplete = { input: '' };    this.autocomplete2 = { input: '' };
    this.autocompleteItems = [];    this.autocompleteItems2 = [];
    this.geocoder = new google.maps.Geocoder();
    this.authService.getUserInfo(24);
    
    
    //console.log(date);
  }
  ngOnInit(){
    this.loadMap();
    this.showTerms();
    //this.watchDriver();
  }
  watchDriver(){
    
    this.location.subscribe(value =>{
      value.forEach(user=>{
        if(user.id='31'){

          var mark={
            lat: JSON.parse(user.location).lat,
            lng: JSON.parse(user.location).lng
          }
        //console.log(mark)
        this.markerD=new google.maps.Marker({
          map: this.map ,
          icon: new google.maps.MarkerImage('https://maps.gstatic.com/mapfiles/mobile/mobileimgs2.png',
           new google.maps.Size(22, 22),
           new google.maps.Point(0, 18),
           new google.maps.Point(11, 11)),
           position: mark
        });
        }
      })
    });
  }
  async loadMap() {  
    const rta = await this.geolocation.getCurrentPosition();
    const myLatLng = {
      lat: rta.coords.latitude,
      lng: rta.coords.longitude
    };
    this.posicionInicial=myLatLng;
    this.inter=interval(5000).subscribe( v=>{
      const a=this.geolocation.watchPosition();
      a.subscribe(data=>{
        if(this.marker!=null)            this.marker.setMap(null);
        if ("coords" in data){
            let lat=data.coords.latitude;
            let lng=data.coords.longitude;
            let latLng=new google.maps.LatLng(lat,lng);
            this.marker = new google.maps.Marker({
             map: this.map ,
             icon: new google.maps.MarkerImage('https://maps.gstatic.com/mapfiles/mobile/mobileimgs2.png',
              new google.maps.Size(22, 22),
              new google.maps.Point(0, 18),
              new google.maps.Point(11, 11)),
              position: latLng      
            });
          }
          else {
            alert("ERROR AL OBTENER POSITION");
          }
        })  

        this.addPosition(this.authService.id,JSON.stringify(myLatLng))
    })
    var styledMapType = new google.maps.StyledMapType(    [      {  "featureType": "administrative",          "elementType": "geometry",          "stylers": [            {              "visibility": "off"            }          ]        },{          "featureType": "administrative.land_parcel",
      "elementType": "labels.text",          "stylers": [            {
      "visibility": "on"           }]        },        {         "featureType": "administrative.neighborhood",         "stylers": [{    "visibility": "off"        }     ]    },    { "featureType": "poi",  "stylers": [  {              "visibility": "off"            }          ]       },    {   "featureType": "road",   "elementType": "labels.icon",   "stylers": [  {        "visibility": "off"
      }          ]        },        {          "featureType": "transit",          "stylers": [            {              "visibility": "off"            }]        },    {  "featureType": "transit.line",    "elementType": "labels.text",      "stylers": [   {   "visibility": "on"           }          ]}
    ],{name: 'Styled Map'});
    
    const mapEle: HTMLElement = document.getElementById('map');
    
    this.map = new google.maps.Map(mapEle, {
      center: myLatLng,
      zoom: 15,
      zoomControl:false,      mapTypeControl:false,      streetViewControl:false,      fullscreenControl:false,
      mapTypeControlOptions: {
        mapTypeIds: ['styled_map']
      }
    });
    this.map.mapTypes.set('styled_map', styledMapType);    this.map.setMapTypeId('styled_map');
    this.latLngInicial = {lat: rta.coords.latitude, lng: rta.coords.longitude}
    this.geocodeLatLng(this.latLngInicial.lat,this.latLngInicial.lng,1);
    this.addMarker(this.latLngInicial)

    this.directionsDisplay.setMap(this.map);
    this.directionsDisplay.setOptions( { suppressMarkers: true } );
    this.authService.getRecordService();
    this.listenerDrag();
  }
  
  addPosition(id:string,location:string){
    var ref=this.firestore.doc(`posicion/${id}`);
    ref.get().subscribe(doc =>{
      if(doc.exists){
        ref.update({
            location: location ,
            id: id,
            from: this.authService.nombre,
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
          })
      }else{
        ref.set({ location: location , id:id,
          from: this.authService.nombre,
          createdAt: firebase.firestore.FieldValue.serverTimestamp() }, { merge: true });
      }
    })
     
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Hay campos vacios!',
      duration: 1700,
      position: 'top',
      color: 'danger'
      }); 
    toast.present();
  }
  showTerms(){
    if(localStorage.getItem("firstTime")=="1") this.authService.getPoliticas()
  }

  async aceptarParametros(){
    var date = new Date();
    //console.log(date);
    var anio = date.getFullYear(); 
    var mes = String(date.getMonth() + 1).padStart(2, '0');
    var dia = String(date.getDate()).padStart(2, '0');
    var hora = String(date.getHours());
    var minuto =String(date.getMinutes());
    this.distanciaInicioFin = this.distanciaInicioFin.replace(",",".")
    var distancia = parseFloat(this.distanciaInicioFin);
    //console.log(distancia);
    var precio = ((distancia * 0.4) + 1.25).toFixed(2);
    const popover= await this.popovercontroller.create({
      component: AceptarParametrosComponent,
      translucent: true,      cssClass: 'contact-popover',
      componentProps:{
        info: {
          ClientService: this.authService.getId(),
          DriverService: 26,
          startidLocation: JSON.stringify(this.latLngInicial),
          endidLocation: JSON.stringify(this.latLngFinal),
          startAddress: this.addressInicial,
          endAddress: this.addressFinal,
          idPaymentService: this.pagoSeleccionado,
          idTypeService: this.servicioSeleccionado,
          driverScore: 5,
          clientScore: 4,
          startDate: date,
          endDate: date,
          isReservationService: 0,
          stateService: 0,
          vehiculo: this.vehiculoSeleccionado,
          total: precio,
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

  pagoSeleccion(event){    this.pagoSeleccionado = event.target.value;  }
  servicioSeleccion(event){    this.servicioSeleccionado = event.target.value;  }
 
  
  

  //Elegir punto inicial
  seleccionarInicio(){
    this.puntoInicio.setOptions({draggable: true});
    var menuOp = document.getElementById("menuOp");
    var botonAceptar = document.getElementById("aceptarPuntos");
    menuOp.style.display="none";    botonAceptar.style.display="block";
    this.listenerInicio = google.maps.event.addListener(this.map, 'click' , (event) => {
      this.latLngInicial = {lat: event.latLng.lat(), lng: event.latLng.lng()}; //Necesito string para almacenar en bd
      this.geocodeLatLng(this.latLngInicial.lat,this.latLngInicial.lng,1);
      //console.log(this.latLngInicial);
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
      this.latLngFinal = {lat: event.latLng.lat(), lng: event.latLng.lng()}; //Necesito string para almacenar en bd
      this.geocodeLatLng(this.latLngFinal.lat,this.latLngFinal.lng,0);
      //console.log(this.latLngFinal);
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
        //icon: 'assets/icon/pin.png',
        icon: 'assets/icon/pointer_a.png',
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
        icon: 'assets/icon/pointer_r.png',
        draggable: true
      });
      this.puntoFin.setPosition(marker);
    }
  }

  listenerDrag(){
    this.listenerMoverInicio = google.maps.event.addListener(this.puntoInicio, 'dragend', (evt) => {
      this.latLngInicial = {lat: evt.latLng.lat(), lng: evt.latLng.lng()}
      //console.log(this.latLngInicial);
      this.geocodeLatLng(this.latLngInicial.lat,this.latLngInicial.lng,1);
    });
  }

  listenerDragF(){
    this.listenerMoverFin = google.maps.event.addListener(this.puntoFin, 'dragend', (evt) => {
      this.latLngFinal = {lat: evt.latLng.lat(), lng: evt.latLng.lng()}
     // console.log(this.latLngFinal);
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
        this.distanciaInicioFin = response.routes[0].legs[0].distance.text.split(" ")[0];
       // console.log(this.distanciaInicioFin)
      } else {
        alert('Could not display directions due to: ' + status);
      }
    });
  }

  //Ver resultados de busqueda inicial
  searchChangedInit(){
    this.mostrarListaResultados(true,"resultadosInicio");
    if(!this.searchInit.trim().length) return;
    this.googleAutocomplete.getPlacePredictions({ input: this.searchInit, location: new google.maps.LatLng(this.posicionInicial), radius: 50000}, predictions => {
      this.searchResultsInit = predictions;
    });
  }

  //Con el resultado que elijamos, se agrega el marcador
  SelectSearchResultInit(item) {
    this.resultInit = item.description;
    this.placeid = item.place_id;
    this.ClearAutocomplete();
    this.getplaceByIdInit(this.placeid);
    
  }

  getplaceByIdInit(placeId){
    this.puntoInicio.setOptions({draggable: true});
    var menuOp = document.getElementById("menuOp");
    var botonAceptar = document.getElementById("aceptarPuntos");
    menuOp.style.display="none";
    botonAceptar.style.display="block";
    this.geocoder.geocode({ placeId: placeId}, (results, status) => {
      if (status === "OK") {
         // console.log(results[0]);
          //console.log(results[0].geometry.viewport.Za.j);
          this.latLngInicial = {lat: results[0].geometry.location.lat(), lng: results[0].geometry.location.lng()}
          this.map.setCenter(this.latLngInicial) //Centrar mapa en inicio
          this.geocodeLatLng(this.latLngInicial.lat,this.latLngInicial.lng,1);
          //console.log(this.latLngInicial);
          this.addMarker(this.latLngInicial);
          this.listenerDrag(); //Listener para el dragg
          
      } else {
        window.alert("Geocoder failed due to: " + status);
      }
    });
  }

  //Ver resultados de busqueda final
  searchChangedEnd(){
    this.mostrarListaResultados(true,"resultadosDestino");
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
         // console.log(results[0]);
          this.latLngFinal = {lat: results[0].geometry.location.lat(), lng: results[0].geometry.location.lng()}
          this.map.setCenter(this.latLngFinal) //Centrar mapa en destino
          this.geocodeLatLng(this.latLngFinal.lat,this.latLngFinal.lng,0);
        //  console.log(this.latLngFinal);
          this.addMarkerF(this.latLngFinal);
          this.listenerDragF(); //Listener para el dragg
          
      } else {
        window.alert("Geocoder failed due to: " + status);
      }
    });
  }

  ClearAutocomplete(){    this.searchResultsEnd = [] ;   this.searchResultsInit =[]      }

  //Seleccionar un tipo de transporte
  SelectTransport(item){
    if(item.isChecked==true){      item.isChecked=true;    
    }else{
      this.vehiculos.forEach(function (vehiculos) {
        vehiculos.isChecked=false;
    });
      item.isChecked=true;
      this.vehiculoSeleccionado=item.tipoCarro;
    //  console.log(this.vehiculoSeleccionado);
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
    //  console.log(this.servicioSeleccionado);
      if(item.id==2){
     //   console.log("fecha");
        this.selectDate();
      }
    }
  }
  async selectDate(){
    const popover= await this.popovercontroller.create({
      component: SelectDateComponent,
      translucent: true,
      cssClass: 'contact-popover',
      componentProps:{
        info: {
        }
      }
    }); 
    return await popover.present();
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
     // console.log(this.pagoSeleccionado);
    }
  }

  aceptarBoton(){
    if(this.vehiculoSeleccionado==null || this.servicioSeleccionado==null || this.servicioSeleccionado==null || this.latLngInicial==null ||this.latLngFinal==null){
      this.presentToast();
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
    this.mostrarListaResultados(false,"resultadosInicio");
    this.mostrarListaResultados(false,"resultadosDestino");
  }

  ocultarOpciones() {
    var mapa= document.getElementById("map");
    var parametros = document.getElementById("parametrosViaje");
    var opconesBuscar = document.getElementById("opcionesBuscar");
    var menuOp = document.getElementById("menuOp");
    var elegirPuntos = document.getElementById("OOI");
    var aceptarPuntos = document.getElementById("MOI");
    var aceptarParametros = document.getElementById("aceptar");
    mapa.style.height="100%";
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
    var mapa= document.getElementById("map");
    var parametros = document.getElementById("parametrosViaje");
    var opconesBuscar = document.getElementById("opcionesBuscar");
    var menuOp = document.getElementById("menuOp");
    var elegirPuntos = document.getElementById("OOI");
    var aceptarPuntos = document.getElementById("MOI");
    var aceptarParametros = document.getElementById("aceptar");
    mapa.style.height="70%"
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
           // console.log(results[0].formatted_address);
            
          } else {
            window.alert("No results found");
          }
        } else {
          window.alert("Geocoder failed due to: " + status);
        }
      }
    );
  }

  mostrarListaResultados(estado,listaResultados){
    var resultado = document.getElementById(listaResultados);
    if(estado){
      resultado.style.display="block";
    }
    else{
      resultado.style.display="none";
    }
  }
}
