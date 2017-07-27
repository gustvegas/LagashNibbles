import { Vector } from './Vector';
export class Snake extends Vector {
    constructor(id) {
        super();
        this.trail = new Array();
        this.id = id;
    }
    step() {
        this.ticks++;
        this.length++;
        this.move();
    }
    reduceLength(count) {
        this.length -= count;
        let first = this.trail[0];
        let second = this.trail.length > 1 ? this.trail[1] : null;
        let newFirst = first.moveNewDirection(first.direction);
        first.x = newFirst.x;
        first.y = newFirst.y;
        if (second != null &&
            first.x == second.x && first.y == second.y) {
            this.trail.splice(0, 1);
        }
        return first;
    }
    getTailPosition() {
        let first = this.trail[0];
        let newVec = new Vector();
        newVec.x = first.x;
        newVec.y = first.y;
        newVec.direction = first.direction;
        return newVec;
    }
    willHitNextStep(space) {
        let pos = this.moveNewDirection(this.direction);
        if (pos.isValidInBounds(space)
            && (space.map[pos.x][pos.y] == space.EMPTY)) {
            return false;
        }
        return true;
    }
    willHitNextStepInfo(space) {
        let pos = this.moveNewDirection(this.direction);
        if (!pos.isValidInBounds(space)) {
            return -1;
        }
        return space.map[pos.x][pos.y];
    }
    changeDirection(direction) {
        if (this.direction != direction || this.trail.length == 0) {
            let vec = new Vector();
            vec.x = this.x;
            vec.y = this.y;
            vec.direction = direction;
            this.trail.push(vec);
            this.direction = direction;
        }
    }
}
//# sourceMappingURL=Snake.js.map