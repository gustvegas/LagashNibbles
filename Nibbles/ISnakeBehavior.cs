namespace Nibbles
{
    using System.Collections.Generic;
    public interface ISnakeBehavior
    {
        Direction ChangeDirection(ISnake snake, ISpace space, List<ISnake> snakes);
    }
}