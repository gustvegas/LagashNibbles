import { Direction } from './Direction';
export class DummyBehavior {
    changeDirection(snake, space, snakes) {
        return new Promise((resolve, reject) => {
            let pos = snake.moveNew();
            if (pos.isValidInBounds(space)
                && (space.map[pos.x][pos.y] == space.EMPTY)) {
                return resolve(snake.direction);
            }
            for (let i = 1; i <= 4; i++) {
                let dir = Direction[Direction[i]];
                if (snake.isOpositeDirection(dir)) {
                    continue;
                }
                pos = snake.moveNewDirection(dir);
                if (!pos.isValidInBounds(space)) {
                    continue;
                }
                if (space.map[pos.x][pos.y] != space.EMPTY) {
                    continue;
                }
                return dir;
            }
            return resolve(snake.direction);
        });
    }
}
//# sourceMappingURL=DummyBehavior.js.map