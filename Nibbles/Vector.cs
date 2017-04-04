namespace Nibbles
{
    public enum Direction : int
    { 
        North, 
        East,
        South, 
        West, 
    }

    class Vector : Position, IVector
    {
        public Direction Direction { get; set; }
    }
}