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

    //add home page route
    router.get("/nextMove", (req: Request, res: Response, next: NextFunction) => {
      new NextMoveRoute().nextMove(req, res, next);
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
  public nextMove(req: Request, res: Response, next: NextFunction) {
    //set custom title
    let payload: Object = {
      a: "a",
      b: "b"
    };

    //render template
    this.json(req, res, payload);
  }
}