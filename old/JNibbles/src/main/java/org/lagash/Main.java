/**
 * Copyright (C) 2017 DiegoG.
 */
package org.lagash;

import org.lagash.nibbles.Space;
import org.lagash.nibbles.Snake;
import org.lagash.nibbles.ISnake;
import org.lagash.nibbles.ISnakeBehavior;
import org.lagash.nibbles.Direction;
import org.lagash.nibbles.IVector;
import org.lagash.nibbles.Vector;

import java.util.Collections;
import java.util.logging.Level;
import java.util.logging.Logger;
import java.util.List;
import java.util.ArrayList;
import java.util.ListIterator;
import java.util.Iterator;
import java.util.Random;
import java.io.File;

import org.newdawn.slick.AppGameContainer;
import org.newdawn.slick.BasicGame;
import org.newdawn.slick.GameContainer;
import org.newdawn.slick.Graphics;
import org.newdawn.slick.Color;
import org.newdawn.slick.Input;
import org.newdawn.slick.SlickException;
//import org.lwjgl.opengl.glu.GLU;

/**
 * Main class.
 * @version 1.0.0
 */
public final class Main extends BasicGame {
    /**
     * width width.
     */
    private static int width = 600;

    /**
     * height height.
     */
    private static int height = 600;

    private int SPACE_X = 50;
    
    private int SPACE_Y = 50;

    private Space space;

    private int REDUCE_STEP = 5;

    private int Ticks = 0;

    private List<Color> colours;
    /**
     * snakes list.
     */
    private List<Snake> snakes;

    private Snake loser;

    /**
     * updateFreq Update frequency.
     */
    private long updateFreq = 50;

    /**
     * Main constructor.
     * @param gamename name.
     */
    public Main(final String gamename) {
        super(gamename);
        Input.disableControllers();

        colours = new ArrayList<Color>();
        colours.add(Color.red);
        colours.add(Color.green);
        colours.add(Color.blue);
        colours.add(Color.yellow);
        colours.add(Color.magenta);
        colours.add(Color.gray);
        colours.add(Color.white);

        this.setupRandom(7, new DiegoGBehavior());
    }

    public void setupRandom(int qty, ISnakeBehavior behavior) {
        snakes = new ArrayList<Snake>();
        for(int i = 0; i < qty; i++) {
            Snake newSnake = new Snake();
            newSnake.setColor(colours.get(i));
            newSnake.setBehavior(behavior);
            snakes.add(newSnake);
        }
        this.loser = null;
        space = new Space(SPACE_X, SPACE_Y);
        // Place snakes in space
        Random rand = new Random();
        Iterator<Snake> itr = snakes.iterator();
        while(itr.hasNext()) {
            Snake snake = (Snake)itr.next();
            snake.setX( rand.nextInt(SPACE_X-1) );
            snake.setY( rand.nextInt(SPACE_Y-1) );
            snake.setDirection( Direction.values()[rand.nextInt(3)] );

            // If snake placed in borders ensure a safe direction
            for(int i = 0; i < 4; i++) {
                Direction dir = Direction.values()[i];
                if(snake.willHitNextStep(space)) {
                    snake.setDirection( dir );
                } else {
                    break;
                }
            }
        }
    }
    
    /**
     * init method.
     * @param gc controller.
     * @throws SlickException any error.
     */
    @Override
    public void init(final GameContainer gc)
        throws SlickException {

        loser = null;
        space = new Space(SPACE_X, SPACE_Y);
        Iterator<Snake> itr = snakes.iterator();
        while(itr.hasNext()) {
            Snake snake = (Snake)itr.next();
            space.set(snake.getX(), snake.getY(), snake.getId());
        }
        printSnakes(snakes);
    }

    /**
     * lastPosMillis Last time update occurs.
     */
    long lastUpdateMillis = 0;

    boolean hit = false;

    /**
     * update method.
     * @param gc controller.
     * @param i index.
     * @throws SlickException any error.
     */
    @Override
    public void update(final GameContainer gc, final int i)
        throws SlickException {

        boolean debug = false;
        if((System.currentTimeMillis() - lastUpdateMillis) > updateFreq) {
            lastUpdateMillis = System.currentTimeMillis();

            int idx = 0;
            if(!hit) {
                this.Ticks++;
                Iterator<Snake> itr = snakes.iterator();
                while(itr.hasNext()) {
                    Snake snake = (Snake)itr.next();
                    if(debug) {
                        space.printSpace();
                        printSnakes(snakes);
                    }

                    List<? extends ISnake> list = snakes;
                    Direction newDir = snake.getBehavior().changeDirection(snake, space, Collections.unmodifiableList(list) );
                    snake.changeDirection(newDir);
                    if(snake.willHitNextStep(space)) {
                        this.loser = snake;
                        idx = snake.willHitNextStepInfo(space);
                        if(debug) {
                            System.out.println(String.format("Hit: %d:%d", snake.getId(), idx));
                            space.printSpace();
                            this.printSnakes(snakes);
                        }
                        System.out.println(String.format("Loser: %d hit " + (idx == -1 ? "wall" : idx), this.loser.getId(), idx));
                        hit = true;
                        break;
                    }
                    snake.step();
                    space.set(snake.getX(), snake.getY(), snake.getId());
                    if(Ticks % REDUCE_STEP == 0) {
                        Vector initial = snake.getTailPosition();
                        snake.reduceLength(1);
                        space.set(initial.getX(), initial.getY(), 0);
                    }
                }
            }
        }
    }

    /**
     * render method.
     * @param gc controller.
     * @param g graphics.
     * @throws SlickException any error.
     */
    @Override
    public void render(final GameContainer gc, final Graphics g)
        throws SlickException {
        Iterator<Snake> itr = snakes.iterator();
        while(itr.hasNext()) {
            Snake snake = (Snake)itr.next();
            renderSnake(snake, g);
        }
    }

    public void renderSnake(Snake snake, Graphics g) {
        g.setColor(snake.getColor());
        g.setLineWidth(1);

        g.fillRect(snake.getX() * 10, snake.getY() * 10, 10, 10);

        List<IVector> list = snake.getTrail();
        ListIterator<IVector> iter = list.listIterator(list.size());
        IVector pvec = snake;
        while (iter.hasPrevious()) {
            IVector vec = iter.previous();
            g.fillRect(vec.getX() * 10, vec.getY() * 10, 10, 10);
            if(pvec != null) {
                g.setLineWidth(10);
                g.drawLine((vec.getX() * 10) + 5, (vec.getY() * 10) + 5, (pvec.getX() * 10) + 5, (pvec.getY() * 10) + 5);
            }
            pvec = vec;
        }
    }

    void printSnakes(List<Snake> snakes) {
        Iterator<Snake> iter = snakes.iterator();
        while (iter.hasNext()) {
            Snake snake = iter.next();
            snake.printSnake();
        }
    }

    /**
     * main entry ponit.
     * @param args arguments.
     */
    public static void main(final String[] args) {
        try {
            System.setProperty("org.lwjgl.librarypath",
                new File("lib").getAbsolutePath());
            System.setProperty("java.library.path",
                new File("lib").getAbsolutePath());
            AppGameContainer appgc;
            appgc = new AppGameContainer(new Main("Lagash Nibbles !"));
            appgc.setDisplayMode(width, height, false);
            appgc.start();
        } catch (SlickException ex) {
            Logger.getLogger(Main.class.getName()).log(Level.SEVERE, null, ex);
        }
    }
}
