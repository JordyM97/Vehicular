import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';

import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { FBAuthService } from 'src/app/services/fbauth.service';
import { AppComponent } from 'src/app/app.component';

import "@codetrix-studio/capacitor-google-auth";
import { Plugins } from '@capacitor/core';

import { registerWebPlugin } from '@capacitor/core';
import { FacebookLogin, FacebookLoginResponse } from '@capacitor-community/facebook-login';

registerWebPlugin(FacebookLogin);




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

  async loginGoogle(){
    Plugins.GoogleAuth.signIn().then((googleUser) => {
      console.log("mira");
      console.log(googleUser);
      console.log("accesstoken");
      console.log(googleUser.authentication.accessToken);
      console.log("code:");
      console.log(googleUser.serverAuthCode);
      this.authService.nombre = googleUser.givenName;
      this.authService.apellido = googleUser.familyName;
      this.authService.correo = googleUser.email;
      let credentials= {
        backend: "google-oauth2",
        grant_type: "convert_token",
        token: googleUser.authentication.accessToken,
        client_id: "MF6zy7Co7t23Ugabfu3F4wzKqtUx3FtouCTD7dIx",
        client_secret: "3UeXlqs4of9izf8csbCQTgAFX49Hh1WCmX6QC83PXEJw3qpDJyc0vrvxh2oz6MkftRLEg5Cuqc6avG5okQ4mE7FWCvYYiEjbwSb4b5qNIfZUWxg4WnodDTdsYRfQTXCn"
      };
      this.authService.loginSocial(credentials).then( (result)=>{
        console.log(result)
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

    }).catch((error)=>{
      console.log('User interrupted the login process', error);
    });
  }

  async loginFacebook(){
    const FACEBOOK_PERMISSIONS = ['email','public_profile'];
    let result = await  <FacebookLoginResponse> Plugins.FacebookLogin.login({permissions:FACEBOOK_PERMISSIONS});
    result = await Plugins.FacebookLogin.getCurrentAccessToken();
    console.log("respuesta");
    
    if (result.accessToken) {
      console.log(result);
      // Login successful.
      console.log("Facebook access token is");
      console.log(result.accessToken.token);
      console.log(result.accessToken.userId);
      result.accessToken.userId;

      let credentials= {
        backend: "facebook",
        grant_type: "convert_token",
        token: result.accessToken.token,
        client_id: "MF6zy7Co7t23Ugabfu3F4wzKqtUx3FtouCTD7dIx",
        client_secret: "3UeXlqs4of9izf8csbCQTgAFX49Hh1WCmX6QC83PXEJw3qpDJyc0vrvxh2oz6MkftRLEg5Cuqc6avG5okQ4mE7FWCvYYiEjbwSb4b5qNIfZUWxg4WnodDTdsYRfQTXCn",
        userId: result.accessToken.userId
      };
      this.authService.loginSocial(credentials).then( (result)=>{
        console.log(result)
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
    } else {
      // Cancelled by user.
      console.log("Facebook error");
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
        this.authService.sendDeviceToken();
        this.router.navigate(['home'])
      }
      else{
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
