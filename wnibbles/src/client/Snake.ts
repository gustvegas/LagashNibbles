import {Vector} from './Vector';
import {Space} from './Space';
import {ISnakeBehavior} from './ISnakeBehavior';
import {Color} from './Nibbles';
import {Direction} from './Direction';

export class Snake extends Vector {
    id: number;
    ticks: number;
    trail: Array<Vector>;
    length: number;
    color: Color;
    behavior: ISnakeBehavior;

    constructor() {
        super();
        this.trail = new Array<Vector>();
    }

    reduceLength(count: number): Vector {
        this.length -= count;

        let first = this.trail[0];
        let second = this.trail.length > 1 ? this.trail[1] : null;
        let newFirst = first.moveNewDirection(first.direction);
        first.x = newFirst.x;
        first.y = newFirst.y;
        if(second != null && 
            first.x == second.x && first.y == second.y) {
            this.trail.splice(0,1);
        }
        return first;
    }

    getTailPosition(): Vector {
        let first = this.trail[0];
        let newVec = new Vector();
        newVec.x = first.x;
        newVec.y = first.y;
        newVec.direction = first.direction;
        return newVec;
    }

    step() {
        this.ticks++;
        this.length++;
        this.move();
    }

    willHitNextStep(space:Space):boolean {
        let pos = this.moveNewDirection(this.direction);
        if(pos.isValidInBounds(space.topX, space.topY)
            && (space.map[pos.x][pos.y] == 0)) {
            return false;
        }
        return true;
    }

    willHitNextStepInfo(space: Space) : number {
        let pos = this.moveNewDirection(this.direction);
        if(!pos.isValidInBounds(space.topX, space.topY)) {
            return -1;
        }
        return space.map[pos.x][pos.y];
    }

    changeDirection(direction: Direction) {
        if(this.direction != direction || this.trail.length == 0) {
            let vec = new Vector();
            vec.x = this.x;
            vec.y = this.y;
            vec.direction = direction;
            this.trail.push(vec);
            this.direction = direction;
        }
    }

}
