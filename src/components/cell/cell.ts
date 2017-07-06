import { Wall } from '../wall/wall'
export class Cell{
    i : number;
    j : number;
    w : number;
    h : number;
    visited : boolean;
    walls : Wall[] = []; 

    //Jeu
    isCellDeb : boolean = false;
    isCellFin : boolean = false;
    isCellPion : boolean = false;
    
    constructor(i : number, j : number, w : number, h : number){
        this.i = i;
        this.j = j;
        this.w = w;
        this.h = h;
        this.visited = false;
        this.loop()
//console.log(this.walls);
    }
    loop(){
       // console.log(this.w + " " + this.h);
        for(let k=0; k<4; k++){
            this.walls.push(new Wall(k, this.i, this.j, this.w, this.h));          
        }
    }
    checkNeighbors(grid : Cell[], cols : number, rows : number){
        var neighbors = [];

        var top    = grid[this.index(this.i-1,this.j, cols, rows)]
        var left   = grid[this.index(this.i,this.j-1, cols , rows)]
        var bottom = grid[this.index(this.i+1,this.j, cols , rows)]
        var right  = grid[this.index(this.i,this.j+1, cols, rows)]

        if(top  && !top.visited){
            neighbors.push(top)
        }
        if( left && !left.visited){
            neighbors.push(left)
        }
        if(bottom && !bottom.visited){
            neighbors.push(bottom)
        }
        if(right && !right.visited){
            neighbors.push(right)
        }

        if(neighbors.length > 0){
            var r = Math.floor(Math.random()*neighbors.length)
            //console.log(r);
            return neighbors[r];
        }else{
          return undefined;  
        }

    }
    index(i : number, j : number, cols : number , rows : number){
        if( i < 0 || j < 0 || i > rows-1 || j > cols-1 ){
            return -1;
        }else{
            return j + i*cols;
        }
        
    }

}