/**
 * Copyright (C) 2017 DiegoG.
 */
package org.lagash.nibbles;

import java.util.List;

public interface ISnakeBehavior {
    Direction changeDirection(ISnake snake, ISpace space, List<ISnake> snakes);
}