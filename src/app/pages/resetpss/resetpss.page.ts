import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { FBAuthService } from 'src/app/services/fbauth.service';

@Component({
  selector: 'app-resetpss',
  templateUrl: './resetpss.page.html',
  styleUrls: ['./resetpss.page.scss'],
})
export class ResetpssPage implements OnInit {
  public email:string=""
  constructor(
    private FBauth_service: FBAuthService, 
    private router: Router
  ) { }

  ngOnInit() {
  }

  send_reset_password(){
    console.log("Se enviara el correo...");
    this.FBauth_service.reset_password(this.email);
  }
}
