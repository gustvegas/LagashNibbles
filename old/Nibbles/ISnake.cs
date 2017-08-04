namespace Nibbles
{
    using System.Collections.Generic;
    public interface ISnake : IVector
    {
        int Id { get; }

        int Ticks { get; }

        IReadOnlyCollection<IVector> Trail { get; }

        int Length { get; }
    }

}