import express from "express";
import { Application, Request, Response } from "express";
import createError from "http-errors";
import cookieParser from "cookie-parser";

class App {
  public app: Application;
  public port: number;

  constructor(appInit: { port: number; middleWares: any; controllers: any }) {
    this.app = express();
    this.port = appInit.port;

    this.assets();
    this.template();
    this.session();

    this.middlewares(appInit.middleWares);
    this.routes(appInit.controllers);

    this.errorByClient();
    this.errorByServer();
  }

  private middlewares(middleWares: {
    forEach: (arg0: (middleWare: any) => void) => void;
  }) {
    middleWares.forEach(middleWare => {
      this.app.use(middleWare);
    });
  }

  private routes(controllers: {
    forEach: (arg0: (controller: any) => void) => void;
  }) {
    controllers.forEach(controller => {
      this.app.use("/", controller.router);
    });
  }

  private assets() {
    this.app.use(express.static("public"));
    this.app.use(express.static("views"));
  }

  private template() {
    this.app.set("view engine", "ejs");
    this.app.engine("html", require("ejs").renderFile);
  }

  private session() {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(cookieParser());
  }

  private errorByClient() {
    this.app.use((req, res, next: any) => {
      next(createError(404));
    });
  }

  private errorByServer() {
    this.app.use((err: any, req: Request, res: Response, next: any) => {
      res.locals.message = err.message;
      res.locals.error = req.app.get("env") === "development" ? err : {};
      res.status(err.status || 500);
      res.render("error.html");
    });
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.log(`App listening on the http://localhost:${this.port}`);
    });
  }
}

export default App;
