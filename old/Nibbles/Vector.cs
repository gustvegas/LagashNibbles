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

        public void Move()
        {
            var pos = MoveNew();
            SetPosition(pos);
        }

        public IPosition MoveNew()
        {
            return MoveNew(Direction);
        }

        public IPosition MoveNew(Direction direction)
        {
            var pos = new Position{ X = X, Y = Y };
            if(direction == Direction.North)
            {
                pos.X--;
            }else if(direction == Direction.East)
            {
                pos.Y++;
            }else if(direction == Direction.South)
            {
                pos.X++;                
            }else if(direction == Direction.West)
            {
                pos.Y--;
            }
            return pos;
        }
    }
}