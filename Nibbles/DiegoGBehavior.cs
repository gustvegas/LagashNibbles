namespace Nibbles
{
    using System;
    using System.Collections.Generic;

    public class DiegoGBehavior : ISnakeBehavior
    {
        public Direction ChangeDirection(ISnake snake, byte[,] space, List<Snake> snakes)
        {
            Position pos = snake.MoveNew(snake.Direction);
            if(pos.IsValid(space.GetUpperBound(0), space.GetUpperBound(1))
               && (space[pos.X, pos.Y] == 0))
            {
                return snake.Direction;                
            }
            
            foreach(Direction dir in new[]{0,1,2,3})
            {
                pos = snake.MoveNew(dir);
                if(!pos.IsValid(space.GetUpperBound(0), space.GetUpperBound(1)))
                {
                    continue;
                }
                if(space[pos.X, pos.Y] > 0)
                {
                    continue;
                }
                return dir;
            }
            return snake.Direction;

            //TODO: no meterse en callejones
        }
    }
}