namespace Nibbles
{
    using System;

    class Space : ISpace
    {
        int[,] space;

        public Space(int x, int y)
        {
            this.space = new int[x,y];
        }

        public int this[int x, int y]
        {
            get
            {
                return space[x,y];
            }
            set
            {
                space[x,y] = value;
            }
        }

        public void PrintSpace()
        {
            Console.WriteLine();
            for(var x = 0; x <= TopX; x++)
            {
                for(var y = 0; y <= TopY; y++)
                {
                    Console.Write(" ");
                    Console.Write(space[x,y]);
                }
                Console.WriteLine();
            }
        }

        public int TopX
        {
            get
            {
                return space.GetUpperBound(0);
            }
        }

        public int TopY
        {
            get
            {
                return space.GetUpperBound(1);
            }
        }
    }
}