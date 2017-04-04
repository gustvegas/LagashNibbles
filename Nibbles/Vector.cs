namespace Nibbles
{
    public enum Direction : int
    { 
        North, 
        East,
        South, 
        West, 
    }

    public class Vector : Position
    {
        public Direction Direction {get;set;}
    }
}