import { Component, OnInit } from '@angular/core';
import { HTTP } from '@ionic-native/http/ngx';
import { Observable } from 'rxjs';
import {HttpClientModule, HttpClient} from '@angular/common/http';
import { AngularFireDatabase } from 'angularfire2/database';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-news',
  templateUrl: './news.page.html',
  styleUrls: ['./news.page.scss'],
})
export class NewsPage implements OnInit {
  items:  Observable<any[]>;
  constructor(private http: HttpClient,public db: AngularFireDatabase,
    public navCtrl: NavController) { 
      this.items = db.list('/Pruebas').valueChanges();
      this.items.subscribe(value =>{console.log(value)});
    }

  ngOnInit() {
    
  }

}
