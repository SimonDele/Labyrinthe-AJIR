import { Component, Input } from '@angular/core'
import { Wall } from '../wall/wall'
@Component({
    selector : 'wall',
    template : `<div *ngIf="wall.existe" class="wall"
                    [style.width]="wall.w+'px'"
                    [style.height]="wall.h+'px'"
                    [style.top]="wall.y+'px'"
                    [style.left]="wall.x+'px'"
                ></div>`,
    styles : [`.wall{
                    position : absolute;
                    background-color : red;
                }
             `]
})
export class WallComponent{
    @Input() wall : Wall;

    constructor(){

    }    
}