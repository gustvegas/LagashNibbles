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
            let payload = {
                "snake": payloadSnake,
                "space": {
                    "topX": space.topX,
                    "topY": space.topY,
                    "map": space.map
                },
                "snakes": []
            };
            let newDirection;
            let settings = {
                data: payload,
                method: "post",
                dataType: 'json',
                async: false,
                timeout: 0,
                success: function (result) {
                    let newDir = Direction[result.direction];
                    if (result.isOk == false)
                        console.log(result);
                    return resolve(newDir);
                },
            };
            jQuery.ajax('http://localhost:8088/nextMove', settings);
        });
    }
}
//# sourceMappingURL=HttpBehavior.js.map