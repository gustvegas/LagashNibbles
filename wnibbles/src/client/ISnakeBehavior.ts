import {Space} from './Space';
import {Snake} from './Snake';
import {Direction} from './Direction';

export interface ISnakeBehavior {
    changeDirection(snake: Snake, space: Space, snakes: Array<Snake>) : Direction;
}