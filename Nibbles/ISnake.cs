namespace Nibbles
{
    using System.Collections.Generic;
    public interface ISnake
    {
        byte Id { get; }

        int Ticks { get; }

        int X { get; }
        
        int Y { get; }

        Direction Direction { get; }

        List<Vector> Trail { get; }

        int Length { get; }

        Position MoveNew(Direction direction);
    }

}