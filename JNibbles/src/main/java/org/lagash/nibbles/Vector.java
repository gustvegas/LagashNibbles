/**
 * Copyright (C) 2017 DiegoG.
 */
package org.lagash.nibbles;

public class Vector extends Position implements IVector {
    Direction direction;

    public Direction getDirection() {
        return direction;
    }

    public void setDirection(Direction value) {
        direction = value;
    }

    public void move() {
        Position pos = (Position)moveNew();
        setPosition(pos);
    }

    public IPosition moveNew() {
        return moveNew(getDirection());
    }

    public IPosition moveNew(Direction direction) {
        Position pos = new Position();
        pos.setX( getX() );
        pos.setY( getY() );
        if(direction == Direction.North) {
            pos.setY( getY()-1 );
        } else if(direction == Direction.East) {
            pos.setX( getX()+1 );
        } else if(direction == Direction.South) {
            pos.setY( getY()+1 );
        } else if(direction == Direction.West) {
            pos.setX( getX()-1 );
        }
        return pos;
    }
}
