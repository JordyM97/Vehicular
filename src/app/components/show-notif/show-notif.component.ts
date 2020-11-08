import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavParams, PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-show-notif',
  templateUrl: './show-notif.component.html',
  styleUrls: ['./show-notif.component.scss'],
})
export class ShowNotifComponent implements OnInit {
  title;
  body;
  constructor(private popover:PopoverController,private navParams: NavParams,private router: Router) {
    this.title=this.navParams.get("title");
    this.body=this.navParams.get("body");
   }

  ngOnInit() {}
  async btnOK(){
    await this.popover.dismiss();
    //this.router.navigate(['home']);
  }
}
