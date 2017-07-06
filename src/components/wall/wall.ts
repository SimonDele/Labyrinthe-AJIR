export class Wall{
    existe : boolean = true;
    x : number;
    y : number;
    w : number;
    h : number;
    pos : number;
    taille : number;
    constructor(pos : number, i : number, j : number, w : number, h : number){
    /*pos   : 1 = top
            : 2 = left
            : 3 = bottom
            : 4 = right
    */
         
        //console.log(pos);
        this.taille = 5;
        this.existe = true;
        this.pos = pos;
        
            //console.log(this.pos);
            switch (this.pos){
                case 0 : //top 
                   
                    this.h = this.taille;
                    this.w = w;

                    break;
                   // console.log(this.w + " " +this.h);
                     
                
                case 1 : //left
                    this.h = h;
                    this.w = this.taille;

                    break;
                
                case 2 : //bottom
                    this.y = h;
                    this.h = this.taille;
                    this.w = w;
                    break;
                
                case 3 : //right
                    this.x = w;
                    this.h = h;
                    this.w = this.taille;
                    break;
              
            }
        
 
    }

}