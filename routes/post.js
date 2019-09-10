var express = require('express');
var router = express.Router();

const member = require('../routes/utility/member');
//接收GET請求
router.get('/', function (req, res, next) {
	var postData = [];
	var memID;

	//判斷是使用哪種方式登入
	if (req.session.memID == undefined && req.session.passport == undefined) {
		res.render('login');
	} else if (req.session.memID != undefined && req.session.passport == undefined) {
		memID = req.session.memID;
	} else if (req.session.memID == undefined && req.session.passport != undefined) {
		memID = req.session.passport.user.id;
	}

	postData.push(memID);
	
	member.checkAuthority(memID).then(data => {
		if (data != undefined) {
			postData.push(data);
			res.render("post", { items: postData });
		} else {
			console.log("無取得帳號權限資料");
			res.render("post", { items: postData });
		}
	})

});


module.exports = router;
