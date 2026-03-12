var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express tutolrial', message:"Express begainner friendly tutorial" });
});

module.exports = router;
