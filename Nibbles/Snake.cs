namespace Nibbles
{
    using System;
    using System.Linq;
    using System.Collections.Generic;
    
    class Snake : Vector, ISnake
    {
        private static byte Count = 1;

        private int ticks = 0;

        private List<Vector> trail;

        public ISnakeBehavior Behavior { get; set; }
        
        public IReadOnlyCollection<IVector> Trail 
        { 
            get
            {
                return trail.Select( vec => (IVector)vec ).ToList().AsReadOnly();
            }
        }

        public int Ticks
        { 
            get{ return ticks; } 
        }

        public Snake()
        {
            Id = Count++;
            trail = new List<Vector>();
            Length = 1;
        }

        public int Id { get; set; }

        public int Length { get; set;}

        public void ChangeDirection(Direction direction)
        {
            if(Direction != direction || Trail.Count == 0)
            {
                trail.Add(new Vector{X = X, Y = Y, Direction = direction});
                Direction = direction;
            }
        }

        public Vector ReduceLength(int count)
        {
            Length = Length - count;
            Vector first = trail.First();
            Vector second = Trail.Count > 1 ? trail[1] : null;
            var newFirst = first.MoveNew(first.Direction);
            first.SetPosition(newFirst);
            if(second != null && 
               first.X == second.X && first.Y == second.Y)
            {
                trail.Remove(first);
            }
            return first;
        }

        public void Step()
        {
            ticks++;
            Length++;
            Move();
        }

        public Vector GetTailPosition()
        {
            Vector first = trail.First();
            return new Vector{X=first.X, Y=first.Y, Direction=first.Direction};
        }

        public bool WillHitNextStep(Space space)
        {
            IPosition pos = MoveNew(Direction);
            if(pos.IsValid(space.TopX, space.TopY)
               && (space[pos.X, pos.Y] == 0))
            {
                return false;
            }
            return true;
        }

        public int WillHitNextStepInfo(Space space)
        {
            IPosition pos = MoveNew(Direction);
            if(!pos.IsValid(space.TopX, space.TopY))
            {
                return -1;
            }
            return space[pos.X, pos.Y];
        }

        public void PrintSnake()
        {
            Console.WriteLine($"  {Id}:({Ticks}): x:{X}, y:{Y}, {Direction}, l:{Length}");
            foreach(var vec in Trail)
            {
                Console.WriteLine($"\t{vec.X}, {vec.Y} {vec.Direction}");
            }
        }
    }
}