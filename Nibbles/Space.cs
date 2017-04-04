namespace Nibbles
{
    using System;

    public class Space
    {
        byte[,] space;

        public Space(byte[,] space)
        {
            this.space = space;
        }

        public byte this[int x, int y]
        {
            get
            {
                return space[x,y];
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