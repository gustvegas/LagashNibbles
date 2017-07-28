import { Nibbles } from './Nibbles';
var sketch = function (p) {
    let BLOCK_SIZE = 10;
    let frameRate = 10;
    let nibbles;
    p.setup = function () {
        nibbles = new Nibbles(5);
        nibbles.init();
        p.frameRate(frameRate);
        p.createCanvas(nibbles.SPACE_X * BLOCK_SIZE, nibbles.SPACE_Y * BLOCK_SIZE);
    };
    p.draw = function () {
        nibbles.update();
        p.background(0);
        for (let i = 0; i < nibbles.snakes.length; i++) {
            let snake = nibbles.snakes[i];
            p.fill(snake.color);
            p.stroke(snake.color);
            p.strokeWeight(1);
            if (nibbles.hit && nibbles.loser.id == snake.id) {
                p.stroke('#FFFFFF');
            }
            p.rect(snake.x * BLOCK_SIZE, snake.y * BLOCK_SIZE, BLOCK_SIZE - 1, BLOCK_SIZE - 1);
            let pvec = snake;
            for (let t = snake.trail.length - 1; t >= 0; t--) {
                let vec = snake.trail[t];
                p.strokeWeight(1);
                p.rect(vec.x * BLOCK_SIZE, vec.y * BLOCK_SIZE, BLOCK_SIZE - 1, BLOCK_SIZE - 1);
                if (pvec != null) {
                    p.strokeWeight(BLOCK_SIZE);
                    p.line((vec.x * BLOCK_SIZE) + 5, (vec.y * BLOCK_SIZE) + 5, (pvec.x * 10) + 5, (pvec.y * 10) + 5);
                }
                pvec = vec;
            }
        }
    };
};
var myp5 = new p5(sketch);
//# sourceMappingURL=Sketch.js.map