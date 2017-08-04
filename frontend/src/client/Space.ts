import {Snake} from './Snake';
import {Vector} from './Vector';

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
            let lastVec: Vector = snake;
            for(let t: number = snake.trail.length-1; t >= 0; t--) {
                let trail = snake.trail[t];
                let dist = (lastVec.x === trail.x) ? 
                    (lastVec.y - trail.y) : 
                    (lastVec.x - trail.x);
                let sign = (dist < 0) ? -1 : 1;
                dist = Math.abs(dist);
                for(let d = 1; d <= dist; d++) {
                    if( lastVec.x === trail.x ) {
                        space.map[lastVec.x][lastVec.y-(d*sign)] = snake.id;
                    }else if(lastVec.y === trail.y) {
                        space.map[lastVec.x-(d*sign)][lastVec.y] = snake.id;
                    }
                }
                lastVec = trail;
            }
        }
        return space;
    }
}