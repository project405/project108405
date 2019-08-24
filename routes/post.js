var express = require('express');
var router = express.Router();

const member = require('../routes/utility/member');
//接收GET請求
router.get('/', function (req, res, next) {
   var postData = [];
   if (req.session.memID == undefined || req.session.memID == null) {
      res.render('logIn');
   } else {
      postData.push(req.session.memID);
      member.checkAuthority(req.session.memID).then(data => {
         if (data != undefined) {
            postData.push(data);
            res.render("post", { items: postData });
         } else {
            console.log("無取得帳號權限資料");
            res.render("post", { items: postData });
         }
      })
   }

});


module.exports = router;
