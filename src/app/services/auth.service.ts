import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public token: any;
  public nombre: any;
  public apellido: any;
  public correo: any;

  constructor(public http: HttpClient) { }
  logout(){
    this.token="";


  }
  getlogininfo(){
    
  }
  login(credentials){
    console.log(credentials);
    console.log(JSON.stringify(credentials));
    
    return new Promise((resolve, reject) => {
        var headers = new HttpHeaders();
       
       //headers.append('Access-Control-Allow-Origin' , '*');
       //headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
       headers.append('Accept','application/json');
       headers.append('content-type','application/json');
 
        this.http.post('http://127.0.0.1:8000/api/rest-auth/', credentials, {headers: headers})
          .subscribe(res => {
            let data = JSON.parse(JSON.stringify(res));
            this.token = data.token;
            this.nombre = data.first_name;
            this.apellido = data.last_name;
            this.correo = data.email;
            console.log(data);
            resolve("ok");
            }, (err) => {
            console.log(err);
            resolve("ok");
            //resolve("bad");
          
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
