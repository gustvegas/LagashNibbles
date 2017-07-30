import {Pos} from './Pos';
import {Vector} from './Vector';
import {Snake} from './Snake';
import {Space} from './Space';
import {ISnakeBehavior} from './ISnakeBehavior';
import {Direction} from './Direction';

export class Nibbles {
    SPACE_X : number  = 30;
    
    SPACE_Y : number = 30;

    REDUCE_STEP : number = 5;

    ticks : number = 0;

    space: Space;

    snakes: Array<Snake>;

    loser: Snake;

    loser2: Snake;

    hit: boolean;

    hitTarget: number;

    inUpdate: boolean;

    constructor(spacex: number, spacey: number) {
        this.SPACE_X = spacex;
        this.SPACE_Y = spacey;
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

    clearSnakes() {
        this.snakes = new Array<Snake>();
    }

    addSnake(id: number, color: string, behavior: ISnakeBehavior) {
        if(this.snakes == null) {
            this.snakes = new Array<Snake>();
        }
        let snake = new Snake(id);
        snake.color = color;
        snake.behavior = behavior;
        this.snakes.push(snake);
    }

    init() {
        // Reset space
        this.space = new Space(this.SPACE_X, this.SPACE_Y);

        // Place snakes at random place
        for(let i: number = 0; i < this.snakes.length; i++) {
            let snake = this.snakes[i];
            snake.x = this.randomIntFromInterval(0, this.SPACE_X-1);
            snake.y = this.randomIntFromInterval(0, this.SPACE_Y-1);
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

        // Keep head at the map
        for(let i: number = 0; i < this.snakes.length; i++) {
            let snake = this.snakes[i];
            this.space.map[snake.x][snake.y] = snake.id;
        }

        // Reset execution flags
        this.loser = null;
        this.loser2 = null;
        this.hit = false;
    }

    update() {
        let debug: boolean = false;
        // Avaoid execution if already waiting answers
        if(this.inUpdate) {
            return;
        }
        this.inUpdate = true;
        let idx: number = 0;
        if(!this.hit) {
            this.ticks++;
            let directions: Array<Promise<Direction>> = new Array<Promise<Direction>>();
            var newList = this.shuffle(this.snakes);
            for(let i: number = 0; i < newList.length; i++) {
                let snake = newList[i];
                snake.ticks = this.ticks;
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
                            this.hit = true;
                            this.hitTarget = idx;
                            if(idx != -1 && idx != this.loser.id) {
                                let newPos = this.loser.moveNewDirection(this.loser.direction);
                                let otherHit = this.snakes.find( (s) => { return s.id == idx; });
                                if(otherHit.x == newPos.x &&
                                   otherHit.y == newPos.y) {
                                    this.loser2 = otherHit;
                                }
                            }
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