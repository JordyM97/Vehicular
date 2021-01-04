import { Component, OnInit } from '@angular/core';
import { MediaServiceService } from 'src/app/services/media-service.service';


@Component({
  selector: 'app-comentarios-sugerencias',
  templateUrl: './comentarios-sugerencias.page.html',
  styleUrls: ['./comentarios-sugerencias.page.scss'],
})
export class ComentariosSugerenciasPage implements OnInit {
  uploadProgress: any;
  pictureview:string;
  constructor(private Mediaservice:MediaServiceService) {}
 


  
  async takePicture(){
    await this.Mediaservice.takePicture();
    await this.Mediaservice.upload();
    this.pictureview=this.Mediaservice.pictureview
  }

  ngOnInit() {
    this.uploadProgress=this.Mediaservice.uploadProgress
    this.pictureview=this.Mediaservice.pictureview

  }
  

  
}
