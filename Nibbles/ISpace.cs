namespace Nibbles
{
    public interface ISpace
    {
        int this[int x, int y]{ get; }
        int TopX { get; }
        int TopY { get; }
    }
}