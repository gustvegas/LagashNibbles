import {Space} from './Space';
import {Snake} from './Snake';

export interface ISnakeBehavior {
    changeDirection(snake: Snake, space: Space, snakes: Array<Snake>) : Direction;
}