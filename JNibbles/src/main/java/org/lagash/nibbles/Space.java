/**
 * Copyright (C) 2017 DiegoG.
 */
package org.lagash.nibbles;

public class Space implements ISpace {
    int[][] space;

    public Space(int x, int y) {
        this.space = new int[x][y];
    }

    public int get(int x, int y) {
        return space[x][y];
    }

    public void printSpace()
    {
        System.out.println();
        for(int y = 0; y < getTopY(); y++)
        {
            for(int x = 0; x < getTopX(); x++) {
                System.out.print(" ");
                System.out.print(space[x][y]);
            }
            System.out.println();
        }
    }

    public void set(int x, int y, int value) {
        space[x][y] = value;
    }

    public int getTopX() {
        return space.length;
    }

    public int getTopY() {
        return space[0].length;
    }
}