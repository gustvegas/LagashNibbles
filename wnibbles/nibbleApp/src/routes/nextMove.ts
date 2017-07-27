import { NextFunction, Request, Response, Router } from "express";
import { BaseRoute } from "./route";


/**
 * /nextMove route
 *
 * @class User
 */
export class NextMoveRoute extends BaseRoute {

  /**
   * Create the routes.
   *
   * @class IndexRoute
   * @method create
   * @static
   */
  public static create(router: Router) {

    //add get sample return
    router.get("/nextMove", (req: Request, res: Response, next: NextFunction) => {
      new NextMoveRoute().getNextMove(req, res, next);
    });

    //add post route
    router.post("/nextMove", (req: Request, res: Response, next: NextFunction) => {
      new NextMoveRoute().postNextMove(req, res, next);
    });
  }

  /**
   * Constructor
   *
   * @class IndexRoute
   * @constructor
   */
  constructor() {
    super();
  }

    /**
   * The home page route.
   *
   * @class IndexRoute
   * @method index
   * @param req {Request} The express Request object.
   * @param res {Response} The express Response object.
   * @next {NextFunction} Execute the next method.
   */
  public getNextMove(req: Request, res: Response, next: NextFunction) {

    let trail = [
      {
        "x":1,
        "y":1,
        "direction": "Up"
      },
      {
        "x":1,
        "y":5,
        "direction": "Left"
      }
    ];
    let snake: object = {
      "id":1,
      "x":1,
      "y":1,
      "direction": "Up|Down|Left|Right",
      "length": 1,
      "ticks": 1,
      "trail": trail,
    };
    let snake1: object = {
      "id":2,
      "x":1,
      "y":1,
      "direction": "Up|Down|Left|Right",
      "length": 1,
      "ticks": 1,
      "trail": trail,
    };
    let snake2: object = {
      "id":3,
      "x":1,
      "y":1,
      "direction": "Up|Down|Left|Right",
      "length": 1,
      "ticks": 1,
      "trail": trail,
    };
    let topx: number = 5;
    let topy: number = 5;

    let map: number[][] = [];
    for(var i:number = 0; i < topx; i++) {
        map[i] = [];
        for(var j: number = 0; j< topy; j++) {
            map[i][j] = 0;
        }
    }

    let payload: object = {
        "snake": snake,
        "space": {
          "topX":topx,
          "topY":topy,
          "map": map
        },
        "snakes": [
          snake1, 
          snake2
        ]
      }

      //render json
      this.json(req, res, payload);
  }

  /**
   * The home page route.
   *
   * @class IndexRoute
   * @method index
   * @param req {Request} The express Request object.
   * @param res {Response} The express Response object.
   * @next {NextFunction} Execute the next method.
   */
  public postNextMove(req: Request, res: Response, next: NextFunction) {
    let direction: Array<String> = ["Up", "Right", "Down", "Left"];

    let payload: Object = {
      direction: "a"
    };

  

    //render json
    this.json(req, res, payload);
  }
}