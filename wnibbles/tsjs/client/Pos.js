export class Pos {
    constructor() {
    }
    isValid() {
        return (this.x >= 0) && (this.y >= 0);
    }
    isValidInBounds(topX, topY) {
        return this.isValid() && (this.x < topX) && (this.y < topY);
    }
}
