import {ISnakeBehavior} from './ISnakeBehavior';
import {Space} from './Space';
import {Pos} from './Pos';
import {Snake} from './Snake';
import {Direction} from './Direction';

export class DummyBehavior implements ISnakeBehavior {
    changeDirection(snake: Snake, space: Space, snakes: Array<Snake>) : Promise<Direction> {
        return new Promise((resolve,reject) => {
            // Si no me choco adelante, sigo igual
            let pos = snake.moveNew();
            if(pos.isValidInBounds(space)
                && (space.map[pos.x][pos.y] == space.EMPTY)) {

                // Valida que no haya nadie cerca
                let aroundEmpty: boolean = true;
                // for(let i=-1; (i < 2) && aroundEmpty; i++) {
                //     for(let j=-1; (j < 2) && aroundEmpty; j++) {
                //         let newPos: Pos = new Pos();
                //         newPos.x = pos.x+i;
                //         newPos.y = pos.y+j;
                //         if(newPos.isValidInBounds(space)) {
                //             if((space.map[newPos.x][newPos.y] != 0 && 
                //                 space.map[newPos.x][newPos.y] != snake.id)) {
                //                 aroundEmpty = false;
                //             }
                //         }
                //     }		
                // }
                for(let i = 0; i < snakes.length; i++) {
                    let other = snakes[i];
                    if(other.id == snake.id) {
                        continue;
                    }
                    if( other.x > pos.x - 2 && 
                        other.x < pos.x + 2 && 
                        other.y > pos.y - 2 && 
                        other.y < pos.y + 2 ) {
                        aroundEmpty = false;
                        break;
                    }
                }
                if(aroundEmpty) {
                    return resolve(snake.direction);
                }
            }

            //Busco nueva dirección clockwise para no chocarme
            for(let i:number = 1; i <= 4; i++) {
                let dir = Direction[Direction[i]];
                if(snake.isOpositeDirection(dir)) {
                    continue;
                }
                pos = snake.moveNewDirection(dir);
                if(!pos.isValidInBounds(space)) {
                    continue;
                }
                if(space.map[pos.x][pos.y] != space.EMPTY) {
                    continue;
                }
                return resolve(dir);
            }
            return resolve(snake.direction);
        });
    }
}
