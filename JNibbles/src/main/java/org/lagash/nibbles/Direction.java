/**
 * Copyright (C) 2017 DiegoG.
 */
package org.lagash.nibbles;

public enum Direction
{ 
    North(0), East(1), South(2), West(3);

    private final int value;
    private Direction(int value) {
        this.value = value;
    }

    public int getValue() {
        return value;
    }
}