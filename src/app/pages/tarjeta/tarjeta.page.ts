import { Component, OnInit } from '@angular/core';
import * as $ from "jquery";

declare var Payment;

@Component({
  selector: 'app-tarjeta',
  templateUrl: './tarjeta.page.html',
  styleUrls: ['./tarjeta.page.scss'],
})
export class TarjetaPage implements OnInit {

  constructor( ) { 
  }

  ngOnInit() {
    /*console.log("sss")
    console.log(this.PagosFuncion);
    var ee = this.PagosFuncion.init('stg', 'INNOVA-EC-CLIENT', 'ZjgaQCbgAzNF7k8Fb1Qf4yYLHUsePk');
    console.log(ee);
    let form = $("#add-card-form");
    let submitButton = form.find("button");
    let submitInitialText = submitButton.text();

    $('#add-card-form').on('submit', function(event) {
      event.preventDefault();
      var $myCard = $(this).find('#my-card');
      $(this).find('#messages').text("");
    });*/
  }
}
