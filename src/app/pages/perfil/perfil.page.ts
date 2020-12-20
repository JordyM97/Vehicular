import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from 'src/app/services/auth.service';
import { AnonymousSubject } from 'rxjs/internal/Subject';

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

  constructor(
    public authService: AuthService
    ) { }

  ngOnInit() {
    //Obtenidos los datos del usuario luego de loguear
    this.idCliente = this.authService.getId();
    this.authService.getUserInfo(this.idCliente);
    this.nombre = this.authService.getNombre();
    this.apellido = this.authService.getApellido();
    this.correo = this.authService.getCorreo();
  }

}
