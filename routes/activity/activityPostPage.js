var express = require('express');
var router = express.Router();
const member = require('../utility/member');

//接收GET請求
router.get('/', function(req, res, next) {
 	var memID;
	//判斷是使用哪種方式登入
	if (req.session.memID == undefined && req.session.passport == undefined) {
		res.render('login');
	} else if (req.session.memID != undefined && req.session.passport == undefined) {
		memID = req.session.memID;
	} else if (req.session.memID == undefined && req.session.passport != undefined) {
		memID = req.session.passport.user.id;
  }
	
	member.checkAuthority(memID).then(data => {
		if (data == 'SYSOP') {
      		res.render('activityPost');
		} else {
			res.render("login");
		}
	})
});

module.exports = router;