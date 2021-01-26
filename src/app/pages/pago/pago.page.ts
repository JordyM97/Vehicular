import { Component, OnInit } from "@angular/core";
import { ToastController } from "@ionic/angular";
import { TransactionService } from "../../services/transaction.service";

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

  constructor(
    public transaction: TransactionService,
    public toastController: ToastController,
  ) {}

  ngOnInit() {
    this.transaction.user = "12345";
    this.transaction.loadCards();
    this.cards = this.transaction.getCards();
    //console.log("cards");
    console.log(this.cards);
  }

  saveCard() {
    let credentials = {
      userId: "12345",
      email: "asa@gmail.com",
      cardNumber: this.cardNumber,
      holderName: this.holderName,
      expiryMonth: Number(this.expiryMonth),
      expiryYear: Number(this.expiryYear),
      cvc: this.cvc,
    };
    this.transaction.saveCard(credentials).then((result) => {
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
    let credentials = {
      amount: "99.00",
      description: "DESCRIPCION",
      dev_reference: "REFERENCIA",
      vat: "0.00",
    };
    this.transaction.token = card.token;

    this.transaction.payCard(credentials).then((result) => {
      console.log(result);
      if (result == "ok") {
        this.presentToastFeedback("Pago exitoso");
      } else {
        this.presentToastFeedback("Error");
      }
    });
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
