namespace Nibbles
{
    using System;
    using System.Collections.Generic;
    using System.Linq;

    public class Game
    {
        private int SPACE_X = 10;
        
        private int SPACE_Y = 10;

        private Space space;

        private int REDUCE_STEP = 5;

        private int Ticks = 0;

        private List<Snake> snakes;

        private Snake Loser;

        public int LoserId
        {
            get
            {
                return Loser.Id;
            }
        }

        void PrintSnakes(List<Snake> snakes)
        {
            foreach(var snake in snakes)
            {
                snake.PrintSnake();
            }
        }

        public void SetupClean()
        {
            snakes = new List<Snake>();
        }

        public void SetupAddSnake(int x, int y, Direction direction, ISnakeBehavior behavior)
        {
            var snake = new Snake{ Id = snakes.Count+1, X = x, Y = y, Direction = direction, Behavior = behavior, };
            snakes.Add(snake);
        }

        public void SetupRandom(int qty, ISnakeBehavior behavior)
        {
            snakes = new List<Snake>();
            for(var i = 0; i < qty; i++)
            {
                snakes.Add(new Snake{ Behavior = behavior, });
            }
            Loser = null;
            space = new Space(SPACE_X, SPACE_Y);
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
            space = new Space(SPACE_X, SPACE_Y);
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
                        space.PrintSpace();
                        PrintSnakes(snakes);
                    }
                    var newDir = snake.Behavior.ChangeDirection(snake, space, snakes.Select( s => (ISnake)s ).ToList().AsReadOnly() );
                    snake.ChangeDirection(newDir);
                    if(snake.WillHitNextStep(space))
                    {
                        Loser = snake;
                        idx = snake.WillHitNextStepInfo(space);
                        if(debug)
                        {
                            Console.WriteLine($"Hit: {snake.Id}:{idx}");
                            space.PrintSpace();
                            PrintSnakes(snakes);
                        }
                        hit = true;
                        break;
                    }
                    snake.Step();
                    space[snake.X, snake.Y] = snake.Id;
                    if(Ticks % REDUCE_STEP == 0)
                    {
                        IVector first = snake.Trail.First();
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