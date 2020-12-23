import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';

import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { FBAuthService } from 'src/app/services/fbauth.service';
import { AppComponent } from 'src/app/app.component';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  correo_electronico: string
  contrasenia: string
  showPassword=false;
  passwordIcon='eye';

  constructor(
    private router: Router,
    public toastController: ToastController,
    public authService: AuthService,
    public fbauthservice:FBAuthService,private appcom:AppComponent) { 
   }

  ngOnInit() {
    //localStorage.clear();
    if(localStorage.length>0){
      this.loguinAutomatico();
    }
  }
  on_submit_loginF(){
    this.fbauthservice.login(this.correo_electronico,this.contrasenia)
    .then(//Respuesta positiva
      res =>{
        this.router.navigate(['home'])
        this.correo_electronico=""
        this.contrasenia=""
      } 
    ).catch(
      err =>{
        //Verificar si es un Network Error
        this.presentToastFeedback()
      } 
    );
  }
  
  on_submit_login(){
    let credentials= {
      username: this.correo_electronico,
      password: this.contrasenia
    };
    localStorage.setItem("correo",credentials.username);
    localStorage.setItem("password",credentials.password);

    this.authService.login(credentials).then( (result)=>{
      console.log(result)
      console.log(this.authService.token);
      if(result=="ok"){
        if(this.authService.deviceToken!= null){
          this.authService.sendDeviceToken();
          
        }
        this.appcom.username=this.authService.nombre;
        
        
        this.router.navigate(['home'])
      }
      else{
        this.presentToastFeedback()
      }
    })
  }   
  loguinAutomatico(){
    let credentials= {
      username: localStorage.getItem("correo"),
      password: localStorage.getItem("password")
    };

    this.authService.login(credentials).then( (result)=>{
      console.log(result)
      //console.log(this.authService.token);
      if(result=="ok"){
        if(this.authService.deviceToken!= null){
          this.authService.sendDeviceToken();
        }
        this.appcom.username=this.authService.nombre;
        
        
        this.router.navigate(['home'])
      }else{
        this.presentToastFeedback()
      }
    })
    }  


  
  async presentToastFeedback() {
    const toast = await this.toastController.create({
      message: 'Usuario o  contraseña incorrectos',
      position: 'top',
      duration: 2000,
      color: 'danger'
    });
    toast.present();
  }

  async presentGreeting(){
    const toast = await this.toastController.create({
      message: 'Login exitoso!',
      position: 'top',
      duration: 2000,
      color: 'success'
    });
    toast.present();
  }

  iconPassword(){
    this.showPassword=!this.showPassword;
    if(this.passwordIcon=='eye'){
      this.passwordIcon='eye-off';
    }
    else{
      this.passwordIcon='eye';
    }
  }
}
