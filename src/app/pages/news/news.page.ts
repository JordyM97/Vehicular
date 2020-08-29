import { Component, OnInit } from '@angular/core';
import { HTTP } from '@ionic-native/http/ngx';
import { Observable } from 'rxjs';
import {HttpClientModule, HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-news',
  templateUrl: './news.page.html',
  styleUrls: ['./news.page.scss'],
})
export class NewsPage implements OnInit {
  
  constructor(private http: HttpClient) { 
    
  }
  test(){
   // this.http.get('https://demo1372101.mockable.io').subscribe(data =>{
   //   console.log(data);
    //}
    //  );
    this.http.get('http://127.0.0.1:8000/vehicular/vehicles/').subscribe(data =>{
        console.log(data);
      }
    );
  }
  ngOnInit() {
    
  }

}
