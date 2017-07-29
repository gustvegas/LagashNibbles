import * as jQuery from 'jquery';
import { Direction } from './Direction';
export class HttpBehavior {
    changeDirection(snake, space, snakes) {
        return new Promise((resolve, reject) => {
            let payloadSnake = {
                "id": snake.id,
                "x": snake.x,
                "y": snake.y,
                "direction": Direction[snake.direction],
                "length": snake.length,
                "ticks": snake.ticks,
                "trail": snake.trail,
            };
            var payloadSnakes = [];
            snakes.forEach(function (s) {
                payloadSnakes.push({
                    "id": s.id,
                    "x": s.x,
                    "y": s.y,
                    "direction": Direction[s.direction],
                    "length": s.length,
                    "ticks": s.ticks,
                    "trail": s.trail,
                });
            });
            let payload = {
                "snake": payloadSnake,
                "space": {
                    "topX": space.topX,
                    "topY": space.topY,
                    "map": space.map
                },
                "snakes": payloadSnakes
            };
            jQuery.ajax({
                url: 'http://localhost:8000/nextMove',
                data: JSON.stringify(payload),
                dataType: 'json',
                contentType: 'application/json',
                type: 'POST',
                success: function (result) {
                    let newDir = Direction[result.direction];
                    if (result.isOk == false)
                        console.log(result);
                    return resolve(newDir);
                }
            });
        });
    }
}
//# sourceMappingURL=HttpBehavior.js.map