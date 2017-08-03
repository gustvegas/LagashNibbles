import {Snake} from './Snake';

export class Space {
    topX: number;
    topY: number;
    
    map: number[][];
    EMPTY: number = 0;
    REDUCE_STEP: number = 5;

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

    createSpace(snakes: Array<Snake>): Space {
        var space = new Space(this.topX, this.topY);

        for(var i:number = 0; i < snakes.length; i++) {
            var snake = snakes[i];

            for(var t: number = 0; t < snake.trail.length; t++) {

            }
        }
        return 
    }
}