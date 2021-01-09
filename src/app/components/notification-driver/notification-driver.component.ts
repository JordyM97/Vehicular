import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavParams, PopoverController } from '@ionic/angular';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-notification-driver',
  templateUrl: './notification-driver.component.html',
  styleUrls: ['./notification-driver.component.scss'],
})
export class NotificationDriverComponent implements OnInit {

  title;
  body;
  apellido;

  constructor(
    private router: Router,
    private navParams: NavParams,
    private popover:PopoverController,private loadingservice:LoadingService
  ) { }

  ngOnInit() {
    this.title = this.navParams.get("title");
    this.body = this.navParams.get("body");
    this.loadingservice.hideLoader();
    //this.apellido = this.navParams.get("apellido");
  }

  async btnAceptar(){
    console.log('Confirm Okay');
    await this.popover.dismiss();
    this.router.navigate(['/detalle-servicio']); /*Cambiar*/
  }

}
