import { Cell } from "../cell/cell";
import { HostListener } from "@angular/core";
import { ToastController, LoadingController, AlertController } from 'ionic-angular';
import { TimerComponent } from '../../components/timer/timer';
import { ViewChild } from '@angular/core';

export class Maze{
    
    //Construction

    cols : number;
    rows : number;
    w : number;
    h : number;
    grid : Cell[];
    current : Cell;
    compteur : number;
    stack : Cell[];
    interval;
    tempsTimer : number;
    pion : Cell;
    loader;
    timer : TimerComponent


     
    constructor(public toastCtrl : ToastController , public loadingCtrl : LoadingController, private alertCtrl: AlertController){
       // this.tempsTimer = tempsTimer;
        this.cols = 5;
        this.rows = 5;

        this.buildMaze();
    }

    
    buildMaze(){
        //Loading warning
        this.presentLoading();

        //this.tempsTimer = 7;
        this.w  = 0.9*window.screen.width / this.cols;
        this. h = 0.6*window.screen.height / this.rows;

        //Création grille
        this.loop();

        //Début algo génération maze
        this.current = this.grid[0];
        this.current.visited = true;
        this.stack = [];
        this.compteur = 0;

        this.interval = setInterval(() =>{
             if( this.compteur >= this.cols*this.rows-1){
                this.stopInterval();
            }
            //STEP 1
            var next = this.current.checkNeighbors(this.grid, this.cols,this.rows);
            
            if(next){
                this.compteur ++;
                next.visited=true;

                //STEP 2 
                this.stack.push(this.current);

                //STEP 3
                this.removeWalls(this.current, next);
                
                //STEP 4
                this.current = next;
            }else if(this.stack.length > 0){
                this.current = this.stack.pop();
                
            }

        },0);

    }


    presentLoading() {
        this.loader = this.loadingCtrl.create({
        content: "Please wait...",
    });
    this.loader.present();
    }


    loop(){
        this.grid=[];
        for(let i=0; i<this.rows; i++){
            for(let j=0; j<this.cols; j++){
                var cell = new Cell(i,j, this.w, this.h);
                this.grid.push(cell);
            }       
        }
    }
    removeWalls(a : Cell, b : Cell){
        //a et b sur une meme ligne
       if(b.j - a.j == 1){  //b a droite
           a.walls[3].existe = false;
           b.walls[1].existe = false;
       }else if(b.j - a.j == -1){   //b a gauche
           a.walls[1].existe = false;
           b.walls[3].existe = false;
        // a et b sur une meme colonne
       }else  if(b.i - a.i == 1){ //b en bas
           a.walls[2].existe = false;
           b.walls[0].existe = false;
       }else  if(b.i - a.i == -1){   // b en haut
           a.walls[0].existe = false;
           b.walls[2].existe = false;
       }

    }
    stopInterval(){
        clearInterval(this.interval);
        this.play();
    }

    play(){
        this.loader.dismiss();
            

  
        //Init var Debut , FIn et où est le pion
        this.pion = this.grid[0];
        this.grid[0].isCellDeb = true;
        this.grid[this.cols*this.rows-1].isCellFin = true;
        this.grid[0].isCellPion=true;
        
    }
    goTop(){
      //  console.log("right")
        if(!this.pion.walls[0].existe && this.pion.i>0){
            this.pion.isCellPion=false;
            this.pion= this.grid[(this.pion.i-1) * this.cols + this.pion.j]
            this.pion.isCellPion=true;
            this.checkifEnd();
        }
        
    }
    goLeft(){
      //  console.log("right")
        if(!this.pion.walls[1].existe  && this.pion.j>0){
            this.pion.isCellPion=false;
            this.pion= this.grid[this.pion.i * this.cols + this.pion.j-1]
            this.pion.isCellPion=true;
            this.checkifEnd();
        }
    }
    goBottom(){
      //  console.log("right")
        if(!this.pion.walls[2].existe  && this.pion.i<this.rows-1){
            this.pion.isCellPion=false;
            this.pion= this.grid[(this.pion.i + 1) * this.cols + this.pion.j]
            this.pion.isCellPion=true;
            this.checkifEnd();
        }
    }
    goRight(){
      //  console.log("right")
        if(!this.pion.walls[3].existe  && this.pion.j<this.cols-1){
            this.pion.isCellPion=false;
            this.pion= this.grid[this.pion.i * this.cols + this.pion.j+1]
            this.pion.isCellPion=true;
            this.checkifEnd();
        }
    }
    checkifEnd(){
        if(this.pion.isCellFin){
            this.presentAlertFin();
        }
    }

    presentAlertFin() {
        let alert = this.alertCtrl.create({
            title: 'Niveau réussi',
            subTitle: 'Bien joué !',
            buttons: [ {
                        text : 'Niveau suivant',
                        handler : () => {
                            alert.dismiss();
                            this.cols+=2;
                            this.rows+=2;
                            this.buildMaze();
                        }
                        }],

        });
        alert.present();
    }


        

}