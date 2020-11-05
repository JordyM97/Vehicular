import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';

import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

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
    public toastController: ToastController,public authService: AuthService) { }

  ngOnInit() {
  }
  on_submit_login(){
    let credentials= {
      username: this.correo_electronico,
      password: this.contrasenia
    };
    this.authService.login(credentials).then( (result)=>{
      console.log(result)
      //console.log(this.authService.token);
      if(result=="ok"){
        this.router.navigate(['/home'])
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
