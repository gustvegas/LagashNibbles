namespace Nibbles
{
    using System.Collections.Generic;

    public class DiegoGBehavior : ISnakeBehavior
    {
        public Direction ChangeDirection(ISnake snake, ISpace space, IReadOnlyCollection<ISnake> snakes)
        {
            // Si no me choco adelante, sigo igual
            IPosition pos = snake.MoveNew();
            if(pos.IsValid(space.TopX, space.TopY)
               && (space[pos.X, pos.Y] == 0))
            {
                return snake.Direction;                
            }
            
            //Busco nueva dirección clockwise para no chocarme
            foreach(Direction dir in new[]{0,1,2,3})
            {
                pos = snake.MoveNew(dir);
                if(!pos.IsValid(space.TopX, space.TopY))
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