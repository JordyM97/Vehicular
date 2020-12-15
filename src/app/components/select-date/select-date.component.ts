import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-select-date',
  templateUrl: './select-date.component.html',
  styleUrls: ['./select-date.component.scss'],
})
export class SelectDateComponent implements OnInit {
  w; h;
  constructor(private platform:Platform) {
    this.h=this.platform.height;
    this.w=this.platform.width;
   }

  ngOnInit() {}

}
