
interface ISnakeBehavior {
    changeDirection(snake: Snake, space: Space, snakes: Array<Snake>) : Direction;
}