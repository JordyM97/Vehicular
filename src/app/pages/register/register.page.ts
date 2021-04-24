import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
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
  celular:string
  cedula:string
  showPassword=false;
  passwordIcon='eye';
  terminos:boolean;

  constructor(
    private router: Router,
    public toastController: ToastController,
    public authService: AuthService,
    public alertController:AlertController) { }

  ngOnInit() {
    this.terminos=false;
  }

  async on_submit_register(){
    let credentials= {
      username: "null",
      password: this.password,
      first_name: this.firstname,
      last_name: this.lastname,
      email: this.email,
      celular : this.celular,
      cedula: this.cedula,
      image: "http"
    };

    if(this.terminos){
      this.authService.signUp(credentials).then( (result)=>{
        console.log(result)
        if(result=="ok"){       
          this.authService.registerclient();          
          this.router.navigateByUrl('/login')
        }
        else{          this.presentToastFeedback("Algo ha salido mal")        }
      }) 
    }else if(this.password==null || this.firstname== null || this.lastname == null || this.email == null || this.cedula== null || this.celular== null){
      this.presentToastFeedback("Hay campos vacios");
    }else{
      this.presentToastFeedback("No has aceptado los terminos y condiciones");
    }
  } 
  aceptarTerminos(){
    console.log(this.terminos);
  }

  async presentToastFeedback(msg:string) {
      const toast = await this.toastController.create({
        message: msg,
        position: 'top',        duration: 2000,        color: 'danger'
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

  async presentAlertConfirm() {
      const alert = await this.alertController.create({
        cssClass: 'my-custom-class',
        header: 'Confirm!',
        message: 'Message <strong>text</strong>!!!',
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            cssClass: 'secondary',
            handler: (blah) => {
              console.log('Confirm Cancel: blah');
            }
          }, {
            text: 'Okay',
            handler: () => {
              console.log('Confirm Okay');
            }
          }
        ]
      });
  
      await alert.present();
    }
    getPoliticas(){
      this.authService.getPoliticas();
    }
}
