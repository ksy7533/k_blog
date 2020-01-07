import * as express from "express";
import { Request, Response } from "express";
import IControllerBase from "interfaces/IControllerBase.interface";

interface PostObjType {
  id: number;
  title: string;
  contents: string;
  created: number;
}

let posts: Array<PostObjType> = [
  {
    title: "제목1",
    contents:
      "안녕하세요 이것은 본문입니다. 안녕하세요 이것은 본문입니다. 안녕하세요 이것은 본문입니다.",
    created: 121212111,
    id: 1
  },

  {
    title: "제목2",
    contents:
      "2안녕하세요 이것은 본문입니다. 안녕하세요 이것은 본문입니다. 안녕하세요 이것은 본문입니다.",
    created: 121212111,
    id: 2
  },

  {
    title: "제목3",
    contents:
      "3 안녕하세요 이것은 본문입니다. 안녕하세요 이것은 본문입니다. 안녕하세요 이것은 본문입니다.",
    created: 121212111,
    id: 3
  }
];

class PostsApi implements IControllerBase {
  public path = "/posts";
  public router = express.Router();

  constructor() {
    this.initRoutes();
  }

  public initRoutes() {
    this.router.get(this.path, this.getAllPosts);
    this.router.get(this.path + "/:id", this.getPost);
    this.router.delete(this.path + "/:id", this.deletePost);
    this.router.post(this.path, this.addPost);
    this.router.put(this.path + "/:id", this.updatePost);
  }

  getAllPosts = (req: Request, res: Response) => {
    res.json(posts);
  };

  getPost = (req: Request, res: Response) => {
    const paramsId = parseInt(req.params.id, 10);

    if (isNaN(paramsId)) return res.status(400).end();
    const post = posts.find(post => paramsId === post.id);

    if (!post) return res.status(404).end();
    res.json(post);
  };

  deletePost = (req: Request, res: Response) => {
    const paramsId = parseInt(req.params.id, 10);
    if (Number.isNaN(paramsId)) return res.status(400).end();
    posts = posts.filter(post => paramsId !== post.id);
    res.status(204).end();
  };

  addPost = (req: Request, res: Response) => {
    const requireProperties = ["title", "contents"];
    let isAll = false;
    requireProperties.forEach(property => {
      if (!req.body[property]) {
        isAll = true;
      }
    });

    if (isAll) return res.status(400).end();

    const post: PostObjType = {
      id: Date.now(),
      title: req.body.title,
      contents: req.body.contents,
      created: Date.now()
    };
    posts.push(post);
    res.status(201).json(post);
  };

  updatePost = (req: Request, res: Response) => {
    const paramsId = parseInt(req.params.id, 10);
    if (Number.isNaN(paramsId)) return res.status(400).end();

    const findIndexNum = posts.findIndex(post => paramsId === post.id);

    if (findIndexNum === -1) return res.status(404).end();

    const requireProperties = ["title", "contents"];
    let isAll = false;
    requireProperties.forEach(property => {
      if (!req.body[property]) {
        isAll = true;
      }
    });

    if (isAll) return res.status(400).end();

    const post: PostObjType = Object.assign(posts[findIndexNum], {
      title: req.body.title,
      contents: req.body.contents
    });

    posts[findIndexNum] = post;
    res.status(201).json(post);
  };
}

export default PostsApi;
