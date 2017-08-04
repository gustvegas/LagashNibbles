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
        for(let i:number = 0; i < x; i++) {
            this.map[i] = [];
            for(let j: number = 0; j< y; j++) {
                this.map[i][j] = this.EMPTY;
            }
        }
    }

    createSpace(snakes: Array<Snake>): Space {
        let space = new Space(this.topX, this.topY);

        for(let i:number = 0; i < snakes.length; i++) {
            let snake = snakes[i];
    
            space.map[snake.x][snake.y] = snake.id;
            for(let t: number = 0; t < snake.trail.length; t++) {
                let trail = snake.trail[t];

                
            }
        }
        return 
    }
}