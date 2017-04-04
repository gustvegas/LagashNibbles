namespace Nibbles
{
    using System;
    using System.Collections.Generic;
    using System.Linq;

    public class Game
    {
        int SPACE_X = 10;
        
        int SPACE_Y = 10;

        int REDUCE_STEP = 5;

        public int Ticks = 0;

        byte[,] space;

        public List<Snake> snakes;

        public Snake Loser;

        void PrintSpace(byte[,] space)
        {
            Console.WriteLine();
            for(var x = 0; x <= space.GetUpperBound(0); x++)
            {
                for(var y = 0; y <= space.GetUpperBound(0); y++)
                {
                    Console.Write(" ");
                    Console.Write(space[x,y]);
                }
                Console.WriteLine();
            }
        }

        void PrintSnakes(List<Snake> snakes)
        {
            foreach(var snake in snakes)
            {
                Console.WriteLine($"  {snake.Id}:({Ticks}): x:{snake.X}, y:{snake.Y}, {snake.Direction}, l:{snake.Length}");
                foreach(var vec in snake.Trail)
                {
                    Console.WriteLine($"\t{vec.X}, {vec.Y} {vec.Direction}");
                }
            }
        }

        public void SetupTwoRandom()
        {
            Loser = null;
            space = new byte[SPACE_X, SPACE_Y];
            snakes = new List<Snake>{ 
                new Snake{ Behavior = new DiegoGBehavior(), },
                new Snake{ Behavior = new DiegoGBehavior(), },
            };
            
            // Place snakes in space
            var rand = new Random();
            foreach(var snake in snakes)
            {
                snake.X = rand.Next(space.GetUpperBound(0)+1);
                snake.Y = rand.Next(space.GetUpperBound(1)+1);
                snake.Direction = (Direction)rand.Next(4);

                // If snake placed in borders ensure a safe direction
                while(snake.WillHitNextStep(space))
                {
                    snake.Direction = (Direction)rand.Next(4);
                }
            }
        }

        public void SetupFourRandom()
        {
            Loser = null;
            space = new byte[SPACE_X, SPACE_Y];
            snakes = new List<Snake>{ 
                new Snake{ Behavior = new DiegoGBehavior(), },
                new Snake{ Behavior = new DiegoGBehavior(), },
                new Snake{ Behavior = new DiegoGBehavior(), },
                new Snake{ Behavior = new DiegoGBehavior(), },
            };
            
            // Place snakes in space
            var rand = new Random();
            foreach(var snake in snakes)
            {
                snake.X = rand.Next(space.GetUpperBound(0)+1);
                snake.Y = rand.Next(space.GetUpperBound(1)+1);
                snake.Direction = (Direction)rand.Next(4);

                // If snake placed in borders ensure a safe direction
                foreach(Direction dir in new[]{0,1,2,3})
                {
                    if(snake.WillHitNextStep(space))
                    {
                        snake.Direction = dir;
                    }
                }
            }
        }

        public void MainLoop(bool debug)
        {
            Loser = null;
            space = new byte[SPACE_X, SPACE_Y];
            foreach(var snake in snakes)
            {
                space[snake.X,snake.Y] = snake.Id;
            }
            PrintSnakes(snakes);

            bool hit = false;
            while(!hit)
            {
                Ticks++;
                foreach(var snake in snakes)
                {
                    if(debug)
                    {
                        PrintSpace(space);
                        PrintSnakes(snakes);
                    }
                    var newDir = snake.Behavior.ChangeDirection(snake, space, snakes.Select( s => (ISnake)s ).ToList() );
                    snake.ChangeDirection(newDir);
                    if(snake.WillHitNextStep(space))
                    {
                        Loser = snake;
                        var idx = snake.WillHitNextStepInfo(space);
                        if(debug)
                        {
                            Console.WriteLine($"Hit: {snake.Id}:{idx}");
                            PrintSpace(space);
                            PrintSnakes(snakes);
                        }
                        hit = true;
                        break;
                    }
                    snake.Step();
                    space[snake.X, snake.Y] = snake.Id;
                    if(Ticks % REDUCE_STEP == 0)
                    {
                        Vector first = snake.Trail.First();
                        Vector initial = new Vector{X=first.X, Y=first.Y, Direction=first.Direction};
                        snake.ReduceLength(1);
                        space[initial.X, initial.Y] = 0;
                    }
                }
            }
            Console.WriteLine($"Winner: {Loser.Id}");
        }       
    }
}