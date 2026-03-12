var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('user', { 
    title: 'users pages',
    message:"Users listed" });
});

module.exports = router;
