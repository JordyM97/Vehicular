import { Component, OnInit } from "@angular/core";
import { ToastController } from "@ionic/angular";

import { Router } from "@angular/router";
import { AuthService } from "src/app/services/auth.service";
import { FBAuthService } from "src/app/services/fbauth.service";
import { AppComponent } from "src/app/app.component";

import "@codetrix-studio/capacitor-google-auth";
import { Plugins } from "@capacitor/core";

import { registerWebPlugin } from "@capacitor/core";
import {
  FacebookLogin,
  FacebookLoginResponse,
} from "@capacitor-community/facebook-login";

registerWebPlugin(FacebookLogin);

@Component({
  selector: "app-login",
  templateUrl: "./login.page.html",
  styleUrls: ["./login.page.scss"],
})
export class LoginPage implements OnInit {
  correo_electronico: string;
  contrasenia: string;
  showPassword = false;
  passwordIcon = "eye";

  constructor(
    private router: Router,
    public toastController: ToastController,
    public authService: AuthService,
    public fbauthservice: FBAuthService,
    private appcom: AppComponent
  ) {}

  ngOnInit() {
    //localStorage.clear();\
    localStorage.setItem('flag','1');
    if (localStorage.length > 0) {
      this.loguinAutomatico();
    }
  }
  loginGoogle() {
    let accessToken: any;
    Plugins.GoogleAuth.signIn()
      .then((googleUser) => {
        console.log("mira");
        console.log(googleUser);
        console.log("code:");
        console.log(googleUser.serverAuthCode);

        //console.log(googleUser.authentication.accessToken);
        this.authService.nombre = googleUser.givenName;
        this.authService.apellido = googleUser.familyName;
        this.authService.correo = googleUser.email;
        let credentialss = {
          client_id:
            "627980958884-vtijkffn44khtscdsfru6vcnonl8djdg.apps.googleusercontent.com",
          client_secret: "QzydEr6vV7nJRvGbP04yKJPG",
          code: googleUser.serverAuthCode,
          grant_type: "authorization_code",
          redirect_uri: "https://localhost:8100",
        };
        this.authService.getTokenGoogle(credentialss).then((result) => {
          if (result == "ok") {
            accessToken = this.authService.tokenGoogle;
            let credentials = {
              backend: "google-oauth2",
              grant_type: "convert_token",
              token: accessToken,
              client_id: "mKGX5NzHe1hKuubfPqmRSA70pr09SHUFf0dSACqi",
              client_secret:
                "SU5HyABmq7SIhEcXcaO338C2b9Ye1wZxz5LuLQeq1P9o2QgQZtSkHJpfgcKLBm2l5O3lLQ1f1w0AHURVNR5FR47RQvg1hfBQPjZZhWvUhVxIyLM7AyWwPGPFrXR96hnJ",
            };
            this.authService.loginSocial(credentials).then((result) => {
              console.log(result);
              if (result == "ok") {
                if (this.authService.deviceToken != null) {
                  this.authService.sendDeviceToken();
                }
                this.appcom.username = this.authService.nombre;
                this.authService.getTokenDjango(credentials).then((result) => {
                  console.log(result);
                  if (result != "ok") {
                    this.presentToastFeedback();
                  }
                });
                this.router.navigate(["home"]);
              } else {
                this.presentToastFeedback();
              }
            });
          } else {
            console.log("error");
            this.presentToastFeedback();
          }
        });
      })
      .catch((error) => {
        console.log("User interrupted the login process", error);
      });
  }

  async loginFacebook() {
    const FACEBOOK_PERMISSIONS = ["email", "public_profile"];
    let result = await (<FacebookLoginResponse>(
      Plugins.FacebookLogin.login({ permissions: FACEBOOK_PERMISSIONS })
    ));
    result = await Plugins.FacebookLogin.getCurrentAccessToken();
    console.log("respuesta");

    if (result.accessToken) {
      console.log(result);
      // Login successful.
      console.log("Facebook access token is");
      console.log(result.accessToken.token);
      console.log(result.accessToken.userId);
      result.accessToken.userId;

      let credentials = {
        backend: "facebook",
        grant_type: "convert_token",
        token: result.accessToken.token,
        client_id: "mKGX5NzHe1hKuubfPqmRSA70pr09SHUFf0dSACqi",
        client_secret:
          "SU5HyABmq7SIhEcXcaO338C2b9Ye1wZxz5LuLQeq1P9o2QgQZtSkHJpfgcKLBm2l5O3lLQ1f1w0AHURVNR5FR47RQvg1hfBQPjZZhWvUhVxIyLM7AyWwPGPFrXR96hnJ",
        userId: result.accessToken.userId,
      };
      this.authService.loginSocial(credentials).then((result) => {
        console.log(result);
        if (result == "ok") {
          if (this.authService.deviceToken != null) {
            this.authService.sendDeviceToken();
          }
          this.appcom.username = this.authService.nombre;
          this.authService.getTokenDjango(credentials).then((result) => {
            console.log(result);
            if (result != "ok") {
              this.presentToastFeedback();
            }
          });

          this.router.navigate(["home"]);
        } else {
          this.presentToastFeedback();
        }
      });
    } else {
      // Cancelled by user.
      console.log("Facebook error");
    }
  }

  on_submit_loginF() {
    this.fbauthservice
      .login(this.correo_electronico, this.contrasenia)
      .then(
        //Respuesta positiva
        (res) => {
          this.router.navigate(["home"]);
          this.correo_electronico = "";
          this.contrasenia = "";
        }
      )
      .catch((err) => {
        //Verificar si es un Network Error
        this.presentToastFeedback();
      });
  }
  on_submit_login() {
    let credentials = {
      username: this.correo_electronico,
      password: this.contrasenia,
    };
    localStorage.setItem("correo", credentials.username);
    localStorage.setItem("password", credentials.password);
    localStorage.setItem("flag", "1");
    this.authService.login(credentials).then((result) => {
      //console.log(result)
      //console.log(this.authService.token);
      if (result == "ok") {
        if (this.authService.deviceToken != null) {
          this.authService.sendDeviceToken();
        }
        this.appcom.username = this.authService.nombre;

        this.router.navigate(["home"]);
      } else {
        this.presentToastFeedback();
      }
    });
  }

  loguinAutomatico() {
    let credentials = {
      username: localStorage.getItem("correo"),
      password: localStorage.getItem("password"),
    };

    this.authService.login(credentials).then((result) => {
      console.log(result);
      //console.log(this.authService.token);

      if (result == "ok") {
        if (this.authService.deviceToken != null) {
          this.authService.sendDeviceToken();
        }
        this.appcom.username = this.authService.nombre;

        this.router.navigate(["home"]);
      } else {
        this.presentToastFeedback();
      }
    });
  }

  async presentToastFeedback() {
    const toast = await this.toastController.create({
      message: "Usuario o  contraseña incorrectos",
      position: "top",
      duration: 2000,
      color: "danger",
    });
    toast.present();
  }

  async presentGreeting() {
    const toast = await this.toastController.create({
      message: "Login exitoso!",
      position: "top",
      duration: 2000,
      color: "success",
    });
    toast.present();
  }

  iconPassword() {
    this.showPassword = !this.showPassword;
    if (this.passwordIcon == "eye") {
      this.passwordIcon = "eye-off";
    } else {
      this.passwordIcon = "eye";
    }
  }
}
