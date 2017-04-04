namespace Nibbles
{
    using System.Collections.Generic;
    public interface ISnakeBehavior
    {
        Direction ChangeDirection(ISnake snake, ISpace space, IReadOnlyCollection<ISnake> snakes);
    }
}