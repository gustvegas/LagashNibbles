namespace Nibbles
{
    using System.Collections.Generic;
    public interface ISnakeBehavior
    {
        Direction ChangeDirection(ISnake snake, byte[,] space, List<ISnake> snakes);
    }

}