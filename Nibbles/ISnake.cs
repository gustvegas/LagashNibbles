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

        IReadOnlyCollection<IVector> Trail { get; }

        int Length { get; }

        IPosition MoveNew(Direction direction);
    }

}