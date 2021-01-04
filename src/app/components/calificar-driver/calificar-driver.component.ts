import { Component, OnInit } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { PopoverController } from '@ionic/angular';
import { ShareDataService } from 'src/app/services/share-data.service';

enum COLORS {
  GREY = "#E0E0E0",
  GREEN = "#76FF03",
  YELLOW = "#FFCA28",
  RED= "#DD2C00"
}

@Component({
  selector: 'app-calificar-driver',
  templateUrl: './calificar-driver.component.html',
  styleUrls: ['./calificar-driver.component.scss'],
})
export class CalificarDriverComponent implements OnInit {

  title;
  body;
  btn;
  watch:any;
  rating;
  ratingChange = new EventEmitter<object>();

  constructor(
    private router: Router,
    private popover:PopoverController,
    private shareData: ShareDataService
  ) { }

  ngOnInit() {}

  async finalizarServicio(){
    console.log('CARRERA FINALIZADA');
    await this.popover.dismiss();
    if(this.rating!= null){
      this.router.navigate(['/home']); 
    }
    else{
      console.log("Elije rating")
    }   
}
  

  rate(index: number){
    this.rating = index;
    this.ratingChange.emit(this.rating);
    console.log(this.rating);
  }

  getColor(index: number){
    if(this.isAboveRating(index)){
      return COLORS.GREY;
    }
    switch (this.rating){
      case 1:
      case 2:
        return COLORS.RED;
      case 3:
        return COLORS.YELLOW;
      case 4:
      case 5:
        return COLORS.GREEN;
      default:
        return COLORS.GREY;
    }
  }

  isAboveRating(index: number): boolean {
    return index>this.rating;
  }

}
