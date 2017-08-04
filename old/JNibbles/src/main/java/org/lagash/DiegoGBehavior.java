/**
 * Copyright (C) 2017 DiegoG.
 */
package org.lagash;

import org.lagash.nibbles.IPosition;
import org.lagash.nibbles.ISnake;
import org.lagash.nibbles.ISpace;
import org.lagash.nibbles.Direction;
import org.lagash.nibbles.ISnakeBehavior;

import java.util.List;

public class DiegoGBehavior implements ISnakeBehavior {
    public Direction changeDirection(ISnake snake, ISpace space, List<ISnake> snakes) {
        // Si no me choco adelante, sigo igual
        IPosition pos = snake.moveNew();
        if(pos.isValid(space.getTopX(), space.getTopY())
            && (space.get(pos.getX(), pos.getY()) == 0)) {
            return snake.getDirection();                
        }

        //Busco nueva dirección clockwise para no chocarme
        for(int i = 0; i < 4; i++) {
            Direction dir = Direction.values()[i];
            pos = snake.moveNew(dir);
            if(!pos.isValid(space.getTopX(), space.getTopY())) {
                continue;
            }
            if(space.get(pos.getX(), pos.getY()) > 0) {
                continue;
            }
            return dir;
        }
        return snake.getDirection();
    }
}