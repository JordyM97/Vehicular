import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-editar-perfil',
  templateUrl: './editar-perfil.page.html',
  styleUrls: ['./editar-perfil.page.scss'],
})
export class EditarPerfilPage implements OnInit {
 
  password: string
  firstname:string
  lastname:string
  celular:string
  userinfo:any
  constructor(
    private router: Router,
    public toastController: ToastController,
    public authService: AuthService) { } 

  ngOnInit() {
    this.userinfo=this.authService.userinfo;
    this.firstname=this.userinfo.first_name;
    this.lastname=this.userinfo.last_name;
    this.celular=this.userinfo.celular;
  }
  updatePerfil(){
    this.userinfo.first_name=this.firstname
    this.userinfo.last_name=this.lastname;
    this.userinfo.celular=this.celular;
    this.authService.updateClient(this.userinfo).then((result) => {
      if (result == "ok")         this.router.navigate(["perfil"]) 
      else {
        
      }
    });
  }
}
