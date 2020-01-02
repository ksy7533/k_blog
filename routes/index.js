const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
  // res.render('index', { title: 'Express' });
  res.json({ test: 1 });
});

module.exports = router;
