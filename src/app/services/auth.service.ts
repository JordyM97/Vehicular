import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularDelegate } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public token: any;
  public id:any;
  public nombre: any;
  public apellido: any;
  public correo: any;
  public deviceToken:any;

  constructor(public http: HttpClient) { }
  logout(){
    this.token="";
  }
  sendDeviceToken(){
    console.log(this.token);
    console.log(this.id)
    console.log(this.deviceToken);
    let req={
      user: this.id,
      registration_id: this.deviceToken.token,
      type: "android"
    }
    console.log(req)
    return new Promise((resolve, reject) => {
      let headers = new HttpHeaders();
      
      headers = headers.set('content-type','application/json').set('Authorization', 'token '+String(this.token));
    
      this.http.post('https://axela.pythonanywhere.com/api/devices', req, {headers: headers}) //http://127.0.0.1:8000
        .subscribe(res => {
          let data = JSON.parse(JSON.stringify(res));
          console.log(data);
          resolve("ok");
          }, (err) => {
          console.log(err);
          //resolve("ok");
          resolve("bad");
        });  });
    
  }
  login(credentials){
    console.log(credentials);
    console.log(JSON.stringify(credentials));
    
    return new Promise((resolve, reject) => {
        let headers = new HttpHeaders();
       
      //headers = headers.set('Access-Control-Allow-Origin' , '*');
       //headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
       //headers.append('Accept','application/json');
       //headers.append('content-type','application/json');
 
        this.http.post('https://axela.pythonanywhere.com/api/rest-auth/', credentials, {headers: headers}) //http://127.0.0.1:8000
          .subscribe(res => {
            let data = JSON.parse(JSON.stringify(res));
            this.id=data.id;
            this.token = data.token;
            this.nombre = data.first_name;
            this.apellido = data.last_name;
            this.correo = data.email;
            console.log(data);
            resolve("ok");
            }, (err) => {
            console.log(err);
            //resolve("ok");
            resolve("bad");
          });  });
 
  }

  setNotification(notificacion){
    console.log(notificacion);
    return new Promise((resolve, reject) => {
    let headers = new HttpHeaders();
    
    //headers.append('Access-Control-Allow-Origin' , '*');
    //headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
    //headers.append('Accept','application/json');
    headers = headers.set('content-type','application/json').set('Authorization', 'token '+String(this.token));
    console.log(this.token);
    console.log(headers);

    this.http.post('https://axela.pythonanywhere.com/api/service/', notificacion, {headers: headers}) //http://127.0.0.1:8000
      .subscribe(res => {
        let data = JSON.parse(JSON.stringify(res));
        console.log(data);
        resolve("ok");
        }, (err) => {
        console.log(err);
        //resolve("ok");
        resolve("bad");
      });  });
  }

  getInformation(){
    return new Promise((resolve, reject) => {
    let headers = new HttpHeaders();
    
    //headers.append('Access-Control-Allow-Origin' , '*');
    //headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
    //headers.append('Accept','application/json');
    headers = headers.set('content-type','application/json').set('Authorization', 'token '+String(this.token));
    console.log(this.token);
    console.log(headers);

    this.http.get('https://axela.pythonanywhere.com/api/service/', {headers: headers}) //http://127.0.0.1:8000
      .subscribe(res => {
        let data = JSON.parse(JSON.stringify(res));
        console.log(data);
        data.forEach(element => {
          console.log(element.startidLocation) //Recorrer los elementos del array y extraer la info
        });
        resolve("ok");
        }, (err) => {
        console.log(err);
        //resolve("ok");
        resolve("bad");
      });  });
  }

  getNombre(){
    return this.nombre;
  }

  getApellido(){
    return this.apellido;
  }

  getCorreo(){
    return this.correo;
  }
}
