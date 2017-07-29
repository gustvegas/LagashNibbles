import {Pos} from './Pos';
import {Vector} from './Vector';
import {Snake} from './Snake';
import {Space} from './Space';
import {ISnakeBehavior} from './ISnakeBehavior';
import {Direction} from './Direction';

export type Color = "#FFFFFF" | "#FF0000" | "#0000FF" | "#008000" | "#FFFF00" | "#FF00FF" | "#808080" | "#FFA500" | "#008080";
const WHITE: Color = "#FFFFFF";
const RED: Color = "#FF0000";
const BLUE: Color = "#0000FF";
const GREEN: Color = "#008000";
const YELLOW: Color = "#FFFF00";
const MAGENTA: Color = "#FF00FF";
const GRAY: Color = "#808080";
const ORANGE: Color = "#FFA500";
const TEAL: Color = "#008080";

export class Nibbles {
    SPACE_X : number  = 30;
    
    SPACE_Y : number = 30;

    REDUCE_STEP : number = 5;

    ticks : number = 0;

    colors : Array<Color>;

    loser: Snake;

    space: Space;

    hit: boolean;

    hitTarget: number;

    snakes: Array<Snake>;

    snakeCount: number;

    inUpdate: boolean;

    constructor(snakeCount: number, behavior: ISnakeBehavior) {
        this.colors = new Array<Color>();
        this.colors.push(RED);
        this.colors.push(GREEN);
        this.colors.push(BLUE);
        this.colors.push(YELLOW);
        this.colors.push(MAGENTA);
        this.colors.push(GRAY);
        this.colors.push(WHITE);

        this.snakeCount = snakeCount;
        this.setupRandom(snakeCount, behavior);
    }

    shuffle(array: Array<Snake>) : Array<Snake> {
        var currentIndex = array.length, temporaryValue, randomIndex;

        // While there remain elements to shuffle...
        while (0 !== currentIndex) {

            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            // And swap it with the current element.
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }
        return array;
    }

    randomIntFromInterval(min,max) {
        return Math.floor(Math.random()*(max-min+1)+min);
    }

    setupRandom(qty: number, behavior: ISnakeBehavior) {
        this.snakes = new Array<Snake>();
        for(let i: number = 0; i < qty; i++) {
            let snake = new Snake(i+1);
            snake.color = this.colors[i];
            snake.behavior = behavior;
            this.snakes.push(snake);
        }
        this.loser = null;
        this.space = new Space(this.SPACE_X, this.SPACE_Y);
        for(let i: number = 0; i < qty; i++) {
            let snake = this.snakes[i];
            snake.x = this.randomIntFromInterval(0, this.SPACE_X);
            snake.y = this.randomIntFromInterval(0, this.SPACE_Y);
            snake.direction = Direction[Direction[this.randomIntFromInterval(1,4)]];
            
            // If snake placed in borders ensure a safe direction
            for(let i: number = 1; i <= 4; i++) {
                let direction = Direction[Direction[i]];
                if(snake.willHitNextStep(this.space)) {
                    snake.direction = direction;
                } else {
                    break;
                }
            }
        }
    }

    init() {
        this.loser = null;
        this.space = new Space(this.SPACE_X, this.SPACE_Y);
        
        for(let i: number = 0; i < this.snakes.length; i++) {
            let snake = this.snakes[i];
            this.space.map[snake.x][snake.y] = snake.id;
        }
        //printSnakes(snakes);
    }

    update() {
        if(this.inUpdate) {
            return;
        }
        this.inUpdate = true;
        let debug: boolean = false;
        let idx: number = 0;
        if(!this.hit) {
            this.ticks++;
            let directions: Array<Promise<Direction>> = new Array<Promise<Direction>>();
            var newList = this.shuffle(this.snakes);
            for(let i: number = 0; i < newList.length; i++) {
                let snake = newList[i];
                snake.ticks = this.ticks;
                if(debug) {
                    // space.printSpace();
                    // printSnakes(snakes);
                }
                directions.push(snake.behavior.changeDirection(snake, this.space, this.snakes));
            }
            
            Promise.all(directions)
                .then((res) => {
                    for(let i: number = 0; i < newList.length; i++) {
                        let snake = newList[i];
                        let newDir: Direction = res[i];
                        
                        // If opposite direction, keep same
                        if(!snake.isOpositeDirection(newDir)) {
                            snake.changeDirection(newDir);
                        }
                        if(snake.willHitNextStep(this.space)) {
                            this.loser = snake;
                            idx = snake.willHitNextStepInfo(this.space);
                            if(debug) {
                                // System.out.println(String.format("Hit: %d:%d", snake.getId(), idx));
                                // space.printSpace();
                                // this.printSnakes(snakes);
                            }
                            this.hit = true;
                            this.hitTarget = idx;
                            break;
                        }
                        snake.step();
                        this.space.map[snake.x][snake.y] = snake.id;
                        if(this.ticks % this.REDUCE_STEP == 0) {
                            let initial = snake.getTailPosition();
                            snake.reduceLength(1);
                            this.space.map[initial.x][initial.y] = this.space.EMPTY;
                        }
                    }
                    this.inUpdate = false;
                });
        }
    }
}