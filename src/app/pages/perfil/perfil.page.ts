import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

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

  constructor(
    public authService: AuthService,
    ) {}

  ngOnInit() {
    //Obtenidos los datos del usuario luego de loguear
    this.nombre = this.authService.getNombre();
    this.apellido = this.authService.getApellido();
    this.correo = this.authService.getCorreo();
    this.getRateUser();
    }

    getRateUser(){
      this.authService.getHistorial().forEach(element => {
        this.calificacion += parseFloat(element.clientScore);
      });
      this.calificacion = this.calificacion/this.authService.getHistorial().length;
      this.calificacionStr = this.calificacion.toFixed(2);
    }
}
