const express = require("express");
const router = express.Router();

let posts = [
  {
    title: "제목1",
    contents:
      "안녕하세요 이것은 본문입니다. 안녕하세요 이것은 본문입니다. 안녕하세요 이것은 본문입니다.",
    created: "2019-12-20 13:50",
    id: 1
  },

  {
    title: "제목2",
    contents:
      "2안녕하세요 이것은 본문입니다. 안녕하세요 이것은 본문입니다. 안녕하세요 이것은 본문입니다.",
    created: "2019-12-21 13:50",
    id: 2
  },

  {
    title: "제목3",
    contents:
      "3 안녕하세요 이것은 본문입니다. 안녕하세요 이것은 본문입니다. 안녕하세요 이것은 본문입니다.",
    created: "2019-12-22 13:50",
    id: 3
  }
];

router.get("/", (req, res, next) => {
  res.json(posts);
});

router.get("/:id", (req, res, next) => {
  const paramsId = parseInt(req.params.id, 10);

  if (isNaN(paramsId)) return res.status(400).end();
  const post = posts.find(post => paramsId === post.id);

  if (!post) return res.status(404).end();
  res.json(post);
});

router.delete("/:id", (req, res, next) => {
  const paramsId = parseInt(req.params.id, 10);
  if (Number.isNaN(paramsId)) return res.status(400).end();
  posts = posts.filter(post => paramsId !== post.id);
  res.status(204).end();
});

router.post("/", (req, res, next) => {
  const requireProperties = ["title", "contents"];
  let isAll = false;
  requireProperties.forEach(property => {
    if (!req.body[property]) {
      isAll = true;
    }
  });

  if (isAll) return res.status(400).end();

  const post = {
    id: Date.now(),
    title: req.body.title,
    contents: req.body.contents
  };
  posts.push(post);
  res.status(201).json(post);
});

router.put("/:id", (req, res, next) => {
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

  const post = {
    title: req.body.title,
    contents: req.body.contents,
    id: posts[findIndexNum].id
  };

  posts[findIndexNum] = post;
  res.status(201).json(post);
});

module.exports = router;
