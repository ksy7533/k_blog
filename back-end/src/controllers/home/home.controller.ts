import * as express from "express";
import { Request, Response } from "express";
import IControllerBase from "interfaces/IControllerBase.interface";

class HomeController implements IControllerBase {
  public path = "/";
  public router = express.Router();

  constructor() {
    this.initRoutes();
  }

  public initRoutes() {
    this.router.get(this.path, this.index);
  }

  index = (req: Request, res: Response) => {
    const users = [
      {
        id: 1,
        name: "Ali"
      },
      {
        id: 2,
        name: "Can"
      },
      {
        id: 3,
        name: "Ahmet"
      }
    ];

    res.render("home/index.html", { users });
  };
}

export default HomeController;
