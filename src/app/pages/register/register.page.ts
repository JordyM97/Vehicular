import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  email: string
  password: string
  firstname:string
  lastname:string
  username:string
  showPassword=false;
  passwordIcon='eye';

  constructor(
    private router: Router,
    public toastController: ToastController,
    public authService: AuthService) { }

  ngOnInit() {
  }

  on_submit_register(){
    let credentials= {
      username: this.username,
      password: this.password,
      first_name: this.firstname,
      last_name: this.lastname,
      email: this.email
    };
    this.authService.signUp(credentials).then( (result)=>{
      console.log(result)
      //console.log(this.authService.token);
      if(result=="ok"){
        //this.authService.sendDeviceToken();
        this.router.navigate(['login'])
      }
      else{
        this.presentToastFeedback()
      }
    })
    } 
    async presentToastFeedback() {
      const toast = await this.toastController.create({
        message: 'Datos incorrectos',
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
