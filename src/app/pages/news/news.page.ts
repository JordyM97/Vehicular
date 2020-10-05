import { Component, OnInit } from '@angular/core';
import { HTTP } from '@ionic-native/http/ngx';
import { Observable } from 'rxjs';
import {HttpClientModule, HttpClient} from '@angular/common/http';
import { AngularFireDatabase } from 'angularfire2/database';
import { NavController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-news',
  templateUrl: './news.page.html',
  styleUrls: ['./news.page.scss'],
})
export class NewsPage implements OnInit {
  Noticias: Observable<any[]>;
  Noti: Array<JSON>;
  firestore:any
  constructor(private http: HttpClient,firestore: AngularFirestore ) { 
    this.firestore=firestore;
    
    }                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   
  ngOnInit() {
    this.Noticias= this.firestore.collection('Noticias').valueChanges();

    this.Noticias.subscribe(value =>{
      this.Noti.push(value[0])
      console.log(value[0]);});
    
  }


}
