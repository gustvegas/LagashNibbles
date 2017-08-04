/**
 * Copyright (C) 2017 DiegoG.
 */
package org.lagash.nibbles;

import java.util.List;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Iterator;

import org.newdawn.slick.Color;

public class Snake extends Vector implements ISnake {
    private static byte Count = 1;

    private int ticks = 0;

    private int id;

    private Color color;

    private int length;

    private List<Vector> trail;

    private ISnakeBehavior snake;

    public ISnakeBehavior getBehavior() {
        return this.snake;
    }

    public void setBehavior(ISnakeBehavior value) {
        this.snake = value;
    }
    
    public List<IVector> getTrail() {
        List<? extends IVector> list = trail;
        return Collections.unmodifiableList(list);
    }

    public int getTicks() { 
        return ticks; 
    }

    public Snake() {
        this.id = Count++;
        this.trail = new ArrayList<Vector>();
        this.length = 1;
    }

    public int getId() {
        return id;
    }

    public void setId(int value) {
        this.id = value;
    }

    public Color getColor() {
        return this.color;
    }

    public void setColor(Color value) {
        this.color = value;
    }
    public int getLength() {
        return length;
    }

    public void setLength(int value) {
        this.length = value;
    }

    public void changeDirection(Direction direction) {
        if(getDirection() != direction || getTrail().size() == 0) {
            Vector vec = new Vector();
            vec.setX( this.getX() );
            vec.setY( this.getY() );
            vec.setDirection( direction );
            trail.add(vec);
            setDirection( direction );
        }
    }

    public Vector reduceLength(int count) {
        length -= count;

        Vector first = trail.get(0);
        Vector second = trail.size() > 1 ? trail.get(1) : null;
        IPosition newFirst = first.moveNew(first.getDirection());
        first.setPosition(newFirst);
        if(second != null && 
            first.getX() == second.getX() && first.getY() == second.getY()) {
            trail.remove(first);
        }
        return first;
    }

    public void step() {
        this.ticks++;
        this.length++;
        this.move();
    }

    public Vector getTailPosition() {
        Vector first = trail.get(0);
        Vector newVec = new Vector();
        newVec.setX( first.getX() );
        newVec.setY( first.getY() );
        newVec.setDirection( first.getDirection() );
        return newVec;
    }

    public boolean willHitNextStep(Space space) {
        IPosition pos = moveNew(getDirection());
        if(pos.isValid(space.getTopX(), space.getTopY())
            && (space.get(pos.getX(), pos.getY()) == 0)) {
            return false;
        }
        return true;
    }

    public int willHitNextStepInfo(Space space) {
        IPosition pos = moveNew(getDirection());
        if(!pos.isValid(space.getTopX(), space.getTopY())) {
            return -1;
        }
        return space.get(pos.getX(), pos.getY());
    }

    public void printSnake() {
        System.out.println(String.format("  %d:(%d): x:%d, y:%d, %s, l:%d", id, ticks, getX(), getY(), getDirection(), getLength()));
        Iterator<Vector> iter = trail.iterator();
        while (iter.hasNext()) {
            Vector vec = iter.next();
            System.out.println(String.format("\t%d, %d %s", vec.getX(), vec.getY(), vec.getDirection()));
        }
    }
}