var express = require('express');
var router = express.Router();
const member = require('../utility/member');

//接收GET請求
router.get('/', function(req, res, next) {
	console.log("specialColumnPost")
	//判斷是使用哪種方式登入
	res.render('specialColumnList');  //將資料傳給顯示頁面

// 	if (req.session.memID == undefined && req.session.passport == undefined) {
// 		res.render('login');
// 	} else if (req.session.memID != undefined && req.session.passport == undefined) {
// 		memID = req.session.memID;
// 	} else if (req.session.memID == undefined && req.session.passport != undefined) {
// 		memID = req.session.passport.user.id;
//   }
	
// 	member.checkAuthority(memID).then(data => {
// 		if (data == 'SYSOP') {
//       		res.render('specialColumnList');
// 		} else {
// 			res.render("login");
// 		}
// 	})
});

module.exports = router;