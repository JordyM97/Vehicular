import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-select-date',
  templateUrl: './select-date.component.html',
  styleUrls: ['./select-date.component.scss'],
})
export class SelectDateComponent implements OnInit {
  hours=[];
  w; h;
  constructor(private platform:Platform) {
    this.h=this.platform.height;
    this.w=this.platform.width;
    this.hours= ["0","1","2","3","4"];
   }

  ngOnInit() {
    this.hours= ["0","1","2","3","4"];
  }
    //CalificarServicio
    //DetallesProveedor
    //Historial
}
