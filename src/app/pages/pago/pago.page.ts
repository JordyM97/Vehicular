import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ToastController } from "@ionic/angular";
import { TransactionService } from "../../services/transaction.service";
import { FormGroup  } from '@angular/forms';
import { AuthService } from "src/app/services/auth.service";

@Component({
  selector: "app-pago",
  templateUrl: "./pago.page.html",
  styleUrls: ["./pago.page.scss"],
})
export class PagoPage implements OnInit {
  cards: Array<any>;
  cardNumber: string;
  holderName: string;
  expiryMonth: number;
  expiryYear: number;
  cvc: string;
  uploadForm: FormGroup;

  constructor(
    public transaction: TransactionService,
    public toastController: ToastController,
    private router:Router,
    public authService: AuthService,
  ) {}

  ngOnInit() {
    this.transaction.user = this.authService.id;
    this.transaction.tokenHeader=this.authService.token;
    this.transaction.loadCards();
    this.cards = this.transaction.getCards();
    //console.log("cards");
    console.log(this.cards);
    console.log(this.authService.id)
  }

  saveCard() {
    var formData: any = new FormData();
    formData.append("userId", ""+this.authService.id);
    formData.append("email", ""+this.authService.correo);
    formData.append("cardNumber", ""+ this.cardNumber);
    formData.append("holderName", ""+ this.holderName);
    formData.append("expiryMonth", ""+ this.expiryMonth);
    formData.append("expiryYear", ""+ this.expiryYear);
    formData.append("cvc", ""+ this.cvc);
    this.transaction.saveCard(formData).then((result) => {
      console.log(result);
      if (result == "ok") {
        this.transaction.cards = [];
        this.transaction.loadCards();
        this.cards = this.transaction.getCards();
        this.presentToastFeedback("Tarjeta Guardada");
      } else {
        this.presentToastFeedback("Error");
      }
    });
  }

  pay(card) {
    this.transaction.token = card.token;
    var formData: any = new FormData();
    formData.append("amount", "99.00");
    formData.append("description", "descripcion");
    formData.append("dev_reference", "REF");
    formData.append("vat", "0.00");

    this.transaction.payCard(formData).then((result) => {
      console.log(result);
      if (result == "ok") {
        this.presentToastFeedback("Pago exitoso");
      } else {
        this.presentToastFeedback("Error");
      }
    });
  }
  back(){
    this.router.navigateByUrl('/detalle-servicio');
  }
  delete(card) {
    let credentials = {
      amount: "99.00",
      description: "DESCRIPCION",
      dev_reference: "REFERENCIA",
      vat: "0.00",
    };
    this.transaction.token = card.token;

    this.transaction.deleteCard(credentials).then((result) => {
      console.log(result);
      if (result == "ok") {
        this.transaction.cards = [];
        this.transaction.loadCards();
        this.cards = this.transaction.getCards();
        this.presentToastFeedback("Tarjeta eliminada");
      } else {
        this.presentToastFeedback("Error");
      }
    });
  }
  async presentToastFeedback(mensaje) {
    const toast = await this.toastController.create({
      message: mensaje,
      position: "top",
      duration: 2000,
      color: "danger",
    });
    toast.present();
  }
}
