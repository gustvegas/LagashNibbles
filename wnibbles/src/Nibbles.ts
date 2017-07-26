
type Color = "#FFFFFF" | "#FF0000" | "#0000FF" | "#008000F" | "#ffff00" | "#ff00ff" | "#808080";
const WHITE: Color = "#FFFFFF";
const RED: Color = "#FF0000";
const BLUE: Color = "#0000FF";
const GREEN: Color = "#008000F";
const YELLOW: Color = "#ffff00";
const MAGENTA: Color = "#ff00ff";
const GRAY: Color = "#808080";

class Nibbles {
    SPACE_X : number  = 50;
    
    SPACE_Y : number = 50;

    REDUCE_STEP : number = 5;

    ticks : number = 0;

    colors : Array<Color>;

    loser: Snake;

    space: Space;

    hit: boolean;
    /**
     * snakes list.
     */
    snakes : Array<Snake>;

    constructor() {
        this.colors.push(RED);
        this.colors.push(GREEN);
        this.colors.push(BLUE);
        this.colors.push(YELLOW);
        this.colors.push(MAGENTA);
        this.colors.push(GRAY);
        this.colors.push(WHITE);

        this.setupRandom(7, new DummyBehavior());
    }

    randomIntFromInterval(min,max)
    {
        return Math.floor(Math.random()*(max-min+1)+min);
    }

    setupRandom(qty: number, behavior: ISnakeBehavior){
        for(let i = 0; i < qty; i++) {
            let snake = new Snake();
            snake.color = this.colors[i];
            snake.behavior = behavior;
            this.snakes.push(snake);
        }
        this.loser = null;
        this.space = new Space(this.SPACE_X, this.SPACE_Y);
        for(let i = 0; i < qty; i++) {
            let snake = this.snakes[i];
            snake.x = this.randomIntFromInterval(0, this.SPACE_X);
            snake.y = this.randomIntFromInterval(0, this.SPACE_Y);
            snake.direction = Direction[Direction[this.randomIntFromInterval(1,4)]];
            
            // If snake placed in borders ensure a safe direction
            for(let i = 0; i < 4; i++) {
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
        
        for(let i = 0; i < this.snakes.length; i++) {
            let snake = this.snakes[i];
            this.space.map[snake.x][snake.y] = snake.id;
        }
        //printSnakes(snakes);
    }

    start() {
        for(let i = 0; i < 10; i++) {
            this.update();
        }
    }

    update() {
        let debug = false;
        let idx = 0;
        if(!this.hit) {
            this.ticks++;
            for(let i = 0; i < this.snakes.length; i++) {
                let snake = this.snakes[i];
                if(debug) {
                    // space.printSpace();
                    // printSnakes(snakes);
                }

                let newDir = snake.behavior.changeDirection(snake, this.space, this.snakes );
                snake.changeDirection(newDir);
                if(snake.willHitNextStep(this.space)) {
                    this.loser = snake;
                    idx = snake.willHitNextStepInfo(this.space);
                    if(debug) {
                        // System.out.println(String.format("Hit: %d:%d", snake.getId(), idx));
                        // space.printSpace();
                        // this.printSnakes(snakes);
                    }
                    // System.out.println(String.format("Loser: %d hit " + (idx == -1 ? "wall" : idx), this.loser.getId(), idx));
                    this.hit = true;
                    break;
                }
                snake.step();
                this.space.map[snake.x][snake.y] = snake.id;
                if(this.ticks % this.REDUCE_STEP == 0) {
                    let initial = snake.getTailPosition();
                    snake.reduceLength(1);
                    this.space.map[initial.x][initial.y] = 0;
                }
            }
        }
    }
}