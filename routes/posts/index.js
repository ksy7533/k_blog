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
    id: 1
  },

  {
    title: "제목3",
    contents:
      "3 안녕하세요 이것은 본문입니다. 안녕하세요 이것은 본문입니다. 안녕하세요 이것은 본문입니다.",
    created: "2019-12-22 13:50",
    id: 1
  }
];

router.get("/", (req, res, next) => {
  res.json(posts);
});

router.get("/:id", (req, res, next) => {
  const paramsId = parseInt(req.params.id, 10);

  if (isNaN(paramsId)) res.status(400).end();
  const post = posts.find(post => paramsId === post.id);

  if (!post) res.status(404).end();
  res.json(post);
});

router.delete("/:id", (req, res, next) => {
  const paramsId = parseInt(req.params.id, 10);
  if (Number.isNaN(paramsId)) res.status(400).end();
  posts = posts.filter(id => paramsId !== id);
  res.status(204).end();
});

router.post("/", (req, res, next) => {
  const post = {
    id: posts.length + 1,
    title: req.body.title,
    contents: req.body.contents
  };
  posts.push(post);
  res.status(201).json(post);
});

module.exports = router;
