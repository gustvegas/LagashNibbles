/// <reference path="../../typings/p5js/p5.d.ts"/>

import * as jQuery from 'jquery';
import {Nibbles} from './Nibbles';
import {DummyBehavior} from './DummyBehavior';
import {HttpBehavior} from './HttpBehavior';
import {Vector} from './Vector';

var sketch = function(p) {

    let BLOCK_SIZE = 10;
    let frameRate = 10;
    let nibbles: Nibbles;

    p.setup = function() {
        nibbles = new Nibbles(4, new DummyBehavior());
        nibbles.init();

        p.frameRate(frameRate);
        let canvas = p.createCanvas(nibbles.SPACE_X * BLOCK_SIZE, nibbles.SPACE_Y * BLOCK_SIZE);
        canvas.parent('board');
    };

    p.draw = function() {

        nibbles.update();

        // Draw the project status
        p.background(0);
        for(let i: number = 0; i < nibbles.snakes.length; i++) {
            let snake = nibbles.snakes[i];

            p.fill(snake.color);
            p.stroke(snake.color);
            p.strokeWeight(1);
            if(nibbles.hit && nibbles.loser.id == snake.id) {
                p.stroke('#FFFFFF');
            }
            p.rect(snake.x * BLOCK_SIZE, snake.y * BLOCK_SIZE, BLOCK_SIZE-1, BLOCK_SIZE-1);

            let pvec: Vector = snake;
            for(let t: number = snake.trail.length-1; t >= 0; t--) {
                let vec = snake.trail[t];

                p.strokeWeight(1);
                p.rect(vec.x * BLOCK_SIZE, vec.y * BLOCK_SIZE, BLOCK_SIZE-1, BLOCK_SIZE-1);
                if(pvec != null) {
                    p.strokeWeight(BLOCK_SIZE);
                    p.line((vec.x * BLOCK_SIZE) + 5, (vec.y * BLOCK_SIZE) + 5, (pvec.x * 10) + 5, (pvec.y * 10) + 5);
                }
                pvec = vec;
            }
        }

        //update Loser
        if(nibbles.hit) {
            $('#loser-name').text(nibbles.loser.id);
            $('#loser-hit').text(nibbles.hitTarget);
        }
    };
};

var myp5 = new p5(sketch);