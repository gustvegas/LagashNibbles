namespace Nibbles
{
    using System.Collections.Generic;
    public interface ISnakeBehavior
    {
        Direction ChangeDirection(ISnake snake, Space space, List<ISnake> snakes);
    }

}