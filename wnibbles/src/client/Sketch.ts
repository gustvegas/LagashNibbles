/// <reference path="../../typings/p5js/p5.d.ts"/>

import {Nibbles} from './Nibbles';

var sketch = function( p ) {

    var blockSize = 10;
    var frameRate = 10;
    var nibbles;

    p.setup = function() {
        nibbles = new Nibbles();
        nibbles.init();

        
        nibbles.SPACE_Y
        p.frameRate(frameRate);
        p.createCanvas(nibbles.SPACE_X * blockSize, nibbles.SPACE_Y * blockSize);
    };

    p.draw = function() {

        nibbles.update();

        p.background(0);
        for(let i: number = 0; i < nibbles.snakes.length; i++) {
            let snake = nibbles.snakes[i];

            p.fill(snake.color);
            p.stroke(snake.color);
            p.strokeWeight(1)
            p.rect(snake.x * blockSize, snake.y * blockSize, blockSize-1, blockSize-1);

            let pvec = snake;
            for(let t: number = 0; t < snake.trail.length; t++) {
                let vec = snake.trail[t];

                p.rect(vec.x * blockSize, vec.y * blockSize, blockSize-1, blockSize-1);
                if(pvec != null) {
                    p.strokeWeight(blockSize);
                    p.line((vec.x * 10) + 5, (vec.y * 10) + 5, (pvec.x * 10) + 5, (pvec.y * 10) + 5);
                }
                pvec = vec;
            }

        }
    };
};

var myp5 = new p5(sketch);