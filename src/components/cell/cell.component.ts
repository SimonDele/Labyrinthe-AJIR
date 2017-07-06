import { Component, Input } from '@angular/core'
import { Cell } from './cell'


@Component({
    selector : 'cell',
    template : `<div [class.cell]="!cell.visited" [class.cellVisited]="cell.visited"
                     [class.cellDeb]="cell.isCellDeb"
                     [class.cellPion]="cell.isCellPion"
                     [class.cellFin]="cell.isCellFin"
                    [style.width]="cell.w+'px'"
                    [style.height]="cell.h+'px'"
                    [style.top]="cell.i*cell.h+'px'"
                    [style.left]="cell.j*cell.w+'px'">
                        <wall *ngFor = "let wall of cell.walls" wall [wall]="wall">
                        </wall>
                </div>`,
    styles : [`.cell{
                    position : absolute;   
                }
                .cellVisited{
                    position : absolute;
                    background-color : blue;
                }
                .cellDeb{
                    position : absolute;
                    background-color : red;
                }
                .cellPion{
                    position : absolute;
                    background-color : green;
                }
                .cellFin{
                    position : absolute;
                    background-color : black;
                }
            `],
})
export class CellComponent{
    @Input() cell : Cell;

    constructor(){
    
    }
    
}