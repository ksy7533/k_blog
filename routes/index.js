const express = require("express");
const router = express.Router();

/* GET home page. */
router.get("/", (req, res, next) => {
  // res.render('index', { title: 'Express' });
  res.json({ test: 1 });
});

module.exports = router;
