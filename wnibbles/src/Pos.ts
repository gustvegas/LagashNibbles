
class Pos {
    x: number;
    y: number;

    constructor() {
    }

    isValid() : boolean
    {
        return (this.x >= 0) && (this.y >= 0);
    }

    isValidInBounds(topX: number, topY: number) : boolean
    {
        return this.isValid() && (this.x < topX) && (this.y < topY);
    }


}