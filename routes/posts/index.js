const express = require("express");
const router = express.Router();

const posts = [
  {
    title: "제목1",
    contents:
      "안녕하세요 이것은 본문입니다. 안녕하세요 이것은 본문입니다. 안녕하세요 이것은 본문입니다.",
    created: "2019-12-20 13:50",
    id: 1
  }
];

router.get("/:id", (req, res, next) => {
  const paramsId = parseInt(req.params.id, 10);

  if (isNaN(paramsId)) res.status(400).end();
  const post = posts.find(post => paramsId === post.id);

  if (!post) res.status(404).end();
  res.json(post);
});

module.exports = router;
