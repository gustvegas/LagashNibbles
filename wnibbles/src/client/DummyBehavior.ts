import {ISnakeBehavior} from './ISnakeBehavior';
import {Space} from './Space';
import {Snake} from './Snake';
import {Direction} from './Direction';

export class DummyBehavior implements ISnakeBehavior {
    changeDirection(snake: Snake, space: Space, snakes: Array<Snake>) : Direction {
        // Si no me choco adelante, sigo igual
        let pos = snake.moveNew();
        if(pos.isValidInBounds(space.topX, space.topY)
            && (space.map[pos.x][pos.y] == 0)) {
            return snake.direction;                
        }

        //Busco nueva dirección clockwise para no chocarme
        for(let i:number = 1; i < 4; i++) {
            let dir = Direction[Direction[i]];
            pos = snake.moveNewDirection(dir);
            if(!pos.isValidInBounds(space.topX, space.topY)) {
                continue;
            }
            if(space.map[pos.x][pos.y] > 0) {
                continue;
            }
            return dir;
        }
        return snake.direction;
    }
}
