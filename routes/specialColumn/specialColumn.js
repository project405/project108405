var express = require('express');
var router = express.Router();
const member = require('../utility/member');

//接收GET請求
router.get('/', function(req, res, next) {
	//判斷是使用哪種方式登入
// 	if (req.session.memID == undefined && req.session.passport == undefined) {
// 	} else if (req.session.memID != undefined && req.session.passport == undefined) {
// 		memID = req.session.memID;
// 	} else if (req.session.memID == undefined && req.session.passport != undefined) {
// 		memID = req.session.passport.user.id;
//   }
  res.render('specialColumn');
});

module.exports = router;