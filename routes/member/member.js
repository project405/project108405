var express = require('express');
var router = express.Router();

//接收GET請求
router.get('/', function(req, res, next) {
  res.render('member', { title: 'Express' });
});

module.exports = router;
