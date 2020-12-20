import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, PopoverController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { ShareDataService } from 'src/app/services/share-data.service';
import { Geolocation } from '@ionic-native/geolocation/ngx';

declare var google;

@Component({
  selector: 'app-detalle-servicio',
  templateUrl: './detalle-servicio.page.html',
  styleUrls: ['./detalle-servicio.page.scss'],
})
export class DetalleServicioPage implements OnInit {

  mapa=null;
  marker=null;
  watch:any;
  origen: any;
  destino: any;

  //Numero del Cliente, debe llegar en la notificacion
  numberClient:string = "0989878654";

  
  directionsService = new google.maps.DirectionsService();
  directionsDisplay = new google.maps.DirectionsRenderer();

  nombreNot: string ="";
  nombreNotSubs: Subscription;
 

  notObj: object={};
  notObjSub: Subscription;

  constructor(
    private geolocation: Geolocation,
    public alertController: AlertController,
    public shareData: ShareDataService,
    private router: Router,
    public popoverController: PopoverController,
    //private callNumber: CallNumber,
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.loadMap();
    this.watchPosition();
  }

  async loadMap() {

    // create a new map by passing HTMLElement
    const mapEle: HTMLElement = document.getElementById('mapaViaje');
    const indicatorsEle: HTMLElement = document.getElementById('indicators');

    // create map
    this.mapa = await new google.maps.Map(mapEle, {
      zoom: 17,
      zoomControl:false,
      mapTypeControl:false,
      streetViewControl:false,
      fullscreenControl:false
    });
    await this.directionsDisplay.setMap(this.mapa);
    await google.maps.event.addListenerOnce(this.mapa, 'idle', () => {
      mapEle.classList.add('show-map');
      this.calculateRoute(this.shareData.notificacion.data.inicioCoords,this.shareData.notificacion.data.finCoords);
    });    
  }

  private calculateRoute(ini:any,fin:any){  
    this.directionsService.route({
      origin: JSON.parse(ini) ,
      destination: JSON.parse(fin),
      travelMode: google.maps.TravelMode.DRIVING,
    }, (response, status)  => {
      if (status === google.maps.DirectionsStatus.OK) {
        this.directionsDisplay.setDirections(response);
      } else {
        alert('No se pudo cargar el mapa ' + status);
      }
    });
  }

  private watchPosition(){
    this.watch= this.geolocation.watchPosition();
    this.watch.subscribe((data)=>{
      if(this.marker!=null){
        this.marker.setMap(null);
        console.log("entro");
      }
      if ("coords" in data){
        let lat=data.coords.latitude;
        let lng=data.coords.longitude;
        console.log("latitud "+ lat);
        console.log("longitud "+ lng);
        let latLng=new google.maps.LatLng(lat,lng);
        this.marker = new google.maps.Marker({
          map: this.mapa,
          icon: new google.maps.MarkerImage('https://maps.gstatic.com/mapfiles/mobile/mobileimgs2.png',
          new google.maps.Size(22, 22),
          new google.maps.Point(0, 18),
          new google.maps.Point(11, 11)),
          position: latLng      
        });
      }
      else {
        console.log("ERROR WATCH POSITION");
      }
    })
  }

}
