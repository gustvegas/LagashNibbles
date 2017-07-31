import {Pos} from './Pos';
import {Direction} from './Direction';

export class Vector extends Pos {
    direction: Direction;

    constructor() {
        super();
    }

    move() {
        let pos = this.moveNew();
        this.x = pos.x;
        this.y = pos.y;
    }

    moveNew() : Pos {
        return this.moveNewDirection(this.direction);
    }

    getOpositeDirection() : Direction {
        if(this.direction == Direction.Up) {
            return Direction.Down;
        } else if(this.direction == Direction.Right) {
            return Direction.Left;
        } else if(this.direction == Direction.Down) {
            return Direction.Up;
        } else if(this.direction == Direction.Left) {
            return Direction.Right;
        }
    }

    isOpositeDirection(direction: Direction) : boolean {
        if(this.direction == Direction.Up) {
            return direction == Direction.Down;
        } else if(this.direction == Direction.Right) {
            return direction == Direction.Left;
        } else if(this.direction == Direction.Down) {
            return direction == Direction.Up;
        } else if(this.direction == Direction.Left) {
            return direction == Direction.Right;
        }
    }
    moveNewDirection(direction: Direction) : Pos {
        let pos = new Pos();
        pos.x = this.x;
        pos.y = this.y;
        if(direction == Direction.Up) {
            pos.y = this.y-1;
        } else if(direction == Direction.Right) {
            pos.x = this.x+1;
        } else if(direction == Direction.Down) {
            pos.y = this.y+1;
        } else if(direction == Direction.Left) {
            pos.x = this.x-1;
        }
        return pos;
    }

}
