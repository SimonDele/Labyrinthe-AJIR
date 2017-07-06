import { Component, Input } from '@angular/core';
import { Maze } from "../maze/maze";
import { ViewChild } from '@angular/core';

import { TimerComponent } from '../../components/timer/timer';

@Component({
    selector : 'maze',
    template :  `<cell *ngFor="let cell of maze.grid" [cell]="cell"></cell>  <timer #timer timeInSeconds="60"></timer>`,
    styles : [ ``]
})


export class MazeComponent{
    @Input() maze : Maze;
    @ViewChild(TimerComponent) timer: TimerComponent;
      //Jeu 
    tempsTimer : number = 10;
 
    constructor(){
        
    }



}