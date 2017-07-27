import { Direction } from './Direction';
export class DummyBehavior {
    changeDirection(snake, space, snakes) {
        let pos = snake.moveNew();
        if (pos.isValidInBounds(space.topX, space.topY)
            && (space.map[pos.x][pos.y] == 0)) {
            return snake.direction;
        }
        for (let i = 1; i < 4; i++) {
            let dir = Direction[Direction[i]];
            pos = snake.moveNewDirection(dir);
            if (!pos.isValidInBounds(space.topX, space.topY)) {
                continue;
            }
            if (space.map[pos.x][pos.y] > 0) {
                continue;
            }
            return dir;
        }
        return snake.direction;
    }
}
//# sourceMappingURL=DummyBehavior.js.map