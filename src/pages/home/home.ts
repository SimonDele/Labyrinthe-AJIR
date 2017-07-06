import { Component, ViewChild } from '@angular/core';
import { NavController, ToastController, LoadingController, AlertController } from 'ionic-angular';
import { Maze } from '../../components/maze/maze';
import { TimerComponent } from '../../components/timer/timer'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

 
  posTimer : number = window.screen.height*0.6;
  maze : Maze; 

  //Gestion des touch
  oldPos : number[];
  currentPos :  number[];
  timer : number = 0;


  
  constructor(public navCtrl: NavController, public toastCtrl : ToastController, public loadingCtrl : LoadingController, private alertCtrl: AlertController ) {

      this.maze = new Maze(toastCtrl, loadingCtrl, alertCtrl);
  }
  

  touchEvent(e){
    if(this.timer == 0 ){
       this.oldPos = [e.touches[0].pageX, e.touches[0].pageY];
    }
   
    this.timer++;

    if(this.timer > 4){
      let currentPos = [e.touches[0].pageX, e.touches[0].pageY ]
      let deltaX = currentPos[0] - this.oldPos[0];
      let deltaY = currentPos[1] - this.oldPos[1];

      if(Math.abs(deltaX) > Math.abs(deltaY)){
        if(deltaX > 0){
          this.maze.goRight();
        }else{
          this.maze.goLeft();
        }
      }else{
        if(deltaY > 0){
          this.maze.goBottom();
        }else{
          this.maze.goTop();
        }
      }

      this.timer =0;
    }


  }
  touchEnd(){
    this.timer =0;
  }
  


}
