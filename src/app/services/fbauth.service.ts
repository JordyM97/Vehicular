import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class FBAuthService {
  constructor(
    private AFauth: AngularFireAuth,
    private router: Router,
    public toastController: ToastController) { }
  login(correo_electronico: string, contrasenia: string) {
    return new Promise(
      (resolve, reject) => {
        
        this.AFauth.signInWithEmailAndPassword(correo_electronico, contrasenia)
          .then(res => {
            console.log(res)
            resolve(res)
          }).catch(
            err => {
              console.error('ERROR> En la auth. Linea 16 in auth.service.ts' + err)
              reject(err)
            }
          )
      }
    );
  }


  /**
   * Logout de respuesta asincrona que en caso de ser exitosa 
   * redirecciona a la pantalla de login, sino lanza un error.
   * @returns una promesa 
   */
  logout() {
    return this.AFauth.signOut()
      .then(() => {
        this.router.navigate(['/login'])
        console.log('Redirigir')
      }
      ).catch(
        err => {
          console.error('ERROR> En la auth. Linea 42 in auth.service.ts' + err)

        }
      )
  }

  /**
   * Usa el obj AFauth para enviar un correo de recuperacion de contraseña al proveedor que lo solicita.
   * Nota: Se puede personalizar el mensaje enviado desde firebase/console/authentication
   * Pdt: Para probar se recomienda usar un email temporal, debidamente registrado como usuario.
   * @param correo_recuperacion (del proveedor) destino donde se enviara el mensaje
   */
  reset_password(correo_recuperacion: string) {
    if (correo_recuperacion == "") {
      this.presentToastFeedback('Debe ingresar un correo electronico.')
      //alert("Debe ingresar un correo electronico.")
    } else {
      this.AFauth.sendPasswordResetEmail(correo_recuperacion)
        .then(
          (res) => {
            console.log("Email se envio")
            this.presentToastFeedback('Listo!, Revisa en tu correo');
            this.router.navigate(['login'])
          }
        ).catch(
          (err) => {
            this.presentToastFeedback("ERROR en reset password " + err);
            console.error("ERROR en reset password  " + err)
          }
        )
    }
  }

  async presentToastFeedback(text: string) {
    const toast = await this.toastController.create({
      message: text,
      duration: 2000,
      position: 'top',
    });
    toast.present();
  }
}

