// import * as http from 'http';
// import * as request from 'request';
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
                "snakes": [
                ]
            }

            let newDirection: any;
            let settings = {
                data: payload,
                method: "post",
                dataType: 'json',
                async: false,
                timeout: 0,
                success: function (result) {
                    console.log(result.direction);
                    let newDir: Direction = (<any>Direction)[result.direction];
                    if (result.isOk == false) console.log(result);
                    return resolve(newDir);
                },
            };
            console.log(`r: snake: ${snake.id}: newDir: ${snake.direction}`);
            jQuery.ajax(
                'http://localhost:8088/nextMove',
                settings
            );
        });
    

        // var options = {
        //     hostname: 'localhost',
        //     port: 8088,
        //     path: '/nextMove',
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     }
        // };

        // var req = http.request(options, function(res) {
        //     console.log('Status: ' + res.statusCode);
        //     console.log('Headers: ' + JSON.stringify(res.headers));
        //     res.setEncoding('utf8');
        //     res.on('data', function (body) {
        //         console.log('Body: ' + body);
        //     });
        // });
        // req.on('error', function(e) {
        //     console.log('problem with request: ' + e.message);
        // });
        // req.write('{"string": "Hello, World"}');
        // req.end();

    }
}
