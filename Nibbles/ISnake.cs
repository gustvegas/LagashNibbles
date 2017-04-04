namespace Nibbles
{
    using System.Collections.Generic;
    public interface ISnake
    {
        int Id { get; }

        int Ticks { get; }

        int X { get; }
        
        int Y { get; }

        Direction Direction { get; }

        IList<Vector> Trail { get; }

        int Length { get; }

        Position MoveNew(Direction direction);
    }

}