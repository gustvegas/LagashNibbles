/**
 * Copyright (C) 2017 DiegoG.
 */
package org.lagash.nibbles;

public class Position implements IPosition {
    private int x, y;

    public int getX() {
        return x;
    }
    
    public void setX(int value) {
        this.x = value;
    }

    public int getY() {
        return y;
    }
    
    public void setY(int value) {
        this.y = value;
    }
    public void setPosition(IPosition position)
    {
        setX( position.getX() );
        setY( position.getY() );
    }

    public boolean isValid()
    {
        return (getX() >= 0) && (getY() >= 0);
    }

    public boolean isValid(int topX, int topY)
    {
        return isValid() && (getX() < topX) && (getY() < topY);
    }

    public void printPosition() {
        System.out.print("x:" + getX());
        System.out.println(" y:" + getY());
    }
}
