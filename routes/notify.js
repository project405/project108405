var express = require('express');
var router = express.Router();

const notify = require('./utility/notify');
/* GET home page. */
router.get('/', function (req, res, next) {
  if (req.session.memID == null || req.session.memID == undefined) {
    res.render('logIn');  //導向登入畫面
  } else {
    notify.getNotifyList(req.session.memID).then(data => {
      if (data == null) {
        res.render('error');  //導向錯誤頁面
      } else {
        res.render('notify', { items: data });
      }
    })
  }

});

module.exports = router;
