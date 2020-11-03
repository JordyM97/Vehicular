import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';

import { Router } from '@angular/router';

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
    public toastController: ToastController) { }

  ngOnInit() {
  }
  on_submit_login(){
    console.log("Intento login", this.contrasenia, this.correo_electronico);
    this.router.navigate(['/home'])

   
    //this.presentToastFeedback()
    }     


  
  async presentToastFeedback() {
    const toast = await this.toastController.create({
      message: 'Usuario/contraseña incorrectos o estan vacios',
      position: 'top',
      duration: 2000
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
