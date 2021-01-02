import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
//import { AngularFireStorage } from '@angular/fire/storage';
import { ActionSheetController, Platform, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-comentarios-sugerencias',
  templateUrl: './comentarios-sugerencias.page.html',
  styleUrls: ['./comentarios-sugerencias.page.scss'],
})
export class ComentariosSugerenciasPage implements OnInit {
  files = [];
  uploadProgress = 0;
  constructor(
  // private storage: AngularFireStorage,
  ) { }
  uploadFile(event: any) {
    const file = event.target.files[0];
    const filePath = 'name-your-file-path-here';
   // const ref = this.storage.ref(filePath);
   // const task = ref.put(file);
  }
  ngOnInit() {
  }

}
