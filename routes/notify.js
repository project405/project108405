var express = require('express');
var router = express.Router();

const notify = require('./utility/notify');
/* GET home page. */
router.get('/', function (req, res, next) {
  if (req.session.memID == null || req.session.memID == undefined) {
    res.render('signIn');  //導向登入畫面
  } else {
    notify.getNotifyList(req.session.memID).then(data => {
      if (data == null) {
        res.render('error');  //導向錯誤頁面
      } else if (data.length > 0) {
        res.render('notify', { items: data });
      } else {
        res.render('notFound');  //導向找不到頁面
      }
    })
  }

});

module.exports = router;
