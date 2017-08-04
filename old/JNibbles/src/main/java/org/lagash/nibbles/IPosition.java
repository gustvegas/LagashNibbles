/**
 * Copyright (C) 2017 DiegoG.
 */
package org.lagash.nibbles;

public interface IPosition {
    int getX();
    
    int getY();

    boolean isValid();

    boolean isValid(int topX, int topY);
}
