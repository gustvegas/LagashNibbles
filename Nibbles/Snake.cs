namespace Nibbles
{
    using System.Collections.Generic;
    
    public class Snake : Vector, ISnake
    {
        private static byte Count = 1;

        private int ticks = 0;

        public ISnakeBehavior Behavior { get; set; }

        public List<Vector> Trail { get; set; }

        public int Ticks
        { 
            get{ return ticks; } 
        }

        public Snake()
        {
            Id = Count++;
            Trail = new List<Vector>();
            Length = 1;
        }

        public byte Id { get; }

        public int Length { get; set;}

        public void ChangeDirection(Direction direction)
        {
            if(Direction != direction || Trail.Count == 0)
            {
                Trail.Add(new Vector{X = X, Y = Y, Direction = direction});
                Direction = direction;
            }
        }

        public Vector ReduceLength(int count)
        {
            Length = Length - count;
            Vector first = Trail[0];
            Vector second = Trail.Count > 1 ? Trail[1] : null;
            var newFirst = first.MoveNew(first.Direction);
            first.SetPosition(newFirst);
            if(second != null && 
               first.X == second.X && first.Y == second.Y)
            {
                Trail.Remove(first);
            }
            return first;
        }

        public void Step()
        {
            ticks++;
            Length++;
            Move(Direction);
        }

        public bool WillHitNextStep(byte[,] space)
        {
            Position pos = MoveNew(Direction);
            if(pos.IsValid(space.GetUpperBound(0), space.GetUpperBound(1))
               && (space[pos.X, pos.Y] == 0))
            {
                return false;
            }
            return true;
        }

        public int WillHitNextStepInfo(byte[,] space)
        {
            Position pos = MoveNew(Direction);
            if(!pos.IsValid(space.GetUpperBound(0), space.GetUpperBound(1)))
            {
                return -1;
            }
            return space[pos.X, pos.Y];
        }
    }
}