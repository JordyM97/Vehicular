import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavParams, PopoverController } from '@ionic/angular';

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
    private popover:PopoverController
  ) { }

  ngOnInit() {
    this.title = this.navParams.get("title");
    this.body = this.navParams.get("body");
    this.apellido = this.navParams.get("apellido");
  }

  async btnAceptar(){
    console.log('Confirm Okay');
    await this.popover.dismiss();
    //this.router.navigate(['/detalle']); /*Cambiar*/
  }

}
