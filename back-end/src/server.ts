import App from "./app";

import * as bodyParser from "body-parser";
import loggerMiddleware from "./middleware/logger";

import HomeController from "./controllers/home/home.controller";
import PostsController from "./controllers/posts/posts.controller";

const app = new App({
  port: 5000,
  controllers: [new HomeController(), new PostsController()],
  middleWares: [
    bodyParser.json(),
    bodyParser.urlencoded({ extended: true }),
    loggerMiddleware
  ]
});

app.listen();

export default app;
