/**
 * Copyright (C) 2017 DiegoG.
 */
package org.lagash;

import java.util.logging.Level;
import java.util.logging.Logger;
import org.newdawn.slick.AppGameContainer;
import org.newdawn.slick.BasicGame;
import org.newdawn.slick.GameContainer;
import org.newdawn.slick.Graphics;
import org.newdawn.slick.SlickException;

/**
 * Main class.
 * @version 1.0.0
 */
public final class Main extends BasicGame {
    /**
     * width width.
     */
    private int width = 600;

    /**
     * height height.
     */
    private int height = 600;

    /**
     * Main constructor.
     * @param gamename name.
     */
    public Main(final String gamename) {
        super(gamename);
    }

    /**
     * init method.
     * @param gc controller.
     * @throws SlickException any error.
     */
    @Override
    public void init(final GameContainer gc)
        throws SlickException {
    }

    /**
     * update method.
     * @param gc controller.
     * @param i index.
     * @throws SlickException any error.
     */
    @Override
    public void update(final GameContainer gc, final int i)
        throws SlickException {
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
        g.drawString("Howdy!", 10, 10);
    }

    /**
     * main entry ponit.
     * @param args arguments.
     */
    public static void main(final String[] args) {
        try {
            AppGameContainer appgc;
            appgc = new AppGameContainer(new Main("Simple Slick Game"));
            appgc.setDisplayMode(600, 600, false);
            appgc.start();
        } catch (SlickException ex) {
            Logger.getLogger(Main.class.getName()).log(Level.SEVERE, null, ex);
        }
    }
}
