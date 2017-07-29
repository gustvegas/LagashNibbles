import { Direction } from './Direction';
export class DummyBehavior {
    changeDirection(snake, space, snakes) {
        return new Promise((resolve, reject) => {
            let pos = snake.moveNew();
            if (pos.isValidInBounds(space)
                && (space.map[pos.x][pos.y] == space.EMPTY)) {
                let aroundEmpty = true;
                for (var i = 0; i < snakes.length; i++) {
                    var other = snakes[i];
                    if (other.id == snake.id) {
                        continue;
                    }
                    if (other.x > pos.x - 2 &&
                        other.x < pos.x + 2 &&
                        other.y > pos.y - 2 &&
                        other.y < pos.y + 2) {
                        aroundEmpty = false;
                        break;
                    }
                }
                if (aroundEmpty) {
                    return resolve(snake.direction);
                }
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
                return resolve(dir);
            }
            return resolve(snake.direction);
        });
    }
}
//# sourceMappingURL=DummyBehavior.js.map