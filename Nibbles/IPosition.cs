namespace Nibbles
{
    public interface IPosition
    {
        int X { get; }
        
        int Y { get; }

        bool IsValid();

        bool IsValid(int topX, int topY);
    }
}