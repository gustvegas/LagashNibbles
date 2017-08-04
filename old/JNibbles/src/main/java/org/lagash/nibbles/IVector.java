/**
 * Copyright (C) 2017 DiegoG.
 */
package org.lagash.nibbles;

public interface IVector extends IPosition {
    Direction getDirection();

    IPosition moveNew();

    IPosition moveNew(Direction direction);
}
