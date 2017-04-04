namespace Nibbles
{
    using System.Collections.Generic;
    public interface ISnake
    {
        byte Id { get; }

        int Ticks { get; }

        int X {get;set;}
        
        int Y {get;set;}

        Direction Direction {get;set;}

        List<Vector> Trail { get; }

        int Length { get; set; }

        Position MoveNew(Direction direction);
    }

}