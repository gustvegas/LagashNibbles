export class Space {
    constructor(x, y) {
        this.topX = x;
        this.topY = y;
        this.map = [];
        for (var i = 0; i < x; i++) {
            this.map[i] = [];
            for (var j = 0; j < y; j++) {
                this.map[i][j] = 0;
            }
        }
    }
}
//# sourceMappingURL=Space.js.map