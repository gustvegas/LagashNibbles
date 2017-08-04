import {Space} from './Space';

export class Pos {
    x: number;
    y: number;

    constructor() {
    }

    isValid() : boolean
    {
        return (this.x >= 0) && (this.y >= 0);
    }

    isValidInBounds(space: Space) : boolean
    {
        return this.isValid() && (this.x < space.topX) && (this.y < space.topY);
    }
}