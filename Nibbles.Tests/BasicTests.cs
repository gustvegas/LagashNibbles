using System.Collections.Generic;
using Xunit;

namespace Nibbles.Tests
{
    public class IntegrationTests
    {   
        [Fact]
        public void x6y6N_x6y5W()
        {
            Game game = new Game();
            game.snakes = new List<Snake>{ 
                new Snake{ X=6, Y=6, Direction= Direction.North, Behavior = new DiegoGBehavior(), },
                new Snake{ X=6, Y=5, Direction= Direction.West, Behavior = new DiegoGBehavior(), },
            };
            game.MainLoop(false);
            Assert.Equal(game.snakes[1].Id, game.Loser.Id);
        }

        [Fact]
        public void x0y0E_x9y9W()
        {
            Game game = new Game();
            game.snakes = new List<Snake>{ 
                new Snake{ X=0, Y=0, Direction= Direction.East, Behavior = new DiegoGBehavior(), },
                new Snake{ X=9, Y=9, Direction= Direction.West, Behavior = new DiegoGBehavior(), },
            };
            game.MainLoop(false);
            Assert.Equal(game.snakes[1].Id, game.Loser.Id);
        }
    }
}
