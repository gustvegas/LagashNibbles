namespace Nibbles
{
    public class Position
    {
        public int X {get; set;}
        
        public int Y {get; set;}

        public void Move(Direction direction)
        {
            var pos = MoveNew(direction);
            SetPosition(pos);
        }

        public Position MoveNew(Direction direction)
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

        public void SetPosition(Position position)
        {
            X = position.X;
            Y = position.Y;
        }
        public bool IsValid()
        {
            return (X >= 0) && (Y >= 0);
        }

        public bool IsValid(int topX, int topY)
        {
            return IsValid() && (X <= topX) && (Y <= topY);
        }
    }
}