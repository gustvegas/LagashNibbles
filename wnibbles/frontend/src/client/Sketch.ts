/// <reference path="../../typings/p5js/p5.d.ts"/>

import * as jQuery from 'jquery';
import {Nibbles} from './Nibbles';
import {DummyBehavior} from './DummyBehavior';
import {HttpBehavior} from './HttpBehavior';
import {Vector} from './Vector';

let nibbles: Nibbles;
let started: boolean = false;
let BLOCK_SIZE = 10;

var sketch = function(p) {

    p.setup = function() {
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
                let col = p.lerpColor(p.color(snake.color), p.color('#000000'), .5);
                p.stroke(col);
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
            $('#loser-name').css('background-color', nibbles.loser.color);
            $('#loser-hit').text(nibbles.hitTarget);
            if(nibbles.loser2 != null) {
                $('#loser-2-name').text(nibbles.loser2.id);                
                $('#loser-2-name').css('background-color', nibbles.loser2.color);
            }
        }
    };
};

$(document).ready(()=>{
    let spacex = +$('#topX').val();
    let spacey = +$('#topY').val();

    let myp5 = new p5(sketch);
    let canvas = myp5.createCanvas(spacex * BLOCK_SIZE, spacey * BLOCK_SIZE);
    canvas.parent('board');

    $('#start').click(()=>{
        $('#loser-name').text("");
        $('#loser-hit').text("");
        $('#loser-2-name').text("");

        let frameRate = +$('#framerate').val();
        let spacex = +$('#topX').val();
        let spacey = +$('#topY').val();
        let endpoints = JSON.parse($('#endpoints-data').attr('data-endpoints'));

        nibbles = new Nibbles(spacex, spacey);
        nibbles.clearSnakes();
        for(var i = 0; i < endpoints.endpoints.length; i++ ) {
            let endpoint = endpoints.endpoints[i];

            let checked = $("#endpoints input:checked").toArray();
            let elem = checked.find( (e) => {
                return $(e).val() == endpoint.id;
            });
            if(elem != null) {
                nibbles.addSnake(i+1, endpoint.color, new DummyBehavior());
            }
        }
        nibbles.init();

        myp5.frameRate(frameRate);
        myp5.resizeCanvas(spacex * BLOCK_SIZE, spacey * BLOCK_SIZE);

        started = true;
    });
});
