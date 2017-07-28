import * as jQuery from 'jquery';
import {ISnakeBehavior} from './ISnakeBehavior';
import {Space} from './Space';
import {Snake} from './Snake';
import {Direction} from './Direction';

export class HttpBehavior implements ISnakeBehavior {
    changeDirection(snake: Snake, space: Space, snakes: Array<Snake>) : Promise<Direction> {
        return new Promise((resolve,reject) => {
            let payloadSnake: object = {
                "id": snake.id,
                "x": snake.x,
                "y": snake.y,
                "direction": <string>Direction[snake.direction],
                "length": snake.length,
                "ticks": snake.ticks,
                "trail": snake.trail,
            };
            let payload: object = {
                "snake": payloadSnake,
                "space": {
                    "topX": space.topX,
                    "topY": space.topY,
                    "map": space.map
                },
                //"snakes": snakes
            }

            let settings = {
                data: payload,
                method: "post",
                dataType: 'json',
                async: false,
                timeout: 0,
                success: function (result) {
                    let newDir: Direction = (<any>Direction)[result.direction];
                    if (result.isOk == false) console.log(result);
                    return resolve(newDir);
                },
            };
            jQuery.ajax(
                'http://localhost:8088/nextMove',
                settings
            );

        });

    }
}
