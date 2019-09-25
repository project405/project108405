var express = require('express');
var router = express.Router();

//get
router.get('/', function(req, res, next) {
  res.render('recommendPost');
});

module.exports = router;