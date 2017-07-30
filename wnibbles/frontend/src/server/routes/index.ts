import { NextFunction, Request, Response, Router } from "express";
import * as fs from "fs";
import * as path from "path";
import { BaseRoute } from "./route";

/**
 * / route
 *
 * @class User
 */
export class IndexRoute extends BaseRoute {

  /**
   * Create the routes.
   *
   * @class IndexRoute
   * @method create
   * @static
   */
  public static create(router: Router) {

    //add home page route
    router.get("/", (req: Request, res: Response, next: NextFunction) => {
      new IndexRoute().index(req, res, next);
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
  public index(req: Request, res: Response, next: NextFunction) {
    //set custom title
    this.title = "Lagash Nibbles Contest!";

    let me = this;
    fs.readFile(path.join(__dirname, "../../public/endpoints.json"), function (err, data) {
      //set options
      let options: Object = {
        "message": "Lagash Nibbles Contest!",
        "endpoints": JSON.parse(data.toString())
      };

      //render template
      me.render(req, res, "index", options);
    });

  }
}