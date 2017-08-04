/**
 * Copyright (C) 2017 DiegoG.
 */
package org.lagash.nibbles;

import java.util.List;

public interface ISnake extends IVector {
    int getId();

    int getTicks();

    List<IVector> getTrail();

    int getLength();

}