namespace Nibbles
{
    class Position : IPosition
    {
        public int X { get; set; }
        
        public int Y { get; set; }

        public void SetPosition(IPosition position)
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