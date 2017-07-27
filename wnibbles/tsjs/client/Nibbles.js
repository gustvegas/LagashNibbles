import { Snake } from './Snake';
import { Space } from './Space';
import { DummyBehavior } from './DummyBehavior';
import { Direction } from './Direction';
const WHITE = "#FFFFFF";
const RED = "#FF0000";
const BLUE = "#0000FF";
const GREEN = "#008000F";
const YELLOW = "#ffff00";
const MAGENTA = "#ff00ff";
const GRAY = "#808080";
export class Nibbles {
    constructor() {
        this.SPACE_X = 30;
        this.SPACE_Y = 30;
        this.REDUCE_STEP = 5;
        this.ticks = 0;
        this.colors = new Array();
        this.colors.push(RED);
        this.colors.push(GREEN);
        this.colors.push(BLUE);
        this.colors.push(YELLOW);
        this.colors.push(MAGENTA);
        this.colors.push(GRAY);
        this.colors.push(WHITE);
        this.setupRandom(2, new DummyBehavior());
    }
    randomIntFromInterval(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
    setupRandom(qty, behavior) {
        this.snakes = new Array();
        for (let i = 0; i < qty; i++) {
            let snake = new Snake(i);
            snake.color = this.colors[i];
            snake.behavior = behavior;
            this.snakes.push(snake);
        }
        this.loser = null;
        this.space = new Space(this.SPACE_X, this.SPACE_Y);
        for (let i = 0; i < qty; i++) {
            let snake = this.snakes[i];
            snake.x = this.randomIntFromInterval(0, this.SPACE_X);
            snake.y = this.randomIntFromInterval(0, this.SPACE_Y);
            snake.direction = Direction[Direction[this.randomIntFromInterval(1, 4)]];
            for (let i = 1; i <= 4; i++) {
                let direction = Direction[Direction[i]];
                if (snake.willHitNextStep(this.space)) {
                    snake.direction = direction;
                }
                else {
                    break;
                }
            }
        }
    }
    init() {
        this.loser = null;
        this.space = new Space(this.SPACE_X, this.SPACE_Y);
        for (let i = 0; i < this.snakes.length; i++) {
            let snake = this.snakes[i];
            this.space.map[snake.x][snake.y] = snake.id;
        }
    }
    update() {
        let debug = false;
        let idx = 0;
        if (!this.hit) {
            this.ticks++;
            for (let i = 0; i < this.snakes.length; i++) {
                let snake = this.snakes[i];
                if (debug) {
                }
                let newDir = snake.behavior.changeDirection(snake, this.space, this.snakes);
                snake.changeDirection(newDir);
                if (snake.willHitNextStep(this.space)) {
                    this.loser = snake;
                    idx = snake.willHitNextStepInfo(this.space);
                    if (debug) {
                    }
                    this.hit = true;
                    break;
                }
                snake.step();
                this.space.map[snake.x][snake.y] = snake.id;
                if (this.ticks % this.REDUCE_STEP == 0) {
                    let initial = snake.getTailPosition();
                    snake.reduceLength(1);
                    this.space.map[initial.x][initial.y] = 0;
                }
            }
        }
    }
}
//# sourceMappingURL=Nibbles.js.map