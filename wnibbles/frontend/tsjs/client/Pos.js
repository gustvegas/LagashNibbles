export class Pos {
    constructor() {
    }
    isValid() {
        return (this.x >= 0) && (this.y >= 0);
    }
    isValidInBounds(space) {
        return this.isValid() && (this.x < space.topX) && (this.y < space.topY);
    }
}
//# sourceMappingURL=Pos.js.map