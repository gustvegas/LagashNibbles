/// <reference path="../../typings/p5js/p5.d.ts"/>

import * as jQuery from 'jquery';
import {Nibbles} from './Nibbles';
import {DummyBehavior} from './DummyBehavior';
import {HttpBehavior} from './HttpBehavior';
import {Vector} from './Vector';

let nibbles: Nibbles;
let started: boolean = false;
let BLOCK_SIZE = 10;
let frameRate: number = 10;

var sketch = function(p) {

    p.setup = function() {
        let canvas = p.createCanvas(nibbles.SPACE_X * BLOCK_SIZE, nibbles.SPACE_Y * BLOCK_SIZE);
        canvas.parent('board');
    };

    p.draw = function() {

        if(!started) {
            return;
        }
        nibbles.update();

        // Draw the project status
        p.background(0);
        for(let i: number = 0; i < nibbles.snakes.length; i++) {
            let snake = nibbles.snakes[i];

            p.fill(snake.color);
            p.stroke(snake.color);
            p.strokeWeight(1);
            if(nibbles.hit && 
               (nibbles.loser.id == snake.id ||
                (nibbles.loser2 != null && nibbles.loser2.id == snake.id))) {
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
                    p.line(
                        (vec.x * BLOCK_SIZE) + 5, (vec.y * BLOCK_SIZE) + 5, 
                        (pvec.x * BLOCK_SIZE) + 5, (pvec.y * BLOCK_SIZE) + 5);
                }
                pvec = vec;
            }
        }

        //update Loser
        if(nibbles.hit) {
            $('#loser-name').text(nibbles.loser.id);
            $('#loser-hit').text(nibbles.hitTarget);
            if(nibbles.loser2 != null) {
                $('#loser-2-name').text(nibbles.loser2.id);                
            }
        }
    };
};

$(document).ready(()=>{
    let spacex = +$('#topX').val();
    let spacey = +$('#topY').val();
    nibbles = new Nibbles(1, new DummyBehavior(), spacex, spacey);
    let myp5 = new p5(sketch);

    $('#start').click(()=>{
        $('#loser-name').text("");
        $('#loser-hit').text("");
        $('#loser-2-name').text("");
        frameRate = +$('#framerate').val();

        let spacex = +$('#topX').val();
        let spacey = +$('#topY').val();
        nibbles = new Nibbles(4, new DummyBehavior(), spacex, spacey);
        
        myp5.frameRate(frameRate);
        myp5.resizeCanvas(spacex * BLOCK_SIZE, spacey * BLOCK_SIZE);

        nibbles.init();
        started = true;
    });
});
