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

        void PrintSnakes(List<Snake> snakes)
        {
            foreach(var snake in snakes)
            {
                snake.PrintSnake();
            }
        }

        public void SetupTwoRandom()
        {
            snakes = new List<Snake>{ 
                new Snake{ Behavior = new DiegoGBehavior(), },
                new Snake{ Behavior = new DiegoGBehavior(), },
            };
            SetupAdjust();
        }

        public void SetupFourRandom()
        {
            snakes = new List<Snake>{ 
                new Snake{ Behavior = new DiegoGBehavior(), },
                new Snake{ Behavior = new DiegoGBehavior(), },
                new Snake{ Behavior = new DiegoGBehavior(), },
                new Snake{ Behavior = new DiegoGBehavior(), },
            };
            SetupAdjust();   
        }

        public void SetupAdjust()
        {
            Loser = null;
            space = new byte[SPACE_X, SPACE_Y];
            // Place snakes in space
            var rand = new Random();
            foreach(var snake in snakes)
            {
                snake.X = rand.Next(SPACE_X);
                snake.Y = rand.Next(SPACE_Y);
                snake.Direction = (Direction)rand.Next(3);

                // If snake placed in borders ensure a safe direction
                foreach(Direction dir in new[]{0,1,2,3})
                {
                    if(snake.WillHitNextStep(space))
                    {
                        snake.Direction = dir;
                    }
                    else
                    {
                        break;
                    }
                }
            }
        }

        public void MainLoop(bool debug)
        {
            Loser = null;
            space = new byte[SPACE_X, SPACE_Y];
            var newSpace = new Space(space);
            foreach(var snake in snakes)
            {
                space[snake.X,snake.Y] = snake.Id;
            }
            PrintSnakes(snakes);

            bool hit = false;
            int idx = 0;
            while(!hit)
            {
                Ticks++;
                foreach(var snake in snakes)
                {
                    if(debug)
                    {
                        newSpace.PrintSpace();
                        PrintSnakes(snakes);
                    }
                    var newDir = snake.Behavior.ChangeDirection(snake, newSpace, snakes.Select( s => (ISnake)s ).ToList() );
                    snake.ChangeDirection(newDir);
                    if(snake.WillHitNextStep(space))
                    {
                        Loser = snake;
                        idx = snake.WillHitNextStepInfo(space);
                        if(debug)
                        {
                            Console.WriteLine($"Hit: {snake.Id}:{idx}");
                            newSpace.PrintSpace();
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
            Console.WriteLine($"Loser: {Loser.Id} hit " + (idx == -1 ? "wall" : idx.ToString()));
        }       
    }
}