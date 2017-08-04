namespace Nibbles
{
    public interface IVector : IPosition
    {
        Direction Direction { get; }

        IPosition MoveNew();

        IPosition MoveNew(Direction direction);
    }
}