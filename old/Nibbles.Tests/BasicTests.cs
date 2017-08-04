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
            game.SetupClean();
            game.SetupAddSnake(6,6,Direction.North);
            game.SetupAddSnake(6,5,Direction.North);
            game.MainLoop(false);
            Assert.Equal(2, game.LoserId);
        }

        [Fact]
        public void x0y0E_x9y9W()
        {
            Game game = new Game();
            game.SetupClean();
            game.SetupAddSnake(0,0,Direction.East);
            game.SetupAddSnake(9,9,Direction.West);
            game.MainLoop(false);
            Assert.Equal(2, game.LoserId);
        }
    }
}
