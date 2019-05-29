var express = require('express');
var router = express.Router();

//接收GET請求
router.get('/', function (req, res, next) {
   if (req.session.memID == undefined || req.session.memID == null) {
      res.render('login');
   } else {
      res.render("post");
   }

});


module.exports = router;
