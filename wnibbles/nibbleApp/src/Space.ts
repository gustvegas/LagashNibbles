
export class Space {
    topX: number;
    topY: number;
    
    map: number[][];
    EMPTY: number = 0;

    constructor(x: number, y:number) {
        this.topX = x;
        this.topY = y;
        this.map = [];
        for(var i:number = 0; i < x; i++) {
            this.map[i] = [];
            for(var j: number = 0; j< y; j++) {
                this.map[i][j] = this.EMPTY;
            }
        }
    }
}