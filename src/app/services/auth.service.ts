import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AngularDelegate } from '@ionic/angular';
import { Observable } from 'rxjs';

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
  public historial : Array<any>;
  servicios: Observable<any[]>;
  serviciosCollection: AngularFirestoreCollection<any>;
  constructor(
    public http: HttpClient,private firestore: AngularFirestore
    ) { 
    this.historial = [];
    this.serviciosCollection=firestore.collection('token');
    this.servicios= this.serviciosCollection.valueChanges();
  }
  logout(){
    this.token="";
  }


  
  
  registerclient(){
    let r={
      userClient: this.id
    }
    return new Promise((resolve, reject) => {
      let headers = new HttpHeaders();
      headers = headers.set('content-type','application/json')//.set('Authorization', 'token '+String(this.token));
    
      this.http.post('https://axela.pythonanywhere.com/api/client/', r, {headers: headers}) //http://127.0.0.1:8000
        .subscribe(res => {
          let data = JSON.parse(JSON.stringify(res));
          console.log(data);
          resolve("ok");
          }, (err) => {
          console.log(err);
          resolve("bad");
        });  });
    
  }
  sendDeviceToken(){
    console.log(this.token);
    console.log(this.deviceToken);
    let req={
      user: this.id,
      registration_id: this.deviceToken.token,
      type: "android"
    }
    let tok={
      token:this.deviceToken.token,
      app: "careapp"
    }
    console.log(req)
    this.postDataAPI(tok)
    return new Promise((resolve, reject) => {
      let headers = new HttpHeaders();
      
      headers = headers.set('content-type','application/json').set('Authorization', 'token '+String(this.token));
    
      this.http.post('https://axela.pythonanywhere.com/api/devices', req, {headers: headers}) //http://127.0.0.1:8000
        .subscribe(res => {
          let data = JSON.parse(JSON.stringify(res));
          data.forEach(element => {
            console.log(element) //Recorrer los elementos del array y extraer la info
          });
          console.log(data);
          resolve("ok");
          }, (err) => {
          console.log(err);
          //resolve("ok");
          resolve("bad");
        });  });
    
  }
  signUp(credentials){
    return new Promise((resolve, reject) => {
    let headers = new HttpHeaders();
    //headers.append('Accept','application/json');
    headers = headers.set('content-type','application/json')//.set('Authorization', 'token '+String(this.token));
    console.log(this.token);
    console.log(headers);

    this.http.post('https://axela.pythonanywhere.com/api/user/create/',credentials, {headers: headers}) //http://127.0.0.1:8000
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
  sendNotification(notificacion){ 
    console.log(notificacion);
    return new Promise((resolve, reject) => {
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', 'token '+String(this.token));

    this.http.post('https://axela.pythonanywhere.com/api/notification/', notificacion, {headers: headers}) //http://127.0.0.1:8000
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
  getUserInfo(id: any){
    return new Promise((resolve, reject) => {
      let headers = new HttpHeaders();
      headers = headers.set('content-type','application/json').set('Authorization', 'token '+String(this.token));
      console.log(this.token);
      console.log(headers);
  
      this.http.get('https://axela.pythonanywhere.com/api/user/'+String(id)+'/', {headers: headers}) //http://127.0.0.1:8000
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
  loginFB(credentials){
    
    return new Promise((resolve, reject) => {
        let headers = new HttpHeaders();
       
      //headers = headers.set('Access-Control-Allow-Origin' , '*');
       //headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
       //headers.append('Accept','application/json');
       //headers.append('content-type','application/json');
 
        this.http.post('https://axela.pythonanywhere.com/api/login/social/token/', credentials, {headers: headers}) //http://127.0.0.1:8000
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
  sendService(notificacion){
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
        console.log("pk="+data.pk);
        resolve("ok");
        }, (err) => {
        console.log(err);
        //resolve("ok");
        resolve("bad");
      });  });
  }

  getRecordService(){
    return new Promise((resolve, reject) => {
      let headers = new HttpHeaders();
      headers = headers.set('content-type','application/json').set('Authorization', 'token '+String(this.token));
      console.log(this.token);
      console.log(headers);
  
      this.http.get('https://axela.pythonanywhere.com/api/recordService/'+String(this.id)+'/1/', {headers: headers}) //http://127.0.0.1:8000
        .subscribe(res => {
          let data = JSON.parse(JSON.stringify(res));
          data.forEach(element => {
            //console.log(element) //Recorrer los elementos del array y extraer la info
            this.historial.push(element);
          });
          resolve("ok");
          }, (err) => {
          console.log(err);
          //resolve("ok");
          resolve("bad");
        });  });
  }
  getHistorial(){
    return this.historial;
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

  getId(){
    return this.id;
  }
  postDataAPI(any: any){
    this.serviciosCollection.add(any);
  }
}
