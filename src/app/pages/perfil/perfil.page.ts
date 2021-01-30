import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { MediaServiceService } from 'src/app/services/media-service.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  public nombre: any;
  public apellido: any;
  public correo: any;
  private idCliente: any;
  private calificacion = 0;
  private calificacionStr;
  public img:string="https://firebasestorage.googleapis.com/v0/b/vehicular-287023.appspot.com/o/profile%2F24%2Fprofile.jpg?alt=media&token=b7f2e110-bde3-4d30-a509-9ccb27c122ea";
  constructor(
    public authService: AuthService,
    public Mediaservice:MediaServiceService
    ) {
      
    }

  ngOnInit() {
    //Obtenidos los datos del usuario luego de loguear
    this.askProfilePic();
    //this.img=''//this.Mediaservice.profilephoto;
    this.nombre = this.authService.getNombre();
    this.apellido = this.authService.getApellido();
    this.correo = this.authService.getCorreo();
    this.getRateUser();
    
    }
    async uploadImg(){
      await this.Mediaservice.takePicture();
      await this.Mediaservice.uploadProfile(this.authService.id);
    }
    getRateUser(){
      this.authService.getHistorial().forEach(element => {
        this.calificacion += parseFloat(element.clientScore);
      });
      this.calificacion = this.calificacion/this.authService.getHistorial().length;
      this.calificacionStr = this.calificacion.toFixed(2);
    }
    async askProfilePic(){
      await this.Mediaservice.getProfilePhoto(this.authService.id);
    }
}
