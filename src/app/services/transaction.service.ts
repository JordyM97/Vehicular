import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class TransactionService {
  public user: any;
  public token: string;
  public cards: Array<any>;
  public tokenHeader: string;

  constructor(public http: HttpClient) {
    this.cards=[]
  }

  saveCard(credentials) {
    console.log(credentials);
    console.log(JSON.stringify(credentials));
    return new Promise((resolve, reject) => {
      let headers = new HttpHeaders();
      headers = headers.set('Authorization', String(this.tokenHeader));
      this.http
        .post("https://axela.pythonanywhere.com/api/card", credentials, {
          headers: headers,
        })
        .subscribe(
          (res) => {
            let data = JSON.parse(JSON.stringify(res));
            console.log(data);
            console.log("https://axela.pythonanywhere.com/api/transaction?user=" +
            this.user +
            "&token=" +
            this.token);
            resolve("ok");
          },
          (err) => {
            console.log(err);
            resolve("bad");
          }
        );
    });
  }
  payCard(credentials) {
    console.log(credentials);
    console.log(JSON.stringify(credentials));
    return new Promise((resolve, reject) => {
      let headers = new HttpHeaders();
      headers = headers.set('content-type','application/json').set('Authorization', String(this.tokenHeader));
      this.http
        .post(
          "https://axela.pythonanywhere.com/api/transaction?user=" +
            this.user +
            "&token=" +
            this.token,
          credentials,
          { headers: headers }
        )
        .subscribe(
          (res) => {
            let data = JSON.parse(JSON.stringify(res));
            console.log(data);
            resolve("ok");
          },
          (err) => {
            console.log(err);
            resolve("bad");
          }
        );
    });
  }
  deleteCard(credentials) {
    console.log(credentials);
    console.log(JSON.stringify(credentials));
    return new Promise((resolve, reject) => {
      let headers = new HttpHeaders();
      headers = headers.set('content-type','application/json').set('Authorization', String(this.tokenHeader));
      this.http
        .delete(
          "https://axela.pythonanywhere.com/api/card?user=" +
            this.user +
            "&token=" +
            this.token,
          credentials
        )
        .subscribe(
          (res) => {
            let data = JSON.parse(JSON.stringify(res));
            console.log(data);
            resolve("ok");
          },
          (err) => {
            console.log(err);
            resolve("bad");
          }
        );
    });
  }
  loadCards() {
    return new Promise((resolve, reject) => {
      let headers = new HttpHeaders();
      headers = headers.set('content-type','application/json').set('Authorization', String(this.tokenHeader));
      this.http
        .get("https://axela.pythonanywhere.com/api/card?user=" + this.user, {
          headers: headers,
        }) //http://127.0.0.1:8000
        .subscribe(
          (res) => {
            
            let data = JSON.parse(JSON.stringify(res["cards"]));
            console.log(data);
            data.forEach(element => {
              console.log("eke",element) //Recorrer los elementos del array y extraer la info
              this.cards.push(element);
              //console.log(element);
            });
            resolve("ok");
          },
          (err) => {
            console.log(err);
            //resolve("ok");
            resolve("bad");
          }
        );
    });
  }
  getCards() {
    return this.cards;
  }
}
